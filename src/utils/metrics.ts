import express from "express";
import client from "prom-client";

const app = express();

export const responseTimeHistogram = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 0.5, 1, 1.5, 2, 3, 5, 10],
    });

export const dbQueryDurationHistogram = new client.Histogram({
    name: "db_query_duration_seconds",
    help: "Duration of DB queries in seconds",
    labelNames: ["query"],
    buckets: [0.1, 0.5, 1, 1.5, 2, 3, 5, 10],
    });

export function startMetricsServer() {

    const collectDefaultMetrics = client.collectDefaultMetrics;

    collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  });

  app.listen(9020, () => {
    console.log("Metrics server is running on port 3001");
  });
}