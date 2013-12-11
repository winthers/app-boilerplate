

(function(Backbone){

	/*
		@method 
			replaceTokens

		@desciption 
	    	Replaces #{whatever} in the string ( it dosent matter what the name of the value in {name} 
	    	is sins its just for easy readibility).

	    @example
			replaceTokens(
		   		"src/js/app/apps/#{module}/#{submodule}/templates/#{templateName}.tpl",
		    	"appName/folderName/templateName"
			)
		
			// out => "src/js/app/apps/appName/folderName/templates/templateName.tpl"
	*/
	function replaceTokens (strTokens, strValues) {
    
	    var pathTemplate = strTokens;
	    var desiretPath = strValues;
	    
	    // Splits the strValues so a/b/c will be an array
	    var strValues   = desiretPath.split("/")
	    var tokens      = pathTemplate.match(/#\{[^\}]*\}/gi)
	    
	    // then it replacese token (n) with strValue (n)
	    for(var s in strValues) {
	        pathTemplate = pathTemplate.replace(tokens[s], strValues[s])       
	    }
	    
	    return pathTemplate

	}




	
	var _render = Backbone.Marionette.Renderer.render;


	Backbone.Marionette.Renderer.render = function (template, data) {
		

		var configurablePaths = [
			"src/js/app/apps/#{module}/templates/#{templateName}.tpl",
			"src/js/app/apps/#{module}/#{submodule}/templates/#{templateName}.tpl"
		];



		if(template) {

			var strPathMatch = false;

			// Test all configurablePaths to find a match
			_.each(configurablePaths, function(path){
				var tempPath = replaceTokens(path, template);

				console.log("trying path", tempPath)
				if(JST.hasOwnProperty(tempPath)){
					strPathMatch = tempPath;
				}
			})

			if(strPathMatch !== false) {
				return JST[strPathMatch](data);
			}else {
				return _render.call(this, arguments);
			}


		}else {
			// Allow no template
			return "";
		}
	};

}(Backbone));