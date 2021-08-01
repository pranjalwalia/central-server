require("dotenv").config();

const port = process.env.PORT || "5000";
const YOUTUBE_TOKEN = process.env.YOUTUBE_TOKEN;

module.exports = { port, YOUTUBE_TOKEN };
