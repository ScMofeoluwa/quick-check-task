import { Queue, Worker, QueueScheduler } from "bullmq";
import { poll } from "./poller";
import { config } from "../config/config";

const connection = { host: "127.0.0.1", port: 6666 };
const pollQueueScheduler = new QueueScheduler("QuickCheck", {
  connection: connection,
});
const pollQueue = new Queue("QuickCheck", { connection: connection });
pollQueue.add("poll", {}, { repeat: { pattern: config.pattern } });

export const pollWorker = new Worker(
  "QuickCheck",
  async () => {
    await poll();
  },
  {
    autorun: false,
    connection: connection,
  },
);

pollWorker.on("completed", (job) => {
  console.info(`${job.id} has completed!`);
});

pollWorker.on("failed", (job, err) => {
  console.error(`${job.id} has failed with ${err.message}`);
});
