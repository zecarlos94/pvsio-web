/**
 * @module ButtonExternalController
 * @desc ButtonExternalController Widget
 * @author Patrick Oladimeji, José Carlos
 * @date 10/31/13 11:26:16 AM
 *
 * Modified @date 10/23/17 11:23:59 AM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global define*/
define(function (require, exports, module) {
    "use strict";
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
     || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
     isMobile = true;
    }
    var Widget = require("widgets/Widget"),
        d3 = require("d3/d3"),
        property = require("util/property"),
        Timer	= require("util/Timer"),
        Recorder    = require("util/ActionRecorder"),
        Speaker  = require("widgets/TextSpeaker"),
        StateParser = require("util/PVSioStateParser"),
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance(),
        ButtonHalo = require("widgets/ButtonHalo").getInstance();
    //define timer for sensing hold down actions on buttons
    var btnTimer = new Timer(250), timerTickFunction = null;
    //add event listener for timer's tick
    btnTimer.addListener('TimerTicked', function () {
        if (timerTickFunction) {
            timerTickFunction();
        }
    });

    function mouseup(e) {
        btnTimer.reset();
    }

    /**
     * @function constructor
     * @description Constructor for the ButtonExternalController widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>axisX (String): Value of left axis of PS4 gamepad.</li>
     *          <li>axisY (String): Value of right axis of PS4 gamepad.</li>
     *          <li>buttonClass (String): Constant that allows this widget to use 'button' tags instead of 'area' when defining buttons.</li>
     *          <li>title (String): Title of Gamepad's Buttons.</li>
     *          <li>icon (String): JQuery-UI icon class to define VirtualKeypadController widget buttons, i.e. up, left, down, right arrows.</li>
     * @returns {ButtonExternalController} The created instance of the widget ButtonExternalController.
     * @memberof module:ButtonExternalController
     * @instance
     */
    function ButtonExternalController(id, coords, opt) {
        opt = opt || {};
        opt.functionText = opt.functionText || id;
        opt.recallRate = opt.recallRate || 250;
        opt.evts = opt.evts || ["click"];
        opt.callback = opt.callback || function () {};
        opt.buttonReadback = opt.buttonReadback || "";
        // Added properties axisX and axisY so right and left joysticks can work on PS4Controller Widget
        opt.axisX = opt.axisX || "";
        opt.axisY = opt.axisY || "";
        // Added property buttonClass to add JQuery UI Classes on VirtualKeypadController Widget
        opt.buttonClass = opt.buttonClass || "";
        opt.arrowName = opt.arrowName || "";
        opt.title = opt.title || "";
        opt.icon = opt.icon || "";
        opt.keyCode = opt.keyCode || "";
        opt.keyName = opt.keyName || "";
        opt.animation = opt.animation || function () {};
        opt.visibleWhen =  (!opt.visibleWhen || opt.visibleWhen === "") ? "true" : opt.visibleWhen;
        coords = coords || {};
        this.functionText = property.call(this, opt.functionText);
        this.customFunctionText = property.call(this, opt.customFunctionText);
        this.recallRate = property.call(this, opt.recallRate);
        this.evts = property.call(this, opt.evts);
        this.callback = opt.callback;
        this.imageMap = property.call(this);
        this.buttonReadback = property.call(this, opt.buttonReadback);
        // Added properties axisX and axisY so right and left joysticks can work on PS4Controller Widget
        this.axisX = property.call(this, opt.axisX);
        this.axisY = property.call(this, opt.axisY);
        // Added property buttonClass to add JQuery UI Classes on VirtualKeypadController Widget
        this.buttonClass = property.call(this, opt.buttonClass);
        this.arrowName = property.call(this, opt.arrowName);
        this.title = property.call(this, opt.title);
        this.icon = property.call(this, opt.icon);
        this.keyCode = property.call(this, opt.keyCode);
        this.keyName = property.call(this, opt.keyName);
        this.animation = opt.animation;
        this.visibleWhen = property.call(this, opt.visibleWhen);
        this.cursor = opt.cursor || "pointer";

        Widget.call(this, id, "button");
        opt.parent = opt.parent || "prototype";
        opt.prototypeMap = opt.prototypeMap || "prototypeMap";

        var parent = d3.select("map#" + opt.prototypeMap);
        if (parent.empty()) {
            parent = d3.select("#" + opt.parent).append("map").attr("id", opt.prototypeMap)
                .attr("name", opt.prototypeMap);
        }
        this.prototypeMap = opt.prototypeMap;

        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 32;
        this.height = coords.height || 32;

        // Added property buttonClass to add JQuery UI Classes on VirtualKeypadController Widget
        if(opt.buttonClass!==""){
            this.area = (opt.area) ? opt.area.append("button") : parent.append("button");
            var x2 = this.left + this.width;
            var x3 = this.top + this.height;

            if(isMobile){
                if(opt.arrowName!==""){ // this opt.arrowName is necessary to have the visual appearance in VirtualKeypadController widget as in the real keyboard, i.e., having 3 arrows aligned at the bottom and 1 arrow in the middle above them.
                    this.area.attr("id", id).attr("class", opt.buttonClass)
                    .attr("title", opt.title).style("width","60px").style("height","60px").style("margin-left","80px").append("span").attr("class", "ui-button-icon ui-icon "+opt.icon);
                
                    this.area.attr("id", id).append("span").attr("class", "ui-button-icon-space"); 
                }else{
                    this.area.attr("id", id).attr("class", opt.buttonClass)
                        .attr("title", opt.title).style("width","60px").style("height","60px").style("margin-left","10px").style("margin-top","15px").append("span").attr("class", "ui-button-icon ui-icon "+opt.icon);
                    
                    this.area.attr("id", id).append("span").attr("class", "ui-button-icon-space"); 
                }
            }else{
                if(opt.arrowName!==""){ // this opt.arrowName is necessary to have the visual appearance in VirtualKeypadController widget as in the real keyboard, i.e., having 3 arrows aligned at the bottom and 1 arrow in the middle above them.
                    this.area.attr("id", id).attr("class", opt.buttonClass)
                    .attr("title", opt.title).style("margin-left","31px").style("margin-bottom","5px").append("span").attr("class", "ui-button-icon ui-icon "+opt.icon);
                
                    this.area.attr("id", id).append("span").attr("class", "ui-button-icon-space"); 
                }else{
                    this.area.attr("id", id).attr("class", opt.buttonClass)
                        .attr("title", opt.title).append("span").attr("class", "ui-button-icon ui-icon "+opt.icon);
                    
                    this.area.attr("id", id).append("span").attr("class", "ui-button-icon-space"); 
                }
            }
        } else{
            this.area = (opt.area) ? opt.area.append("area") : parent.append("area");
            var x2 = this.left + this.width;
            var x3 = this.top + this.height;

            this.area.attr("shape", "rect").attr("id", id).attr("class", opt.id)
            .attr("coords", this.left + "," + this.top + "," + x2 + "," + x3)
            .style("cursor", this.cursor);
        }

        this.createImageMap({ area: this.area, callback: this.callback });
        if (opt.keyCode) {
            ButtonHalo.installKeypressHandler(this, opt.keyCode, { noHalo: opt.noHalo });
        }
        return this;
    }


    ButtonExternalController.prototype = Object.create(Widget.prototype);
    ButtonExternalController.prototype.constructor = ButtonExternalController;
    ButtonExternalController.prototype.parentClass = Widget.prototype;
    /**
     * @function boundFunctions
     * @returns {String} A comma separated string representing the PVS functions modelling actions over this button.
     * @memberof module:ButtonExternalController
     */
    ButtonExternalController.prototype.boundFunctions = function () {
        var o = this;
        var res = "";
        if (o.evts() && o.evts().length === 1 && o.evts()[0] === "custom") {
            res = o.customFunctionText();
        } else {
            res = o.evts().map(function (d) {
                if (d.indexOf("/") > -1) {
                    return d.split("/").map(function (a) {
                        return a + "_" + o.functionText();
                    }).join(", ");

                } else {
                    return d + "_" + o.functionText();
                }
            }).join(", ");
        }
        return res;
    };

    /**
     * Returns a JSON object representation of this ButtonExternalController.
     * @returns {object}
     * @memberof module:ButtonExternalController
    */
    ButtonExternalController.prototype.toJSON = function () {
        return {
            id: this.id(),
            type: this.type(),
            evts: this.evts(),
            recallRate: this.recallRate(),
            functionText: this.functionText(),
            customFunctionText: this.customFunctionText(),
            boundFunctions: this.boundFunctions(),
            buttonReadback: this.buttonReadback(),
            keyCode: this.keyCode(),
            keyName: this.keyName(),
            visibleWhen: this.visibleWhen()
        };
    };

    /**
     * @function release
     * @description API to simulate a release action on the button
     * @memberof module:ButtonExternalController
     */
    ButtonExternalController.prototype.release = function (opt) {
        opt = opt || {};
        var f = this.functionText();
        var anim = opt.animation || this.animation || function () {};
        opt.callback = opt.callback || this.callback;

        ButtonActionsQueue.queueGUIAction("release_" + f, opt.callback);
        anim();
        Recorder.addAction({
            id: this.id(),
            functionText: this.functionText(),
            action: "release",
            ts: new Date().getTime()
        });
        mouseup(d3.event);
        return this;
    };

    /**
     * @function hide
     * @description API to hide the button (disable actions & restore default mouse cursor)
     * @memberof module:ButtonExternalController
     */
    ButtonExternalController.prototype.hide = function (opt) {
        opt = opt || {};
        opt.prototypeMap = opt.prototypeMap || this.prototypeMap;
        this.cursor = opt.cursor || "default";
        return this.removeImageMap();
    };

    /**
     * @function reveal
     * @description API to reveal the button (disable actions & restore default mouse cursor)
     * @memberof module:ButtonExternalController
     */
    ButtonExternalController.prototype.reveal = function (opt) {
        opt = opt || {};
        opt.prototypeMap = opt.prototypeMap || this.prototypeMap;
        this.cursor = opt.cursor || "pointer";
        if (d3.select("#" + opt.prototypeMap) && d3.select("#" + opt.prototypeMap).node()) {
            if (!d3.select("#" + opt.prototypeMap).select("." + this.id()).node()) {
                // else, re-attach map area and event listeners
                d3.select("#" + opt.prototypeMap).node().append(this.area.node());
                return this.createImageMap({ area: this.area, callback: this.callback });
            }
        }
        return this;
    };

    /**
     * @function press
     * @description API to simulate a single press action on the button
     * @memberof module:ButtonExternalController
     */
    ButtonExternalController.prototype.press = function (opt) {
        opt = opt || {};
        var f = this.functionText();
        var anim = opt.animation || this.animation || function () {};
        opt.callback = opt.callback || this.callback;

        ButtonActionsQueue.queueGUIAction("press_" + f, opt.callback);
        anim();
        Recorder.addAction({
            id: this.id(),
            functionText: this.functionText(),
            action: "press",
            ts: new Date().getTime()
        });
        return this;
    };

    /**
     * @function pressAndHold
     * @description API to simulate a continuous press action on the button
     * @memberof module:ButtonExternalController
     */
    ButtonExternalController.prototype.pressAndHold = function (opt) {
        opt = opt || {};
        var f = this.functionText(),
            widget = this;
        var anim = opt.animation || this.animation || function () {};
        opt.callback = opt.callback || this.callback;

        this.press(opt);
        timerTickFunction = function () {
            console.log("timer ticked_" + f);
            ButtonActionsQueue.queueGUIAction("press_" + f, opt.callback);
            anim();
            //record action
            Recorder.addAction({
                id: widget.id(),
                functionText: widget.functionText(),
                action: "press",
                ts: new Date().getTime()
            });
        };
        btnTimer.interval(this.recallRate()).start();
        return this;
    };

    /**
     * @function click
     * @description API to simulate a click action on the button
     * @memberof module:ButtonExternalController
     */
    ButtonExternalController.prototype.click = function (opt) {
        opt = opt || {};
        var anim = opt.animation || this.animation || function () {};
        opt.callback = opt.callback || this.callback;

        if (this.customFunctionText()) {
            ButtonActionsQueue.queueGUIAction(this.customFunctionText(), opt.callback);
        } else {
            ButtonActionsQueue.queueGUIAction("click_" + this.functionText(), opt.callback);
        }
        anim();
        Recorder.addAction({
            id: this.id(),
            functionText: this.functionText(),
            action: "click",
            ts: new Date().getTime()
        });
        if (this.buttonReadback() && this.buttonReadback() !== "") {
            Speaker.speak(this.buttonReadback());
        }
        return this;
    };

    /**
     * @function render
     * @description API for updating properties of the button, e.g., whether it's enabled
     * @memberof module:ButtonExternalController
     */
    ButtonExternalController.prototype.render = function (txt, opt) {
        opt = opt || {};
        txt = txt || "";
        if (typeof txt === "object") {
            var expr = StateParser.simpleExpressionParser(this.visibleWhen());
            if (expr && expr.res) {
                if (expr.res.type === "constexpr" && expr.res.constant === "true") {
                    return this.reveal();
                } else if (expr.res.type === "boolexpr" && expr.res.binop) {
                    // txt in this case is a PVS state that needs to be parsed
                    var str = StateParser.resolve(txt, expr.res.attr);
                    if (str) {
                        str = StateParser.evaluate(str);
                        if ((expr.res.binop === "=" && str === expr.res.constant) ||
                             (expr.res.binop === "!=" && str !== expr.res.constant)) {
                                 return this.reveal();
                        }
                    }
                }
            }
        }
        return this.hide();
    };
    ButtonExternalController.prototype.renderSample = function (opt) {
        opt = opt || {};
        var txt = opt.txt || this.example;
        return this.render(txt, { visibleWhen: "true" });
    };


    /**
     * @override
     * @function removeImageMap
     * @description Removes the image map area for this button
     * @returns this
     * @memberof ButtonExternalController
     */
    ButtonExternalController.prototype.removeImageMap = function (opt) {
        opt = opt || {};
        opt.prototypeMap = opt.prototypeMap || this.prototypeMap;
        if (d3.select("#" + opt.prototypeMap).node() && d3.select("#" + opt.prototypeMap).select("." + this.id()).node()) {
            d3.select("#" + opt.prototypeMap).select("." + this.id()).node().remove();
        }
        return this;
    };


    /**
     * @override
     * @function createImageMap
     * @description Creates an image map area for this button and binds functions in the button's events property with appropriate
     * calls to function in the PVS model. Whenever a response is returned from the PVS function call, the callback
     * function is invoked.
     * @returns this
     * @memberof ButtonExternalController
     */
    ButtonExternalController.prototype.createImageMap = function (opt) {
        opt = opt || {};
        opt.callback = opt.callback || this.callback;
        opt.prototypeMap = opt.prototypeMap || this.prototypeMap;

        var area = opt.area || ButtonExternalController.prototype.parentClass.createImageMap.apply(this, arguments),
            widget = this,
            f,
            evts;

        var onmouseup = function () {
            if (evts && evts.indexOf("press/release") > -1) {
                widget.release(opt);
            }
            mouseup(d3.event);
            area.on("mouseup", null);
        };
        area.on("mousedown", function () {
            f = widget.functionText();
            evts = widget.evts();
            //perform the click event if there is one
            if (evts && (evts.indexOf('click') >= 0 || evts.indexOf("custom") >= 0)) {
                widget.click(opt);
            } else if (evts && evts.indexOf("press/release") > -1) {
                widget.pressAndHold(opt);
            }
            //register mouseup/out events here
            area.on("mouseup", onmouseup);
        });
        widget.imageMap(area);
        return area;
    };

    module.exports = ButtonExternalController;
});
