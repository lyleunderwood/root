CommandDisplay.prototype.renderers['rend'] = function(resp) {
  var disp = 'REND: Port will be rent along the specified attack vector...<br/>';
             

  if(!!resp) {

    disp += 'Computing port velocities... ' + Math.round(resp.response.progress * 100) + '%<br/>';

    if(resp.status === 'success') {
      disp += 'REND: Port has been rent. Returned response:';
    } 
  }

  return disp;
};