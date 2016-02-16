var express = require('express');
var app = express();
var path = require('path');

app.get('/',function(){
  var exec = require('child_process').exec,
    child;
console.log('what')
 child = exec('npm install async',
 function (error, stdout, stderr) {
     console.log('stdout: ' + stdout);
     console.log('stderr: ' + stderr);
     if (error !== null) {
          console.log('exec error: ' + error);
     }
 });
})





app.listen(3000);

module.exports = app;
