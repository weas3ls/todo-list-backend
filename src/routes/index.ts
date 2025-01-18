import express from "express";

import taskRoutes from "./tasks.routes";

export const routes = express.Router();

routes.use("/tasks", taskRoutes);
