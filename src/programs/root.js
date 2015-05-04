var Base = require('./base');
var util = require('util');
var extend = require('extend');

function Root() {
  this.constructor.super_.apply(this, arguments);
}

util.inherits(Root, Base);

extend(Root.prototype, {
  type: 'root'
});

module.exports = Root;


