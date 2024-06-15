//MODELO SACADO DE MI BASE DE DATOS EN MYSQL
import { randomUUID } from "node:crypto";
import "dotenv/config";
import { connection } from "../../db.js";

export class GlassModel {
  static async getAll({ filter }) {
    if (filter) {
      const [glass] = await connection.query(
        "SELECT * FROM Products WHERE category = ? OR genre = ? OR shape = ? OR color = ?",
        [filter, filter, filter, filter]
      );
      return glass;
    }
    const [glass] = await connection.query("SELECT * FROM Products");
    return glass;
  }

  static async getById({ id }) {
    const [glass] = await connection.query(
      "SELECT * FROM Products WHERE id = ?",
      [id]
    );
    if (glass.length === 0) return null;
    return glass[0];
  }

  static async create({ input }) {
    const {
      brand,
      price,
      category,
      genre,
      shape,
      color,
      image,
      description,
      quantity,
      stock,
    } = input;

    // Generar UUID
    const id = randomUUID();

    try {
      // Insertar producto en la base de datos
      await connection.query(
        `INSERT INTO Products (id, brand, price, category, genre, shape, color, image, description, quantity, stock) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          brand,
          price,
          category,
          genre,
          shape,
          color,
          image,
          description,
          quantity,
          stock,
        ]
      );

      // Obtener el producto recién creado
      const [glass] = await connection.query(
        `SELECT * FROM Products WHERE id = ?`,
        [id]
      );

      return glass[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error creating product");
    }
  }

  static async update({ id, input }) {
    const {
      brand,
      price,
      category,
      genre,
      shape,
      color,
      image,
      description,
      quantity,
      stock,
    } = input;

    try {
      // Obtener el producto antes de actualizarlo
      const [product] = await connection.query(
        "SELECT * FROM Products WHERE id = ?",
        [id]
      );

      if (product.length === 0) {
        throw new Error("Product not found");
      }

      await connection.query(
        `UPDATE Products SET brand = ?, price = ?, category = ?, genre = ?, shape = ?, color = ?, image = ?, description = ?, quantity = ?, stock = ? WHERE id = ?`,
        [
          brand,
          price,
          category,
          genre,
          shape,
          color,
          image,
          description,
          quantity,
          stock,
          id,
        ]
      );

      const [updatedProduct] = await connection.query(
        "SELECT * FROM Products WHERE id = ?",
        [id]
      );

      return updatedProduct[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error updating product");
    }
  }

  static async delete({ id }) {
    try {
      const [product] = await connection.query(
        "SELECT * FROM Products WHERE id = ?",
        [id]
      );

      if (product.length === 0) {
        throw new Error("Product not found");
      }

      await connection.query("DELETE FROM Products WHERE id = ?", [id]);

      return product[0];
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting product");
    }
  }
}
