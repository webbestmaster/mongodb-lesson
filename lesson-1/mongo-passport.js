
/**
* Just a config for Passport
*
*/

function PassportConfig() {

	var passportCgf = this,
		defaultCfg = passportCgf.default;

	passportCgf.attr = {};

	for (var key in defaultCfg) {
		if (defaultCfg.hasOwnProperty(key)) {
			passportCgf.set(key, defaultCfg[key]);
		}
	}

}

PassportConfig.prototype.attr = {};

PassportConfig.prototype.default = {

	name: 'passport-db',
	protocol: 'mongodb',
	host: 'localhost',
	port: '27017'

};

PassportConfig.prototype.toJSON = function () {
	return JSON.parse(JSON.stringify(this.attr));
};

PassportConfig.prototype.set = function (key, value) {
	this.attr[key] = value;
	return this;
};

PassportConfig.prototype.get = function (key) {
	return this.attr[key];
};

module.exports = PassportConfig;


