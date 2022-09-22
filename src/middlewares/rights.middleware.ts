import { ItemRespository } from "../database";
import { NextFunction, Request, Response } from "express";
import { Item } from "../database/entity/Item";

export class RightsMiddleware {
  async authorize(req: Request, res: Response, next: NextFunction) {
    try {
      //@ts-ignore
      const item: Item = await ItemRespository.findOneBy({ id: req.params.id });
      if (item.byHackerNews) {
        return res.status(401).send({ message: "Access Denied", data: null });
      }
      next();
    } catch (err) {
      res
        .status(404)
        .send({ message: "Item with ID does not exist", data: null });
    }
  }
}
