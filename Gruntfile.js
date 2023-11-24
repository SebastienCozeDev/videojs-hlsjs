/* global module, require */

(function() {
  'use strict';

  module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %>*/\n',
      clean: {
        files: ['dist']
      },
      connect: {
        main: {
          options: {
            port: 9000,
            protocol: 'http',
            hostname: '*'
          }
        }
      },
      concat: {
        options: {
          banner: '<%= banner %>',
          stripBanners: true
        },
        dist: {
          src: ['src/**/*.js'],
          dest: 'dist/<%= pkg.name %>.js'
        }
      },
      uglify: {
        options: {
          banner: '<%= banner %>',
          mangle: {
            reserved: ['Hlsjs']
          }
        },
        dist: {
          src: '<%= concat.dist.dest %>',
          dest: 'dist/<%= pkg.name %>.min.js'
        }
      },
      watch: {
        files: [
          './dist/videojs-hlsjs.js',
        ],
        tasks: ['build'],
        gruntfile: {
          files: '<%= jshint.gruntfile.src %>',
          tasks: ['jshint:gruntfile']
        },
        src: {
          files: '<%= jshint.src.src %>',
          tasks: ['jshint:src']
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['concat', /*'uglify'*/]);
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('default', ['clean', 'build']);
  };
})();