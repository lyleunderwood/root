CommandDisplay.prototype.renderers['portscan'] = function(resp) {

  var disp = 'ANALYZING PORTS...';

  if(!!resp) {
      if(resp.status === 'success') {
        disp += '<br/>PORT READOUT';
        disp += '<br/>------------';

        var i = resp.response.ports.length;

        while(i--) {
          disp += '<br/> :' + resp.response.ports[i].number;
        }
      } 
    }

  return disp;
};