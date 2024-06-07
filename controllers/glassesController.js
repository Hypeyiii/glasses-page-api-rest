import { GlassModel } from "../models/mysql/glassModel.js";
import { validateGlasses, validatePartialGlasses } from "../schemas/glasses.js";

export class GlassesController {
  //METODO PARA OBTENER TODOS LOS PRODUCTOS
  static async getAll(req, res) {
    const { filter } = req.query;

    // SE PASA EL FILTRO DEL REQUEST A LA FUNCIÓN getAll DEL MODELO
    const glasses = await GlassModel.getAll({ filter });

    res.json(glasses);
  }

  static async getById(req, res) {
    const { id } = req.params;

    const glass = await GlassModel.getById({ id });

    if (!glass) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(glass);
  }

  static async create(req, res) {
    const result = validateGlasses(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    await GlassModel.create({ input: req.body });

    res.status(201).json({ message: "Producto creado" });
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = validatePartialGlasses(req.body);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const glass = await GlassModel.getById({ id });
    const updated = await GlassModel.update({ id, input: req.body });

    if (!updated) {
      return res.status(404).json({
        message: `El producto con id ${id} no existe`,
      });
    }

    res.json({ message: `Producto actualizado`, product: glass });
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const deleted = await GlassModel.delete({ id });

      if (!deleted) {
        return res.status(404).json({
          message: "Producto no encontrado",
        });
      }

      res.json({
        message: "Producto eliminado",
        product: deleted,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error eliminando el producto",
      });
    }
  }
}
