/**
 * @module GyroscopeController
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator
 * using Device Orientation available at
 * https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation#Processing_orientation_events
 *
 * @date Apr 05, 2018
 *
 *
 * @example <caption>Usage of GyroscopeController within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the GyroscopeController module
 *     require("widgets/car/GyroscopeController");
 *
 *     function main() {
 *          // After GyroscopeController module was loaded, initialize it
 *          let GyroscopeController = new GyroscopeController(
 *               'example', // id of the GyroscopeController element that will be created
 *               { top: 1000, left: 100, width: 500, height: 500 }, // coordinates object
 *               {
 *                  parent: "gyroscope",
 *                  carSteeringWheel: car.steeringWheel 
 *               }
 *           );
 *
 *          // Render the GyroscopeController widget
 *          GyroscopeController.render();
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";
   
    /**
     * @description SteeringWheel 'carSteeringWheel' to be rotated with gamepad axes values.
     * @memberof module:GyroscopeController
     * @instance
     */
    let carSteeringWheel;

    let Widget = require("widgets/Widget"),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
        SteeringWheel = require("widgets/car/SteeringWheel"), // In order to render rotations when button clicked
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();

    /**
     * @function constructor
     * @description Constructor for the GyroscopeController widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "gyroscope").</li>
     *          <li>carSteeringWheel (SteeringWheel): SteeringWheel 'steering_wheel' to rotate the current steering wheel with gyroscope rotation values.</li>
     * @returns {GyroscopeController} The created instance of the widget GyroscopeController.
     * @memberof module:GyroscopeController
     * @instance
     */
    function GyroscopeController(id, coords, opt) {
        opt = opt || {};
        opt.parent = opt.parent;
        opt.carSteeringWheel = opt.carSteeringWheel;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.parent = (opt.parent) ? "#"+opt.parent : "#gyroscope";
        carSteeringWheel = (opt.carSteeringWheel) ? opt.carSteeringWheel : null;

        this.div = d3.select(this.parent);

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleOrientation, false);
        }else {
            alert("Sorry, your browser doesn't support Device Orientation");
        }
        
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    };

    GyroscopeController.prototype = Object.create(Widget.prototype);
    GyroscopeController.prototype.constructor =GyroscopeController;
    GyroscopeController.prototype.parentClass = Widget.prototype;

    function getRotationAngleWithSensitivity(gamma,s) {
        let angle = 0;
        let sensitivity = s/100;
        if (gamma !== 0.0) {
            angle = gamma * sensitivity;
        }
        return angle;
    };

    /**
     * @function handleOrientation
     * @description handleOrientation method of the GyroscopeController widget. This method changes the object orientation based on its rotation angle.
     * @memberof module:GyroscopeController
     * @instance
     */
    function handleOrientation(evt) {
        // let z = evt.alpha.toFixed(2);  // In degree in the range [-360,360]
        // let x = evt.beta.toFixed(2);  // In degree in the range [-180,180]
        let y = evt.gamma.toFixed(2); // In degree in the range [-90,90]
        if(y<=-90) {
            y = -90; 
        }else if(y>=90) {
            y = 90;
        }
        carSteeringWheel.rotate(y);
        // Higher than 75% or else the rotation will not be perceptible due to gyroscope sensor optics.
        // carSteeringWheel.rotate(getRotationAngleWithSensitivity(y, 80));
    }

    /**
     * @function hide
     * @description hide method of the GyroscopeController widget. This method changes 'gyroscope' div visibility to hidden.
     * @memberof module:GyroscopeController
     * @instance
     */
    GyroscopeController.prototype.hide = function () {
        return this.div.style("display", "none");
    };

    /**
     * @function reveal
     * @description reveal method of the GyroscopeController widget. This method changes 'gyroscope' div visibility to visible.
     * @memberof module:GyroscopeController
     * @instance
     */
    GyroscopeController.prototype.reveal = function () {
        return this.div.style("display", "block");
    };

    /**
     * @function render
     * @description Render method of the GyroscopeController widget.
     * @memberof module:GyroscopeController
     * @instance
     */
    GyroscopeController.prototype.render = function () {
        return this.reveal();
    };

    module.exports = GyroscopeController;
});
