// MODELO PARA LA CREACION Y CONSULTA DE USUARIO A MI BASE DE DATOS
import { connection } from "../../db.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import "dotenv/config";
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
    const { password, ...rest } = user[0];
    return rest;
  }
  static async register({ input }) {
    const { email, password, username } = input;
    const id = randomUUID();
    const role = "client";

    try {
      // Verificación de campos vacíos
      if (!email) {
        throw new Error("El email no puede estar vacío");
      }
      if (!password) {
        throw new Error("La contraseña no puede estar vacía");
      }
      if (!username) {
        throw new Error("El nombre de usuario no puede estar vacío");
      }

      // Verificación de existencia de email y username
      const [existingEmail] = await connection.query(
        "SELECT id FROM Users WHERE email = ?",
        [email]
      );

      if (existingEmail.length > 0) {
        throw new Error("El correo electrónico ya está en uso");
      }

      const [existingUsername] = await connection.query(
        "SELECT id FROM Users WHERE username = ?",
        [username]
      );

      if (existingUsername.length > 0) {
        throw new Error("El nombre de usuario ya está en uso");
      }

      // Hasheo de la contraseña
      const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);

      // Inserción del nuevo usuario en la base de datos
      await connection.query(
        "INSERT INTO Users (id, email, password, username, role) VALUES (?, ?, ?, ?, ?)",
        [id, email, hashedPassword, username, role]
      );
    } catch (e) {
      console.error("Error al crear el usuario", e);
      throw new Error("Error al crear el usuario: " + e.message);
    }
  }

  static async login({ email, password }) {
    const [user] = await connection.query(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );

    if (!user) {
      throw new Error("Este correo no está registrado");
    }

    if (user.length === 0) {
      throw new Error("Ingrese su contraseña");
    }

    const userPassword = user[0].password;

    const passwordMatches = await bcrypt.compare(password, userPassword);

    if (!passwordMatches) {
      throw new Error("El correo electrónico o contraseña no coindicen");
    }

    return user[0];
  }

  static async delete({ id }) {
    try {
      await connection.query("DELETE FROM Users WHERE id = ?", [id]);
    } catch (e) {
      console.error("Error al eliminar el usuario", e);
      throw e;
    }
  }

  static async logout() {}

  static async verify() {}
}
