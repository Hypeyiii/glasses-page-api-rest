import "dotenv/config";

export const SALT_ROUNDS = process.env.SALT_ROUNDS;

export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const PORT = process.env.PORT || 5000;
export const DB_PORT = process.env.DB_PORT || 3306;
export const DATABASE_URL = process.env.DATABASE_URL;
export const HOST = process.env.HOST || "localhost";
export const USER = process.env.USER || "root";
export const PASSWORD = process.env.PASSWORD || "frias3108";
export const DATABASE = process.env.DATABASE || "glasses-database";
export const NODE_ENV = process.env.NODE_ENV || "development";

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;