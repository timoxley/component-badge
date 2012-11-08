var Canvas = require('canvas')
var Image = Canvas.Image
var fs = require('fs')
var logo = fs.readFileSync(__dirname + '/../resources/logo_with_text.png');
var img = new Image;
img.src = logo;


module.exports = function(text, fn) {
  var canvas = new Canvas(160, 40)
  var ctx = canvas.getContext('2d');
  ctx.patternQuality = 'best'
  ctx.drawImage(img, -7, -15, img.width, img.height);
  ctx.font = '9px Arial';
  ctx.textAlign = 'right'
  ctx.fillStyle = '#555'
  ctx.fillText(text, 145, 36);
  return canvas;
}
