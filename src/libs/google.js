//importing axios for API call and google token to be used with the external API

const { default: axios } = require("axios");
const { GOOGLE_TOKEN } = require("../config");

const googleSearch = async (query) => {
  let responses = []; //this array stores the response

  
  //API call
  try {
    const res = await axios.get(
      `https://serpapi.com/search.json?engine=google&q=${query}&google_domain=google.com&gl=us&hl=en&api_key=${GOOGLE_TOKEN}`
    );

    //mapping the response from the API to an object having title and link of the response
    const formattedResponse = res.data["organic_results"].map((item) => ({
      title: item.title,
      link: item.link,
    }));

    //copying the response to the responses array of object
    if (formattedResponse && formattedResponse instanceof Array) {
      responses = formattedResponse;
    }
  } catch (err) {
    responses = [];
  }

  return responses;
};

//exporting the module
module.exports = googleSearch;
