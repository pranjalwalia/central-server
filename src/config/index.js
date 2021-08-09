//This file contains the access tokens of youtube and google api along with server configuration

require("dotenv").config();

const port = process.env.PORT || "5000";
const YOUTUBE_TOKEN = process.env.YOUTUBE_TOKEN;
const GOOGLE_TOKEN = process.env.GOOGLE_TOKEN;

module.exports = { port, YOUTUBE_TOKEN, GOOGLE_TOKEN };
