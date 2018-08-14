/**
 * @module GyroscopeController
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator
 * using Device Orientation available at
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation#Processing_orientation_events}.
 * That is, this module allows to control both steering wheel rotations as well as accelerating/braking, i.e. changing
 * the speedometer values displayed.
 *
 * @date Apr 05, 2018
 * last modified @date Aug 14, 2018
 *
 * @example <caption>Usage of private API's of GyroscopeController Widget.</caption>
 *
 *  Using variable GyroscopeController created in the previous example is also possible to call the following,
 *
 *       //Rotates "carSteeringWheel" left to right, and vice-versa, and presses/releases the "carAccelerate"/"carBrake", based on x,y values. 
 *       //That is, "x" value represents the motion of the device around the x axis, represented in degrees with values 
 *       //ranging from -180 to 180. This represents a front to back motion of the device or vice-versa. 
 *       //That is, "y" value represents the motion of the device around the y axis, represented in degrees with values 
 *       //ranging from -90 to 90. This represents a left to right motion of the device or vice-versa.  
 *       gyroscope.rotateSteeringAngle(x,y);
 * 
 *       //Rotates "carSteeringWheel" left to right, and vice-versa, and presses/releases the "carAccelerate"/"carBrake", based on x,y values, with sensitivity. 
 *       //That is, "x" value represents the motion of the device around the x axis, represented in degrees with values 
 *       //ranging from -180 to 180. This represents a front to back motion of the device or vice-versa. 
 *       //That is, "y" value represents the motion of the device around the y axis, represented in degrees with values 
 *       //ranging from -90*sensitivity to 90*sensitivity. This represents a left to right motion of the device or vice-versa.
 *       //Sensitivity "sensitivity" values range from 0% to 100%.
 *       gyroscope.rotateSteeringAngleWithSensitivity(x,y,sensitivity);
 *
 * @example <caption>Usage of private API.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the GyroscopeController module
 *     require("widgets/car/GyroscopeController");
 *
 *     function main() {
 *          // After GyroscopeController module was loaded, initialize it
 *          let gyroscope = new GyroscopeController(
 *               'example', // id of the gyroscopeController element that will be created
 *               { top: 1000, left: 100, width: 500, height: 500 }, // coordinates object
 *               {
 *                  parent: "gyroscope",
 *                  carSteeringWheel: car.steeringWheel,
 *                  carAccelerate: arcade.up,
 *                  carBrake: arcade.down,
 *                  useSensitivity: false, // Default is false
 *                  sensitivityValue: 50 // Default is 40%  
 *               }
 *           );
 *
 *          // Method that is invoked whenever "deviceorientation" events occur.
 *          gyroscope.handleOrientation(event);
 *      }
 * });
 *
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jshint esnext:true */
/*global define*/
define(function (require, exports, module) {
    "use strict";
   
    /**
     * @description Listening for event 'deviceorientation' to update current device orientation.
     * @memberof module:GyroscopeController
     */
    let gyroscopeEvents;
 
    /**
     * @description SteeringWheel 'carSteeringWheel' to be rotated with gyroscope values.
     * @memberof module:GyroscopeController
     */
    let carSteeringWheel;

    /**
     * @description Button 'carAccelerate' to be pressed/released based on gyroscope values.
     * @memberof module:GyroscopeController
     */

    let carAccelerate;
    /**
     * @description Button 'carBrake' to be pressed/released based on gyroscope values.
     * @memberof module:GyroscopeController
     */
    let carBrake;

    /**
     * @description Boolean 'useSensitivity' is the variable that allows to change between the two rotations APIs (with an without sensitivity)
     * @protected
     * @memberof module:GamepadController
     * @instance
     */
    let useSensitivity;

    /**
     * @description Integer 'sensitivityValue' is the sensitivity value to be applied on the rotation API with sensitivity
     * @protected
     * @memberof module:GamepadController
     * @instance
     */
    let sensitivityValue;

    let Widget = require("widgets/Widget"),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
        SteeringWheel = require("widgets/car/SteeringWheel"), // In order to render rotations when button clicked
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();

    /**
     * @function constructor
     * @public
     * @description Constructor for the GyroscopeController widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     * @param [opt.parent] {String} the HTML element where the display will be appended (default is "gyroscope").
     * @param [opt.carSteeringWheel] {SteeringWheel} SteeringWheel 'steering_wheel' to rotate the current steering wheel with gyroscope rotation values.
     * @param [opt.carAccelerate] {ButtonExternalController} Button 'accelerate' to accelerate when a certain gamepad button is pressed.
     * @param [opt.carBrake] {ButtonExternalController} Button 'brake' to brake when a certain gamepad button is pressed.
     * @param [opt.useSensitivity] {Boolean} boolean to determine which rotation API will be invoked, i.e., with or without sensitivity (default is false).
     * @param [opt.sensitivityValue] {Int} the sensivity value to be provided to the rotation API with sensitivity (default is 40).
     * @returns {GyroscopeController} The created instance of the widget GyroscopeController.
     * @memberof module:GyroscopeController
     * @instance
     */
    function GyroscopeController(id, coords, opt) {
        opt = opt || {};
        opt.parent = opt.parent;
        opt.carSteeringWheel = opt.carSteeringWheel;
        opt.carAccelerate = opt.carAccelerate;
        opt.carBrake = opt.carBrake;
        opt.useSensitivity = opt.useSensitivity || false;
        opt.sensitivityValue = opt.sensitivityValue || 40;

        coords = coords || {};

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.parent = (opt.parent) ? "#"+opt.parent : "#gyroscope";
        carSteeringWheel = (opt.carSteeringWheel) ? opt.carSteeringWheel : null;
        carAccelerate = (opt.carAccelerate) ? opt.carAccelerate : null;
        carBrake = (opt.carBrake) ? opt.carBrake : null;
 
        useSensitivity = (opt.useSensitivity) ? opt.useSensitivity : false;
        sensitivityValue = (opt.sensitivityValue) ? opt.sensitivityValue : 40;

        this.div = d3.select(this.parent);

        if (window.DeviceOrientationEvent) {
            gyroscopeEvents = window.addEventListener("deviceorientation", ( event ) => {
                GyroscopeController.prototype.handleOrientation(event);
            }, false);
        }else {
            alert("Sorry, your browser doesn't support Device Orientation");
        }
        
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    }

    GyroscopeController.prototype = Object.create(Widget.prototype);
    GyroscopeController.prototype.constructor =GyroscopeController;
    GyroscopeController.prototype.parentClass = Widget.prototype;

     /**
     * @function rotateSteeringAngle
     * @public
     * @description RotateSteeringAngle method of the GyroscopeController widget. This method rotates the steering wheel based on gyroscope angle of inclination(device orientation). Default sensitivity is 100.
     * @param beta {Float} The value of horizontal rotation (is zero when the device is parallel to Earth’s surface), between -180 and 180. It is used to accelerate or brake(press/release opt buttons).
     * @param gamma {Float} The value of vertical axis(up to/or down), between -90 and 90. It is used to calculate the angle in degrees calculated based on vertical axis value given by the gyroscope.
     * @example <caption>Usage of API to create a new Gyroscope Widget, to listen events "deviceorientation" within a PVSio-web demo and
     * to rotate steering wheel Widget received as opt field without sensitivity.</caption>
     * define(function (require, exports, module) {
     *     "use strict";
     *
     *     // Require the GyroscopeController module
     *     require("widgets/car/GyroscopeController");
     *
     *     function main() {
     *          // After GyroscopeController module was loaded, initialize it
     *          let gyroscope = new GyroscopeController(
     *               'example', // id of the gyroscopeController element that will be created
     *               { top: 1000, left: 100, width: 500, height: 500 }, // coordinates object
     *               {
     *                  parent: "gyroscope",
     *                  carSteeringWheel: car.steeringWheel,
     *                  carAccelerate: arcade.up,
     *                  carBrake: arcade.down,
     *                  useSensitivity: false, // Default is false
     *                  sensitivityValue: 50 // Default is 40% 
     *               }
     *           );
     * 
     *          gyroscope.rotateSteeringAngle(x,y);
     *      }
     * });
     * @memberof module:GyroscopeController
     * @returns {GyroscopeController} The created instance of the widget GyroscopeController.
     * @instance
     */
    GyroscopeController.prototype.rotateSteeringAngle = function(beta,gamma) {
        let angle = 0;
        if(carSteeringWheel!==null){
            if (gamma !== 0.0) {
                angle = gamma;
                if(angle<=-90) {
                    angle = -90; 
                }else if(angle>=90) {
                    angle = 90;
                }
            }
            carSteeringWheel.rotate(angle);
        }
        if(carAccelerate!==null && carBrake!==null){
            if(beta <= 30.0){
                carAccelerate.press();
                carAccelerate.release();
            }else if(beta > 30.0){
                carBrake.press();
                carBrake.release();
            }
        }
        return this;
    };

    /**
     * @function rotateSteeringAngleWithSensitivity
     * @public
     * @description RotateSteeringAngleWithSensitivity method of the GyroscopeController widget. This method rotates the steering wheel based on gyroscope angle of inclination(device orientation) and with the required sensitivity.
     * @param beta {Float} The value of horizontal rotation (is zero when the device is parallel to Earth’s surface), between -180 and 180. It is used to accelerate or brake(press/release opt buttons).
     * @param gamma {Float} The value of vertical axis(up to/or down), between -90 and 90. It is used to calculate the angle in degrees calculated based on vertical axis value given by the gyroscope.
     * @param sensitivity {Integer} The value of sensitivity of the steering wheel rotation angle, between 1 and 100.
     * @example <caption>Usage of API to create a new Gyroscope Widget, to listen events "deviceorientation" within a PVSio-web demo and
     * to rotate steering wheel Widget received as opt field with sensitivity of 75%.</caption>
     * define(function (require, exports, module) {
     *     "use strict";
     *
     *     // Require the GyroscopeController module
     *     require("widgets/car/GyroscopeController");
     *
     *     function main() {
     *          // After GyroscopeController module was loaded, initialize it
     *          let gyroscope = new GyroscopeController(
     *               'example', // id of the gyroscopeController element that will be created
     *               { top: 1000, left: 100, width: 500, height: 500 }, // coordinates object
     *               {
     *                  parent: "gyroscope",
     *                  carSteeringWheel: car.steeringWheel 
     *               }
     *           );
     * 
     *          gyroscope.rotateSteeringAngleWithSensitivity(x,y,75);
     *     }
     * });
     * @memberof module:GyroscopeController
     * @returns {GyroscopeController} The created instance of the widget GyroscopeController.
     * @instance
     */
    GyroscopeController.prototype.rotateSteeringAngleWithSensitivity = function(beta,gamma,s) {
        let angle = 0;
        let sensitivity = s/100;
        if(carSteeringWheel!==null){
            if (gamma !== 0.0) {
                angle = gamma * sensitivity;
            }
            carSteeringWheel.rotate(angle);            
        }
        if(carAccelerate!==null && carBrake!==null){
            if(beta <= 30.0){
                carAccelerate.press();
                carAccelerate.release();
            }else if(beta > 30.0){
                carBrake.press();
                carBrake.release();
            }
        }
        return this;
    };

    /**
     * @function handleOrientation
     * @public
     * @description HandleOrientation method of the GyroscopeController widget. This method changes the object orientation based on its rotation angle.
     * @memberof module:GyroscopeController
     * @instance
     */
    GyroscopeController.prototype.handleOrientation = function(evt) {
        if(evt.beta!==null && evt.gamma!==null){
            // let z = evt.alpha.toFixed(2); // In degree in the range [-360,360]
            let x = evt.beta.toFixed(2); // In degree in the range [-180,180]
            let y = evt.gamma.toFixed(2); // In degree in the range [-90,90]
            if(useSensitivity){
                // sensitivityValue higher than 75% or else the rotation will not be perceptible due to gyroscope sensor optics.        
                GyroscopeController.prototype.rotateSteeringAngleWithSensitivity(x,y,sensitivityValue);
            }else{
                GyroscopeController.prototype.rotateSteeringAngle(x,y);
            }
        }
    };

    module.exports = GyroscopeController;
});