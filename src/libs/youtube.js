//importing the youtube token and the google API
//IMP NOTE: importing axios is not needed when working with "googleapis" as it has built in support of axios
const { google } = require("googleapis");
const { YOUTUBE_TOKEN } = require("../config");
const url = "https://youtube.com/watch?v=";//this will be used to append the video id at the end for the response


//API call
const getResults = async (searchKey) => {
  try {
    const res = await google.youtube("v3").search.list({
      key: YOUTUBE_TOKEN,
      part: "snippet",
      q: `${searchKey}`,
    });

    //using optional chaining to filter title, channel name, and video url from the response
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

  //replacing all occurrences of single space with `+` to build the query
  function queryBuilder(searchKey) {
    return searchKey.replace(/ /g, "+");
  }
};

module.exports = getResults;
