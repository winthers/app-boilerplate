App.module("Routers", function (Routers, App, Backbone, Marionette, $, _) {


	var Controller = {

		_showPage: function (id) {
			var view = App.request(id);
 			App.contentRegion.show(view);
		},

		home: function () {
			Controller._showPage("helloworld:show");
		}

	};

	var Router = Marionette.AppRouter.extend({
		controller: Controller,
		
		appRoutes: {
  			'': 	'home',
		}
	});

	App.addInitializer(function(){
		var router = new Router();
		App.router = router;
		Backbone.history.start();
	});
});