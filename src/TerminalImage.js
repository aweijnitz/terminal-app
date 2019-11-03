const Node = require('blessed').node;
const Box = require('blessed').box;

const imageToAscii = require("image-to-ascii");
const asciiOptions = require('./AsciiImageOptions');

function TerminalImage(options) {
  const self = this;
  
  if (!(this instanceof Node)) {
    return new TerminalImage(options);
  }
  
  options = options || {};
  
  Box.call(this, options);
  
  if (this.options.url) {
    this.setImage(this.options.url);
  }
  
  this.parent = options.parent || null;
  
  this.screen.on('prerender', function () {
    const lpos = self.lpos;
    if (!lpos) return;
    // prevent image from blending with itself if there are alpha channels
    self.screen.clearRegion(lpos.xi, lpos.xl, lpos.yi, lpos.yl);
  });
  
  this.on('destroy', function () {
    self.clearImage();
  });
}

TerminalImage.prototype.__proto__ = Box.prototype;

TerminalImage.prototype.type = 'TerminalImage';

TerminalImage.prototype.setImage = function (url) {
  this.url = typeof url === 'string' ? url : null;
  
  let width = 100;
  let height = 50; //this.height;
  this.screen.log(`Image width: ${width} height: ${height}`, this.parent);

  try {
    this.setContent('');
    
    imageToAscii(url, asciiOptions(width, height), (err, converted) => {
      if (err)
        throw err;
      this.asciiImage = converted;
      this.width = width;
      this.height = height;
      this.screen.render();
    });
    
  } catch (e) {
    this.setContent('Image Error: ' + e.message);
    this.img = null;
    this.asciiImage = null;
  }
};


TerminalImage.prototype.clearImage = function () {
  this.setContent('');
  this.url = null;
  this.asciiImage = null;
};

TerminalImage.prototype.render = function () {
  this.clearPos(true);
  if (this.url && this.asciiImage)
    this.setContent(this.asciiImage, true);
  else
    this.setContent('IMAGE LOADING...');
  
  return this._render();
};

module.exports = TerminalImage;