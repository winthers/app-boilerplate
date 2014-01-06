
(function(Backbone){


    function PathReplacer () {}

    _.extend(PathReplacer.prototype, {
        replaceString: function (input, template) {
            if(input == "" || typeof input == "function") return "";

            var elements = input.split("/");
            var file = elements.pop();
            var path = elements.join("/");

            if(!this.hasPath(template) || !this.hasFile(template)){
                throw new Error("template is missing path or file fields");
            }

            return template
                .replace(/\{@path\}/, path)
                .replace(/\{@file\}/, file);
        },

        hasPath: function  (path) {
            return /\{@path\}/.test(path)
        },

        hasFile: function (file) {
            return /\{@file\}/.test(file);
        }
    });


	
	var _render = Backbone.Marionette.Renderer.render;
    var configurablePaths = [
        "src/js/app/apps/{@path}/templates/{@file}.tpl",	
		"src/js/app/components/{@path}/templates/{@file}.tpl"
    ];

    var replacer = new PathReplacer();

    function createPath (template) {
        var strPath = "";
        _.each(configurablePaths, function(path){
            var tempPath = replacer.replaceString(template, path);
            if(JST.hasOwnProperty(tempPath)){
                strPath = tempPath;
            }
        })
        return strPath;
    }


	Backbone.Marionette.Renderer.render = function (template, data) {

		if(template) {
            var strPathMatch = createPath(template);
			if(strPathMatch !== false) 
				return JST[strPathMatch](data);
			else 
                return _render.call(this, arguments);
		}
        return "";
	};

}(Backbone));