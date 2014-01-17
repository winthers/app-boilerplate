
(function(){

	var __marionette_view_delegateEvents 	= Marionette.View.prototype.delegateEvents;
	var __marionette_view_undelegateEvents 	= Marionette.View.prototype.undelegateEvents;

	Marionette.View.prototype.delegateEvents = function (events) {
	    __marionette_view_delegateEvents.call(this, events)
	    Marionette.bindEntityEvents(this, this, Marionette.getOption(this, "itemviewEvents"));
	}
	Marionette.View.prototype.undelegateEvents = function () {
	    __marionette_view_undelegateEvents.call(this);
	    Marionette.unbindEntityEvents(this, this, Marionette.getOption(this, "itemviewEvents"));
	}

})();