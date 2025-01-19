import { Router } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

//* Define the type for creating/updating a task
interface Task {
    title: string;
    color: string;
    completed?: boolean;
}

//* GET /tasks - Fetch all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ err: "Failed to fetch tasks" });
    }
});

//* POST /tasks - Create a new task
router.post("/", async (req, res) => {
    const { title, color, completed } = req.body;

    //* Validate the request body
    if (!title || !color) {
        res.status(400).json({ err: "Title and color are required" });
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                color,
                completed: completed ?? false //* Default to false if not provided
            }
        });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ err: "Failed to create task" });
    }
});

//* GET /task/:id - Fetch a task by ID
router.get("/:id", async (req, res) => {
    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!task) {
            res.status(404).json({ err: "Task not found" });
        } else {
            res.status(200).json(task);
        }
    } catch (err) {
        res.status(500).json({ err: "Failed to fetch task" });
    }
});

//* PUT /tasks/:id - Update a task by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, color, completed }: Task = req.body;

    //* Validate the request body
    if (!title || !color)
        res.status(400).json({ err: "Title and color are required" });

    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, color, completed }
        });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ err: "Failed to update task" });
    }
});

//* DELETE /tasks/:id - Delete a task by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    //* Validate the request body
    if (!id) res.status(400).json({ err: "ID is required" });

    try {
        await prisma.task.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ err: "Failed to delete task" });
    }
});

export default router;
