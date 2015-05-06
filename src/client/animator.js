var Animator = function(delay, loop, frames) {
  var that = this;

  this.delay = delay || 250;
  this.loop = loop || true;

  if(!Array.isArray(frames)) {
    this.frames = [frames];
  } else {
    this.frames = frames;
  }

  if(frames.length === 0) {
    this.frames = ['Broken anim'];
  }

  this.currentFrame = frames[0];

  //delay of zero means it will be manually updated
  if(delay !== 0) {
    setTimeout(function() { that.updateFrame(); }, delay);
  }
};

Animator.prototype.getFrame = function() {
  return this.currentFrame;
};

Animator.prototype.updateFrame = function() {
  var that = this;

  //if this is the last frame
  if(this.frames.indexOf(this.currentFrame) === this.frames.length) {
    if(this.loop) {
      this.currentFrame = this.frames[0];
    }
  } else {
    this.currentFrame = this.frames[this.frames.indexOf(this.currentFrame) + 1];
  }

  //set up the next frame transition
  if(this.delay !== 0) {
    setTimeout(function() { that.updateFrame() }, this.delay);
  }
};