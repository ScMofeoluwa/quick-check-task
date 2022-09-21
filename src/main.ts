import { DBSource } from "./database/data-source";
import { pollWorker } from "./worker/scheduler";

DBSource.initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

pollWorker.run();
