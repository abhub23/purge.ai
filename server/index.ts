import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import chatRouter from './routes/chat';
import checkvalidsession from './routes/checkvalidsession'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'
import { FRONTEND_URL } from "./lib/config";

const Port = 4000;
const app = express();
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(helmet())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.all('/api/auth/*splat', toNodeHandler(auth))
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Server is alive" });
});


app.use('/api/chat', chatRouter)
app.use('/api/checkvalidsession', checkvalidsession)

if (process.env.VERCEL !== "1") {
  app.listen(Port, () => {
    console.log(`Local Server Running on ${Port}`);
  });
}

export default app;
