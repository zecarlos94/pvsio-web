/**
 * @module SteeringWheel
 * @version 1.0.0
 * @author Paolo Masci, José Carlos
 * @desc This module helps build vehicle steering wheel widgets using SVG images. 
 * It also provides an API to perform the rotation of the steering wheel whose formal specification
 * can be found in main.pvs file in the demonstration where the widget's constructor was invoked.
 *
 * @date October 6, 2017
 * last modified @date Sept 04, 2018
 *
 * @example <caption>Usage of SteeringWheel within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the SteeringWheel module
 *     require("widgets/car/SteeringWheel");
 *
 *     function main() {
 *          // After SteeringWheel module was loaded, initialize it
 *          let wheel = new SteeringWheel(
 *               'example', // id of the wheel element that will be created
 *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
 *               { style: 'ferrari', imagePath: "arcade_game_simulator_full_screen_for_paper/img/steering_wheels/"}
 *               // options, in this case, style represents the SVG image name, available at steering_wheels folder.
 *               // 'ferrari' will use "ferrari_steering_wheel.svg" as SVG image.
 *           );
 *
 *          // Available methods:
 *          // Render the SteeringWheel widget, provinding a rotation value in degrees
 *          wheel.render(-45); // rotates 45 degrees counter-clockwise
 *     }
 * });
 * 
 * 
 * @example <caption>Usage of other public API's of SteeringWheel Widget.</caption>
 *
 *  Using variable SteeringWheel created in the previous example is also possible to call the following,
 *
 *       // Hides the SteeringWheel widget, i.e., changes the display of main div to none.
 *       wheel.hide();
 *
 *       // Reveals the SteeringWheel widget, i.e., changes the display of main div to block.
 *       wheel.reveal();
 *
 *       // Rotates the SteeringWheel widget, by the value of 'val'.
 *       wheel.rotate(val);
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jshint esnext:true */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    let Widget = require("widgets/Widget"),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();

    /**
     * @function constructor
     * @public
     * @description Constructor for the SteeringWheel widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 0, left: 0, width: 250, height: 250 }.
     * @param opt {Object} Options:
     * @param [opt.parent] {String} the HTML element where the display will be appended (default is "body").
     * @param [opt.style] {String} a valid style identifier, i.e., valid SVG filename (default is "ferrari").
     * @param [opt.z-index] {String} value for the CSS property z-index (if not provided, no z-index is applied).
     * @param [opt.imagePath] {String} the image path with steering wheel to load. (default is "../../client/app/widgets/car/steering_wheels/").
     * @returns {SteeringWheel} The created instance of the widget SteeringWheel.
     * @memberof module:SteeringWheel
     * @instance
     */
    function SteeringWheel(id, coords, opt) {
        opt = opt || {};
        opt.style = opt.style || "ferrari";
        opt.opacity = opt.opacity || 1;
        opt.imagePath = opt.imagePath;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 250;
        this.height = coords.height || 250;

        this.imagePath = (opt.imagePath) ? (opt.imagePath) : "";
        this.parent = (opt.parent) ? ("#" + opt.parent) : "body";
        this.div = d3.select(this.parent)
                        .append("div").attr("id", id)
                        .style("position", "absolute")
                        .style("top", this.top + "px").style("left", this.left + "px")
                        .style("opacity", opt.opacity)
                        .style("transform-origin", "0 0")
                        .style("z-index", opt["z-index"] || 0)
                        .style("display", "none");

        if(this.imagePath!==""){
            let _this = this;
            let steering_wheel_file = "text!../../../../demos/" + this.imagePath + opt.style + "_steering_wheel.svg";
            require([steering_wheel_file], function(steering_wheel) {
                _this.div.append("div").attr("id", id + "_SW").html(steering_wheel);
                // Scale svg according to scale factor
                let svgHeight = parseFloat(_this.div.select("svg").style("height").replace("px", ""));
                let svgWidth = parseFloat(_this.div.select("svg").style("width").replace("px", ""));
                let widthDiff = svgWidth - _this.width;
                let heightDiff = svgHeight - _this.height;
                let ratio = (widthDiff === heightDiff || widthDiff > heightDiff) ?
                                _this.width / svgWidth : _this.height / svgHeight;
                _this.div.style("transform", "scale(" + ratio + ")");
                _this.steering_wheel = _this.div.select("svg");
                _this.steering_wheel.style("transition", "transform 0.3s");
                return _this;
            });
        }else{
            // Load steering wheel picture based on style options
            let _this = this;
            let steering_wheel_file = "text!widgets/car/steering_wheels/" + opt.style + "_steering_wheel.svg";
            require([steering_wheel_file], function(steering_wheel) {
                _this.div.append("div").attr("id", id + "_SW").html(steering_wheel);
                // Scale svg according to scale factor
                let svgHeight = parseFloat(_this.div.select("svg").style("height").replace("px", ""));
                let svgWidth = parseFloat(_this.div.select("svg").style("width").replace("px", ""));
                let widthDiff = svgWidth - _this.width;
                let heightDiff = svgHeight - _this.height;
                let ratio = (widthDiff === heightDiff || widthDiff > heightDiff) ?
                                _this.width / svgWidth : _this.height / svgHeight;
                _this.div.style("transform", "scale(" + ratio + ")");
                _this.steering_wheel = _this.div.select("svg");
                _this.steering_wheel.style("transition", "transform 0.3s");
                return _this;
            });
        }

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        // create virtual buttons necessary to capture keyboard events
        opt.right = opt.right || {};
        opt.right.functionText = opt.right.functionText || (id + "_right");
        opt.right.keyCode = opt.right.keyCode || 39; // right arrow
        this.btn_rotate_right = new ButtonExternalController(id + "_RIGHT", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.right.functionText,
            keyCode: opt.right.keyCode,
            callback: opt.callback,
            area: this.div,
            parent: id
        });

        opt.left = opt.left || {};
        opt.left.functionText = opt.left.functionText || (id + "_left");
        opt.left.keyCode = opt.left.keyCode || 37; // left arrow
        this.btn_rotate_left = new ButtonExternalController(id + "_LEFT", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.left.functionText,
            keyCode: opt.left.keyCode,
            callback: opt.callback,
            area: this.div,
            parent: id
        });

        opt.straight = opt.straight || {};
        opt.straight.functionText = opt.straight.functionText || (id + "_straight");
        this.btn_rotate_straight = new ButtonExternalController(id + "_STRAIGHT", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.straight.functionText,
            keyCode: opt.straight.keyCode,
            callback: opt.callback,
            area: this.div,
            parent: id
        });

        Widget.call(this, id, coords, opt);
        return this;
    }

    SteeringWheel.prototype = Object.create(Widget.prototype);
    SteeringWheel.prototype.constructor = SteeringWheel;
    SteeringWheel.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @public
     * @description Hide method of the SteeringWheel widget. This method changes parent div display to none.
     * @memberof module:SteeringWheel
     * @instance
     */
    SteeringWheel.prototype.hide = function () {
        return this.div.style("display", "none");
    };

    /**
     * @function reveal
     * @public
     * @description Reveal method of the SteeringWheel widget. This method changes parent div display to block.
     * @memberof module:SteeringWheel
     * @instance
     */
    SteeringWheel.prototype.reveal = function () {
        return this.div.style("display", "block");
    };

     /**
     * @function rotate
     * @public
     * @description Rotate method of the SteeringWheel widget. This method rotates the steering wheel SVG, i.e. the steering wheel image, by the value of 'val'.
     * @param val {Float} Rotation angle (degrees). Positive values indicate clockwise rotation; negative values are for counter-clockwise rotations.
     * @example <caption>Usage of API to create a new Steering Wheel, as well as to rotate it 45 degrees counter-clockwise.</caption>
     *   define(function (require, exports, module) {
     *     "use strict";
     *
     *     // Require the SteeringWheel module
     *     require("widgets/car/SteeringWheel");
     *
     *     function main() {
     *          // After SteeringWheel module was loaded, initialize it
     *          let wheel = new SteeringWheel(
     *               'example', // id of the wheel element that will be created
     *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
     *               { style: 'ferrari', imagePath: "arcade_game_simulator_full_screen_for_paper/img/steering_wheels/" }
     *               // options, in this case, style represents the SVG image name, available at steering_wheels folder.
     *               // 'ferrari' will use "ferrari_steering_wheel.svg" as SVG image.
     *           );
     *
     *          wheel.rotate(-45); 
     *     }
     * });
     * 
     * @example <caption>Usage of API to create a new Steering Wheel, as well as to rotate it 90 degrees clockwise.</caption>
     *   define(function (require, exports, module) {
     *     "use strict";
     *
     *     // Require the SteeringWheel module
     *     require("widgets/car/SteeringWheel");
     *
     *     function main() {
     *          // After SteeringWheel module was loaded, initialize it
     *          let wheel = new SteeringWheel(
     *               'example', // id of the wheel element that will be created
     *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
     *               { style: 'ferrari', imagePath: "arcade_game_simulator_full_screen_for_paper/img/steering_wheels/" }
     *               // options, in this case, style represents the SVG image name, available at steering_wheels folder.
     *               // 'ferrari' will use "ferrari_steering_wheel.svg" as SVG image.
     *           );
     *
     *          wheel.rotate(90); 
     *     }
     * });
     * @memberof module:SteeringWheel
     * @instance
     */
    // this API is useful with joypads
    SteeringWheel.prototype.rotate = function (val) {
        if(val!==0.0) {
            // console.log(val);
            ButtonActionsQueue.queueGUIAction(this.id() + "_rotate(" + val + ")", this.callback);
        }
    };

    /**
     * @function render
     * @public
     * @description Render method of the SteeringWheel widget.
     * @param val {Float} Rotation angle (degrees). Positive values indicate clockwise rotation; negative values are for counter-clockwise rotations.
     * @memberof module:SteeringWheel
     * @instance
     */
    SteeringWheel.prototype.render = function(val) {
        val = val || 0;
        // using Customization widget may end up here for a few seconds while it builds the new steering wheel
        if(this.steering_wheel!==undefined){
            this.steering_wheel.style("transform", "rotate(" + val + "deg)");
        }
        return this.reveal();
    };

    module.exports = SteeringWheel;
});
