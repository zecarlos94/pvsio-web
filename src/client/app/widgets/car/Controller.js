/**
 * @module Controller
 * @version 2.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator
 * using Gamepad API available at https://github.com/bwiklund/gamepad.js
 * Uses navigator.getGamepads()[0] to detect any gamepad connections and
 * to collect the buttons clicked.
 * https://www.w3.org/TR/gamepad/#gamepadbutton-interface
 * https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 *
 * @date Mar 04, 2018
 * last modified @date Mar 09, 2018
 *
 *
 * @example <caption>Usage of Controller within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Controller module
 *     require("widgets/car/Controller");
 *
 *     function main() {
 *          // After Controller module was loaded, initialize it
 *          let Controller = new Controller(
 *               'example', // id of the Controller element that will be created
 *               { top: 1000, left: 100, width: 500, height: 500 }, // coordinates object
 *           );
 *
 *          // Render the Controller widget
 *          Controller.render();
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    let Widget = require("widgets/Widget"),
        Button = require("widgets/Button"),
        SteeringWheel = require("widgets/car/SteeringWheel"), // In order to render rotations when button clicked
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();


    /**
     * @function constructor
     * @description Constructor for the Controller widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     * @returns {Controller} The created instance of the widget Controller.
     * @memberof module:Controller
     * @instance
     */
    function Controller (id, controller, coords, opt) {
        opt = opt || {};
        opt.style = opt.style || "";
        opt.opacity = opt.opacity || 1;
        controller = controller || {};
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        // console.log(controller);

        opt.areaDiv = (opt.areaDiv) ? "#"+opt.areaDiv : "gamepads";
        this.areaDiv = d3.select(opt.areaDiv);
        this.buttonsAreas = [];
        this.axesAreas = [];
        // for (let i = 0; i < controller.buttons.length; i++) {
        //     this.buttonsAreas[i] = new Button("button_"+i, {
        //              left: 0, top: 0, height: 0, width: 0
        //          }, {
        //              customFunctionText: "button_"+i,
        //              keyCode: controller.buttons[i].pressed, 
        //              callback: opt.callback,
        //              area: this.areaDiv,
        //              evts: ['press/release']
        //          });
        // }
        // for (let i = 0; i < controller.axes.length; i++) {
        //     this.axesAreas[i] = new Button("axis_"+i, {
        //              left: 0, top: 0, height: 0, width: 0
        //          }, {
        //              customFunctionText: "axis_"+i,
        //              keyCode: controller.buttons[i].pressed, 
        //              callback: opt.callback,
        //              area: this.areaDiv,
        //              evts: ['press/release']
        //          });
        // }

        // console.log(opt.areaDiv);
        // console.log(this.areaDiv);
        // this.areaDiv = d3.select("#gamepads");
        
        // this.btn_Cross = new Button("accelerate", {
        //      left: 0, top: 0, height: 0, width: 0
        //  }, {
        //      customFunctionText: "accelerate",
        //      keyName: 'Control',  // 'button1'
        //      callback: opt.callback,
        //      area: this.areaDiv,
        //      evts: ['press/release']
        //  });

        // this.btn_Circle = new Button("brake", {
        //     left: 0, top: 0, height: 0, width: 0
        // }, {
        //     customFunctionText: "brake",
        //     keyCode: 40, 
        //     callback: opt.callback,
        //     area: this.areaDiv,
        //     evts: ['press/release']
        // }); 
 

        Widget.call(this, id, controller, coords, opt);
        return this;
    }
    
    Controller.prototype = Object.create(Widget.prototype);
    Controller.prototype.constructor = Controller;
    Controller.prototype.parentClass = Widget.prototype;

    Controller.prototype.hide = () => {
        return this.div.style("display", "none");
    };

    Controller.prototype.reveal = () => {
        return this.div.style("display", "block");
    };

    /**
     * @function render
     * @description Render method of the Controller widget.
     * @memberof module:Controller
     * @instance
     */
    Controller.prototype.render = function() {
        return this.reveal();
    };

    module.exports = Controller;
});
