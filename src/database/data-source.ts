import { config } from "../config/config";
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
  entities: [__dirname + "/entity/*.{ts,js}"],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});
