const axios = require("axios");

const getTopAnswer = async (searchKey) => {
  var queryLink =
    "https://api.stackexchange.com/2.3/search/advanced?pagesize=5&order=desc&sort=votes&site=stackoverflow&q=" +
    queryBuilder(searchKey);

  try {
    const { data } = await axios.get(queryLink);
    const response = data?.items;
    const filterResponse = response.map((res) => ({
      title: res.title,
      link: res.link,
    }));
    return filterResponse ? filterResponse : [];
  } catch (err) {
    console.log(err.message);
    return [];
  }
};

function queryBuilder(searchKey) {
  return searchKey.replace(/ /g, "+");
}

module.exports = getTopAnswer;
