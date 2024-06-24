import { OrderProductModel } from "../models/mysql/orderProductsModel.js";

export class OrderProductsController {
  static async getProductsByOrderId(req, res) {
    try {
      const { orderId } = req.params;
      const products = await OrderProductModel.getProductsByOrderId({
        orderId,
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
