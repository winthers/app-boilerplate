App.module("helloworld.show", function(show, App, Backbone, Marionette, $, _){
	show.Page = Marionette.ItemView.extend({
		template: "helloworld/show/show"
	})
});