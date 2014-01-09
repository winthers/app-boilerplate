describe("Custom marionette.render", function() {

	var render;

	beforeEach(function () {
		render = new TemplateBootstrapRender();
		render.templateExists = function (path) {
			return {"src/js/app/apps/path/templates/file.tpl": true}.hasOwnProperty(path)
		}
	})

	it("can be created", function() {
		expect(typeof render).toBe("object");
	});

	it("should have 2 default configurablePaths", function () {
		expect(render.configurablePaths.length).toBe(2)
	})

	it("should return false if the template do not exist", function () {
		expect(render.createPath("")).toBe(false)
		expect(render.createPath(function(){})).toBe(false)
	})

	it("should return a string if the template exists", function () {
		expect(typeof render.createPath("path/file")).toBe("string")
	})


	it("marionette should render our template", function () {
		var _jst = window.JST;
		window.JST = {"src/js/app/apps/path/templates/file.tpl": function () {return "my custom template"}};
		expect(Backbone.Marionette.Renderer.render("path/file", {})).toBe("my custom template")
		window.JST = _jst;
	})

	it("marionette render should allow no templates", function () {
		expect(Backbone.Marionette.Renderer.render(undefined, undefined)).toBe("")
		expect(Backbone.Marionette.Renderer.render("", "")).toBe("")
	})

	it("should render templates defined in the views", function () {
		var V = Marionette.ItemView.extend({
		    template: function (data) {
		        return _.template("<div><%=name%></div>")(data)
		    }
		})
		var v = new V({model: new Backbone.Model({name: "test"})});
		v.render();
		expect(v.$el.html()).toBe("<div>test</div>")
	})
	
});

