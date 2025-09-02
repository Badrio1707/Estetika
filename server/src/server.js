import express from "express";

import "dotenv/config";

const PORT = process.env.PORT || 5001;

const app = express();

app.get("/:nama", (req, res) => {
  const { nama } = req.params;
  res.send(`Hello, ${nama}!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
