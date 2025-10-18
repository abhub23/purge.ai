import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import chat from './routes/chat';
import checkvalidsession from './routes/checkvalidsession'
import orderpay from './routes/orderpay'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'
import { FRONTEND_URL } from "./lib/config";
import verifypayment from './routes/verifypayment'

const Port = 4000;
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
  res.status(200).json({ message: "Server is healthy" });
});


app.use('/api/chat', chat)
app.use('/api/checkvalidsession', checkvalidsession)
app.use('/api/orderpay', orderpay)
app.use('/api/verifypayment', verifypayment)

if (process.env.VERCEL !== "1") {
  app.listen(Port, () => {
    console.log(`Local Server Running on ${Port}`);
  });
}

export default app;
