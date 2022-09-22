import { Router } from "express";
import { ItemController } from "../controllers/item.controller";
import { RightsMiddleware } from "../middlewares/rights.middleware";

const router = Router();
const itemController = new ItemController();
const rightsMiddleware = new RightsMiddleware();

router.get("/", itemController.getAll);
router.get("/:type", itemController.getAllByType);
router.get("/:id", itemController.getOne);
router.post("/", itemController.create);
router.patch("/:id", rightsMiddleware.authorize, itemController.update);
router.delete("/:id", rightsMiddleware.authorize, itemController.delete);

export { router };
