const _ = require("lodash");

const getFilteredData = (data, props) => {
  return _.pick(data, props);
};

module.exports = {
  getFilteredData,
};
