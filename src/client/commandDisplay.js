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

  'netscan': function(response) {
    var disp = this.anims['netscan_wavy'].getFrame() + '<br/>' +
               '   welcome to   n e t s c a n   v0.8.1<br/>' +
               '   please report bugs on the forum!<br/>' +
               '   and remember to always use responsibly (ゝω･)ﾉ<br/>' +
               this.anims['netscan_wavy'].getFrame();

    disp += '<br/>Scanning for open nets... (҂⌣̀_⌣́)';
    
    if(!!response) {
      if(response.status === 'success') {
        disp += '<br/>Open net found! Connecting... (･᷄ὢ･᷅)';
      } else if(response.status === 'failure') {
        disp += '<br/>No open nets anywhere! Failure! (´；ω；`)';
      }
    }

    return disp;
  },

  'trace': function(response) {
    var disp = 'след программа, которая будет отвечать взаимностью, оставшиеся на инспекционной порт подпись данных порт. пусть мир гореть.';
    return disp;
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

/*
command display will consist of an array of objects. each object will essentialls
be a line of action as the program runs. The command display will continually update
the full text of the div by going through each line and determining if it should
be rendered.

each line will execute in order.

perhaps the internal rendering logic should ne left up to each individual command.
there is only a reliable animaton scheme. but there also needs to be a reliable 
line-by-line scheme. the underlying logic needs to actively update only the most
current line, previous ones must stop animating. maybe into the terminal i feed
a series of animators. the logic of which one is fed in is determined by a super
structure that simply updates the most recent animator that it has come across. 

the problem is that the console remains active all the while and so a new command
may interrupt the sequence of a single program. for now, i can simply deactivate
the console until a success or failure state is reached.

the terminal itself can hold onto the most recently created div... then there are
commands to start a new command which will create a new div. the terminal will 
do the work of holding onto all the current output lines, and updating the most
recent one. once the order is given to start a new command, all the text is
consolidated into a static blob of text and filled into the div, and the render
queue is cleared. then a new div is inputted into the terminal, and all line render 
requests will go to that.
*/

/*
{
  states: 'start, running, success, failure',
  duration: 1000 // in miliseconds
  anim: new Animator() //each line will be an animator, with multiple possible frames
}
*/