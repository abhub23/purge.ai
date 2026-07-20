import type { Request, Response } from 'express';
import { OrderSchema } from './order-pay.schema.js';
import { createOrder } from './order-pay.service.js';

export const handleOrderPay = async (req: Request, res: Response) => {
  const { success, data, error } = OrderSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      success: false,
      message: error.issues[0].message
    });
  }

  try {
    const order = await createOrder(data.price);
    return res.status(200).json({ order, success: true });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'error in creating order'
    });
  }
};
