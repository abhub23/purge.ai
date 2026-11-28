import express from "express";

const handler = express();
handler.use((req, res, next) => {
  import("./server/app.js")
    .then(({ default: app }) => app(req, res, next))
    .catch(next);
});

export default handler;
