module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-coffee');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    coffee: {
      app: {
        src:  'client/src/**/*.coffee',
        dest: 'client/compiled'
      }
    },
    watch: {
      files: 'client/src/**/*.coffee',
      tasks: 'coffee concat min'
    },
    concat: {
      app: {
        src: ['<banner:meta.banner>', 'client/compiled/<%= pkg.name %>.js', 'client/compiled/*.js'],
        dest: 'public/javascripts/<%= pkg.name %>.js'
      },
      vendor: {
        src: [ 'vendor/app/jquery.min.js',
               'vendor/app/jstorage.js',
               'vendor/app/modernizr.foundation.js',
               'vendor/app/jquery.foundation.reveal.js',
               'vendor/app/shuffle.js',
               'vendor/app/moment.js',
               'vendor/app/mustache.js',
               'vendor/app/pubsub.js',
               'vendor/app/twitter_parse.js' ],
        dest: 'public/javascripts/vendor.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.vendor.dest>', '<config:concat.app.dest>'],
        dest: 'public/javascripts/<%= pkg.name %>.min.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'coffee concat min watch');

};
