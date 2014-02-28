module.exports = function(grunt) {
  var pkg = require("./package.json");
  global.jasmineVersion = pkg.version;

  grunt.initConfig({
    pkg: pkg,
    jshint: {all: ['src/**/*.js']},
    copy: {
      lib: {
        files: [
          {expand: true, cwd: 'src', src: ['**/*.js'], dest: 'lib/'}
        ]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('specs', function() {
    var exec = require("shelljs").exec;
    var done = this.async();

    exec('./bin/jasmine', function(code) {
      var error = code > 0 ? new Error("Specs have failed.") : null;
      done(error);
    });
  });

  grunt.registerTask('default', ['jshint:all', 'specs']);

  grunt.registerTask('buildDistribution',
    'Builds and lints the files needed for jasmine-node',
    ['jshint:all', 'copy:lib']
  );

};
