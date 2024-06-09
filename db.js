// CONEXIÓN A MI BASE DE DATOS EN MYSQL
import "dotenv/config";
import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

export const connection = await mysql.createConnection(connectionString);
