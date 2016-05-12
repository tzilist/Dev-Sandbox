'use strict';

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs-extra');
const exec = require('child_process').exec;
let child;


app.get('/sandbox', function(req, res, next) {
  console.log(req.query.mod)
  if(req.query.mod === undefined) {
    return res.redirect('/');
  }
  fs.copy(path.join(__dirname, '../client/template.html'), path.join(__dirname, '../client/rendered.html'), function(err) {
      child = exec(`bower install ${req.query.mod.join(' ')} --save`, function(error, stdout, stderr) {
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
          res.status(200).sendFile(path.join(__dirname + '/../client/rendered.html'), options, function() {
            console.log('sent')
            fs.remove(path.join(__dirname, '../client/rendered.html'), function(err) {
              child = exec(`bower uninstall ${req.query.mod.join(' ')} --save`, function(error, stdout, stderr) {

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
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(express.static(path.join(__dirname, '../client')));




app.listen(process.env.PORT || 8080 || 8081 || 3000);

module.exports = app;
