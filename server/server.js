var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs-extra');
var exec = require('child_process').exec, child;



app.get('/sandbox', function(req, res, next) {
  fs.copy(path.join(__dirname, './../client/template.html'), path.join(__dirname, './../client/rendered.html'), function(err) {
      child = exec('bower install async --save', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
          console.log('exec error: ' + error);
        }

        child = exec('grunt wiredep', function(error, stdout, stderr) {

          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
          var options = {
            headers: {
              'Content-Type': 'text/html',
              'charset': 'UTF-8'
            }
          };
          res.status(200).sendFile(path.join(__dirname + './../client/rendered.html'), options, function() {
            fs.remove(path.join(__dirname, './../client/rendered.html'), function(err) {
              child = exec('bower uninstall jquery --save', function(error, stdout, stderr) {

                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                  console.log('exec error: ' + error);
                }
              });
            });


          });
        });
      });
    });



});


app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, './../client/index.html'));
});

app.use(express.static(path.join(__dirname, '../client')));




app.listen(3000);

module.exports = app;
