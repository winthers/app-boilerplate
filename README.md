# SPA Boilerplate
> "Make you feel sexy"


This is my SPA boilerplate for building Backbone Marionette Apps, it contains a very opinionated workflow that I have adopted, and offers some features that I have come to depend on.


#### Features
* Bootstrapping of templates.
* Development/Production 
    * Development
        * Serves a specific versions of the index.html, with live-reload enabled.
        * Auto include all script references in the index.html
    * Production
        * concatenation & minify scripts.
* Live reload 
    * on css change.
    * on html and script change.
* SCSS 
    * compiles .scss files to .css.
    * creates sprite sheets.

 


#### TODO
This project is still under development, so is likely to change at any time.

* Make a better build process (All assets should be moved to a .tmp folder and mini-fiction of html and images should take place before moving all files to a dist folder (like yeoman)).

* Maybe the vendor scripts should be pulled in with bower.






## Getting Started
This plug-in requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plug-ins. Once you're familiar with that process, you may install this plug-in with this command:


### Installation
This will install all dependencies

```shell
npm install
```

### Dependencies 

Here is a list of dependencies that will be installed:

* grunt-contrib-compass
* grunt-contrib-jst
* grunt-contrib-watch
* grunt-contrib-concat
* grunt-contrib-uglify
* grunt-htmlcompressor
* grunt-pngmin
* grunt-preprocess
* grunt-scriptincluder
* grunt-contrib-clean
* grunt-mocha



## Release History
 * 2013-12-11   v0.1.0   Initial release

