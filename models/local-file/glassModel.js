// MODELO LOCAL SACADO DE MI MOVIES.JSON

import { readJSON } from "../../utils/fileUtils.js";
import { randomUUID } from "node:crypto";

const glasses = readJSON("../glasses.json");

export class GlassModel {
  // MÉTODO PARA OBTENER TODOS LOS PRODUCTOS
  static async getAll({ filter }) {
    if (filter) {
      return glasses.filter(
        (glass) =>
          glass.brand?.toLowerCase().includes(filter.toLowerCase()) ||
          glass.genre?.toLowerCase().includes(filter.toLowerCase()) ||
          glass.category?.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return glasses;
  }

  // MÉTODO PARA OBTENER UN PRODUCTO POR ID
  static async getById({ id }) {
    return glasses.find((glass) => glass.id === id);
  }

  // MÉTODO PARA CREAR UN NUEVO PRODUCTO
  static async create({ input }) {
    const newGlass = {
      id: randomUUID(),
      ...input,
    };

    glasses.push(newGlass);
  }

  // MÉTODO PARA ACTUALIZAR UN PRODUCTO
  static async update({ id, input }) {
    const index = glasses.findIndex((glass) => glass.id === id);

    if (index === -1) {
      return false;
    }

    glasses[index] = {
      ...glasses[index],
      ...input,
    };

    return true;
  }

  // MÉTODO PARA ELIMINAR UN PRODUCTO
  static async delete({ id }) {
    const index = glasses.findIndex((glass) => glass.id === id);

    if (index === -1) {
      return false;
    }

    glasses.splice(index, 1);

    return true;
  }
}
