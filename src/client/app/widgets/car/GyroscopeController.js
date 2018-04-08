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
 *                  carAccelerate: car.up, 
 *                  carBrake: car.down,
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
     * @description ButtonExternalController 'carAccelerate' to be clicked when a certain gamepad button is pressed.
     * @memberof module:GyroscopeController
     * @instance
     */
    let carAccelerate;
    /**
     * @description ButtonExternalController 'carBrake' to be clicked when a certain gamepad button is pressed.
     * @memberof module:GyroscopeController
     * @instance
     */
    let carBrake;
    /**
     * @description SteeringWheel 'carSteeringWheel' to be rotated with gamepad axes values.
     * @memberof module:GyroscopeController
     * @instance
     */
    let carSteeringWheel;

    /**
     * @description Listening for event 'deviceorientation' to detect changes in device orientation(screen rotation).
     * @memberof module:GyroscopeController
     * @instance
     */
    gamepadEvents =  window.addEventListener("deviceorientation", handleOrientation, true);

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
     *          <li>carAccelerate (ButtonExternalController): Button 'accelerate' to accelerate when a certain button is pressed.</li>
     *          <li>carBrake (ButtonExternalController): Button 'brake' to brake when a certain button is pressed.</li>
     *          <li>carSteeringWheel (SteeringWheel): SteeringWheel 'steering_wheel' to rotate the current steering wheel with gyroscope rotation values.</li>
     * @returns {GyroscopeController} The created instance of the widget GyroscopeController.
     * @memberof module:GyroscopeController
     * @instance
     */
    function GyroscopeController(id, coords, opt) {
        opt = opt || {};
        opt.style = opt.style || "";
        opt.opacity = opt.opacity || 1;
        opt.carAccelerate = opt.carAccelerate;
        opt.carBrake = opt.carBrake;
        opt.carSteeringWheel = opt.carSteeringWheel;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;
        carAccelerate = (opt.carAccelerate) ? opt.carAccelerate : null;
        carBrake = (opt.carBrake) ? opt.carBrake : null;
        carSteeringWheel = (opt.carSteeringWheel) ? opt.carSteeringWheel : null;

        this.div = d3.select("#gyroscope");

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    };

    GyroscopeController.prototype = Object.create(Widget.prototype);
    GyroscopeController.prototype.constructor =GyroscopeController;
    GyroscopeController.prototype.parentClass = Widget.prototype;

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
     * @function degToRadians
     * @description degToRadians method of the GyroscopeController widget. This method converts angles from degrees to radians.
     * @param deg {Float} The angle in degrees instance.
     * @memberof module:GyroscopeController
     * @instance
     */
    GyroscopeController.prototype.degToRadians = function (deg) {
        return deg * Math.PI / 180;
    };
    
    /**
     * @function radiansToDegrees
     * @description radiansToDegrees method of the GyroscopeController widget. This method converts angles from radians to degrees.
     * @param rad {Float} The angle in radians instance.
     * @memberof module:GyroscopeController
     * @instance
     */
    GyroscopeController.prototype.radiansToDegrees = function (rad) {
        return rad * 180 / Math.PI;
    };

     /**
     * @function calculateRotationAngle
     * @description calculateRotationAngle method of the GyroscopeController widget. This method converts angles from radians to degrees. Default sensitivity is 1.
     * @param y {Float} The value of vertical axis(up to/or down), between -1 and 1.
     * @param x {Float} The value of horizontal axis(left to/or right), between -1 and 1.  
     * @memberof module:GyroscopeController
     * @returns {angle} The angle in degrees calculated based on horizontal and vertical axis values read from gamepad.
     * @instance
     */
    GyroscopeController.prototype.calculateRotationAngle = function (y,x) {
        let angle = 0;
        if (x !== 0.0 || y !== 0.0) {
            angle = this.radiansToDegrees( Math.atan2(x, y) );
            // Defining interval min,max for rotation(between -90 and 90 degrees)
            if(angle<-90) {
                angle = -90; 
            }else if(angle>90) {
                angle = 90;
            }

        }
        return angle;
    };

    /**
     * @function calculateRotationAngle
     * @description calculateRotationAngle method of the GyroscopeController widget. This method converts angles from radians to degrees.
     * @param y {Float} The value of vertical axis(up to/or down), between -1 and 1.
     * @param x {Float} The value of horizontal axis(left to/or right), between -1 and 1. 
     * @param sensitivity {Integer} The value of sensitivity of the steering wheel rotation angle, between 1 and 100.
     * @memberof module:GyroscopeController
     * @returns {angle} The angle in degrees calculated based on horizontal and vertical axis values read from gamepad.
     * @instance
     */
    GyroscopeController.prototype.calculateRotationAngleWithSensitivity = function (y,x,s) {
        let angle = 0;
        let sensitivity = s/100;
        if (x !== 0.0 || y !== 0.0) {
            angle = this.radiansToDegrees( Math.atan2(x, y) ) * sensitivity;
        }
        return angle;
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
