var CommandDisplay = function(cmd, term) {
  var that = this;

  this.cmd = cmd;
  this.term = term;
  this.div = null;
  this.resp = null;

  if(this.renderers.hasOwnProperty(cmd)) {
    this.renderFunc = this.renderers[cmd];
  } else {
    this.renderFunc = this.renderers['default'];
  }

  //create a visible space for the command, and capture the div
  term.echo('', { finalize: function(div) { that.div = div }, raw: true });

};

CommandDisplay.prototype.updateResponse = function(response) {
  this.resp = response;
};

CommandDisplay.prototype.render = function() {
  this.div.html(this.renderFunc.apply(this, [this.resp]));
};

CommandDisplay.prototype.stopAnims = function() {

};

CommandDisplay.prototype.renderers = {
  'default': function(response) {
    return 'Unknown command';
  },

  'help': function(response) {

  }
};

CommandDisplay.prototype.anims = [];

CommandDisplay.prototype.anims['netscan_wavy'] = new Animator(200, true, [
  '_,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,_',
  '\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,_,.-\'',
  '.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,_,.-\'~\'-.'
]);
