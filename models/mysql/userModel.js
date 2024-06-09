// MODELO PARA LA CREACION Y CONSULTA DE USUARIO A MI BASE DE DATOS
import { connection } from "../../db.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export class UserModel {
  static async getAll({ search }) {
    if (search) {
      const [user] = await connection.query(
        "SELECT * FROM Users WHERE email = ? OR username = ?",
        [search, search]
      );
      return user;
    }
    const [users] = await connection.query("SELECT * FROM Users");
    return users;
  }

  static async getById({ id }) {
    const [user] = await connection.query("SELECT * FROM Users WHERE id = ?", [
      id,
    ]);
    if (user.length === 0) return null;
    return user[0];
  }

  static async getByEmail({ email }) {
    const [user] = await connection.query(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    if (user.length === 0) return null;
    return user[0];
  }

  static async create({ input }) {
    const { email, password, username, role } = input;
    const id = randomUUID();

    try {
      const [existingEmail] = await connection.query(
        "SELECT id FROM Users WHERE email = ?",
        [email]
      );

      const [existingUsername] = await connection.query(
        "SELECT id FROM Users WHERE username = ?",
        [username]
      );

      if (existingUsername.length > 0) {
        throw new Error("El nombre de usuario ya está en uso");
      }

      if (existingEmail.length > 0) {
        throw new Error("El correo electrónico ya está en uso");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      if (!email) {
        throw new Error("El email no puede estar vacío");
      }
      if (!password) {
        throw new Error("La contraseña no puede estar vacía");
      }

      await connection.query(
        "INSERT INTO Users (id, email, password, username, role) VALUES (?, ?, ?, ?, ?)",
        [id, email, hashedPassword, username, role]
      );
    } catch (e) {
      console.error("Error al crear el usuario", e);
      throw e;
    }
  }

  static async delete({ id }) {
    try {
      await connection.query("DELETE FROM Users WHERE id = ?", [id]);
    } catch (e) {
      console.error("Error al eliminar el usuario", e);
      throw e;
    }
  }
}