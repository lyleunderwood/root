var Command = require('./command');
var util = require('util');
var extend = require('extend');

function LongCommand() {
  // rate is the amount added to the progress every 500ms, regardless of updateInterval,
  // a rate of 1 will complete in 1 update, less will take longer
  Command.apply(this, arguments);

  this.updateInterval = 500;

  this.progress = 0.0;
  this.rate = 1.0;
  this.startTime = null;

  if (typeof COMMAND_UPDATE_INTERVAL != 'undefined') {
    this.updateInterval = COMMAND_UPDATE_INTERVAL;
  }
}

util.inherits(LongCommand, Command);

extend(LongCommand.prototype, {
  start: function() {
    var self = this;
    this.startTime = +new Date();
    this._interval = setInterval(function() {
      self.updateProgress();
    }, this.updateInterval);

    Command.prototype.start.apply(this, arguments);

    this.updateProgress();
  },

  updateProgress: function() {
    var msDiff = (+new Date()) - this.startTime;

    this.progress += (msDiff / 500) * this.rate;

    this.progress = Math.min(this.progress, 1);

    this.onProgress();

    if (this.progress >= 1) {
      this.onProgressDone();
    }
  },

  onProgress: function() {
    this.status('running', {
      progress: this.progress
    });
  },

  onProgressDone: function() {
    this._clearInterval();
  },

  _clearInterval: function() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  },

  finished: function() {
    this._clearInterval();
    Command.prototype.finished.apply(this, arguments);
  }
});

module.exports = LongCommand;
