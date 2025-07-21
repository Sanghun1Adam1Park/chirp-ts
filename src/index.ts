import express from "express";
import path from "path";
import os from "os";
import { handlerReadiness } from "./handlers/handler_readiness.js";

const app = express();
const PORT = 8080;

app.use("/app", express.static("./src/app"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/healthz", handlerReadiness);