const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');

function handleErrors() {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
    title : 'Compile Error',
    message : '<%= error.message %>'
  }).apply(this, args);
  //console.log('Compile error: ', args);
  this.emit('end'); //keeps gulp from hanging on this task
}

function buildScript(file, watch) {
  const props = {
    entries : ['./client/react/' + file],
    debug : true,
    transform : babelify.configure({
                presets: ["react", "es2015"]
                })
  };

  //watchify if watch set to true. otherwise browserify once
  const bundler = browserify(props);

  function rebundle(){
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./client/build/'));
  }

  bundler.on('update', function() {
    const updateStart = Date.now();
    rebundle();
    console.log('Updated!', (Date.now() - updateStart) + 'ms');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// run once
gulp.task('scripts', function() {
  return buildScript('main.jsx', false);
});

//run nodemon
gulp.task('start', function() {

});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts', 'start'], function() {
  return buildScript('main.jsx', true);
});
