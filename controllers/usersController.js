import { UserModel } from "../models/mysql/userModel.js";
import { validateUser } from "../schemas/user.js";

export class UserController {
  static async getAll(req, res) {
    const { search } = req.query;
    const users = await UserModel.getAll({ search });
    if (users.length === 0)
      return res.status(404).json({
        message: "No se encontró ningun usuario",
      });
    else {
      res.json(users);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    const user = await UserModel.getById({ id });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json(user);
  }

  static async getByEmail(req, res) {
    const { email } = req.params;
    const user = await UserModel.getByEmail({ email });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json(user);
  }

  static async create(req, res) {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    await UserModel.create({ input: req.body });
    const user = await UserModel.getByEmail({ email: req.body.email });
    res.json({ message: "Usuario creado", user: user });
  }

  static async delete(req, res) {
    await UserModel.delete({ id: req.params.id });
    res.json({ message: "Usuario eliminado" });
  }
}
