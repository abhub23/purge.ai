import express from "express";
import app from "./server/app";

const handler = express();
handler.use(app);

export default handler;
