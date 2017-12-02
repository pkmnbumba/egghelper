//'use strict';
var snoowrap = require('snoowrap');

// NOTE: The following examples illustrate how to use snoowrap. However, hardcoding
// credentials directly into your source code is generally a bad idea in practice (especially
// if you're also making your source code public). Instead, it's better to either (a) use a separate
// config file that isn't committed into version control, or (b) use environment variables.

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
const r = new snoowrap({
  userAgent: 'SVHelper/0.1 by robdy',
  clientId: 'XLF4M3RqK0ChjQ',
  clientSecret: 'wR4CA8KHEme4UIFUvusPgLu7zZ8',
  refreshToken: '36155828860-zVv-moHBO7ZMqMW9JmhqqJYyAmA'
});

module.exports = {
  get: function(){
    // fancy code that sends an email
	console.log("Test");
	Number.prototype.convertToTSV = function() {
      var s = String(this);
      while (s.length < (4)) {s = "0" + s;}
      return s;
    }
	
	
for (var i = 0; i < 5; i++) { // change to i < 10000
	var iTSV = i.convertToTSV();
	
	var TSVquery = 'title:' + i + ' and flair%3A(TSV+(Gen+7))';
	
	r.search({
	  query: TSVquery,
	  subreddit: 'SVExchange',
	  sort: 'new',
	  restrictSr: true
	}).then(console.log)
}
  }
}