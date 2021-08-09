//module imports

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { port } = require("./config");

//These imports are for the APIs that return the response once a query is sent
const getStackOverflowAnswer = require("./libs/stackoverflow");
const getYoutubeAnswer = require("./libs/youtube");
const getGoogleResults = require("./libs/google");

const app = express();
app.use(morgan("dev"));
app.use(cors());

//Checking server health before making a request to the APIs
app.get("/health", (req, res) => {
  res.json({ status: "running..." });
});


//This request returns a combined result from YouTube, Google, StackOverflow based on the search query
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

//Getting response from the StackOverflow API
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


//Getting response from the YouTube API
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


//Getting response from the Google API
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


//Sever configuration
app.listen(port, () =>
  console.log(
    `[server ${new Date().toISOString()}]: 🚀 listening on port: ${port}`
  )
);
