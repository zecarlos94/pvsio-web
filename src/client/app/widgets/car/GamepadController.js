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

    let gamepadsKnown = [];
    let gamepadEvents;
    let gamepadPS4Id = "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)";

    // window.addEventListener("keyup",function(ev){
    //     console.log(ev);
    // })

    // window.addEventListener("keydown",function(ev){
    //     console.log(ev);
    // })

    // window.addEventListener("keypress",function(ev){
    //     console.log(ev);
    // })

    gamepadEvents = window.addEventListener("gamepadconnected", ( event ) => {
        // All buttons and axes values can be accessed through
        event.gamepad;
        GamepadController.prototype.connectGamepad(event.gamepad);
        console.log("Gamepad Connected");

    });

    gamepadEvents = window.addEventListener("gamepaddisconnected", ( event ) => {
        // All buttons and axes values can be accessed through
        event.gamepad;
        GamepadController.prototype.disconnectGamepad(event.gamepad);
        console.log("Gamepad Disconnected");
    });

    let Widget = require("widgets/Widget"),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
        SteeringWheel = require("widgets/car/SteeringWheel"), // In order to render rotations when button clicked
        Controller = require("widgets/car/Controller"),
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
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    }
    
    GamepadController.prototype = Object.create(Widget.prototype);
    GamepadController.prototype.constructor = GamepadController;
    GamepadController.prototype.parentClass = Widget.prototype;

    GamepadController.prototype.hide = () => {
        return this.div.style("display", "none");
    };

    GamepadController.prototype.reveal = () => {
        return this.div.style("display", "block");
    };

    GamepadController.prototype.connectGamepad = (gamepad) => {
        GamepadController.prototype.saveGamepad(gamepad);
    };

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

        let controller = new Controller("ps4", gamepad,
        { left: 0, top: 0, height: 0, width: 0 }, {areaDiv: "gamepad_" + gamepad.index});

        requestAnimationFrame(GamepadController.prototype.updateStatus);
    };


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
      
            if (pressed) {
                if(controller.id===gamepadPS4Id){
                    let mappedName = GamepadController.prototype.mappingPS4GamepadButtons(i);
                    b.className = mappedName +" pressed";
                    // carUp.click();
                }else{
                    b.className = "button pressed";
                }

                // TODO Trigger press/release of KeyCodes 37,38,39 & 40 and Trigger Steering Wheel rotation!!!

                // window.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':38}));
                // window.dispatchEvent(new KeyboardEvent('keyup',{'keyCode':38}));

                // GamepadController.prototype.fire("keydown",{ctrlKey:true,keyCode:38})
                // GamepadController.prototype.fire("keyup",{ctrlKey:true,keyCode:38})
            } else {
              b.className = "button";
            }
          }

          let axes = d.getElementsByClassName("axis");
          for (i = 0; i < controller.axes.length; i++) {
            let mappedAxis = GamepadController.prototype.mappingPS4GamepadAxes(i);
            let a = axes[i];
            a.innerHTML = i;
            a.className = mappedAxis + " moving";
            a.setAttribute("value", controller.axes[i].toFixed(4));
          }
        }
      
        requestAnimationFrame(GamepadController.prototype.updateStatus);
      }


    GamepadController.prototype.disconnectGamepad = (gamepad) => {
        GamepadController.prototype.removeGamepad(gamepad);
    };
      
    GamepadController.prototype.removeGamepad = (gamepad) => {
        delete gamepadsKnown[gamepad.index];
        let divToRemove = document.getElementById("gamepad_" + gamepad.index);
        divToRemove.remove();
    };
  
    GamepadController.prototype.listGamepads = function () {
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
              if (gamepads[i].index in gamepadsKnown) {
                    gamepadsKnown[gamepads[i].index] = gamepads[i];
              }
            }
        }
    };

    GamepadController.prototype.listGamepadsKnown = () => {
        setTimeout(function(){  
            for (let i = 0; i < gamepadsKnown.length; i++) {
                console.log(gamepadsKnown[i]);
            }
        }, 500);
    };

    if (!gamepadEvents) {
        setInterval(GamepadController.prototype.listGamepads, 500);
    }

    GamepadController.prototype.mappingPS4GamepadButtons = function (key) {
       
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

    GamepadController.prototype.mappingPS4GamepadAxes = function (key) {
       
        let ps4MappingAxes = [
            {key: 0, value: 'left axis stick left/right'},
            {key: 1, value: 'left axis stick up/down'},
            {key: 2, value: 'right axis stick left/right'},
            {key: 3, value: 'right axis stick up/down'}
        ]

        return ps4MappingAxes[key].value;
    }

//     GamepadController.prototype.fire=function(type,options){
//         let event=new CustomEvent(type);
//         for(let p in options){
//             event[p]=options[p];
//         }
//         window.dispatchEvent(event);
//    }

    // this API is useful with joypads
    GamepadController.prototype.rotate = function (val) {
        ButtonActionsQueue.queueGUIAction(this.id() + "_rotate(" + val + ")", this.callback);
    }

    /**
     * @function render
     * @description Render method of the GamepadController widget.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.render = function(gamepads) {
        let gp = gamepads || null;
        return this.reveal();
    };

    module.exports = GamepadController;
});