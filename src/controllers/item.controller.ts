import { ItemService } from "../services/item.service";
import { Request, Response } from "express";

const itemService = new ItemService();

export class ItemController {
  async create(req: Request, res: Response) {
    const item = await itemService.create(req.body);
    res.status(201).send({ message: "item created successfully", data: item });
  }

  async update(req: Request, res: Response) {
    try {
      await itemService.update(req.params.id, req.body);
      res
        .status(200)
        .send({ message: "item successfully updated", data: null });
    } catch (err: any) {
      res.status(404).send({ message: err.message, data: null });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await itemService.delete(req.params.id);
      res
        .status(200)
        .send({ message: "item successfully deleted", data: null });
    } catch (err: any) {
      res.status(404).send({ message: err.message, data: null });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const item = await itemService.getOne(req.params.id);
      res
        .status(200)
        .send({ message: "item successfully fetched", data: item });
    } catch (err: any) {
      res.status(404).send({ message: err.message, data: null });
    }
  }

  async getAll(req: Request, res: Response) {
    const query = req.query.query;
    if (!query) {
      const items = await itemService.getAll();
      res
        .status(200)
        .send({ message: "items successfully fetched", data: items });
    } else {
      //@ts-ignore
      const items = await itemService.search(query);
      res
        .status(200)
        .send({ message: "items successfully fetched", data: items });
    }
  }

  async getAllByType(req: Request, res: Response) {
    try {
      //@ts-ignore
      const items = await itemService.getAllByType(req.params.type);
      res
        .status(200)
        .send({ message: "items successfully fetched", data: items });
    } catch (err: any) {
      res.status(400).send({ message: err.message, data: null });
    }
  }
}
