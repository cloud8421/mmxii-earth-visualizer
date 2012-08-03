module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-shell');

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
        src: ['src/app/**/*.coffee'],
        dest: 'compiled/app'
      },
      spec: {
        src: 'src/spec/**/*.coffee',
        dest: 'compiled/spec'
      }
    },
    watch: {
      files: 'src/**/*.coffee',
      tasks: 'coffee concat min shell reload'
    },
    concat: {
      app: {
        src: ['<banner:meta.banner>', 'compiled/app/<%= pkg.name %>.js', 'compiled/app/**/*.js'],
        dest: 'public/javascripts/<%= pkg.name %>.js'
      },
      spec: {
        src: 'compiled/spec/**/*.js',
        dest: 'build/<%= pkg.name %>_spec.js'
      },
      vendor: {
        src: [ 'vendor/app/jquery.min.js',
               'vendor/app/jstorage.js',
               'vendor/app/shuffle.js',
               'vendor/app/moment.js',
               'vendor/app/mustache.js',
               'vendor/app/twitter_parse.js' ],
        dest: 'public/javascripts/vendor.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.app.dest>'],
        dest: 'public/javascripts/<%= pkg.name %>.min.js'
      }
    },
    reload: {
      port: 35729, // LR default
      liveReload: {},
      proxy: {
        host: 'localhost',
        port: 8000 // should match server.port config
      }
    },
    server: {
      port: 8000,
      base: '.'
    },
    shell: {
      test: {
        command: 'make test',
        stdout: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'coffee concat min server reload watch');

};
