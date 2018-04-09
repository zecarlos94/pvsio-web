/**
 * @module GyroscopeController2
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator
 * using Device Orientation available at
 * https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation#Processing_orientation_events
 *
 * @date Apr 05, 2018
 *
 *
 * @example <caption>Usage of GyroscopeController2 within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the GyroscopeController2 module
 *     require("widgets/car/GyroscopeController2");
 *
 *     function main() {
 *          // After GyroscopeController2 module was loaded, initialize it
 *          let GyroscopeController2 = new GyroscopeController2(
 *               'example', // id of the GyroscopeController2 element that will be created
 *               { top: 1000, left: 100, width: 500, height: 500 }, // coordinates object
 *               {
 *                  carAccelerate: car.up, 
 *                  carBrake: car.down,
 *                  carSteeringWheel: car.steeringWheel 
 *               }
 *           );
 *
 *          // Render the GyroscopeController2 widget
 *          GyroscopeController2.render();
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";
   
    /**
     * @description ButtonExternalController 'carAccelerate' to be clicked when a certain gamepad button is pressed.
     * @memberof module:GyroscopeController2
     * @instance
     */
    let carAccelerate;
    /**
     * @description ButtonExternalController 'carBrake' to be clicked when a certain gamepad button is pressed.
     * @memberof module:GyroscopeController2
     * @instance
     */
    let carBrake;
    /**
     * @description SteeringWheel 'carSteeringWheel' to be rotated with gamepad axes values.
     * @memberof module:GyroscopeController2
     * @instance
     */
    let carSteeringWheel;

    let ball;
    let garden;
    let output;
    let maxX;
    let maxY;

    let fixed;
    let h5logo;
    let timestamp;
    let alpha;
    let beta;
    let gamma;
    let deviceOrientationData;

    let Widget = require("widgets/Widget"),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
        SteeringWheel = require("widgets/car/SteeringWheel"), // In order to render rotations when button clicked
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();

    /**
     * @function constructor
     * @description Constructor for the GyroscopeController2 widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>carAccelerate (ButtonExternalController): Button 'accelerate' to accelerate when a certain button is pressed.</li>
     *          <li>carBrake (ButtonExternalController): Button 'brake' to brake when a certain button is pressed.</li>
     *          <li>carSteeringWheel (SteeringWheel): SteeringWheel 'steering_wheel' to rotate the current steering wheel with gyroscope rotation values.</li>
     * @returns {GyroscopeController2} The created instance of the widget GyroscopeController2.
     * @memberof module:GyroscopeController2
     * @instance
     */
    function GyroscopeController2(id, coords, opt) {
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

        this.gyroscope2 = d3.select("#content")
                      .append("div").attr("id", "gyroscope2");

        this.gyroscope2.append("h1").text("Device Orientation");
        this.gyroscope2.append("p").text("Device orientation is ")
                       .append("b")
                       .append("span").attr("id", "doeSupported")
                       .text(" supported on your device.");
        
        this.gyroscope2.append("img").attr("id", "h5logo").attr("src", "html5-logo.svg").attr("class", "h5logo");
        this.gyroscope2.append("h2").text("Rotation Data");

        this.rotationData = this.gyroscope2.append("p");
        this.rotationData.append("b").text("alpha:")
                         .append("span").attr("id", "alpha");
        this.rotationData.append("br");
        this.rotationData.append("b").text("beta:")
                         .append("span").attr("id", "beta");
        this.rotationData.append("br");
        this.rotationData.append("b").text("gamma:")
                         .append("span").attr("id", "gamma");
        this.rotationData.append("br");

        this.gyroscope2.append("p")
                       .append("b").text("Last updated:")
                       .append("span").attr("id", "timestamp");

        this.div = d3.select("#gyroscope").style("margin-bottom","100px");

        this.div.append("div").attr("class", "garden")
                .append("div").attr("class", "ball");

        this.div.append("pre").attr("class", "output");

        this.div.append("style").text( " \
            .garden { \
                position: relative; \
                width : 200px; \
                height: 200px; \
                border: 5px solid #CCC; \
                border-radius: 10px; \
            } \
            .ball { \
                position: absolute; \
                top   : 90px; \
                left  : 90px; \
                width : 20px; \
                height: 20px; \
                background: green; \
                border-radius: 100%; \
              } \
            ");
            
        ball   = document.querySelector('.ball');
        garden = document.querySelector('.garden');
        output = document.querySelector('.output');

        maxX = parseInt($(".garden").css('width'), 10) - parseInt($(".ball").css('width'), 10);
        maxY = parseInt($(".garden").css('height'), 10) - parseInt($(".ball").css('height'), 10);

        fixed = 2;
        h5logo  = document.getElementById("h5logo");
        timestamp = document.getElementById("timestamp");
        alpha = document.getElementById("alpha");
        beta = document.getElementById("beta");
        gamma = document.getElementById("gamma");

        if (window.DeviceOrientationEvent) {
            // window.addEventListener("deviceorientation", handleOrientation, true);
            // window.addEventListener('deviceorientation', deviceOrientationHandler, false);
            window.addEventListener('deviceorientation', deviceOrientationHandlerFinal, false);
            document.getElementById("doeSupported").innerText = "";
        }else {
            alert("Sorry, your browser doesn't support Device Orientation");
        }
        
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    };

    GyroscopeController2.prototype = Object.create(Widget.prototype);
    GyroscopeController2.prototype.constructor =GyroscopeController2;
    GyroscopeController2.prototype.parentClass = Widget.prototype;

    /**
     * @function handleOrientation
     * @description handleOrientation method of the GyroscopeController2 widget. This method changes the object orientation based on its rotation angle.
     * @memberof module:GyroscopeController2
     * @instance
     */
    function handleOrientation(event) {
        let x = event.beta;  // In degree in the range [-180,180]
        let y = event.gamma; // In degree in the range [-90,90]
      
        output.innerHTML  = "beta : " + x + "\n";
        output.innerHTML += "gamma: " + y + "\n";
      
        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x >  90) { x =  90};
        if (x < -90) { x = -90};
      
        // To make computation easier we shift the range of 
        // x and y to [0,180]
        x += 90;
        y += 90;
      
        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        ball.style.top  = (maxX*x/180 - 10) + "px";
        ball.style.left = (maxY*y/180 - 10) + "px";
    }

    function deviceOrientationHandler(evt) {
        deviceOrientationData = evt;
        try {
          timestamp.innerText = new Date(evt.timeStamp);
          alpha.innerText = evt.alpha.toFixed(fixed);
          beta.innerText = evt.beta.toFixed(fixed);
          gamma.innerText = evt.gamma.toFixed(fixed);
          let rotation = "rotate("+ evt.alpha +"deg) rotate3d(1,0,0, "+ (evt.gamma * -1)+"deg)";
          h5logo.style.webkitTransform = rotation;
          h5logo.style.transform = rotation;
        } catch (ex) {
          document.getElementById("doeSupported").innerText = "NOT";
        }
    }

    function deviceOrientationHandlerFinal(evt) {
        deviceOrientationData = evt;
        
        let x = deviceOrientationData.beta;  // In degree in the range [-180,180]
        let y = deviceOrientationData.gamma; // In degree in the range [-90,90]
      
        output.innerHTML  = "beta : " + x + "\n";
        output.innerHTML += "gamma: " + y + "\n";
      
        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x >  90) { x =  90};
        if (x < -90) { x = -90};
      
        // To make computation easier we shift the range of 
        // x and y to [0,180]
        x += 90;
        y += 90;
      
        // 10 is half the size of the ball
        // It center the positioning point to the center of the ball
        ball.style.top  = (maxX*x/180 - 10) + "px";
        ball.style.left = (maxY*y/180 - 10) + "px";

        try {
          timestamp.innerText = new Date(evt.timeStamp);
          alpha.innerText = evt.alpha.toFixed(fixed);
          beta.innerText = evt.beta.toFixed(fixed);
          gamma.innerText = evt.gamma.toFixed(fixed);
          // let rotation = "rotate("+ evt.alpha +"deg) rotate3d(1,0,0, "+ (evt.gamma * -1)+"deg)";
          let rotation = "rotate("+ evt.gamma +"deg)";
          h5logo.style.webkitTransform = rotation;
          h5logo.style.transform = rotation;
        } catch (ex) {
          document.getElementById("doeSupported").innerText = "NOT";
        }
    }

    /**
     * @function hide
     * @description hide method of the GyroscopeController2 widget. This method changes 'gyroscope' div visibility to hidden.
     * @memberof module:GyroscopeController2
     * @instance
     */
    GyroscopeController2.prototype.hide = function () {
        return this.div.style("display", "none");
    };

    /**
     * @function reveal
     * @description reveal method of the GyroscopeController2 widget. This method changes 'gyroscope' div visibility to visible.
     * @memberof module:GyroscopeController2
     * @instance
     */
    GyroscopeController2.prototype.reveal = function () {
        return this.div.style("display", "block");
    };

    /**
     * @function degToRadians
     * @description degToRadians method of the GyroscopeController2 widget. This method converts angles from degrees to radians.
     * @param deg {Float} The angle in degrees instance.
     * @memberof module:GyroscopeController2
     * @instance
     */
    GyroscopeController2.prototype.degToRadians = function (deg) {
        return deg * Math.PI / 180;
    };
    
    /**
     * @function radiansToDegrees
     * @description radiansToDegrees method of the GyroscopeController2 widget. This method converts angles from radians to degrees.
     * @param rad {Float} The angle in radians instance.
     * @memberof module:GyroscopeController2
     * @instance
     */
    GyroscopeController2.prototype.radiansToDegrees = function (rad) {
        return rad * 180 / Math.PI;
    };

     /**
     * @function calculateRotationAngle
     * @description calculateRotationAngle method of the GyroscopeController2 widget. This method converts angles from radians to degrees. Default sensitivity is 1.
     * @param y {Float} The value of vertical axis(up to/or down), between -1 and 1.
     * @param x {Float} The value of horizontal axis(left to/or right), between -1 and 1.  
     * @memberof module:GyroscopeController2
     * @returns {angle} The angle in degrees calculated based on horizontal and vertical axis values read from gamepad.
     * @instance
     */
    GyroscopeController2.prototype.calculateRotationAngle = function (y,x) {
        let angle = 0;
        if(y===null){
            angle = x*100; 
            // Defining interval min,max for rotation(between -90 and 90 degrees)
            if(angle<-90) {
                angle = -90; 
            }else if(angle>90) {
                angle = 90;
            }
        }else{
            if (x !== 0.0 || y !== 0.0) {
                angle = this.radiansToDegrees( Math.atan2(x, y) );
                // Defining interval min,max for rotation(between -90 and 90 degrees)
                if(angle<-90) {
                    angle = -90; 
                }else if(angle>90) {
                    angle = 90;
                }
            }
        }
        return angle;
    };

    /**
     * @function calculateRotationAngle
     * @description calculateRotationAngle method of the GyroscopeController2 widget. This method converts angles from radians to degrees.
     * @param y {Float} The value of vertical axis(up to/or down), between -1 and 1.
     * @param x {Float} The value of horizontal axis(left to/or right), between -1 and 1. 
     * @param sensitivity {Integer} The value of sensitivity of the steering wheel rotation angle, between 1 and 100.
     * @memberof module:GyroscopeController2
     * @returns {angle} The angle in degrees calculated based on horizontal and vertical axis values read from gamepad.
     * @instance
     */
    GyroscopeController2.prototype.calculateRotationAngleWithSensitivity = function (y,x,s) {
        let angle = 0;
        let sensitivity = s/100;
        if(y===null){
            angle = x*100*sensitivity;
        }else{
            if (x !== 0.0 || y !== 0.0) {
                angle = this.radiansToDegrees( Math.atan2(x, y) ) * sensitivity;
            }
        }
        return angle;
    };

    /**
     * @function render
     * @description Render method of the GyroscopeController2 widget.
     * @memberof module:GyroscopeController2
     * @instance
     */
    GyroscopeController2.prototype.render = function () {
        return this.reveal();
    };

    module.exports = GyroscopeController2;
});
