import razorpayInstance from '../../lib/razorpay.js';

export async function createOrder(price: number) {
  const options = {
    amount: price * 86 * 100,
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`
  };

  return razorpayInstance.orders.create(options);
}
