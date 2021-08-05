const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { port } = require("./config");

const getStackOverflowAnswer = require("./libs/stackoverflow");
const getYoutubeAnswer = require("./libs/youtube");
const getGoogleResults = require("./libs/google");

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ status: "running..." });
});

app.get("/", async (req, res) => {
  const { query } = req.query;

  try {
    const stackoverflow = await getStackOverflowAnswer(query);
    const youtube = await getYoutubeAnswer(query);
    const google = await getGoogleResults(query);
    res.json({
      stackoverflow: stackoverflow,
      youtube: youtube,
      google: google,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({ stackoverflow: [], youtube: [], google: [] });
  }
});

app.get("/stackoverflow", async (req, res) => {
  const { query } = req.query;
  try {
    const stackoverflow = await getStackOverflowAnswer(query);
    res.json({
      stackoverflow: stackoverflow,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({ stackoverflow: [] });
  }
});

app.get("/youtube", async (req, res) => {
  const { query } = req.query;
  try {
    const youtube = await getYoutubeAnswer(query);
    res.json({
      youtube: youtube,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({ youtube: [] });
  }
});

app.get("/google", async (req, res) => {
  const { query } = req.query;
  try {
    const google = await getGoogleResults(query);
    res.json({
      google: google,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({ google: [] });
  }
});

app.listen(port, () =>
  console.log(
    `[server ${new Date().toISOString()}]: 🚀 listening on port: ${port}`
  )
);
