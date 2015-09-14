/**
 * Displays edit window for the presentation model relations of a state.
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, d3, require, $, brackets, window, Backbone, Handlebars, self */
define(function (require, exports, module) {
	"use strict";
	var d3 = require("d3/d3"),
		formTemplate = require("text!../templates/pim/displayEditPIMPMR.handlebars"),
		FormUtils = require("plugins/emulink/forms/FormUtils");

	var EditPIMPMRView = Backbone.View.extend({
		initialize: function (data) {
			d3.select(this.el).attr("class", "overlay").style("top", self.scrollY + "px").style("z-index", 999);
			// Internal count for displaying relations.
			this.count = 0;
			this._selectors = [];
			this.render(data);
			this._data = data;
		},
		render: function (data) {
			var template = Handlebars.compile(formTemplate);
			this.$el.html(template(data));
			$("body").append(this.el);
			this.$pmrList = $('#pmPMRList', this.el);
			this.buildPMRList(data);
			//TODO: link to first relation.
			//d3.select(this.el).select("").node().focus();
			return this;
		},
		events: {
			"click #btnRight2": "right",
			"click #btnLeft2": "left"
		},
		right: function (event) {
			function setToArray(setObj) {
				var values = [], i;
				for (i in setObj) {
					if (setObj.hasOwnProperty(i)) {
						values.push(i);
					}
				}
				return values;
			}

			var form = this.el;
			if (FormUtils.validateForm(form)) {
				var formdata = FormUtils.serializeForm(form, setToArray(this._selectors));
				// Pull out the PMR data.
				var test = {};
				formdata.labels.forEach(function (r) {
					test[r] = formdata.labels.get(r);
				});
				this.trigger(this._data.buttons[1].toLowerCase().replace(new RegExp(" ", "g"), "_"),
					{data: test, el: this.el}, this);
			}
		},
		left: function (event) {
			this.trigger(this._data.buttons[0].toLowerCase(), {el: this.el}, this);
		},
		buildPMRList: function (data) {
			// HashSet of items (in case multiple widgets call the same system behaviour).
			var listItems = [];
			var _this = this;
			// Foreach widget generate the PMR list items.
			data.value.widgets.forEach(function(w) {
				w.behaviours.forEach(function(b) {
					// Only system behaviours have relations.
					if (b.substring(0, 2) === "S_") {
						listItems.push({
							behaviour: b,
							item: _this.PMRListItem(data.value.pmr, b)
						});
					}
				});
			});

			// Sort the behaviours.
			listItems.sort(function (a, b) {
				if (a.behaviour < b.behaviour) { return -1; }
				if (a.behaviour > b.behaviour) { return 1; }
				return 0;
			});

			this.$pmrList.html(listItems.map(function (i) { return i.item; }));
		},
		PMRListItem: function (pmr, b) {
			// Strip white space.
			var id = b.replace(/\s/g, '');
			// Ensure unique behaviours.
			if (!this._selectors[id]) {
				this._selectors[id] = id;
			} else {
				return "";
			}
			var operation = pmr[b] || "";
			var item =
				'<div class="row" style="padding: 2px 0 2px 0;">' +
					'<label class="control-label col-md-4" for="' + id + '">' + b + '</label>' +
					'<div class="col-sm-8">' +
						'<input id="' + id + '" class="form-control" type="text" value="' + operation +
							'" style="padding: 6px 12px;"/>' +
					'</div>' +
				'</div>';
			return item;
		}
	});

	module.exports = {
		create: function (data) {
			return new EditPIMPMRView(data);
		}
	};
});
