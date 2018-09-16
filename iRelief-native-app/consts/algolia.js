var algoliasearch = require("algoliasearch/reactnative");

var client = algoliasearch("T1BK2HQ8R1", "004ea728780cea1b69aab60e73b5bc8d");
var index = client.initIndex("aneeshsaripalli");
export default client;
