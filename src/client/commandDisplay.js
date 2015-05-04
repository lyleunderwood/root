var CommandDisplay = function(cmd, term) {
  var that = this;

  this.cmd = cmd;
  this.term = term;

  if(this.renderers.hasOwnProperty(cmd)) {
    this.renderFunc = this.renderers[cmd];
  } else {
    this.renderFunc = this.renderers['default'];
  }

  //create a visible space for the command, and capture the div
  term.echo('', { finalize: function(div) { that.div = div }, raw: true });

};

CommandDisplay.prototype.render = function(resp) {

  this.renderFunc.apply(this, [resp]);
};

CommandDisplay.prototype.renderers = {
  'default': function(response) {
    this.div.html('Unknown command');
  },

  'netscan': function(response) {
    var disp = '_,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,_<br/>' +
               '   welcome to   n e t s c a n   v0.8.1<br/>' +
               '   please report bugs on the forum!<br/>' +
               '   and remember to always use responsibly (ゝω･)ﾉ<br/>' +
               '_,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,__,.-\'~\'-.,_';

    if(!!response) {

      if(response.status === 'running') {
        disp += '<br/>Scanning for open nets... (҂⌣̀_⌣́)';
      }

      if(response.status === 'success') {
        disp += '<br/>Open net found! Connecting... (･᷄ὢ･᷅)';
      } else if(response.status === 'failure') {
        disp += '<br/>No open nets anywhere! Failure! (´；ω；`)';
      }
    }

    this.div.html(disp);
  },

  'trace': function(response) {
    var disp = 'след программа, которая будет отвечать взаимностью, оставшиеся на инспекционной порт подпись данных порт. пусть мир гореть.';
    this.div.html(disp);
  },

  'help': function(response) {

  }
};