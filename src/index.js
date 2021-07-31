const express = require("express");
const morgan = require("morgan");
const { port } = require("./config");

const app = express();
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "running..." });
});

app.listen(port, () =>
  console.log(
    `[server:${new Date().toISOString()}] 🚀 listening on port: ${port}`
  )
);
