import express from "express";
import cors from "cors";
const Port = 4000;
const app = express();
app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Server is alive" });
});

if (process.env.VERCEL !== "1") {
  app.listen(Port, () => {
    console.log(`Local Server Running on ${Port}`);
  });
}

export default app;
