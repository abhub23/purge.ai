import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import chat from './modules/chat/chat.routes.js';
import checkvalidsession from './modules/check-valid-session/check-valid-session.routes.js'
import orderpay from './modules/order-pay/order-pay.routes.js'
import verifyPay from './modules/verify-payment/verify-payment.routes.js'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'
import { FRONTEND_URL } from "./lib/config.js";
// import { errorHandler } from './middlewares/errorHandler.js';

const port = 4000;
const app = express();
app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true
}));

app.use(helmet())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1); // Tells Express to trust x-forwarded-for in req header


app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ message: "server is healthy" });
});

app.get("/", (_, res) => {
  res.status(200).json({ message: "server is running" });
});


app.use('/api/chat', chat)
app.use('/api/checkvalidsession', checkvalidsession)
app.use('/api/orderpay', orderpay)
app.use('/api/verifypayment', verifyPay)

// app.use(errorHandler);

if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Local server running on ${port}`);
  });
}

export default app;