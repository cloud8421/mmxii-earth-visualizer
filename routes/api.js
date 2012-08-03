/*
 * GET api
 */

sample_data = require('../sample/sample_data.js');

module.exports = function(req, res){
  res.send(sample_data);
};
