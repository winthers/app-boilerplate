module.exports = function(grunt) {

  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),



    /**
     * CSS PRE PROCESSOR
     * =================
     * https://npmjs.org/package/grunt-contrib-compass*/
    compass: {
      dev: {
        options: {
          noLineComments: false,
          outputStyle: "expanded",
          sassDir: "./src/scss",
          cssDir: "./public/assets/css",
          imagesDir: "./public/assets/images/",
          generatedImagesDir: "./public/assets/images/sprites",
          generatedImagesPath: "./public/assets/images/sprites",
          httpGeneratedImagesPath: "../../assets/images/sprites/",
          raw: "preferred_syntax = :sass\n" // Use `raw` since it's not directly available
        }
      },

      prod: {
        options: {
          noLineComments: true,
          outputStyle: 'compressed',
          sassDir: "./src/scss",
          cssDir: "./public/assets/css",
          imagesDir: "./public/assets/images/",
          generatedImagesDir: "./public/assets/images/sprites",
          generatedImagesPath: "./public/assets/images/sprites",
          httpGeneratedImagesPath: "../../assets/images/sprites/",
          raw: "preferred_syntax = :sass\n"
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
        tasks: ["compass:dev"]
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
        tasks: ["copy:indexTemplate", "scriptincluder:main"]
      },

      scripts: {
          files: ["src/js/*.js", "src/js/**/*.js"],
          tasks: ["copy:indexTemplate", "scriptincluder:main"]
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
          "src/js/lib/jquery.1.9.1.js", 
          "src/js/lib/underscore.1.5.2.js", 
          'src/js/lib/backbone.1.1.0.js',
          'src/js/lib/backbone.wreqr.2.0.js',
          'src/js/lib/backbone.babySitter.0.0.6.js',
          'src/js/lib/backbone.marionette.1.4.1.js'
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


    // Include scripts

    scriptincluder: {

      main: {
        options: {
          prependedPath: "../"
        },

        dest: "./public/index.html",

        src: [
          "<%= concat.libs.src %>",
          "<%= concat.dependiciesConfiguration.src %>",
          "<%= concat.app.src %>"
        ]
      },

      dev: {
        options: {
          replacePath: "assets/js/"
        },

        dest: "./.dist/public/index.html",

        src: [
          "<%= concat.libs.src %>",
          "<%= concat.dependiciesConfiguration.src %>",
          "<%= concat.app.src %>"
        ]
      },

      prod: {
        options: {
          replacePath: "assets/js/"
        },

        dest: "./.dist/public/index.html",

        src: [
          "<%= concat.libs.dest %>",
          "<%= concat.dependiciesConfiguration.dest %>",
          "<%= concat.app.dest %>"
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
          src: ['public/assets/images/**/*.png'],

          dest: '.dist/'
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
      scssCache: {
        src: [
          ".sass-cache"
        ]
      },
      dist: {
        src: [
          ".dist"
        ]
      }
    },

    copy: {
      dev: {
        options: {
         process: function (content, srcpath) {
            if(srcpath.indexOf("index.html") < 0) return content; 
            return  content.replace(/<script>document.write.*<\/script>/, "")
          },

          noProcess: ['*.{png,gif,jpg,ico,eot,evg,ttf,woff}']
        },

        files: [
          {expand: true,   src: ["public/assets/**"],           dest: ".dist/", filter: ""},
          {expand: true,   src: ["public/assets/js/**/*.js"],   dest: ".dist/public/assets/js/", filter: "isFile", flatten: true},
          {expand: true,   src: ["src/js/**/*.js"],             dest: ".dist/public/assets/js/", filter: "isFile", flatten: true},
          {expand: true,   src: ["public/index.html"],          dest: ".dist/"}
        ]
      },

      prod: {
        options: {
         process: function (content, srcpath) {
            if(srcpath.indexOf("index.html") < 0) return content; 
            return  content.replace(/<script>document.write.*<\/script>/, "")
          },
          noProcess: ['*.{png,gif,jpg,ico,eot,evg,ttf,woff}']
        },
        files: [
          {expand: true,   src: ["public/assets/css/**"],     dest: ".dist/", filter: ""},
          {expand: true,   src: ["public/assets/js/**"],      dest: ".dist/public/assets/js/", filter: "isFile", flatten: true},
          {expand: true,   src: ["public/index.html"],        dest: ".dist/"}
        ]

      },

      indexTemplate: {
        files: [
          {expand: false, src: ["src/views/index.tpl"], dest: "public/index.html", filter:"isFile", faltten: true}
        ]
      },
      indexTemplateToDist: {
        files: [
          {expand: false, src: ["src/views/index.tpl"], dest: ".dist/public/index.html", filter:"isFile", faltten: true}
        ]
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-pngmin');
  grunt.loadNpmTasks('grunt-scriptincluder');
  grunt.loadNpmTasks("grunt-remove-logging");


  // ----------------------------------------------
  // Default task.
  // ----------------------------------------------

  grunt.registerTask('default', ["watch"]);


   grunt.registerTask("build:default",  [
    "copy:indexTemplate", 
    "scriptincluder:main", 
    "clean:scssCache", 
    "compass:dev", 
    "jst"
  ]);

  grunt.registerTask("build:dev",  [
    "copy:indexTemplateToDist", 
    "clean:scssCache", 
    "compass:dev", 
    "jst",
    "clean:dist",
    "copy:dev", 
    "scriptincluder:dev", 
    "pngmin"
  ]);

  grunt.registerTask("build:prod", [
    "copy:indexTemplateToDist", 
    "clean:scssCache", 
    "compass:prod", 
    "jst",
    "concat",
    "uglify",
    "clean:dist",
    "copy:prod", 
    "scriptincluder:prod",
    "pngmin"
  ]);

};