// get number of components every N minutes
var ms = require('ms')
var fs = require('fs')

var numComponents = 0
var badge = require('./badge')
var badgeData = ''

// generate badge
var Component = require('component')
function getNumberOfComponents(fn) {
  Component.search('', function(err, components) {
    fn(err, components.length)
  })
}
setInterval(function() {
  getNumberOfComponents(function(err, result) {
    numComponents = result
    writeBadge(badge(numComponents + ' available'))
  })
}, ms('10m'))

function writeBadge(canvas) {
  canvas.toBuffer(function(err, buf){
    if (err) throw err;
    fs.writeFile(__dirname + '/../badges/component.png', buf);
  })
}


// serve badges off user/repo/component.png
var express = require('express')
var app = express()
app.use(express.static(__dirname + '/../badges', { maxAge: ms('10m') }))

app.get('/', function(req, res, next) {
  res.json({
    components: numComponents
  })
})

app.get('/:user/:repo/component.png', function(req, res, next) {
  res.redirect(302, '/component.png')
})

app.listen(process.env.PORT || 5050)
