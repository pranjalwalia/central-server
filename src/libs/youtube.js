const { google } = require("googleapis");
const { YOUTUBE_TOKEN } = require("../config");
const url = "https://youtube.com/watch?v=";

const getResults = async (searchKey) => {
  try {
    const res = await google.youtube("v3").search.list({
      key: YOUTUBE_TOKEN,
      part: "snippet",
      q: `${searchKey}`,
    });

    const data = res?.data?.items?.map((item) => ({
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      url: `${url}${item.id.videoId}`,
    }));

    return data ? data : [];
  } catch (err) {
    console.log(err.message);
    return [];
  }

  function queryBuilder(searchKey) {
    return searchKey.replace(/ /g, "+");
  }
};

module.exports = getResults;
