import dotenv from "dotenv"
import path from "path";
dotenv.config({ path: path.normalize(path.join(path.dirname(__dirname) + "/../.env")) });

const options = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        app_port: process.env.PORT,
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        app_port: process.env.PORT,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        app_port: process.env.PORT,
    },
};

const env = process.env.NODE_ENV;
//@ts-ignore
const config = options[env];
export { config };