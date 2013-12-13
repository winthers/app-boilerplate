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
          "public/assets/js/templates.js": ["src/js/app/apps/**/*.tpl"]
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
        files: ["src/js/app/apps/**/*.tpl"],
        tasks: ["jst"]
      },

      indexTemplate: {
        // --  Changes to the index template will trigger a recompile - and a livereload
        files: ["src/views/index.tpl"],
        tasks: ["preprocess", "scriptincluder"]
      },

      liveReloadOnCssChanges: {
        options: {
          livereload: true
        },
        files: [
          "public/assets/css/main.css"
        ]
      },
      liveReloadOn_HTML_and_JS_Changes: {
        options: {
          livereload: true
        },
        files: [
          "public/index.html"
        ]
      },
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

      /* Core dependicies */
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
          "hello.js",
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

    /*
			https://github.com/kmiyashiro/grunt-mocha
		*/
    mocha: {
      all: {
        src: ['test/**/*.html'],
        options: {
          run: true
        }
      }

    },

  });

  // ----------------------------------------------
  // Register tasks.
  // ----------------------------------------------

  // Development
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Build
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks("grunt-remove-logging");

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // HTML Minify 
  grunt.loadNpmTasks('grunt-htmlcompressor');
  grunt.loadNpmTasks('grunt-pngmin');

  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.loadNpmTasks('grunt-preprocess');

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-scriptincluder');

  // ----------------------------------------------
  // Default task.
  // ----------------------------------------------
  grunt.registerTask('default', ["watch"]);



  grunt.registerTask("build:prod", ["compass", "jst", "concat", "uglify", "clean", "preprocess"]);
  grunt.registerTask("build:dev", ["compass", "jst", "concat", "preprocess", "scriptincluder"]);



  grunt.registerTask('min', ['htmlcompressor', 'pngmin']);

  grunt.registerTask('test', ['mocha']);



};