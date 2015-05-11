CommandDisplay.prototype.renderers['netscan'] = function(response) {
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
};