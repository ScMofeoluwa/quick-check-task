import { DBSource } from "./data-source";
import { Item } from "./entity/Item";

export const ItemRespository = DBSource.getRepository(Item);
