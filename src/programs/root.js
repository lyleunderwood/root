var Base = require('./base');
var util = require('util');

function Root() {
  this.constructor.apply(this, arguments);
}

util.inherits(Root, Base);

Root.prototype = {
  type: 'root',

  constructor: function() {
  }
};

module.exports = Root;


