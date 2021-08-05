const { default: axios } = require("axios");
const { GOOGLE_TOKEN } = require("../config");

const googleSearch = async (query) => {
  let responses = [];

  try {
    const res = await axios.get(
      `https://serpapi.com/search.json?engine=google&q=${query}&google_domain=google.com&gl=us&hl=en&api_key=${GOOGLE_TOKEN}`
    );

    const formattedResponse = res.data["organic_results"].map((item) => ({
      title: item.title,
      link: item.link,
    }));

    if (formattedResponse && formattedResponse instanceof Array) {
      responses = formattedResponse;
    }
  } catch (err) {
    responses = [];
  }

  return responses;
};

module.exports = googleSearch;
