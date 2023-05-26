import "express-async-errors";
import express, { Application, json } from "express";
import { userRoutes } from "./routes/users.routes";
import { handleErrors } from "./error";
import loginRoutes from "./routes/login.routes";

const app: Application = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(handleErrors);

export default app;
