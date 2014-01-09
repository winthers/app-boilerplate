# SPA Boilerplate
> "Make you feel sexy"

**What**

This is my SPA boilerplate for building Backbone Marionette Apps, it contains a very opinionated workflow that I have adopted, and offers some features that I have come to depend on.

**features**

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
* Testing
    * Uses Karma to run tests


**Table of content **



[TOC]




#### TODO

This project is still under development, so is likely to change at any time.

* Make a better build process (All assets should be moved to a .tmp folder and mini-fiction of html and images should take place before moving all files to a dist folder (like yeoman)).

* Maybe the vendor scripts should be pulled in with bower.

* Scss should have a vendor contaning bootstrap/foundation

* Make readme






## Getting Started
This plug-in requires:

* [NPM](http://nodejs.org/)  
* [Grunt](http://gruntjs.com/getting-started)
* [Ruby](https://www.ruby-lang.org/en/downloads/)
* [Compass](http://rubygems.org/gems/compass)


### Installation
This will install all dependencies (grunt)

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
grunt
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


## Templates 



###JST

JST will find all .tpl files in the app/apps  and app/components folders and compile them to a single file located in public/assets/js/templates.js.

This can be configured in the gruntfile.js under JST.


###Where should the templates be stored

The templates must be stored in folders named "templates" and must be stored in either apps or the components folder, idealy each module and submodule should contain its own templates folder. 

```shell
apps
└───pages
    ├───home
        └───templates
               home.page.tpl

```


### How do i access the templates in my code.

There are two ways to access the templates.


 **Bruteforce:**
You can call the global JST object directly 

```shell
    JST["src/js/app/apps/pages/home/templates/home.page.tpl"]
```

**Using the Shorthand:** 
Within a Marionette.View a template can be refrenced, with a path relative to its position in "src/js/app/apps/" or "src/js/app/components/" and templatefolder and file endning should be ignored

e.g: having a absolute path looking like this: 
```shell
src/js/app/apps/pages/home/templates/home.page.tpl
```
the link would be



```shell
    var View = new Marionette.ItemView.extend({
        template: "pages/home/home.page"
    })
```

###How do the template shorthand work?

The project have overwridden the default render methode used by marionette:

```shell
src/app/config/marionette/render/render.js
```

And uses a look up path that is as follows:

```shell
"src/js/app/apps/{@path}/templates/{@file}.tpl",
"src/js/app/components/{@path}/templates/{@file}.tpl"
```
## SCSS
### Sprites

    





## Release History
 * 2013-12-11   v0.1.0   Initial release
 * 2014-08-01   v0.1.1   Added karma as testing framework
 * 2014-09-01   v0.2.0   
    * Made new custom render code and added tests.
    * Karma.conf now includes files correctly
    * updated to marionette 1.4.1
    

