import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    try {
        // Get the session with access token
        const session = await auth();

        if (!session || !session.accessToken) {
            return NextResponse.json(
                { error: "Not authenticated. Please sign in with Google." },
                { status: 401 }
            );
        }

        // Calculate time range (last 7 days)
        const endTime = new Date();
        const startTime = new Date();
        startTime.setDate(startTime.getDate() - 7);

        // Prepare aggregation request for Google Fit
        const requestBody = {
            aggregateBy: [
                { dataTypeName: "com.google.step_count.delta" },
                { dataTypeName: "com.google.calories.expended" },
                { dataTypeName: "com.google.active_minutes" },
                { dataTypeName: "com.google.heart_rate.bpm" },
            ],
            bucketByTime: { durationMillis: 86400000 }, // 1 day
            startTimeMillis: startTime.getTime(),
            endTimeMillis: endTime.getTime(),
        };

        // Call Google Fit REST API directly
        const response = await fetch(
            "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error("Google Fit API error:", error);

            if (response.status === 401 || response.status === 403) {
                return NextResponse.json(
                    {
                        error: "Please reconnect your Google account to access Fitness data.",
                        needsReauth: true
                    },
                    { status: 403 }
                );
            }

            throw new Error(error.error?.message || "Failed to fetch from Google Fit");
        }

        const data = await response.json();
        const buckets = data.bucket || [];

        // Process response into friendly format
        const processedData = buckets.map((bucket: any) => {
            const date = new Date(parseInt(bucket.startTimeMillis));
            const result: any = {
                date: date.toISOString().split("T")[0],
                steps: 0,
                calories: 0,
                activeMinutes: 0,
                heartRate: 0,
            };

            bucket.dataset?.forEach((dataset: any) => {
                const dataTypeName = dataset.dataSource?.dataTypeName || "";
                const points = dataset.point || [];

                if (points.length === 0) return;

                if (dataTypeName.includes("step_count")) {
                    result.steps = points.reduce(
                        (sum: number, point: any) =>
                            sum + (point.value?.[0]?.intVal || 0),
                        0
                    );
                } else if (dataTypeName.includes("calories")) {
                    result.calories = Math.round(
                        points.reduce(
                            (sum: number, point: any) =>
                                sum + (point.value?.[0]?.fpVal || 0),
                            0
                        )
                    );
                } else if (dataTypeName.includes("active_minutes")) {
                    result.activeMinutes = Math.round(
                        points.reduce(
                            (sum: number, point: any) =>
                                sum + (point.value?.[0]?.intVal || 0),
                            0
                        )
                    );
                } else if (dataTypeName.includes("heart_rate")) {
                    const heartRates = points.map(
                        (point: any) => point.value?.[0]?.fpVal || 0
                    );
                    result.heartRate = heartRates.length
                        ? Math.round(
                            heartRates.reduce((a: number, b: number) => a + b, 0) /
                            heartRates.length
                        )
                        : 0;
                }
            });

            return result;
        });

        // Get today's data (last item)
        const todayData = processedData[processedData.length - 1] || {
            date: new Date().toISOString().split("T")[0],
            steps: 0,
            calories: 0,
            activeMinutes: 0,
            heartRate: 0,
        };

        // Calculate distance from steps (avg 0.762 meters/step)
        const distanceKm = Math.round((todayData.steps * 0.762) / 10) / 100;

        return NextResponse.json({
            success: true,
            today: {
                ...todayData,
                distanceKm,
                stepsGoal: 10000, // Default goal
                caloriesBurned: todayData.calories,
            },
            history: processedData.map((d: any) => ({
                ...d,
                distanceKm: Math.round((d.steps * 0.762) / 10) / 100,
            })),
        });
    } catch (error: any) {
        console.error("Google Fit sync error:", error);

        return NextResponse.json(
            {
                error: "Failed to sync with Google Fit",
                details: error.message || String(error),
            },
            { status: 500 }
        );
    }
}
