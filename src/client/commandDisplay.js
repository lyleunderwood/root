var CommandDisplay = function(cmd, term) {
  var that = this;

  this.cmd = cmd;
  this.term = term;
  this.renderFunc = this.renderers[cmd];

  //create a visible space for the command, and capture the div
  term.echo('', { finalize: function(div) { that.div = div }, raw: true });

};

CommandDisplay.prototype.render = function(resp) {
  this.renderFunc.apply(this, [resp]);
};

CommandDisplay.prototype.renderers = {
  'netscan': function(response) {
    var disp = '*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*<br/>' +
               '*   welcome to   n e t s c a n   v0.8.1<br/>' +
               '*   please report bugs on the forum!<br/>' +
               '*   and remember to always use responsibly (ゝω･)ﾉ<br/>' +
               '*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*';

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