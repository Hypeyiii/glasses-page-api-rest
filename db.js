// CONEXIÓN A MI BASE DE DATOS EN MYSQL
import "dotenv/config";
import mysql from "mysql2/promise";
import { DATABASE_URL, HOST, USER, PORT, PASSWORD, DATABASE } from "./config.js";

const DEFAULT_CONFIG = {
  host: HOST,
  user: USER,
  port: PORT,
  password: PASSWORD,
  database: DATABASE,
};
const connectionString = DATABASE_URL ?? DEFAULT_CONFIG;

export const connection = await mysql.createConnection(connectionString);
