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

* Scss should have a vendor contaning bootstrap/foundation






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
* grunt-karma



## Using the CLI

Starts the watch process, that will compile templates/scss and trigger reload. this should be used when 
developing the app.

```shell
grunt.cmd
```



### Project layout

```shell
root
├───src
│	├───js
│	│   ├───app
│	│   │   ├───apps			# contains all app modules
│	│   │   ├───base 			# base model/collection/views
│	│   │   ├───components 		# general reusable components like loader views.
│	│   │   ├───config 			# configurations of vendor/lib like marionette.render
│	│   │   ├───entities 		# apps data modules 
│	│   │   ├───mixins 			# what is this?
│	│   │   └───utils 			# util scripts.
│	│   ├───lib
│	│   └───vendor 
│	├───scss 					# scss files.
│	├───views					# contains index.tpl 
├───public 						# development folder containing html and assets
└───test 						# unit tests
```


### Apps folder layout

This is just to document what i do and is not required. 

Apps should follow the restful interface, defining folders for

* **show** - show a single item		
* **list** - list a group of items		
* **add**  - create a item
* **edit** - edit item ?
* **remove** - remove item

Each folder should contain its own template folder containing all templates needed to render it.

In the root of the apps folder there should be a **appname.js** file there is the upper most module there will define the public api, and all 
communication of the submodules.




```shell
apps
└───Appname
    │   Appname.js 	# Master module.
    │
    ├───add
    │   │   add.controller.js
    │   │   add.views.js
    │   │
    │   └───templates
    │           add.tpl
    │
    ├───list
    │   │   list.controller.js
    │   │   list.views.js
    │   │
    │   └───templates
    │           list.tpl
    │
    ├───remove
    │   │   remove.controller.js
    │   │   remove.views.js
    │   │
    │   └───templates
    │           remove.tpl
    │
    └───show
        │   remove.controller.js
        │   remove.views.js
        │
        └───templates
                remove.tpl

```


## Release History
 * 2013-12-11   v0.1.0   Initial release
 * 2014-08-01   v0.1.1   Added karma as testing framework

