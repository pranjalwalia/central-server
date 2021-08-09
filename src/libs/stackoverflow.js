//importing axios for API call to the external API
const axios = require("axios");

//API call
const getTopAnswer = async (searchKey) => {
  var queryLink =
    "https://api.stackexchange.com/2.3/search/advanced?pagesize=5&order=desc&sort=votes&site=stackoverflow&q=" +
    queryBuilder(searchKey);

  try {
    const { data } = await axios.get(queryLink);
    const response = data?.items;
    const filterResponse = response.map((res) => ({    /*filtering title and link from the response and mapping it to the array of objects*/
      title: res.title,
      link: res.link,
    }));
    return filterResponse ? filterResponse : [];
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

//regular expression to replace all the single space character with the `+` character to build the query
function queryBuilder(searchKey) {
  return searchKey.replace(/ /g, "+");
}

module.exports = getTopAnswer;
