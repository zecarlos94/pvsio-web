/**
 * @module VirtualKeypadController
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator using
 * a virtual keypad suitable for mobile devices.
 *
 * @date Mar 02, 2018
 *
 *
 * @example <caption>Usage of VirtualKeypadController within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the VirtualKeypadController module
 *     require("widgets/car/VirtualKeypadController");
 *
 *     function main() {
 *          // After VirtualKeypadController module was loaded, initialize it
 *          let virtualKeypadController = new VirtualKeypadController(
 *               'example', // id of the VirtualKeypadController element that will be created
 *               { top: 800, left: 800, width: 500, height: 500 }, // coordinates object
 *               { parent: 'virtualKeyPad', 
 *                 simulatorActions: 'simulatorActions', 
 *                 simulatorArrows: 'simulatorArrows',
 *                 floatArrows: 'floatArrows',
 *                 blockArrows: 'blockArrows',
 *                 buttonClass: 'buttonClass',
 *                 title: 'title',
 *               } // options, append this widget on div class="virtualKeyPad"
 *           );
 *          // Render the VirtualKeypadController widget
 *          virtualKeypadController.render();
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";
    let isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }
    let Widget = require("widgets/Widget"),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
        SteeringWheel = require("widgets/car/SteeringWheel"), // In order to render rotations when button clicked
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();

    /**
     * @function constructor
     * @description Constructor for the VirtualKeypadController widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "virtualKeyPad").</li>
     *          <li>simulatorActions (String): the HTML element where the action buttons(pause, resume and quit) will be appended (default is "simulatorActions").</li>
     *          <li>simulatorArrows (String): the HTML element where the arrow buttons(left, up, right, down) will be appended (default is "simulatorArrows").</li>
     *          <li>floatArrows (String): the HTML element where the up arrow button will be appended (default is "floatArrows").</li>
     *          <li>blockArrows (String): the HTML element where the arrow buttons(left, right, down) will be appended (default is "blockArrows").</li>
     *          <li>buttonClass (String): the constant string that allows ButtonExternalController widget to use 'button' tags with JQuery-UI images instead of areas as Button widget implements.(default is "buttonClass").</li>
     *          <li>title (String): the button's title(default is 'title').</li>
     * @returns {VirtualKeypadController} The created instance of the widget VirtualKeypadController.
     * @memberof module:VirtualKeypadController
     * @instance
     */
    function VirtualKeypadController(id, coords, opt) {
        opt = opt || {};
        opt.style = opt.style || "";
        opt.parent = opt.parent || "virtualKeyPad";
        opt.simulatorActions = opt.simulatorActions || "simulatorActions";
        opt.simulatorArrows = opt.simulatorArrows || "simulatorArrows";
        opt.floatArrows = opt.floatArrows || "floatArrows";
        opt.blockArrows = opt.blockArrows || "blockArrows";
        opt.buttonClass = opt.buttonClass || "buttonClass";
        opt.title = opt.title || "title";
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.parent = (opt.parent) ? ("." + opt.parent) : null;
        this.simulatorActions = opt.simulatorActions;
        this.simulatorArrows = opt.simulatorArrows;
        this.floatArrows = opt.floatArrows;
        this.blockArrows = opt.blockArrows;
        this.buttonClass = opt.buttonClass;
        this.title = opt.title;
         
        if(isMobile){
            this.div = d3.select(this.parent)
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px")
                        .style("width", this.width + "px")
                        .style("visibility", "hidden");

            this.div.append("div").attr("class", this.simulatorActions)
                    .style("margin-top","-40px")
                    .style("margin-left","-150px");
    
            this.div.append("div").attr("class", this.simulatorArrows)
                    .style("margin-top","-60px")
                    .style("margin-left","250px");
        }else{
            this.div = d3.select(this.parent)
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px")
                        .style("visibility", "hidden");

            this.div.append("div").attr("class", this.simulatorActions)
                    .style("margin-top","-60px")
                    .style("margin-left","-150px");
            
            this.div.append("div").attr("class", this.simulatorArrows)
                    .style("margin-top","-30px")
                    .style("margin-left","250px");
        }

        this.actions = d3.select(".virtualKeyPad")
                         .select("." + this.simulatorActions);

        this.arrows = d3.select(".virtualKeyPad")
                         .selectAll("." + this.simulatorArrows);
        
        this.arrows.append("div").attr("class", this.floatArrows);
        this.arrows.append("div").attr("class", this.blockArrows);

        this.floatArrow = d3.select("." + this.simulatorArrows)
                            .selectAll("." + this.floatArrows);
        
        this.blockArrow = d3.select("." + this.simulatorArrows)
                            .selectAll("." + this.blockArrows);

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        // create virtual buttons to emulate an arrow keyboard
        opt.upArrow = opt.upArrow || {};
        opt.upArrow.functionText = opt.upArrow.functionText || ("accelerate");
        opt.upArrow.keyCode = opt.upArrow.keyCode || 38;
        this.btn_upArrow = new ButtonExternalController("accelerate", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.upArrow.functionText,
            keyCode: opt.upArrow.keyCode, 
            callback: opt.callback,
            area: this.floatArrow,
            parent: id,
            buttonClass: this.buttonClass,
            title: this.title,
            icon: "ui-icon-arrow-1-n",
            evts: ['press/release']
        });

        opt.leftArrow = opt.leftArrow || {};
        opt.leftArrow.functionText = opt.leftArrow.functionText || ("steering_wheel_left");
        opt.leftArrow.keyCode = opt.leftArrow.keyCode || 37;
        this.btn_leftArrow = new ButtonExternalController("steering_wheel_left", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.leftArrow.functionText,
            keyCode: opt.leftArrow.keyCode, 
            callback: opt.callback,
            area: this.blockArrow,
            parent: id,
            buttonClass: this.buttonClass,
            title: this.title,
            icon: "ui-icon-arrow-1-w"
        });

        opt.downArrow = opt.downArrow || {};
        opt.downArrow.functionText = opt.downArrow.functionText || ("brake");
        opt.downArrow.keyCode = opt.downArrow.keyCode || 40;
        this.btn_downArrow = new ButtonExternalController("brake", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.downArrow.functionText,
            keyCode: opt.downArrow.keyCode, 
            callback: opt.callback,
            area: this.blockArrow,
            parent: id,
            buttonClass: this.buttonClass,
            title: this.title,
            icon: "ui-icon-arrow-1-s",
            evts: ['press/release']
        });

        opt.rightArrow = opt.rightArrow || {};
        opt.rightArrow.functionText = opt.rightArrow.functionText || ("steering_wheel_right");
        opt.rightArrow.keyCode = opt.rightArrow.keyCode || 39;
        this.btn_rightArrow = new ButtonExternalController("steering_wheel_right", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.rightArrow.functionText,
            keyCode: opt.rightArrow.keyCode, 
            callback: opt.callback,
            area: this.blockArrow,
            parent: id,
            buttonClass: this.buttonClass,
            title: this.title,
            icon: "ui-icon-arrow-1-e"
        });

        opt.quit = opt.quit || {};
        opt.quit.functionText = opt.quit.functionText || ("quit");
        opt.quit.keyCode = opt.quit.keyCode || 81; // q key
        this.btn_quit = new ButtonExternalController("quit", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.quit.functionText,
            keyCode: opt.quit.keyCode, 
            callback: opt.callback,
            area: this.actions,
            parent: id,
            buttonClass: this.buttonClass,
            title: this.title,
            icon: "ui-icon-power",            
            evts: ['press/release']
        });

        opt.pause = opt.pause || {};
        opt.pause.functionText = opt.pause.functionText || ("pause");
        opt.pause.keyCode = opt.pause.keyCode || 83; // s key
        this.btn_pause = new ButtonExternalController("pause", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.pause.functionText,
            keyCode: opt.pause.keyCode, 
            callback: opt.callback,
            area: this.actions,
            parent: id,
            buttonClass: this.buttonClass,
            title: this.title,
            icon: "ui-icon-pause",
            evts: ['press/release']
        });

        opt.resume = opt.resume || {};
        opt.resume.functionText = opt.resume.functionText || ("resume");
        opt.resume.keyCode = opt.resume.keyCode || 32; // spacebar
        this.btn_resume = new ButtonExternalController("resume", {
            left: 0, top: 0, height: 0, width: 0
        }, {
            customFunctionText: opt.resume.functionText,
            keyCode: opt.resume.keyCode, 
            callback: opt.callback,
            area: this.actions,
            parent: id,
            buttonClass: this.buttonClass,
            title: this.title,
            icon: "ui-icon-play",
            evts: ['press/release']
        });

        Widget.call(this, id, coords, opt);
        return this;
    }

    VirtualKeypadController.prototype = Object.create(Widget.prototype);
    VirtualKeypadController.prototype.constructor = VirtualKeypadController;
    VirtualKeypadController.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description hide method of the VirtualKeypadController widget. This method changes 'virtualKeyPad' div visibility to hidden.
     * @memberof module:VirtualKeypadController
     * @instance
     */
    VirtualKeypadController.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @description reveal method of the VirtualKeypadController widget. This method changes 'virtualKeyPad' div visibility to visible.
     * @memberof module:VirtualKeypadController
     * @instance
     */
    VirtualKeypadController.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

    /**
     * @function show
     * @description show method of the VirtualKeypadController widget. This method shows the current div status, i.e. as it was created by the VirtualKeypadController constructor.
     * @memberof module:VirtualKeypadController
     * @instance
     */
    VirtualKeypadController.prototype.show = function () {
        return this.div;
    };

    /**
     * @function render
     * @description Render method of the VirtualKeypadController widget. This method renders this.div, i.e. the div produced by this widget constructor.
     * @memberof module:VirtualKeypadController
     * @instance
     */
    VirtualKeypadController.prototype.render = function () {
        return this.show();
    };

    module.exports = VirtualKeypadController;
});