import express from "express";
import employeesRouter from "./router.js";
const app = express();
export default app;

import employees from "#db/employees";
// req.params are always strings, so we need to convert `id` into a number
// before we can use it to find the employee

app.use("/", employeesRouter);

app.use((err, res, req, next) => {
  res.status(500).json({ err: "Sorry, something went wrong!" });
});
