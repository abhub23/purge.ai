import { z } from "zod";

export const OrderSchema = z.object({
  amount: z.number('not a number').positive('amount must be a positive number')
});
