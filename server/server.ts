import app from './app.js';

const port = 4000;

if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Local server running on ${port}`);
  });
}

export default app;
