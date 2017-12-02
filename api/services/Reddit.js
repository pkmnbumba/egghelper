/*var request = require("request-promise"),
  moment = require('moment'),
  NodeCache = require('node-cache'),
  _ = require('lodash'),
  left = 600,
  resetTime = moment().add(600, "seconds");

var cache = new NodeCache({stdTTL: 3480}); // Cached tokens expire after 58 minutes, leave a bit of breathing room in case stuff is slow

var YAML = require('yamljs');

exports.refreshToken = async function(refreshToken) {
  let token = await cache.get(refreshToken);
  if (token) {
    return token;
  }
  var data = "grant_type=refresh_token&refresh_token=" + refreshToken;
  var auth = "Basic " + new Buffer(sails.config.reddit.clientID + ":" + sails.config.reddit.clientIDSecret).toString("base64");
  var body = await request.post({
    url: 'https://www.reddit.com/api/v1/access_token',
    body: data,
    json: true,
    headers: {
      "Authorization": auth,
      "User-Agent": sails.config.reddit.userAgent,
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": data.length
    }
  }).catch(function (error) {
    throw {statusCode: 502, error: 'Error retrieving token; Reddit responded with status code ' + error.statusCode};
  });
  if (body && body.access_token) {
    cache.set(refreshToken, body.access_token);
    return body.access_token;
  } else {
    throw "Error retrieving token";
  }
};

var makeRequest = async function (refreshToken, requestType, url, data, rateLimitRemainingThreshold, silenceErrors) {
  if (left < rateLimitRemainingThreshold && moment().isBefore(resetTime)) {
    throw {statusCode: 504, error: "Rate limited"};
  }
  // Prevent Reddit from sanitizing '> < &' to '&gt; &lt; &amp;' in the response
  url += (url.indexOf('?') === -1 ? '?' : '&') + 'raw_json=1';
  var headers = {"User-Agent": sails.config.reddit.userAgent};
  if (url.indexOf("oauth.reddit.com") !== -1) {
    headers.Authorization = "bearer " + await exports.refreshToken(refreshToken);
  }
  var options = {
    url: url,
    headers: headers,
    resolveWithFullResponse: true,
    method: requestType,
    formData: data
  };
  let response = await request(options).catch(function (error) {
    if (!silenceErrors) {
      sails.log.error('Reddit error: ' + requestType + ' request sent to ' + url + ' returned ' + error.statusCode);
      sails.log.error('Form data sent: ' + JSON.stringify(data));
    }
    throw {statusCode: error.statusCode, error: '(Reddit response)'};
  });
  updateRateLimits(response);
  var bodyJson;
  try {
    bodyJson = JSON.parse(response.body);
  } catch (error) {
    sails.log.error("Error with parsing: " + response.body);
    throw {error: "Error with parsing: " + response.body};
  }
  return bodyJson;
};

var getEntireListing = async function (refreshToken, endpoint, query, rateThreshold, after, before) {
  var url = endpoint + query + (query ? '&' : '?') + 'count=102&limit=100' + (after ? '&after=' + after : '') + (before ? '&before=' + before : '');
  var batch = await makeRequest(refreshToken, 'GET', url, undefined, rateThreshold, after, before);
  var results = batch.data.children;
  after = before ? undefined : batch.data.after;
  before = before ? batch.data.before : undefined;
  if (!after && !before) {
    return results;
  }
  return _.union(results, await getEntireListing(refreshToken, endpoint, query, rateThreshold, after, before));
};

exports.searchTSVThreads = function (refreshToken, username) {
  var actual_sub = sails.config.debug.reddit ? sails.config.debug.subreddit : 'SVExchange';
  var query = "(and (or flair_css_class:'banned' flair_css_class:'sv*') author:'" + username + "')";
  return exports.search(refreshToken, actual_sub, query, true, 'new', 'all', 'cloudsearch');
};

exports.search = function (refreshToken, subreddit, query, restrict_sr, sort, time, syntax) {
  var querystring = '?q=' + encodeURIComponent(query) + (restrict_sr  ? '&restrict_sr=on' : '') +
    (sort ? '&sort=' + sort : '') + (time ? '&t=' + time : '') + '&syntax=' + (syntax ? syntax : 'cloudsearch');
	console.log(querystring);
  var endpoint = 'https://oauth.reddit.com/r/' + subreddit + '/search';
  return getEntireListing(refreshToken, endpoint, querystring, 10);
};

var updateRateLimits = function (res) {
  if (res && res.headers && res.headers['x-ratelimit-remaining'] && res.headers['x-ratelimit-reset']) {
    left = res.headers['x-ratelimit-remaining'];
    resetTime = moment().add(res.headers['x-ratelimit-reset'], "seconds");
  }
};

*/
