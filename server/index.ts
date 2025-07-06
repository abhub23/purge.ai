import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from './routes/signin';
import chatRouter from './routes/chat';
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'

const Port = 4000;
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(helmet())

app.all('/api/auth/*splat', toNodeHandler(auth))
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Server is alive" });
});

app.use('/api', authRouter)

app.use('/api', chatRouter)

if (process.env.VERCEL !== "1") {
  app.listen(Port, () => {
    console.log(`Local Server Running on ${Port}`);
  });
}

export default app;
