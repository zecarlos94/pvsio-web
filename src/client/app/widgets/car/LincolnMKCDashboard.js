/**
 * @module LincolnMKCDashboard
 * @version 1.0.0
 * @author José Carlos
 * @desc This module allows to design the 2015 Lincoln MKC Dashboard, for the case study discussed in the ICGI2018 paper.
 *
 * @date Jul 10, 2018
 * last modified @date Aug 14, 2018
 *
 * @example <caption>Usage of LincolnMKCDashboard within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the LincolnMKCDashboard module
 *     require("widgets/car/LincolnMKCDashboard");
 *
 *     function main() {
 *          // After LincolnMKCDashboard module was loaded, initialize it
 *          let lincolnMKCDashboard = new LincolnMKCDashboard(
 *               'example', // id of the lincolnMKCDashboard element that will be created
 *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
 *               { 
 *                  parent: "content", // defines parent div, which is div id="body" by default 
 *                  dashIndex: 1,  
 *                  design: "before", // "after"  
 *                  buttonsPVS: [ "startAndStop", "activateSportMode"],
 *                  // actions defined in main.pvs file, i.e., button startAndStop of Lincoln MKC Dashboard action will be "press_startAndStop"/"release_startAndStop".
 *               } // options
 *           );
 *
 *          // Available methods:
 *          // Render the LincolnMKCDashboard widget
 *          lincolnMKCDashboard.render();
 *     }
 * });
 *
 * @example <caption>Usage of other public API's of LincolnMKCDashboard Widget.</caption>
 *
 *  Using variable LincolnMKCDashboard created in the previous example is also possible to call the following,
 *
 *       // Hides the LincolnMKCDashboard widget
 *       lincolnMKCDashboard.hide();
 *
 *       // Reveals/Shows the LincolnMKCDashboard widget
 *       lincolnMKCDashboard.reveal();
 *
 *       // Triggers action "startAndStop", using ButtonActionsQueue instance.
 *       lincolnMKCDashboard.callClickPVS("startAndStop");
 * 
 *       // Triggers actions "press_startAndStop" and "release_startAndStop", using ButtonActionsQueue instance.
 *       lincolnMKCDashboard.callPressReleasePVS("startAndStop");
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jshint esnext:true */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    let Widget = require("widgets/Widget"),
        Button = require("widgets/core/ButtonEVO"),
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();

    /**
     * @function constructor
     * @public
     * @description Constructor for the LincolnMKCDashboard widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 0, left: 0, width: 250, height: 250 }.
     * @param opt {Object} Options:
     * @param [opt.parent] {String} the HTML element where the display will be appended (default is "body").
     * @param [opt.dashIndex] {Bool} is the index of full dashboard placed as a suffix in the filename (default is 1).
     * @param [opt.design] {String} the image with lincolnMKCDashboard to load. Only has 2 values: 'before', i.e. the design before General Motors recalled the vehicles, and 'after', i.e. the design after General Motors recalled the vehicles (default is "before").
     * @param [opt.buttonsPVS] {Array} the actions defined in main.pvs file, which are used to define all Lincoln MKC Dashboard buttons, ButtonEVO, ids (default is [ "startAndStop", "activateSportMode" ]).
     * @returns {LincolnMKCDashboard} The created instance of the widget LincolnMKCDashboard.
     * @memberof module:LincolnMKCDashboard
     * @instance
     */
    function LincolnMKCDashboard(id, coords, opt) {
        opt = opt || {};
        opt.buttonsPVS = opt.buttonsPVS;
        coords = coords || {};

        this.id = id;
        this.LINCOLNMKCDASHBOARDID = this.id;
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 250;
        this.height = coords.height || 250;

        this.buttonsPVS = (opt.buttonsPVS && opt.buttonsPVS.length===2) ? opt.buttonsPVS : [ "startAndStop", "activateSportMode" ];

        this.parent = (opt.parent) ? ("#" + opt.parent) : "body";
        this.design = (opt.design) ? (opt.design) : "before";
        this.dashIndex = (opt.dashIndex) ? (opt.dashIndex) : 1;

        let _this = this;
        let lincolnMKCDashboard_file = "text!widgets/car/lincoln_mkc_dashboard_case_study/2015_lincoln_mkc_"+this.design+"_recall_"+this.dashIndex+".svg";

        require([lincolnMKCDashboard_file], function(lincolnMKCDashboardFile) {
            if(_this.dashIndex===1){
                if(_this.design==="before"){
                    _this.div.append("div").attr("id", "lincolnMKCDashboard_"+id+"_SW").attr("style", "zoom: 77%").html(lincolnMKCDashboardFile);
                }else if(_this.design==="after"){
                    _this.div.append("div").attr("id", "lincolnMKCDashboard_"+id+"_SW").attr("style", "zoom: 77%").html(lincolnMKCDashboardFile);
                }
            }
        	
            return _this;
        });

    	this.div = d3.select(this.parent)
                     .append("div").attr("id", "lincolnMKCDashboardImage")
                     .style("position", "absolute")
                     .style("top", this.top + "px")
                     .style("left", this.left + "px")
                     .style("width", this.width + "px")
                     .style("z-index", "0")
                     .style("display", "none");

        this.div.append("div").attr("id", "lincolnMKCDashboard_"+this.LINCOLNMKCDASHBOARDID);
                        
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        if(this.dashIndex===1){
            if(this.design==="before"){
                this.startAndStop= new Button(this.buttonsPVS[0], {
                    top: 685, left: 840, width: 16, height: 26
                }, {
                    keyCode: 72, // Key 'h' 
                    parent: "lincolnMKCDashboard_"+this.LINCOLNMKCDASHBOARDID,
                    callback: opt.callback,
                    evts: ['press/release']
                });
        
                this.activateSportMode= new Button(this.buttonsPVS[1], {
                    top: 655, left: 835, width: 16, height: 22
                }, {
                    keyCode: 74, // Key 'j' 
                    parent: "lincolnMKCDashboard_"+this.LINCOLNMKCDASHBOARDID,
                    callback: opt.callback,
                    evts: ['press/release']
                });
            }
            else if(this.design==="after"){
                this.startAndStop= new Button(this.buttonsPVS[0], {
                    top: 545, left: 825, width: 16, height: 22
                }, {
                    keyCode: 72, // Key 'h' 
                    parent: "lincolnMKCDashboard_"+this.LINCOLNMKCDASHBOARDID,
                    callback: opt.callback,
                    evts: ['press/release']
                });
        
                this.activateSportMode= new Button(this.buttonsPVS[1], {
                    top: 685, left: 840, width: 16, height: 26
                }, {
                    keyCode: 74, // Key 'j' 
                    parent: "lincolnMKCDashboard_"+this.LINCOLNMKCDASHBOARDID,
                    callback: opt.callback,
                    evts: ['press/release']
                });
            }
        }

        Widget.call(this, id, coords, opt);
        return this;
    }

    LincolnMKCDashboard.prototype = Object.create(Widget.prototype);
    LincolnMKCDashboard.prototype.constructor = LincolnMKCDashboard;
    LincolnMKCDashboard.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @public
     * @description Hide method of the LincolnMKCDashboard widget. This method changes parent div display to none.
     * @memberof module:LincolnMKCDashboard
     * @instance
     */
    LincolnMKCDashboard.prototype.hide = function () {
        return d3.select("#lincolnMKCDashboardImage").style("display","none");
    };

    /**
     * @function reveal
     * @public
     * @description Reveal method of the LincolnMKCDashboard widget. This method changes parent div display to block.
     * @memberof module:LincolnMKCDashboard
     * @instance
     */
    LincolnMKCDashboard.prototype.reveal = function () {
        return d3.select("#lincolnMKCDashboardImage").style("display","block");
    };

     /**
     * @function callPressReleasePVS
     * @public
     * @description CallPressReleasePVS method of the LincolnMKCDashboard widget. This method calls a PVS press/release function in main.pvs file, based on the required buttonName.
     * @param buttonName {String} Pressed ButtonEVO name, i.e. name of the pressed interactive button on the Lincoln MKC Dashboard image, which will be used to invoke the PVS action, which is formally specified in the main.pvs file.
     * @example <caption>Usage of API to invoke a press/release event on button "startAndStop", using a ButtonActionsQueue instance.
     * button "cross" will only be created by the constructor if "cross" is present in buttonsPVS opt field, by default is.</caption>
     *  define(function (require, exports, module) {
     *     "use strict";
     *
     *     // Require the LincolnMKCDashboard module
     *     require("widgets/car/LincolnMKCDashboard");
     *
     *     function main() {
     *          // After LincolnMKCDashboard module was loaded, initialize it
     *          let lincolnMKCDashboard = new LincolnMKCDashboard(
     *               'example', // id of the lincolnMKCDashboard element that will be created
     *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
     *               {  
     *                  parent: "content", // defines parent div, which is div id="body" by default 
     *                  dashIndex: 1,
     *                  design: "before", // "after", 
     *                  buttonsPVS: [ "startAndStop", "activateSportMode" ],
     *                  // actions defined in main.pvs file, i.e., button startAndStop of Lincoln MKC Dashboard action will be "press_startAndStop"/"release_startAndStop".
     *               } // options
     *           );
     *
     *          lincolnMKCDashboard.callPressReleasePVS("startAndStop");
     *     }
     * });
     * @memberof module:LincolnMKCDashboard
     * @instance
     */
    LincolnMKCDashboard.prototype.callPressReleasePVS = function (buttonName) {
       ButtonActionsQueue.queueGUIAction("press_"+buttonName, this.callback);
       ButtonActionsQueue.queueGUIAction("release_"+buttonName, this.callback);
    };

    /**
     * @function callClickPVS
     * @public
     * @description CallClickPVS method of the LincolnMKCDashboard widget. This method calls a PVS click function in main.pvs file, based on the required buttonName.
     * @param buttonName {String} Clicked ButtonEVO name, i.e. name of the clicked interactive button on the Lincoln MKC Dashboard image, which will be used to invoke the PVS action, which is formally specified in the main.pvs file.
     * @example <caption>Usage of API to invoke a click event on button "startAndStop", using a ButtonActionsQueue instance.
     * button "startAndStop" will only be created by the constructor if "startAndStop" is present in buttonsPVS opt field, by default is.</caption>
     *  define(function (require, exports, module) {
     *     "use strict";
     *
     *     // Require the LincolnMKCDashboard module
     *     require("widgets/car/LincolnMKCDashboard");
     *
     *     function main() {
     *          // After LincolnMKCDashboard module was loaded, initialize it
     *          let lincolnMKCDashboard = new LincolnMKCDashboard(
     *               'example', // id of the lincolnMKCDashboard element that will be created
     *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
     *               {  
     *                  parent: "content", // defines parent div, which is div id="body" by default
     *                  dashIndex: 1,
     *                  design: "before", // "after", 
     *                  buttonsPVS: [ "startAndStop", "activateSportMode" ],
     *                  // actions defined in main.pvs file, i.e., button startAndStop of Lincoln MKC Dashboard action will be "press_startAndStop"/"release_startAndStop".
     *               } // options  
     *           );
     *
     *          lincolnMKCDashboard.callClickPVS("startAndStop");
     *     }
     * });
     * @memberof module:LincolnMKCDashboard
     * @instance
     */
    LincolnMKCDashboard.prototype.callClickPVS = function (buttonName) {
        ButtonActionsQueue.queueGUIAction("click_"+buttonName, this.callback);
    };
 
    /**
     * @function render
     * @public
     * @description Render method of the LincolnMKCDashboard widget. Basically, it renders all ButtonEVO Widgets defined
     * @memberof module:LincolnMKCDashboard
     * @instance
     */
    LincolnMKCDashboard.prototype.render = function () {
        this.startAndStop.render();
        this.activateSportMode.render();
        return this.reveal();
    };

    module.exports = LincolnMKCDashboard;
});
