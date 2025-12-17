"use client";

import { useEffect, useState } from "react";
import { Task, Goal, FitnessData } from "@/types";

interface AIInsightsProps {
    tasks: Task[];
    goals: Goal[];
    fitnessData?: FitnessData;
}

interface DailyInsight {
    insight: string;
    mood: "great" | "good" | "okay" | "low" | "tired";
    tip: string;
    isAI: boolean;
}

export default function AIInsights({ tasks, goals, fitnessData }: AIInsightsProps) {
    const [insight, setInsight] = useState<DailyInsight | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInsight();
    }, [tasks, goals]);

    const fetchInsight = async () => {
        try {
            const res = await fetch("/api/ai-insights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tasks, goals, fitnessData }),
            });

            const data = await res.json();
            setInsight(data);
        } catch (error) {
            console.error("Failed to fetch AI insights:", error);
            // Fallback insight
            setInsight({
                insight: "💡 Keep going! Every small step counts.",
                mood: "okay",
                tip: "Try starting with your easiest task tomorrow.",
                isAI: false,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                className="p-5 rounded-2xl shadow-sm animate-pulse"
                style={{ background: "var(--cardBg)", border: "1px solid var(--cardBorder)" }}
            >
                <div className="h-4 rounded w-3/4 mb-3" style={{ background: "var(--backgroundSecondary)" }} />
                <div className="h-3 rounded w-full mb-2" style={{ background: "var(--backgroundSecondary)" }} />
                <div className="h-3 rounded w-2/3" style={{ background: "var(--backgroundSecondary)" }} />
            </div>
        );
    }

    if (!insight) return null;

    const moodEmoji = {
        great: "🌟",
        good: "😊",
        okay: "🙂",
        low: "😔",
        tired: "😴",
    };

    const moodColor = {
        great: "#10b981",
        good: "#3b82f6",
        okay: "#6366f1",
        low: "#f59e0b",
        tired: "#ef4444",
    };

    return (
        <div
            className="p-5 rounded-2xl shadow-sm transition-all hover:shadow-md"
            style={{
                background: "var(--cardBg)",
                border: "1px solid var(--cardBorder)",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                    <span>💡</span> Daily Insight
                </h3>
                {insight.isAI && (
                    <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                            background: "var(--primaryGradient)",
                            color: "white",
                        }}
                    >
                        AI-Powered
                    </span>
                )}
            </div>

            {/* Mood Indicator */}
            <div className="flex items-center gap-3 mb-4">
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{
                        background: `${moodColor[insight.mood]}20`,
                    }}
                >
                    {moodEmoji[insight.mood]}
                </div>
                <div>
                    <p className="text-sm font-medium capitalize" style={{ color: moodColor[insight.mood] }}>
                        Feeling {insight.mood}
                    </p>
                    <p className="text-xs" style={{ color: "var(--foregroundMuted)" }}>
                        Based on your progress
                    </p>
                </div>
            </div>

            {/* Insight */}
            <div
                className="p-4 rounded-xl mb-3"
                style={{ background: "var(--backgroundSecondary)" }}
            >
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                    {insight.insight}
                </p>
            </div>

            {/* Tip */}
            <div className="flex items-start gap-2">
                <span className="text-lg mt-0.5">💡</span>
                <div className="flex-1">
                    <p className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>
                        Tip for Tomorrow
                    </p>
                    <p className="text-xs" style={{ color: "var(--foregroundMuted)" }}>
                        {insight.tip}
                    </p>
                </div>
            </div>

            {/* Refresh Button */}
            <button
                onClick={fetchInsight}
                className="mt-4 w-full py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                style={{
                    background: "var(--backgroundSecondary)",
                    color: "var(--primary)",
                }}
            >
                🔄 Get New Insight
            </button>
        </div>
    );
}
