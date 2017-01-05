var express = require('express');
var app = express();
var request = require('request');
var async = require('async');

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '1Cl1YO6I2BnOpNJqma1H3N99R',
  consumer_secret: 'mc1urvHpSmN4fBOc1a86TDKRZCOUlTRmPH6abDWx11VSJMmrGp',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAJ1gygAAAAAAQ3YbD65%2FI4n3jwhnzkubEqO12Lo%3Dh6Pgp0LHSyhEbvVEhnTEonz0lE18SfBFA429zduumxOhnURsKV'
});

app.use(express.static('assets'));

app.get('/search', function(req, res) {
	topic = req.query.topic;
	if (topic == undefined) {
		res.send("Topic requried");
		return;
	}
	topic_id = parseInt(topic);
	text = req.query.text;

	request1 = function() {
		return function(callback) {
			if (text != undefined) {
				request_url = "http://localhost:8000/faqs.php?topic=" + topic_id + "&q=" + text;
			} else {
				request_url = "http://localhost:8000/faqs.php?topic=" + topic_id;
			}
			request(request_url, function(err, response, body) {
				if(err) { console.log(err); callback(true); return; }
				if (response.statusCode == 200) {
					callback(false, JSON.parse(body));
				}
			});
		};
	}();

	request2 = function() {
		return function(callback) {
			request("http://localhost:8080/twitter?text=" + text, function(err, response, body) {
				if(err) { console.log(err); callback(true); return; }
				if (response.statusCode == 200) {
					callback(false, JSON.parse(body));
				}
			});
		}
	}();

	async_requests = [];
	async_requests.push(request1);
	if (text != undefined) {
		async_requests.push(request2);
	}

	async_end = function(err, results) {
		if(err) { console.log(err); res.send(500,"Server Error"); return; }
		wrapper = {}
		wrapper.faqs = results[0].faqs;	
		wrapper.tweets = results[1];
		res.send(wrapper);
	};

	async.parallel(async_requests, async_end);
});

app.get('/twitter', function(req, res) {
	if (req.query.text == undefined) {
		res.send("Text requried");
		return;
	}
	text = decodeURI(req.query.text);

	var params = {q: text, count: 20, result_type: "popular"};
	client.get('search/tweets', params)
	.then(function (data) {
		request_functions = [];
		for (key in data.statuses) {
			tweet = data.statuses[key];
			text = encodeURI(tweet.text);
			id = tweet.id;
			current_request_url = 'http://localhost:8080/sentiment?id=' + id + "&text=" + text;
			current_request = function(inner_url) {
				return function(callback) {
				  	request(inner_url, function(err, response, body) {
						if(err) { console.log(err); callback(true); return; }
						if (response.statusCode == 200) {
							current_id = parseInt(response.request.path.split("=")[1].slice(0, -3));
							current_text = decodeURI(response.request.path.split("=")[2]);
							sentiment = JSON.parse(body).sentiment;
							callback(false, {text: current_text, id: current_id, sentiment: sentiment});
						}
			  		});
				};
			}(current_request_url);
			request_functions.push(current_request);
		}

		async.parallel(request_functions,
		  function(err, results) {
			if(err) { console.log(err); res.send(500,"Server Error"); return; }
			results.sort(function(a,b) {
			  if (a.sentiment < b.sentiment)
			    return -1;
			  if (a.sentiment > b.sentiment)
			    return 1;
			  return 0;
			});
			wrapper = {}
			wrapper.positive = results.slice(-3);	
			wrapper.negative = results.slice(0, 3);
			res.send(wrapper);
		  }
		);
	})
	.catch(function (error) {
		console.log(error);
		throw error;
	});
});

/* SCALES THE SCORES TO THE RANGE -2 TO 2 */
function mapToRange(sentiment) {
	if (Math.abs(sentiment) == 5 || Math.abs(sentiment) == 4) {
		return 2 * Math.sign(sentiment);
	} else if (Math.abs(sentiment) == 3 || Math.abs(sentiment) == 2) {
		return 1 * Math.sign(sentiment);
	} else {
		return sentiment;
	}
}

/* PARSES THE WORDS AND THE VALUES FROM THE FILE */
sentiment_dict = {};
fs = require('fs')
fs.readFile('sentiment/AFINN/AFINN-111.txt', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	pairs = data.split("\n");
	for (index in pairs) {
		values = pairs[index].split("\t");
		word = values[0];
		sentiment = values[1];
		sentiment_dict[word] = mapToRange(parseInt(sentiment));
	}
});

app.get('/sentiment', function(req, res) {
	text = decodeURI(req.query.text);
	words = text.split(" ");
	total_sentiment = 0;
	for (index in words) {
		word = words[index].toLowerCase();
		if (sentiment_dict[word] != undefined && word != "") {
			total_sentiment += sentiment_dict[word];
		}
	}
	wrapper = {}
	wrapper.sentiment = total_sentiment;
	res.send(JSON.stringify(wrapper));
});

app.listen(8080, "127.0.0.1");
console.log('Listening on port 8080...');
