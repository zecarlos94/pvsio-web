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

    let Widget = require("widgets/Widget"),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
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
        opt.opacity = opt.opacity || 1;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 250;
        this.height = coords.height || 250;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "body";
       
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
            // mapped build manually at https://www.image-map.net/
            _this.gamepad.append("circle").attr("cx","537")
                                          .attr("cy","130")
                                          .attr("r","22")
                                          .attr("opacity","0.2")
                                          .attr("stroke","black")
                                          .attr("stroke-width","3")
                                          .attr("href", " ");

            _this.gamepad.append("circle").attr("cx","589")
                                          .attr("cy","180")
                                          .attr("r","22")
                                          .attr("opacity","0.2")
                                          .attr("stroke","black")
                                          .attr("stroke-width","3")
                                          .attr("href", " ");
              
            _this.gamepad.append("circle").attr("cx","638")
                                          .attr("cy","130")
                                          .attr("r","22")
                                          .attr("opacity","0.2")
                                          .attr("stroke","black")
                                          .attr("stroke-width","3")
                                          .attr("href", " ");
              
            _this.gamepad.append("circle").attr("cx","586")
                                          .attr("cy","80")
                                          .attr("r","22")
                                          .attr("opacity","0.2")
                                          .attr("stroke","black")
                                          .attr("stroke-width","3")
                                          .attr("href", " ");
              
            _this.gamepad.append("circle").attr("cx","483")
                                          .attr("cy","223")
                                          .attr("r","38")
                                          .attr("opacity","0.2")
                                          .attr("stroke","black")
                                          .attr("stroke-width","3")
                                          .attr("href", " ");
              
            _this.gamepad.append("circle").attr("cx","265")
                                          .attr("cy","223")
                                          .attr("r","38")
                                          .attr("opacity","0.2")
                                          .attr("stroke","black")
                                          .attr("stroke-width","3")
                                          .attr("href", " ");
              
            _this.gamepad.append("circle").attr("cx","376")
                                          .attr("cy","228")
                                          .attr("r","20")
                                          .attr("opacity","0.2")
                                          .attr("stroke","black")
                                          .attr("stroke-width","3")
                                          .attr("href", " ");
                                          
            _this.gamepad.append("rect").attr("x","266")
                                        .attr("y","31")
                                        .attr("opacity","0.2")
                                        .attr("height","128")
                                        .attr("width","220");

            _this.gamepad.append("rect").attr("x","504")
                                        .attr("y","48")
                                        .attr("opacity","0.2")
                                        .attr("height","36")
                                        .attr("width","18");
                
            _this.gamepad.append("rect").attr("x","225")
                                        .attr("y","48")
                                        .attr("opacity","0.2")
                                        .attr("height","36")
                                        .attr("width","18");                                         
              
            _this.gamepad.append("rect").attr("x","144")
                                        .attr("y","78")
                                        .attr("opacity","0.2")
                                        .attr("height","32")
                                        .attr("width","32"); 
              
            _this.gamepad.append("rect").attr("x","183")
                                        .attr("y","116")
                                        .attr("opacity","0.2")
                                        .attr("height","32")
                                        .attr("width","32");
              
            _this.gamepad.append("rect").attr("x","144")
                                        .attr("y","155")
                                        .attr("opacity","0.2")
                                        .attr("height","32")
                                        .attr("width","32");
              
            _this.gamepad.append("rect").attr("x","106")
                                        .attr("y","115")
                                        .attr("opacity","0.2")
                                        .attr("height","32")
                                        .attr("width","32");
                                          
            return _this;
        });

        this.div = d3.select(this.parent)
                        .append("div").attr("id", id);

        this.div.append("style").text( " \
            svg circle { \
                -webkit-transition: all 2s ease-out; \
                -moz-transition: all 2s ease-out; \
                -ms-transition: all 2s ease-out; \
                -o-transition: all 2s ease-out; \
                transition: all 2s ease-out; \
            } \
            svg circle:active { \
                opacity: 0.9; \
            } \
            svg rect { \
                -webkit-transition: all 2s ease-out; \
                -moz-transition: all 2s ease-out; \
                -ms-transition: all 2s ease-out; \
                -o-transition: all 2s ease-out; \
                transition: all 2s ease-out; \
            } \
            svg rect:active { \
                opacity: 0.9; \
            } \
            ");
   
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

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
        return document.getElementById("drawGamepad").style.display="none";
    };

    /**
     * @function reveal
     * @description reveal method of the DrawGamepad widget. This method changes parent div display to block.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.reveal = function () {
        return document.getElementById("drawGamepad").style.display="block";
    };

    /**
     * @function render
     * @description Render method of the DrawGamepad widget.
     * @memberof module:DrawGamepad
     * @instance
     */
    DrawGamepad.prototype.render = function() {
        return DrawGamepad.prototype.reveal();
    };

    module.exports = DrawGamepad;
});
