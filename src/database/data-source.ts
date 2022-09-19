import {config} from "../config/config";
import {Item} from "./entity/Item";
import {createItems1663609015510} from "./migrations/1663609015510-create-items";
import { DataSource } from "typeorm";


export const DBSource = new DataSource({
    type: "postgres",
    host: config.host,
    port: parseInt(config.port),
    username: config.username,
    password: config.password,
    database: config.database,
    synchronize: false,
    logging: false,
    entities: [Item],
    migrations: [createItems1663609015510],
});