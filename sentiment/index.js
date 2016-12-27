var express = require('express');
var app = express();
// app.get('/', function(req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.send('Hello Seattle\n');
// });

function mapToRange(sentiment) {
	if (Math.abs(sentiment) == 5 || Math.abs(sentiment) == 4) {
		return 2 * Math.sign(sentiment);
	} else if (Math.abs(sentiment) == 3 || Math.abs(sentiment) == 2) {
		return 1 * Math.sign(sentiment);
	} else {
		return sentiment;
	}
}

sentiment_dict = {};
fs = require('fs')
fs.readFile('AFINN/AFINN-111.txt', 'utf8', function (err,data) {
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
	res.setHeader('Content-Type', 'text/plain');
	text = decodeURI(req.query.text);
	words = text.split(" ");
	total_sentiment = 0;
	for (index in words) {
		word = words[index].toLowerCase();
		if (sentiment_dict[word] != undefined) {
			total_sentiment += sentiment_dict[word];
		}
	}
	wrapper = {}
	wrapper.sentiment = total_sentiment;
	res.send(JSON.stringify(wrapper));
});
app.listen(8080, "127.0.0.1");
console.log('Listening on port 8080...');
