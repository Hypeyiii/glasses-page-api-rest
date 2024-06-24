import { connection } from "../../db.js";
import { randomUUID } from "crypto";

export class OrderModel {
  static async getAll() {
    const [orders] = await connection.query("SELECT * FROM Orders");
    if (orders.length === 0) throw new Error("No orders found");
    return orders;
  }

  static async getById({ id }) {
    const [order] = await connection.query(
      "SELECT * FROM Orders WHERE id = ?",
      [id]
    );
    if (order.length === 0) throw new Error("Order not found");
    return order[0];
  }

  static async getByUserId({ userId }) {
    const [orders] = await connection.query(
      "SELECT * FROM Orders WHERE userId = ?",
      [userId]
    );
    if (orders.length === 0) throw new Error("No orders found");
    return orders;
  }

  static async create({ userId, products }) {
    const id = randomUUID();
    const status = "pending";
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      if (!userId) throw new Error("User ID is required");
      if (!products) throw new Error("Products are required");

      await connection.query(
        "INSERT INTO Orders (id, userId, status, date) VALUES (?, ?, ?, ?)",
        [id, userId, status, date]
      );

      for (const product of products) {
        await connection.query(
          "INSERT INTO OrderProducts (orderId, productId, quantity) VALUES (?, ?, ?)",
          [id, product.productId, product.quantity]
        );
      }

      return { id, userId, status, date, products };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete({ id }) {
    const [order] = await connection.query(
      "SELECT * FROM Orders WHERE id = ?",
      [id]
    );
    if (order.length === 0) throw new Error("Order not found");

    await connection.query("DELETE FROM OrderProducts WHERE orderId = ?", [id]);
    await connection.query("DELETE FROM Orders WHERE id = ?", [id]);
  }
}
