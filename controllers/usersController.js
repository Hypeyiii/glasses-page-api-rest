import { UserModel } from "../models/mysql/userModel.js";
import { validateUser } from "../schemas/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class UserController {
  static async getAll(req, res) {
    const { search } = req.query;
    try {
      const users = await UserModel.getAll({ search });
      if (users.length === 0) {
        return res.status(404).json({
          message: "No se encontró ningún usuario",
        });
      }
      res.json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.getById({ id });
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
      }
      res.json(user);
    } catch (error) {
      console.error(`Error al obtener usuario por id ${id}:`, error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await UserModel.getByEmail({ email });
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
      }
      res.json(user);
    } catch (error) {
      console.error(`Error al obtener usuario por email ${email}:`, error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async register(req, res) {
    const result = validateUser(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "No se pudo validar el usuario" });
    }

    try {
      await UserModel.register({ input: req.body });
      const user = await UserModel.getByEmail({ email: req.body.email });
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production",
      });

      res.json({ message: "Usuario creado", user });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async login(req, res) {
    const result = validateUser(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "No se pudo validar el usuario" });
    }

    try {
      const user = await UserModel.login({
        email: req.body.email,
        password: req.body.password,
      });

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        secure: process.env.NODE_ENV === "production",
      });

      const safeUser = { ...user, password: undefined };

      res.json({ message: "Usuario logueado", user: safeUser });
    } catch (error) {
      if (error.message === "Credenciales inválidas") {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      if (error.message === "Este correo no está registrado") {
        return res.status(404).json({ message: "Correo no registrado" });
      }
      if (error.message === "El correo electrónico o contraseña no coindicen") {
        return res
          .status(401)
          .json({ message: "El correo electrónico o contraseña no coindicen" });
      }
      if (error.message === "Ingrese su contraseña") {
        return res.status(400).json({ message: "Ingrese su contraseña" });
      }
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("access_token");
      res.json({ message: "Usuario deslogueado" });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await UserModel.delete({ id });
      res.json({ message: "Usuario eliminado" });
    } catch (error) {
      console.error(`Error al eliminar usuario con id ${id}:`, error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async verify(req, res) {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "No autenticado" });
    }

    try {
      const data = jwt.verify(token, process.env.TOKEN_SECRET);

      res.json({ data });
    } catch (error) {
      console.error("Error al verificar el token:", error);
      res.status(401).json({ message: "Token inválido" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const input = req.body;

    try {
      await UserModel.update({ id, input });
      const user = await UserModel.getById({ id });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      console.error(`Error al actualizar usuario con id ${id}:`, error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
