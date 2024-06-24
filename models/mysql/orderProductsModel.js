import { connection } from "../../db.js";

export class OrderProductModel {
  static async getProductsByOrderId({ orderId }) {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM orderProducts WHERE orderid = ?`,
        [orderId]
      );
      return rows;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
