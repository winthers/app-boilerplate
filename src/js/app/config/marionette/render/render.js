
var TemplateBootstrapRender = function () {

    this.configurablePaths = [
        "src/js/app/apps/{@path}/templates/{@file}.tpl",    
        "src/js/app/components/{@path}/templates/{@file}.tpl"
    ];
};

_.extend(TemplateBootstrapRender.prototype, {

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
    },

    templateExists: function (path) {
        return JST.hasOwnProperty(path);
    },

    render: function (path, data) {
        return JST[path](data);
    },

    createPath: function (template) {
        var that = this;
        var strPath = false;

        _.each(this.configurablePaths, function(path){
            var tempPath = that.replaceString(template, path);
            if(that.templateExists(tempPath)){
                strPath = tempPath;
            }
        })

        return strPath;
    }
});


(function(Backbone){


    var customRender = new TemplateBootstrapRender();
    var _render = Backbone.Marionette.Renderer.render;

    
	Backbone.Marionette.Renderer.render = function (template, data) {
		if(template) {
            var strPathMatch = customRender.createPath(template);

			if(strPathMatch !== false) 
				return customRender.render(strPathMatch, data);
			else 
                return _render.apply(this, arguments);
		}
        return "";
	};
   
}(Backbone));