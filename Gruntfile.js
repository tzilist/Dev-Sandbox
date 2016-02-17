module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    wiredep: {
      task: {
        src: ['./client/rendered.html']
      }
    },
    watch: {
      files: ['client/lib/*'],
      tasks: ['wiredep']
    }
  });


  grunt.registerTask('changes', ['watch']);
  grunt.registerTask('default', ['wiredep']);
};
