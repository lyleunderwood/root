var crypto = require('crypto');

module.exports = function() {
  var md5 = crypto.createHash('md5');
  var args = [].concat.apply([], arguments);
  var hashVar = args + '_' + (+new Date()) + '_' + (Math.random() * 1000);

  md5.update(hashVar);

  return md5.digest('base64');
};
