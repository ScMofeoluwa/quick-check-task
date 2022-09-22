import { DBSource } from "./database/data-source";
import express from "express";
import { config } from "./config/config";
import { router } from "./routes/item.route";
import { pollWorker } from "./worker/scheduler";

const app = express();
const port = config.app_port;
app.use(express.json());
app.use("/items", router);

DBSource.initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

pollWorker.run();
