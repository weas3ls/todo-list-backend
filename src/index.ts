import express, { Application } from "express";

import { routes } from "./routes";

const app: Application = express();
const port = process.env.PORT;

//* Middleware to parse JSON
app.use(express.json());

app.use("/", routes);

//* Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
