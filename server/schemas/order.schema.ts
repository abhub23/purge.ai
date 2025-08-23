import { z } from "zod";

export const OrderSchema = z.object({
  plan_id: z.literal('pro', { message: "Plan must be 'pro' only" }),
  price: z.number("price must be a number").refine(val => [6,8].includes(val), {message: 'The price is either $6 or $8'} )
});
