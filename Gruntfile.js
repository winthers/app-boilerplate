module.exports = function(grunt) {

  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),

    /**
     * Configure Project Settings
     * ==========================
     */
    settings: {
      production: false,
      pageTitle: "HTML5/SPA Project Template",
    },

    /**
     * CSS PRE PROCESSOR
     * =================
     * https://npmjs.org/package/grunt-contrib-compass*/

    compass: {
      dist: {
        options: {
          sassDir: "./src/scss",
          cssDir: "./public/assets/css",
          imagesDir: "./public/assets/images/",
          generatedImagesDir: "./public/assets/images/sprites",
          generatedImagesPath: "./public/assets/images/sprites",
          httpGeneratedImagesPath: "../public/assets/images/sprites",
          raw: "preferred_syntax = :sass\n" // Use `raw` since it's not directly available
        }
      }
    },

    /**
     * Template Bootstrapping
     * ======================
     * https://github.com/gruntjs/grunt-contrib-jst
     */
     jst: {
      compile: {
        options: {
          prettify: true
        },
        files: {
          "public/assets/js/templates.js": [
            "src/js/app/apps/**/*.tpl", 
            "src/js/app/components/**/*.tpl"
          ]
        }
      }
    },

    /**
     * (WATCH) Detect file changes
     * ============================
     * https://github.com/gruntjs/grunt-contrib-watch
     */
    watch: {

      scss: {
        files: ["src/scss/**/*.scss"],
        tasks: ["compass"]
      },

      jst: {
        files: [
          "src/js/app/apps/**/*.tpl",
          "src/js/app/components/**/*.tpl"
        ],
        tasks: ["jst"]
      },

      indexTemplate: {
        files: ["src/views/index.tpl"],
        tasks: ["preprocess", "scriptincluder"]
      },

      scripts: {
          files: ["src/js/*.js", "src/js/**/*.js"],
          tasks: ["preprocess", "scriptincluder"]
      },

      liveReloadOn_CssChanges: {
        options: {
          livereload: true
        },
        files: [
          "public/assets/css/main.css"
        ]
      },

      liveReloadOn_indexHTMLChanges: {
        options: {
          livereload: true
        },
        files: [
          "public/index.html"
        ]
      },

      liveReloadOn_JST_changes: {
        options: {
          livereload: true
        },
        files: [
          "public/assets/js/templates.js"
        ]
      }

    },

    /**
     * Combine Files
     * =============
     * https://github.com/gruntjs/grunt-contrib-concat
     */
    concat: {

      options: {
        separator: '\n /***************************/ \n'
      },

      libs: {
        src: [
          "src/js/lib/jquery.1.9.1.min.js", "src/js/lib/underscore.1.5.2.min.js", "src/js/lib/backbone.1.0.0.min.js", "src/js/lib/backbone.marionette.1.1.0.min.js"
        ],
        dest: 'public/assets/js/lib.js'
      },

      dependiciesConfiguration: {
        src: ["src/js/app/config/**/*.js"],
        dest: "public/assets/js/config.js"
      },

      /* Application files */
      app: {
        src: [
          "src/js/app/app.js",
          "src/js/app/base/**/*.js",
          "src/js/app/utils/**/*.js",
          "src/js/app/mixins/**/*.js",
          "src/js/app/entities/**/*.js",
          "src/js/app/components/**/*.js",
          "src/js/app/apps/**/*.js"
        ],
        dest: "public/assets/js/app.js"
      }
    },

    scriptincluder: {

      main: {
        options: {
          rootPath: "../"
        },

        dest: "./public/index.html",

        src: [
          "<%= concat.libs.src %>",
          "<%= concat.dependiciesConfiguration.src %>",
          "<%= concat.app.src %>"
        ]
      }
    },

    /**
     * Removes logging from files
     * ==========================
     * use my custom tweked version at:
     * https://github.com/winthers/grunt-remove-logging
     */
    removelogging: {
      dist: {
        src: "public/js/app.js",
        dest: "public/js/app.js"
      }
    },

    /**
     * Minify javascript
     * =================
     * https://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      my_target: {
        options: {
          beautify: false
        },
        files: {
          'public/js/app.min.js': ['public/js/app.js']
        }
      }
    },


    /**
     * Minify html
     * ========================
     * https://github.com/jney/grunt-htmlcompressor
     */
    htmlcompressor: {
      compile: {
        files: {
          'public/index-min.html': 'public/index.html'
        },
        options: {
          type: 'html',
          preserveServerScript: true
        }
      }
    },

    /**
     * Minify Png
     * ======================
     * https://npmjs.org/package/grunt-pngmin
     */
    pngmin: {
      compile: {
        options: {
          concurrency: 8, // specify how many exucutables get spawned in parallel
          colors: 128, // reduce colors to 128
          ext: '.png', // use .png as extension for the optimized files
          quality: '65-80', // output quality should be between 65 and 80 like jpeg quality
          speed: 10 // pngquant should be as fast as possible
        },
        files: [{

          expand: true, // required option
          src: ['**/*.png'],
          cwd: './public/assets/images/sprites/', // required option
          dest: './public/assets/images/sprites/'
        }]
      }
    },

    /**
     * DELETE FILES
     * ============
     * https://github.com/gruntjs/grunt-contrib-clean
     *
     * WARNING: This will delete files, so be carefule what u point it at
     * This can be configured like this: http://gruntjs.com/configuring-tasks
     */
    clean: {
      tempFiles: {
        src: [
          ".sass-cache"
        ]
      }
    },


    // maybe replace with https://github.com/yeoman/grunt-usemin
    /**
     * PROD / DEV
     * ==========
     * https://github.com/jsoverson/grunt-preprocess
     *
     * Creates diffrent index.html based on the production:boolean value.
     */
    preprocess: {
      options: {
        context: {
          DEBUG: true,
          production: "<%= settings.production %>",
          pageTitle: "<%= settings.pageTitle %>"
        }
      },
      html: {
        src: 'src/views/index.tpl',
        dest: 'public/index.html'
      }

    },


    /* https://github.com/karma-runner/grunt-karma */
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        singleRun: false,
        browsers: ['PhantomJS']
      }
    }

  });

  // ----------------------------------------------
  // Register tasks.
  // ----------------------------------------------

  // Development
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks("grunt-remove-logging");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-htmlcompressor');
  grunt.loadNpmTasks('grunt-pngmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-scriptincluder');
  grunt.loadNpmTasks('grunt-karma');

  // ----------------------------------------------
  // Default task.
  // ----------------------------------------------
  grunt.registerTask('default', ["watch"]);
  grunt.registerTask('test', ['karma']);



  grunt.registerTask("build:prod", ["compass", "jst", "concat", "uglify", "clean", "preprocess"]);
  grunt.registerTask("build:dev", ["compass", "jst", "concat", "preprocess", "scriptincluder"]);



  grunt.registerTask('min', ['htmlcompressor', 'pngmin']);





};