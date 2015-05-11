var Animator = function(delay, loop, frames) {
  var that = this;

  this.delay = delay || 250;
  this.loop = loop || true;
  this.play = true;

  if(!Array.isArray(frames)) {
    this.frames = [frames];
  } else {
    this.frames = frames;
  }

  if(frames.length === 0) {
    this.frames = ['Broken anim'];
  }

  this.currentFrame = 0;

  //delay of zero means it will be manually updated
  if(delay !== 0) {
    setTimeout(function() { that.updateFrame(); }, delay);
  }
};

Animator.prototype.getFrame = function() {
  return this.frames[this.currentFrame];
};

Animator.prototype.stop = function() {
  this.play = false;
};

Animator.prototype.play = function() {
  if(this.play !== true) {
    this.play = true;
    this.updateFrame();
  }
};

Animator.prototype.updateFrame = function() {
  var that = this;

  //if this is the last frame
  if(this.currentFrame === (this.frames.length - 1)) {
    if(this.loop) {
      this.currentFrame = 0;
    } else {
      this.stop();
    }
  } else {
    this.currentFrame++;
  }

  //set up the next frame transition
  if(this.delay !== 0 && this.play) {
    setTimeout(function() { that.updateFrame() }, this.delay);
  }
};