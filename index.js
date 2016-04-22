'use strict';

var express = require('express');
var julia = require('node-julia');
var multer  = require('multer')
var parse = require('csv-parse/lib/sync');
var fs = require('fs'); 
var mustache = require('mustache');
var app = express();

// Handy functions
function getCSVCols(arr) {
  var firstRow = 1;
  if (isNaN(arr[1].x)) {
    firstRow = 2;
  }
  var x =[]; var y = [];
  for (var i = firstRow; i<arr.length;i++) {
    x.push(parseFloat(arr[i].x));
    y.push(parseFloat(arr[i].y));
  }
  return [x,y];
}

// Dealing with file uploads

//  For uploading to disk rather than to memory use this rather than the following
//  two lines.
/*var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    //console.log(file);
    callback(null, file.originalname + '-' + Date.now() + '.csv');
  }
});
var upload = multer({ storage : storage}).single('clusterData');
*/
var storage = multer.memoryStorage()
//var upload = multer({ storage: storage }).single('clusterData');

var server = require('http').createServer(app);


//Serve static files from here
app.use(express.static('public'));


//Global middlware stack goes here



//Routes go here

app.post('/results', multer({ storage: storage }).single('clusterData'), function(req,res){
  var csv = getCSVCols(parse(req.file.buffer.toString(), {columns: ["x", "y"]}));
  var x = csv[0];
  var y = csv[1];
  var K = parseInt(req.body.numClusters);
    
  var juliaClustering = julia.import('Clustering');
  var m = julia.exec('hcat', x,y);
  var m = julia.exec('transpose', m)
    
  //julia.exec('include', 'debug.jl')
  //console.log(julia.exec('printtype', m));
  var result = juliaClustering.kmeans(m, K);
  var c = juliaClustering.assignments(result);
  c = [].slice.call(c);
  var view = {
    x: JSON.stringify(x),
    y: JSON.stringify(y),
    c: JSON.stringify(c),
    K: K
  }
  var template = fs.readFileSync('.\\templates\\results.mustache', "utf8");
  res.send(mustache.render(template, view));
  
});




//Start the server 
var port = process.env.PORT || 8124;
server.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});