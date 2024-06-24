import { connection } from "../../db.js";

export class OrderProductModel {
  static async getProductsByOrderId({ orderId }) {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM OrderProducts WHERE orderid = ?`,
        [orderId]
      );
      return rows;
    } catch (error) {
      console.error(error);
      return [];
    }
  }a

  static async getAll() {
    try {
      const [rows] = await connection.execute(`SELECT * FROM OrderProducts`);
      return rows;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
