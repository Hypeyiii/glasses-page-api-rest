// CONEXIÓN A MI BASE DE DATOS EN MYSQL
import mysql from "mysql2/promise";
import { DATABASE_URL, HOST, USER, DB_PORT, PASSWORD, DATABASE } from "./config.js";

const DEFAULT_CONFIG = {
  host: HOST,
  user: USER,
  port: DB_PORT,
  password: PASSWORD,
  database: DATABASE,
};
const connectionString = DATABASE_URL ?? DEFAULT_CONFIG;

export const connection = await mysql.createConnection(connectionString);
