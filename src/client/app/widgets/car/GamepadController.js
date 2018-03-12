/**
 * @module GamepadController
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator
 * using Gamepad API available at https://github.com/bwiklund/gamepad.js
 * Uses navigator.getGamepads()[0] to detect any gamepad connections and
 * to collect the buttons clicked.
 * https://www.w3.org/TR/gamepad/#gamepadbutton-interface
 * https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
 *
 * @date October 23, 2017
 *
 *
 * @example <caption>Usage of GamepadController within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the GamepadController module
 *     require("widgets/car/GamepadController");
 *
 *     function main() {
 *          // After GamepadController module was loaded, initialize it
 *          let GamepadController = new GamepadController(
 *               'example', // id of the GamepadController element that will be created
 *               { top: 1000, left: 100, width: 500, height: 500 }, // coordinates object
 *           );
 *
 *          // Render the GamepadController widget
 *          GamepadController.render();
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    /**
     * @description Array 'gamepadsKnown' has all connected gamepads.
     * @memberof module:GamepadController
     * @instance
     */
    let gamepadsKnown = [];
    let gamepadEvents;
    /**
     * @description 'gamepadPS4Id' has PS4 gamepad unique ID, to use the proper mapping method.
     * @memberof module:GamepadController
     * @instance
     */
    let gamepadPS4Id = "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)";

    /**
     * @description Button 'carAccelerate' to be clicked when a certain gamepad button is pressed.
     * @memberof module:GamepadController
     * @instance
     */
    let carAccelerate;
    /**
     * @description Button 'carBrake' to be clicked when a certain gamepad button is pressed.
     * @memberof module:GamepadController
     * @instance
     */
    let carBrake;
    /**
     * @description SteeringWheel 'carSteeringWheel' to be rotated with gamepad axes values.
     * @memberof module:GamepadController
     * @instance
     */
    let carSteeringWheel;

    /**
     * @description Listening for event 'gamepadconnected' to update known gamepads array.
     * @memberof module:GamepadController
     * @instance
     */
    gamepadEvents = window.addEventListener("gamepadconnected", ( event ) => {
        // All buttons and axes values can be accessed through
        event.gamepad;
        GamepadController.prototype.connectGamepad(event.gamepad);
        console.log("Gamepad Connected");

    });

    /**
     * @description Listening for event 'gamepaddisconnected' to update known gamepads array.
     * @memberof module:GamepadController
     * @instance
     */
    gamepadEvents = window.addEventListener("gamepaddisconnected", ( event ) => {
        // All buttons and axes values can be accessed through
        event.gamepad;
        GamepadController.prototype.disconnectGamepad(event.gamepad);
        console.log("Gamepad Disconnected");
    });

    let Widget = require("widgets/Widget"),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
        SteeringWheel = require("widgets/car/SteeringWheel"), // In order to render rotations when button clicked
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();


    /**
     * @function constructor
     * @description Constructor for the GamepadController widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     * @returns {GamepadController} The created instance of the widget GamepadController.
     * @memberof module:GamepadController
     * @instance
     */
    function GamepadController (id, coords, opt) {
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

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    }
    
    GamepadController.prototype = Object.create(Widget.prototype);
    GamepadController.prototype.constructor = GamepadController;
    GamepadController.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description hide method of the GamepadController widget. This method changes 'gamepads' div visibility to hidden.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.hide = () => {
        this.div = document.getElementById("gamepads");
        this.div.style.visibility = "hidden";
        return ;
    };

    /**
     * @function reveal
     * @description reveal method of the GamepadController widget. This method changes 'gamepads' div visibility to visible.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.reveal = () => {
        this.div = document.getElementById("gamepads");
        this.div.style.visibility = "visible";
        return ;
    };

    /**
     * @function connectGamepad
     * @description connectGamepad method of the GamepadController widget. This method connects 'gamepad'.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.connectGamepad = (gamepad) => {
        GamepadController.prototype.saveGamepad(gamepad);
    };

    /**
     * @function saveGamepad
     * @description saveGamepad method of the GamepadController widget. This method add 'gamepad' to gamepadsKnown array and add its div on the frontend demo.
     * Also invokes updateStatus method to continuously update the aforementioned div with the current values of pressed buttons and angles read from gamepad axes.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.saveGamepad = (gamepad) => {
        gamepadsKnown[gamepad.index] = gamepad;

        let granParent = document.getElementById("content");

        let parent = document.getElementById("gamepads");
        granParent.appendChild(parent);
        
        let d = document.createElement("div");
        d.setAttribute("id", "gamepad_" + gamepad.index);
        parent.appendChild(d);
      
        let t = document.createElement("h1");
        t.style.visibility = "hidden";
        t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
        d.appendChild(t);
      
        let b = document.createElement("div");
        b.className = "buttons";
        b.style.visibility = "hidden";
        for (let i = 0; i < gamepad.buttons.length; i++) {
          let e = document.createElement("span");
          e.className = "button";
          //e.id = "b" + i;
          e.innerHTML = i;
          b.appendChild(e);
        }
      
        d.appendChild(b);
      
        let a = document.createElement("div");
        a.className = "axes";
        a.style.visibility = "hidden";
      
        for (let i = 0; i < gamepad.axes.length; i++) {
          let p = document.createElement("progress");
          p.className = "axis";
          //p.id = "a" + i;
          p.setAttribute("max", "2");
          p.setAttribute("value", "1");
          p.innerHTML = i;
          a.appendChild(p);
        }
      
        d.appendChild(a);
      
        let start = document.getElementById("start");
        if (start) {
          start.style.display = "none";
        }
      
        document.body.appendChild(granParent);
        requestAnimationFrame(GamepadController.prototype.updateStatus);
    };


     /**
     * @function updateStatus
     * @description updateStatus method of the GamepadController widget. This method updates all connected gamepads divs with their current values of pressed buttons and of angles read from gamepad axes.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.updateStatus = () => {
        if (!gamepadEvents) {
            GamepadController.prototype.listGamepads();
        }
      
        let i = 0;
        let j;
      
        for (j in gamepadsKnown) {
            let controller = gamepadsKnown[j];
            let d = document.getElementById("gamepad_" + j);
            let buttons = d.getElementsByClassName("button");
      
          for (i = 0; i < controller.buttons.length; i++) {
            let b = buttons[i];
            let val = controller.buttons[i];
            let pressed = val == 1.0;
            if (typeof(val) == "object") {
              pressed = val.pressed;
              val = val.value;
            }
      
            let pct = Math.round(val * 100) + "%";
            b.style.backgroundSize = pct + " " + pct;
            let clickedOnce=false;                            
            if (pressed) {
                if(controller.id===gamepadPS4Id){
                    let mappedName = GamepadController.prototype.mappingPS4GamepadButtons(i);
                    b.className = mappedName +" pressed";
                    if(carAccelerate && carBrake && carSteeringWheel){
                        if(i===0){ // Button Cross - PS4 Gamepad/External Controller
                            if(!clickedOnce){
                                // carAccelerate.click();
                                carAccelerate.press();
                                carAccelerate.release();
                                clickedOnce=true;
                            }
                        }else if(i===1){ // Button Circle - PS4 Gamepad/External Controller
                            if(!clickedOnce){
                                // carBrake.click();
                                carBrake.press();
                                carBrake.release();
                                clickedOnce=true;
                            }
                        }else if(i===14){ // Left Arrow - PS4 Gamepad/External Controller
                            if(!clickedOnce){
                                // console.log("rotate left");
                                carSteeringWheel.btn_rotate_left.click();
                                clickedOnce=true;
                            }
                        }else if(i===15){ // Right Arrow - PS4 Gamepad/External Controller
                            if(!clickedOnce){
                                // console.log("rotate right");
                                carSteeringWheel.btn_rotate_right.click();
                                clickedOnce=true;
                            }
                        }                            
                    }
                }else{
                    b.className = "button pressed";
                }
            } else {
              b.className = "button";
            }
          }

          let stickThreshold = 0.50;
          let axes = d.getElementsByClassName("axis");
          for (i = 0; i < controller.axes.length; i++) {
            let mappedAxis = GamepadController.prototype.mappingPS4GamepadAxes(i);
            let a = axes[i];
            a.innerHTML = i;
            a.className = mappedAxis + " moving";
            a.setAttribute("value", controller.axes[i].toFixed(4));
            // Max and Min values of 1 and -1 for all gamepads
            if(carSteeringWheel){
                if(i===0){ // left stick - PS4 Gamepad/External Controller
                    // console.log(controller.axes[i].toFixed(4));
                    if(controller.axes[i].toFixed(4)>-1 && controller.axes[i].toFixed(4)<-stickThreshold){
                        // console.log("rotate left");
                        carSteeringWheel.btn_rotate_left.click();
                    }else if(controller.axes[i].toFixed(4)>stickThreshold && controller.axes[i].toFixed(4)<1){
                        // console.log("rotate right");
                        carSteeringWheel.btn_rotate_right.click();
                    }
                }
            }
          }
        }
      
        requestAnimationFrame(GamepadController.prototype.updateStatus);
      }


    /**
     * @function disconnectGamepad
     * @description disconnectGamepad method of the GamepadController widget. This method disconnects 'gamepad'.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.disconnectGamepad = (gamepad) => {
        GamepadController.prototype.removeGamepad(gamepad);
    };
      
    /**
     * @function removeGamepad
     * @description removeGamepad method of the GamepadController widget. This method removes 'gamepad' from gamepadsKnown array and removes its div on the frontend demo.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.removeGamepad = (gamepad) => {
        delete gamepadsKnown[gamepad.index];
        let divToRemove = document.getElementById("gamepad_" + gamepad.index);
        divToRemove.remove();
    };
  
    /**
     * @function listGamepads
     * @description listGamepads method of the GamepadController widget. This method lists all connected gamepads and saved those on gamepadsKnown array.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.listGamepads = () => {
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
              if (gamepads[i].index in gamepadsKnown) {
                    gamepadsKnown[gamepads[i].index] = gamepads[i];
              }
            }
        }
    };

    /**
     * @function listGamepadsKnown
     * @description listGamepadsKnown method of the GamepadController widget. This method lists all saved gamepads, i.e. currently connected.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.listGamepadsKnown = () => {
        setTimeout(function(){  
            for (let i = 0; i < gamepadsKnown.length; i++) {
                console.log(gamepadsKnown[i]);
            }
        }, 500);
    };

    /**
     * @description Running listGamepads method every 500ms to update known gamepads after detecting new connections(gamepadEvents).
     * @memberof module:GamepadController
     * @instance
     */
    if (!gamepadEvents) {
        setInterval(GamepadController.prototype.listGamepads, 500);
    }

    /**
     * @function mappingPS4GamepadButtons
     * @description mappingPS4GamepadButtons method of the GamepadController widget. This method maps all read buttons to PS4 buttons.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.mappingPS4GamepadButtons = (key) => {
       
        let ps4MappingButtons = [
            {key: 0, value: 'button cross'}, 
            {key: 1, value: 'button circle'}, 
            {key: 2, value: 'button square'},
            {key: 3, value: 'button triangle'},
            {key: 4, value: 'button l1'},
            {key: 5, value: 'button r1'},
            {key: 6, value: 'button l2'},
            {key: 7, value: 'button r2'},
            {key: 8, value: 'button share'},
            {key: 9, value: 'button options'},
            {key: 10, value: 'button l3 (press left axis stick)'},
            {key: 11, value: 'button r3 (press right axis stick)'},
            {key: 12, value: 'button up arrow'},
            {key: 13, value: 'button down arrow'},
            {key: 14, value: 'button left arrow'},
            {key: 15, value: 'button right arrow'},
            {key: 16, value: 'button sony ps'},
            {key: 17, value: 'button touchpad'}
        ];

        return ps4MappingButtons[key].value;
    }

     /**
     * @function mappingPS4GamepadAxes
     * @description mappingPS4GamepadAxes method of the GamepadController widget. This method maps all read axes to PS4 axes.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.mappingPS4GamepadAxes = (key) => {
       
        let ps4MappingAxes = [
            {key: 0, value: 'left axis stick left/right'},
            {key: 1, value: 'left axis stick up/down'},
            {key: 2, value: 'right axis stick left/right'},
            {key: 3, value: 'right axis stick up/down'}
        ]

        return ps4MappingAxes[key].value;
    }

    /**
     * @function render
     * @description Render method of the GamepadController widget.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.render = (gamepads) => {
        let gp = gamepads || null;
        return GamepadController.prototype.reveal();
    };

    module.exports = GamepadController;
});