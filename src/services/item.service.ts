import { ItemRespository } from "../database";
import { Item } from "../database/entity/Item";
import { UpdateResult, DeleteResult } from "typeorm";
import { NewsType } from "../types";

export class ItemService {
  repository = ItemRespository;

  async create(data: Omit<Item, "id">): Promise<Item> {
    data.byHackerNews = false;
    const item = this.repository.create(data);
    return await this.repository.save(item);
  }

  async update(id: string, data: Partial<Item>): Promise<UpdateResult> {
    const item = await this.repository.findOneBy({ id: id });
    if (!item) {
      throw new Error("item not found");
    }
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<DeleteResult> {
    const item = await this.repository.findOneBy({ id: id });
    if (!item) {
      throw new Error("item not found");
    }
    return await this.repository.delete(id);
  }

  async getOne(id: string): Promise<Item> {
    const item = await this.repository.findOneBy({ id: id });
    if (!item) {
      throw new Error("item not found");
    }
    return item;
  }

  async getAll(): Promise<Item[]> {
    //TODO: Add Pagination
    return await this.repository.find();
  }

  async getAllByType(type: NewsType): Promise<Item[]> {
    //TODO: Add Pagination
    const items = await this.repository.findBy({ type: type });
    if (!items) {
      throw new Error("invalid news type");
    }
    return items;
  }

  async search(query: string): Promise<Item[]> {
    return await this.repository
      .createQueryBuilder()
      .select()
      .where("title ILIKE :query", { query: `%${query}%` })
      .orWhere("text ILIKE :query", { query: `%${query}%` })
      .getMany();
  }
}
