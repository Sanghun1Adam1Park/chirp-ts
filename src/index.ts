import express from "express";
import { handlerReadiness } from "./handlers/api/handler_readiness.js";
import { middlewareLogResponses } from "./middleware/logging.js";
import { handlerMetric, handlerMetricReset } from "./handlers/admin/handler_metric.js";
import { middlewareMetricsInc } from "./middleware/metric_inc.js";
import { errorHandler } from "./middleware/error_handler.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "./config.js";
import { handlerCreateUser } from "./handlers/api/handler_create_user.js";
import { handlerReset } from "./handlers/admin/handler_reset_users.js";
import { handlerChirp } from "./handlers/api/handler_chirp.js";
import { handlerGetChirps } from "./handlers/api/handler_get_chirps.js";

const migrationClient = postgres(config.dbConfig.url, { max: 1 });
await migrate(drizzle(migrationClient), config.dbConfig.migrationConfig);

const app = express();
const PORT = 8080;

app.use(express.json()); 
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", async (req, res, next) => {
  try { 
    await handlerReadiness(req, res);
  } catch (err) {
    next(err);
  }
});
app.get("/admin/reset", async (req, res, next) => {
  try {
    await handlerMetric(req, res);
  } catch (err) {
    next(err);
  }
});
app.get("/admin/reset", async (req, res, next) => {
  try {
    await handlerMetricReset(req, res);
  } catch (err) {
    next(err);
  }
});
app.get("/api/chirps", async (req, res, next) => {
  try {
    await handlerGetChirps(req, res);
  } catch (err) {
    next(err);
  }
});
app.post("/api/users", async (req, res, next) => {
  try {
    await handlerCreateUser(req, res);
  } catch (err) {
    next(err);
  }
})
app.post("/admin/reset", async (req, res, next) => {
  try {
    await handlerReset(req, res);
  } catch (err) {
    next(err);
  }
});
app.post("/api/chirps", async (req, res, next) => {
  try {
    await handlerChirp(req, res);
  } catch (err) {
    next(err);
  }
}); 

app.use(errorHandler); 

app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});