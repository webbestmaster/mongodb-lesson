var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/db-test-1';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {

	assert.equal(null, err);

	console.log("Connected correctly to server");

	var col = db.collection('createIndexExample1');

	col.insert(
		[
			{a: 1, b: 1},
			{a: 2, b: 2},
			{a: 3, b: 3},
			{a: 4, b: 4}
		],
		{w: 1},
		function (err, result) {

			assert.equal(null, err);

			col.find({a:1}).toArray(function (err, docs) {

				console.log(docs);

			});

		});

	// db.close();

});