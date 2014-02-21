(function(){

	var App = new Marionette.Application();

	window.App = App;

	App.addRegions({
		contentRegion: "#myRegion"
	})


	$(function(){
		App.start();
	})

})();