App.module("helloworld", function(helloworld, App, Backbone, Marionette, $, _){

	var Controller = {
		show: function () {
			return new helloworld.show.Page();
		},
		list: function () {},
		edit: function () {}
	} 


	App.reqres.setHandler("helloworld:show", function () {
		return Controller.show();
	})
});