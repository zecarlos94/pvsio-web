/**
 * @module DrawGamepad
 * @version 1.0.0
 * @author Paolo Masci, José Carlos
 * @desc This module helps you building gauge widgets using SVG files. Uses the Pointer module to
 * draw pointers for the gauges.
 *
 * @date October 6, 2017
 * last modified @date Mar 12, 2018
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
 *          let wheel = new DrawGamepad(
 *               'example', // id of the gauge element that will be created
 *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
 *               { style: 'ps4' } // options
 *           );
 *
 *          // Render the DrawGamepad widget
 *          wheel.render();
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    // let clickableAreaGamepad = window.addEventListener("onclick", ( event ) => {
    //     console.log(event);
    // });

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
     * @returns {DrawGamepad} The created instance of the widget DrawGamepad.
     * @memberof module:DrawGamepad
     * @instance
     */
    function DrawGamepad(id, coords, opt) {
        opt = opt || {};
        opt.style = opt.style || "ps4";
        opt.areas = opt.areas || [];
        opt.opacity = opt.opacity || 1;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 250;
        this.height = coords.height || 250;

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
            this.btn_a= new Button("a", {
                top: 203, left: 646, width: 32, height: 32
            }, {
                keyCode: 49, 
                callback: opt.callback,
            });

            this.btn_b= new Button("b", {
                top: 170, left: 678, width: 32, height: 32
            }, {
                keyCode: 50, 
                callback: opt.callback,
            });

            this.btn_y= new Button("y", {
                top: 140, left: 646, width: 32, height: 32
            }, {
                keyCode: 51, 
                callback: opt.callback,
            });

            this.btn_x= new Button("x", {
                top: 170, left: 615, width: 32, height: 32
            }, {
                keyCode: 52, 
                callback: opt.callback,
            });

            this.btn_menu= new Button("menu", {
                top: 177, left: 568, width: 22, height: 22
            }, {
                keyCode: 53, 
                callback: opt.callback,
            });

            this.btn_windows= new Button("windows", {
                top: 177, left: 502, width: 22, height: 22
            }, {
                keyCode: 54, 
                callback: opt.callback,
            });

            this.btn_xbox= new Button("xbox", {
                top: 115, left: 525, width: 44, height: 44
            }, {
                keyCode: 56, 
                callback: opt.callback,
            });

            this.btn_leftArrow= new Button("leftArrow", {
                top: 248, left: 457, width: 22, height: 22
            }, {
                keyCode: 37, 
                callback: opt.callback,
            });

            this.btn_upArrow= new Button("upArrow", {
                top: 228, left: 477, width: 22, height: 22
            }, {
                keyCode: 38, 
                callback: opt.callback,
            });

            this.btn_rightArrow= new Button("rightArrow", {
                top: 248, left: 497, width: 22, height: 22
            }, {
                keyCode: 39, 
                callback: opt.callback,
            });

            this.btn_downArrow= new Button("downArrow", {
                top: 268, left: 477, width: 22, height: 22
            }, {
                keyCode: 40, 
                callback: opt.callback,
            });

            this.btn_rightStick= new Button("rightStick", {
                top: 230, left: 578, width: 52, height: 52
            }, {
                keyCode: 57, 
                callback: opt.callback,
            });

            this.btn_leftStick= new Button("leftStick", {
                top: 160, left: 405, width: 52, height: 52
            }, {
                keyCode: 48, 
                callback: opt.callback,
            });
        }else if(opt.style==="ps4"){
            this.btn_cross= new Button("cross", {
                top: 120, left: 425, width: 32, height: 32
            }, {
                keyCode: 49, 
                callback: opt.callback,
            });

            this.btn_circle= new Button("circle", {
                top: 82, left: 463, width: 32, height: 32
            }, {
                keyCode: 50, 
                callback: opt.callback,
            });

            this.btn_triangle= new Button("triangle", {
                top: 45, left: 425, width: 32, height: 32
            }, {
                keyCode: 51, 
                callback: opt.callback,
            });

            this.btn_square= new Button("square", {
                top: 82, left: 387, width: 32, height: 32
            }, {
                keyCode: 52, 
                callback: opt.callback,
            });

            this.btn_options= new Button("options", {
                top: 35, left: 375, width: 20, height: 30
            }, {
                keyCode: 53, 
                callback: opt.callback,
            });

            this.btn_share= new Button("share", {
                top: 35, left: 165, width: 20, height: 30
            }, {
                keyCode: 54, 
                callback: opt.callback,
            });

            this.btn_touchpad= new Button("touchpad", {
                top: 25, left: 195, width: 170, height: 90
            }, {
                keyCode: 55, 
                callback: opt.callback,
            });

            this.btn_ps= new Button("ps", {
                top: 160, left: 268, width: 26, height: 26
            }, {
                keyCode: 56, 
                callback: opt.callback,
            });

            this.btn_leftArrow= new Button("leftArrow", {
                top: 87, left: 79, width: 24, height: 24
            }, {
                keyCode: 37, 
                callback: opt.callback,
            });

            this.btn_upArrow= new Button("upArrow", {
                top: 60, left: 108, width: 24, height: 24
            }, {
                keyCode: 38, 
                callback: opt.callback,
            });

            this.btn_rightArrow= new Button("rightArrow", {
                top: 87, left: 137, width: 24, height: 24
            }, {
                keyCode: 39, 
                callback: opt.callback,
            });

            this.btn_downArrow= new Button("downArrow", {
                top: 115, left: 108, width: 24, height: 24
            }, {
                keyCode: 40, 
                callback: opt.callback,
            });

            this.btn_rightStick= new Button("rightStick", {
                top: 136, left: 332, width: 62, height: 62
            }, {
                keyCode: 57, 
                callback: opt.callback,
            });

            this.btn_leftStick= new Button("leftStick", {
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
     * @description hide method of the DrawGamepad widget. This method changes parent div display to none.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.hide = function () {
        return this.div.style("display","none");
    };

    /**
     * @function reveal
     * @description reveal method of the DrawGamepad widget. This method changes parent div display to block.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.reveal = function () {
        return this.div.style("display","block");
    };

    /**
     * @function render
     * @description Render method of the DrawGamepad widget.
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
