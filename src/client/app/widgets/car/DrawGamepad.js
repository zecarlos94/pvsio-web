/**
 * @module DrawGamepad
 * @version 2.0.0
 * @author José Carlos
 * @desc This module allows to design the PlayStation4 and XBOX One gamepads. That is, allows to draw an SVG image of the gamepad 
 * where its buttons are defined, whose action is formally specified in the main.pvs file. Interactive buttons were defined using 
 * ButtonEVO Widget.
 *
 * @date October 6, 2017
 * last modified @date Apr 17, 2018
 *
 * @example <caption>Usage of DrawGamepad within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the DrawGamepad module
 *     require("widgets/car/DrawGamepad");
 *
 *     function main() {
 *          // After DrawGamepad module was loaded, initialize it
 *          let drawGamepad = new DrawGamepad(
 *               'example', // id of the gauge element that will be created
 *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
 *               { 
 *                  style: 'ps4', // Possible values are 'ps4' and 'xbox', since we only have those 2 gamepads images with all its buttons defined.
 *                  buttonsPVS: [ "accelerate", "brake", "triangle", "square", "options", "share", "touchpad", "ps", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ],
 *                  // actions defined in main.pvs file, i.e., button cross of PS4 gamepad action will be "press_accelerate"/"release_accelerate".
 *                  // Left and Right sticks are not defined as ['press/release'] events, so actions will be "click_rightStick".
 *               } // options
 *           );
 *
 *          // Render the DrawGamepad widget
 *          drawGamepad.render();
 * 
 *          // Hides the DrawGamepad widget
 *          drawGamepad.hide();
 * 
 *          // Reveals/Shows the DrawGamepad widget
 *          drawGamepad.reveal();
 * 
 *          // Triggers action "click_rightStick", using ButtonActionsQueue instance.
 *          drawGamepad.callClickPVS("rightStick");
 * 
 *          // Triggers actions "press_accelerate" and "release_accelerate", using ButtonActionsQueue instance.
 *          drawGamepad.callPressReleasePVS("accelerate");
 * 
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    let Widget = require("widgets/Widget"),
        Button = require("widgets/core/ButtonEVO"),
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();

    /**
     * @function constructor
     * @description Constructor for the DrawGamepad widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 0, left: 0, width: 250, height: 250 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "body").</li>
     *          <li>style (String): a valid style identifier (default is "ps4").</li>
     *          <li>buttonsPVS (Array): the actions defined in main.pvs file, which are used to define all gamepad buttons, ButtonEVO, ids (default is [ "a", "b", "y", "x", "menu", "windows", "xbox", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ] for style "xbox" and [ "cross", "circle", "triangle", "square", "options", "share", "touchpad", "ps", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ] for style "ps4").</li>
     * @returns {DrawGamepad} The created instance of the widget DrawGamepad.
     * @memberof module:DrawGamepad
     * @instance
     */
    function DrawGamepad(id, coords, opt) {
        opt = opt || {};
        opt.style = opt.style || "ps4";
        opt.buttonsPVS = opt.buttonsPVS;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 250;
        this.height = coords.height || 250;

        if(opt.style==="xbox"){
            this.buttonsPVS = (opt.buttonsPVS && opt.buttonsPVS.length===13) ? opt.buttonsPVS : [ "a", "b", "y", "x", "menu", "windows", "xbox", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ];
        }else if(opt.style==="ps4"){
            this.buttonsPVS = (opt.buttonsPVS && opt.buttonsPVS.length===14) ? opt.buttonsPVS : [ "cross", "circle", "triangle", "square", "options", "share", "touchpad", "ps", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ];
        }

        this.parent = (opt.parent) ? ("#" + opt.parent) : "body";
        this.style = (opt.style) ? (opt.style) : "";
       
        let _this = this;
        let gamepad_file = "text!widgets/car/virtual_controllers/" + opt.style + ".svg";
        require([gamepad_file], function(gamepad) {
            _this.div.append("div").attr("id", id + "_SW").html(gamepad);
            // Scale svg according to scale factor
            let svgHeight = parseFloat(_this.div.select("svg").style("height").replace("px", ""));
            let svgWidth = parseFloat(_this.div.select("svg").style("width").replace("px", ""));
            let widthDiff = svgWidth - _this.width;
            let heightDiff = svgHeight - _this.height;
            let ratio = (widthDiff === heightDiff || widthDiff > heightDiff) ?
                            _this.width / svgWidth : _this.height / svgHeight;
            _this.div.style("transform", "scale(" + ratio + ")");
            _this.gamepad = _this.div.select("svg");
            _this.gamepad.style("transition", "transform 0.3s");
            return _this;
        });

        this.div = d3.select(this.parent)
                        .append("div").attr("id", id);
   
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        if(opt.style==="xbox"){
            this.btn_a= new Button(this.buttonsPVS[0], {
                top: 115, left: 377, width: 32, height: 32
            }, {
                keyCode: 49, 
                callback: opt.callback,
                evts: ['press/release']
            });

            this.btn_b= new Button(this.buttonsPVS[1], {
                top: 83, left: 408, width: 32, height: 32
            }, {
                keyCode: 50, 
                callback: opt.callback,
                evts: ['press/release']
            });

            this.btn_y= new Button(this.buttonsPVS[2], {
                top: 50, left: 377, width: 32, height: 32
            }, {
                keyCode: 51, 
                callback: opt.callback,
                evts: ['press/release']
            });

            this.btn_x= new Button(this.buttonsPVS[3], {
                top: 83, left: 345, width: 32, height: 32
            }, {
                keyCode: 52, 
                callback: opt.callback,
                evts: ['press/release']
            });

            this.btn_menu= new Button(this.buttonsPVS[4], {
                top: 89, left: 298, width: 22, height: 22
            }, {
                keyCode: 53, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_windows= new Button(this.buttonsPVS[5], {
                top: 89, left: 233, width: 22, height: 22
            }, {
                keyCode: 54, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_xbox= new Button(this.buttonsPVS[6], {
                top: 20, left: 253, width: 46, height: 46
            }, {
                keyCode: 56, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_leftArrow= new Button(this.buttonsPVS[7], {
                top: 167, left: 188, width: 22, height: 22
            }, {
                keyCode: 37, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_upArrow= new Button(this.buttonsPVS[8], {
                top: 144, left: 207, width: 22, height: 22
            }, {
                keyCode: 38, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_rightArrow= new Button(this.buttonsPVS[9], {
                top: 167, left: 228, width: 22, height: 22
            }, {
                keyCode: 39, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_downArrow= new Button(this.buttonsPVS[10], {
                top: 189, left: 206, width: 22, height: 22
            }, {
                keyCode: 40, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_rightStick= new Button(this.buttonsPVS[11], {
                top: 148, left: 309, width: 52, height: 52
            }, {
                keyCode: 57, 
                callback: opt.callback,
            });

            this.btn_leftStick= new Button(this.buttonsPVS[12], {
                top: 74, left: 135, width: 52, height: 52
            }, {
                keyCode: 48, 
                callback: opt.callback,
            });
        }else if(opt.style==="ps4"){
            this.btn_cross= new Button(this.buttonsPVS[0], {
                top: 120, left: 425, width: 32, height: 32
            }, {
                keyCode: 49, 
                callback: opt.callback,
                evts: ['press/release']
            });

            this.btn_circle= new Button(this.buttonsPVS[1], {
                top: 82, left: 463, width: 32, height: 32
            }, {
                keyCode: 50, 
                callback: opt.callback,
                evts: ['press/release']
            });

            this.btn_triangle= new Button(this.buttonsPVS[2], {
                top: 45, left: 425, width: 32, height: 32
            }, {
                keyCode: 51, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_square= new Button(this.buttonsPVS[3], {
                top: 82, left: 387, width: 32, height: 32
            }, {
                keyCode: 52, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_options= new Button(this.buttonsPVS[4], {
                top: 35, left: 375, width: 20, height: 30
            }, {
                keyCode: 53, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_share= new Button(this.buttonsPVS[5], {
                top: 35, left: 165, width: 20, height: 30
            }, {
                keyCode: 54, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_touchpad= new Button(this.buttonsPVS[6], {
                top: 25, left: 195, width: 170, height: 90
            }, {
                keyCode: 55, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_ps= new Button(this.buttonsPVS[7], {
                top: 160, left: 268, width: 26, height: 26
            }, {
                keyCode: 56, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_leftArrow= new Button(this.buttonsPVS[8], {
                top: 87, left: 79, width: 24, height: 24
            }, {
                keyCode: 37, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_upArrow= new Button(this.buttonsPVS[9], {
                top: 60, left: 108, width: 24, height: 24
            }, {
                keyCode: 38, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_rightArrow= new Button(this.buttonsPVS[10], {
                top: 87, left: 137, width: 24, height: 24
            }, {
                keyCode: 39, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_downArrow= new Button(this.buttonsPVS[11], {
                top: 115, left: 108, width: 24, height: 24
            }, {
                keyCode: 40, 
                callback: opt.callback,
                evts: ['press/release']                
            });

            this.btn_rightStick= new Button(this.buttonsPVS[12], {
                top: 136, left: 332, width: 62, height: 62
            }, {
                keyCode: 57, 
                callback: opt.callback,
            });

            this.btn_leftStick= new Button(this.buttonsPVS[13], {
                top: 136, left: 168, width: 62, height: 62
            }, {
                keyCode: 48, 
                callback: opt.callback,
            });
        }

        Widget.call(this, id, coords, opt);
        return this;
    }

    DrawGamepad.prototype = Object.create(Widget.prototype);
    DrawGamepad.prototype.constructor = DrawGamepad;
    DrawGamepad.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description Hide method of the DrawGamepad widget. This method changes parent div display to none.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.hide = function () {
        return this.div.style("display","none");
    };

    /**
     * @function reveal
     * @description Reveal method of the DrawGamepad widget. This method changes parent div display to block.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.reveal = function () {
        return this.div.style("display","block");
    };

     /**
     * @function callPressReleasePVS
     * @description CallPressReleasePVS method of the DrawGamepad widget. This method calls a PVS press/release function in main.pvs file, based on the required buttonName.
     * @param buttonName (String) Pressed ButtonEVO name, i.e. name of the pressed interactive button on the gamepad image, which will be used to invoke the PVS action, which is formally specified in the main.pvs file.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.callPressReleasePVS = function (buttonName) {
       ButtonActionsQueue.queueGUIAction("press_"+buttonName, this.callback);
       ButtonActionsQueue.queueGUIAction("release_"+buttonName, this.callback);
    }

    /**
     * @function callClickPVS
     * @description CallClickPVS method of the DrawGamepad widget. This method calls a PVS click function in main.pvs file, based on the required buttonName.
     * @param buttonName (String) Clicked ButtonEVO name, i.e. name of the clicked interactive button on the gamepad image, which will be used to invoke the PVS action, which is formally specified in the main.pvs file.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.callClickPVS = function (buttonName) {
        ButtonActionsQueue.queueGUIAction("click_"+buttonName, this.callback);
     }
 
    /**
     * @function render
     * @description Render method of the DrawGamepad widget. Basically, it renders all ButtonEVO Widgets defined based on opt.style value, i.e., based on the required gamepad.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.render = function () {
        if(this.style==="ps4"){
            this.btn_cross.render();
            this.btn_circle.render();
            this.btn_square.render();
            this.btn_triangle.render();
            this.btn_options.render();
            this.btn_share.render();
            this.btn_touchpad.render();
            this.btn_ps.render();
            this.btn_leftArrow.render();
            this.btn_upArrow.render();
            this.btn_rightArrow.render();
            this.btn_downArrow.render();
            this.btn_leftStick.render();
            this.btn_rightStick.render();
        }else if(this.style==="xbox"){
            this.btn_a.render();
            this.btn_b.render();
            this.btn_x.render();
            this.btn_y.render();
            this.btn_menu.render();
            this.btn_windows.render();
            this.btn_xbox.render();
            this.btn_leftArrow.render();
            this.btn_upArrow.render();
            this.btn_rightArrow.render();
            this.btn_downArrow.render();
            this.btn_leftStick.render();
            this.btn_rightStick.render();
        }
        return this.reveal();
    };

    module.exports = DrawGamepad;
});
