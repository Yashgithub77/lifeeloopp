import { NextRequest, NextResponse } from "next/server";
import { store } from "@/data/store";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { status, actualMinutes, notes } = body;

        // Get current tasks from store
        const tasks = store.getTasks();
        const task = tasks.find(t => t.id === id);

        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        // Update the task
        const updatedTask = {
            ...task,
            ...(status !== undefined && { status }),
            ...(actualMinutes !== undefined && { actualMinutes }),
            ...(notes !== undefined && { notes }),
            ...(status === "done" && { completedAt: new Date().toISOString() }),
            ...(status === "pending" && { completedAt: undefined }),
        };

        // Update tasks in store
        const updatedTasks = tasks.map(t => t.id === id ? updatedTask : t);
        store.setTasks(updatedTasks);

        // If task completed, update goal progress
        if (status === "done") {
            const goals = store.getGoals();
            const goal = goals.find(g => g.id === task.goalId);

            if (goal) {
                const completedTasksCount = updatedTasks.filter(
                    t => t.goalId === task.goalId && t.status === "done"
                ).length;

                // Update the goal's currentValue
                store.updateGoal(goal.id, {
                    currentValue: completedTasksCount,
                });
            }
        }

        // Log agent action
        store.addAgentAction({
            id: `action-${Date.now()}`,
            type: "check_progress",
            title: status === "done" ? "Task Completed" : "Task Updated",
            description: `Task "${task.title}" marked as ${status}`,
            status: "completed",
            timestamp: new Date().toISOString(),
            duration: 100,
        });

        return NextResponse.json({
            success: true,
            task: updatedTask,
            goals: store.getGoals(),
        });
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json(
            { error: "Failed to update task", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
