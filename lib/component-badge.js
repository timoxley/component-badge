// get number of components every N minutes
var ms = require('ms')
var fs = require('fs')

var numComponents = 0
var badge = require('./badge')
var badgeData = ''

//function shouldUpdate() {

//}
//if (new Date() - lastChecked > 60000 * CHECK_FREQUENCY) {}
var Component = require('component')
function getNumberOfComponents(fn) {
  Component.search('', function(err, components) {
    fn(err, components.length)
  })
}
setInterval(function() {
  getNumberOfComponents(function(err, result) {
    numComponents = result
    console.log('num componnts', numComponents)
    writeBadge(badge(numComponents + ' available'))
  })
}, ms('1s'))

function writeBadge(canvas) {
  canvas.toBuffer(function(err, buf){
    if (err) throw err;
    fs.writeFile(__dirname + '/../badges/component.png', buf);
  })

}

// generate badge

// serve badges off user/repo/component.png
var express = require('express')
var app = express()
app.use(express.static(__dirname + '/../badges'))


app.get('/:user/:repo/component.png', function(req, res, next) {
  res.redirect(302, '/component.png')
})

app.listen(process.env.PORT || 5050)
