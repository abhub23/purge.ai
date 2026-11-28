import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'
import { FRONTEND_URL } from "./lib/config";
import chat from './modules/chat/chat.routes';
import health from './modules/health/health.routes'
import checkValidSession from './modules/check-valid-session/check-valid-session.routes'
import orderPay from './modules/order-pay/order-pay.routes'
import verifyPay from './modules/verify-payment/verify-payment.routes'

const app = express();

app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true
}));

app.use(helmet())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());

app.use('/health', health)
app.use('/api/chat', chat)
app.use('/api/checkvalidsession', checkValidSession)
app.use('/api/orderpay', orderPay)
app.use('/api/verifypayment', verifyPay)

export default app;
