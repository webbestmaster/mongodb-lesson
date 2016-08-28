var MongoClient = require('mongodb').MongoClient;

function Passport(cfgArg) {

	var passport = this,
		cfg = cfgArg.toJSON(),
		key;

	passport.attr = {};
	passport.db = null;

	for (key in cfg) {
		if (cfg.hasOwnProperty(key)) {
			passport.set(key, cfg[key]);
		}
	}

}

Passport.prototype.attr = {};
Passport.prototype.db = null;

Passport.prototype.set = function (key, value) {
	this.attr[key] = value;
	return this;
};

Passport.prototype.get = function (key) {
	return this.attr[key];
};

Passport.prototype.initialize = function () {

	var passport = this;

	return MongoClient.connect(
		passport.get('protocol') + '://' + passport.get('host') + ':' + passport.get('port') + '/' + passport.get('name')
	).then(function (db) {
		passport.db = db;
	}).catch(function (e) {
		console.log(e);
	});

};

Passport.prototype.signUp = function (login, password) {

	var passport = this,
		loginCollection = passport.db.collection('login');

	return passport.findLogin(login).then(function (result) {

		if (result.length) {
			throw 'user already exist';
		}

		return loginCollection.insertOne(
			{
				login: login,
				password: password
			},
			{w: 1}
		);

	});

};

Passport.prototype.findLogin = function (login) {

	return this
		.db
		.collection('login')
		.find({login: login})
		.toArray();

};

var passport = new Passport;

passport
	.initialize()
	.then(function () {
		return passport.cleanAllLogin();
	})
	.then(function () {
		return passport.signUp('user3sdafd6', 'pass');
	})
	.then(function () {
		return passport.findLogin('user3sdafd6');
	})
	.then(function (users) {
		return console.log(users);
	})
	.catch(function (e) {
		console.log('------');
		console.log(e);

		passport.db.collection('login').find({}).then(function (result) {
			console.log(result);
		});

	});


Passport.prototype.cleanAllLogin = function () {

	// return this.db.dropDatabase();


	// this.db.getCollectionNames().forEach(function(c) { if (c.indexOf("system.") == -1) db[c].remove(); });


	// return this.db.dropCollection('login');


};





