import express from "express";
import { DBSource } from "./database/data-source";
import { pollWorker } from "./worker/scheduler";
import { router } from "./routes/item.route";
import { config } from "./config/config";

const app = express();
const port = config.app_port;

app.use(express.json());
app.use("/items", router);

app.listen(port, () => {
  console.log(`Connected to port:${port}`);
});

DBSource.initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

pollWorker.run();

export { app };
