import cors from "cors";
import express, { Application } from "express";

import { routes } from "./routes";

const app: Application = express();
const port = process.env.PORT;

//* Middleware to parse JSON
app.use(express.json());

//* Middleware to enable CORS from the client-side http://localhost:3001
app.use(
    cors({
        //? Allow only this origin
        origin: "http://localhost:3001",
        //? Allow these HTTP methods
        methods: ["GET", "POST", "PUT", "DELETE"],
        //? Allow these headers
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use("/", routes);

//* Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
