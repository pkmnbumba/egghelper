/**
 * HelloworldController
 *
 * @description :: Server-side logic for managing helloworlds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 //var r = require('../services/Reddit.js');
 var rp = require('request-promise');
 var NodeCache = require('node-cache');
 var cache = new NodeCache({stdTTL: 3480}); // Cached tokens expire after 58 minutes, leave a bit of breathing room in case stuff is slow
 
module.exports = {
	


  /**
   * `HelloworldController.getHelloWorld()`
   */
  getHelloWorld: function (req, res) {
    console.log(sails.config.reddit.userAgent); // To see result on console
		   
		   Number.prototype.convertToTSV = function() {
      var s = String(this);
      while (s.length < (4)) {s = "0" + s;}
      return s;
    }
								   						   
	// Get access token from cache
	let accessToken = cache.get("accessToken");
	// Testing
	accessToken = 'XwwL9_0YwoXkpG8ev-JNUxbjQRY';
	if (accessToken) {
		console.log('Token found in cache: ' + accessToken);
	}
	else {											
  
	   
 
	var data = 'grant_type=refresh_token&refresh_token=36155828860-zVv-moHBO7ZMqMW9JmhqqJYyAmA';
	
	var formData = {
		grant_type:'refresh_token',
		refresh_token: sails.config.reddit.adminRefreshToken
	}
		
	var auth = 'Basic ' + new Buffer(sails.config.reddit.clientID + ':' + sails.config.reddit.clientIDSecret).toString('base64');	
	var options = {
	  url: 'https://www.reddit.com/api/v1/access_token',
	  headers: {
		'User-Agent': sails.config.reddit.userAgent,
		'Authorization': auth,
		'Content-Type': 'application/x-www-form-urlencoded',
  },
  formData: formData
  
};

rp.post(options, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  var refreshingResponse = JSON.parse(body); 
  
   if (refreshingResponse.access_token) {
	   accessToken = refreshingResponse.access_token
  cache.set("accessToken", accessToken);
  }
  else {
	throw "Error retrieving token";
  }
   
  var currentTime = Date.now();
  var expiryDate = currentTime + refreshingResponse.expires_in*1000;
  
  console.log('Upload successful!  Server responded with the following access token:', refreshingResponse.access_token);
  console.log('Expires at: ' + expiryDate);
});

	}
	
	for (var i = 2931; i < 2932; i++) { // change to i < 409?
	var iTSV = i.convertToTSV();
	
	//var TSVquery = 'title:' + iTSV + ' and flair:(TSV (Gen 7))';
	var TSVquery = "title:" + iTSV;
	
	var auth = 'bearer ' + accessToken;
	var subreddit = 'SVExchange';

	var options = {
	  url: 'https://oauth.reddit.com/r/SVExchange/search?q=' + TSVquery + ' and flair%3A(TSV+(Gen+7))&sort=new&show=all&type=link&restrict_sr=true&t=all&limit=100',
	  headers: {
		'User-Agent': sails.config.reddit.userAgent,
		'Authorization': auth,
		'Content-Type': 'application/x-www-form-urlencoded',
	}
	};
	
	rp.get(options, function optionalCallback(err, httpResponse, body) {
	  if (err) {
		return console.error('upload failed:', err);
	  }
  var TSVresponse = JSON.parse(body); 
  var children = TSVresponse.data.children;
  
  var object = children[0].data;
  
  delete object.selftext;
  delete object.selftext_html;
  
  console.log(object);
  
  console.log('TSV threads pulled successfully');
});
	
}
     return res.send("Hello World !<br>" + HTMLList); // To see result on browser


  
}};

