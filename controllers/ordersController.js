import { OrderModel } from "../models/mysql/orderModel.js";

export class OrdersController {
  static async getAll(req, res) {
    try {
      const orders = await OrderModel.getAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const order = await OrderModel.getById({ id });
      res.status(200).json(order);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async getByUserId(req, res) {
    const { userId } = req.params;
    try {
      const orders = await OrderModel.getByUserId({ userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async create(req, res) {
    const { userId, products } = req.body;
    try {
      const order = await OrderModel.create({ userId, products });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      await OrderModel.delete({ id });
      res.json({ message: "Orden eliminada" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
