/**
 * Displays edit window for states and transitions.
 * @author Paolo Masci
 * @date 5/24/14 14:08:02 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, d3, require, $, brackets, window, Backbone, Handlebars, self */
define(function (require, exports, module) {
    "use strict";
    var d3 = require("d3/d3"),
        formTemplate = require("text!./templates/displayAddState.handlebars"),
        FormUtils = require("./FormUtils");
    
    var AddStateView = Backbone.View.extend({
        initialize: function (data) {
            d3.select(this.el).attr("class", "overlay").style("top", self.scrollY + "px");
            this.render(data);
            this._data = data;
        },
        render: function (data) {
            var template = Handlebars.compile(formTemplate);
            this.$el.html(template(data));
            $("body").append(this.el);
            d3.select(this.el).select("#newLabel").node().focus();
            return this;
        },
        events: {
			"click #btnRight": "right",
			"click #btnLeft": "left"
		},
		right: function (event) {
			var form = this.el;
			if (FormUtils.validateForm(form)) {
                var selectors = [ "newLabel" ];
				var formdata = FormUtils.serializeForm(form, selectors);
				this.trigger(this._data.buttons[1].toLowerCase(), {data: formdata, el: this.el}, this);
			}
		},
		left: function (event) {
			this.trigger(this._data.buttons[0].toLowerCase(), {el: this.el}, this);
		}
    });
    
    module.exports = {
        /**
         * creates a new form view to display questions. Renders two buttons for
         * taking positive or negative responses to the question posed.
         * @param {header: {string}, textLines: {string}} data Data to use to render the form
         */
        create: function (data) {
            return new AddStateView(data);
        }
    };
});
