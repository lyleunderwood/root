var crypto = require('crypto');
var md5 = crypto.createHash('md5');

module.exports = function() {

	var args = [].concat.apply([], arguments);
	var hashVar = args + '_' + +new Date(); + '_' + (Math.random() * 1000);

	md5.update(hashVar);

	return md5.digest('base64');

};
