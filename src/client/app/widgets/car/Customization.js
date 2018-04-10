/**
 * @module Customization
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you to create and read local files with all configurations required for the arcade simulator. 
 *
 * @date Apr 04, 2018
 *
 * @example <caption>Usage of Customization within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Customization module
 *     require("widgets/car/Customization");
 *
 *     function main() {
 *          // After Customization module was loaded, initialize it
 *          let fs = new Customization(
 *               'example', // id of the gauge element that will be created
 *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
 *               { parent: 'FS' } // options
 *           );
 *
 *          // Render the Customization widget
 *          fs.render();
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
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();
     
    /**
     * @function constructor
     * @description Constructor for the Customization widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 0, left: 0, width: 250, height: 250 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "FS").</li>
     * An example of usage of this configuration is with an hour pointer in a clock - The minimum value is 0,
     * the maximum value is 24, but the pointer completes 2 laps between min and max values.</li>
     * @returns {Customization} The created instance of the widget Customization.
     * @memberof module:Customization
     * @instance
     */
    function Customization(id, coords, opt) {
        opt = opt || {};
        opt.opacity = opt.opacity || 1;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 250;
        this.height = coords.height || 250;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "dashboard";

        this.div = d3.select(this.parent)
                        .attr("class", "container dashboard-container")
                        .style("position", "absolute")
                        .style("margin-left", "0px")
                        .style("margin-top", "0px");
        
        this.div.append("br");
        
        this.customizationDiv = this.div.append("div").attr("class","customization");
        
        this.customizationDiv.append("h4").style("margin-left","5px").text("Select Steering Wheel");
        
        this.customizationDiv.append("br");
        
        this.select=this.customizationDiv.append("div").style("margin-left","35px");
        this.optionsSelect=this.select.append("select").attr("id","selectImage").attr("class","image-picker");
        this.optionsSelect.append("option").attr("value","");
        this.optionsSelect.append("option").attr("data-img-src","../../../client/app/widgets/car/steering_wheels/basic_steering_wheel.svg").attr("value","basic_steering_wheel.svg").text("basic_steering_wheel.svg");
        this.optionsSelect.append("option").attr("data-img-src","../../../client/app/widgets/car/steering_wheels/ferrari_steering_wheel.svg").attr("value","ferrari_steering_wheel.svg").text("ferrari_steering_wheel.svg");
        this.optionsSelect.append("option").attr("data-img-src","../../../client/app/widgets/car/steering_wheels/porsche_steering_wheel.svg").attr("value","porsche_steering_wheel.svg").text("porsche_steering_wheel.svg");
        this.optionsSelect.append("option").attr("data-img-src","../../../client/app/widgets/car/steering_wheels/sparco_steering_wheel.svg").attr("value","sparco_steering_wheel.svg").text("sparco_steering_wheel.svg");
        
        this.customizationDiv.append("br");
        
        this.customizationDiv.append("h4").style("margin-left","5px").text("Customize");

        this.customizationDiv.append("br");

        if(isMobile){
            this.customizationDiv.append("div").attr("class","game-customisation-speedometer")
                        .append("div").attr("class","col-xs-12").attr("id","slidecontainer-speedometer")
                        .append("input").attr("type","range").attr("min","0").attr("max","400").attr("value","340").attr("class","slider").attr("id","myRange-Speedometer")
                        .append("p").style("color","#4CAF50").style("margin-left","15px").text("Value of Speedometer:")
                        .append("span").attr("id","demo-Speedometer");

            this.customizationDiv.append("div").attr("class","game-customisation-tachometer")
                        .append("div").attr("class","col-xs-12").attr("id","slidecontainer-tachometer")
                        .append("input").attr("type","range").attr("min","0").attr("max","20").attr("value","16").attr("class","slider").attr("id","myRange-Tachometer")
                        .append("p").style("color","#4CAF50").style("margin-left","15px").text("Value of Tachometer:")
                        .append("span").attr("id","demo-Tachometer");

            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");

            this.customizationDiv.append("div").attr("class","game-customisation-lanes")
                        .append("div").attr("class","col-xs-12").attr("id","slidecontainer-lanes")
                        .append("input").attr("type","range").attr("min","0").attr("max","3").attr("value","0").attr("class","slider").attr("id","myRange-Lanes")
                        .append("p").style("color","#4CAF50").style("margin-left","15px").text("Number of Track Lanes:")
                        .append("span").attr("id","demo-Lanes");
                        
            this.customizationDiv.append("div").attr("class","game-customisation-hills")
                        .append("div").attr("class","col-xs-12").attr("id","slidecontainer-hills")
                        .append("input").attr("type","range").attr("min","0").attr("max","10").attr("value","0").attr("class","slider").attr("id","myRange-Hills")
                        .append("p").style("color","#4CAF50").style("margin-left","15px").text("Number of Track Hills:")
                        .append("span").attr("id","demo-Hills");
                        
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");

            this.customizationDiv.append("div").attr("class","game-customisation-obstacles")
                        .append("div").attr("class","col-xs-12").attr("id","slidecontainer-obstacles")
                        .append("input").attr("type","range").attr("min","0").attr("max","10").attr("value","0").attr("class","slider").attr("id","myRange-Obstacles")
                        .append("p").style("color","#4CAF50").style("margin-left","15px").text("Number of Track Obstacles:")
                        .append("span").attr("id","demo-Obstacles");

            this.customizationDiv.append("div").attr("class","game-customisation-other-cars")
                        .append("div").attr("class","col-xs-12").attr("id","slidecontainer-other-cars")
                        .append("input").attr("type","range").attr("min","0").attr("max","10").attr("value","0").attr("class","slider").attr("id","myRange-Other-Cars")
                        .append("p").style("color","#4CAF50").style("margin-left","15px").text("Number of Other Vehicles on Track:")
                        .append("span").attr("id","demo-Other-Cars");

            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");

            this.customizationDiv.append("div").attr("class","game-customisation-end")
                        .append("div").attr("class","col-xs-12").attr("id","slidecontainer-end")
                        .append("input").attr("type","range").attr("min","0").attr("max","1").attr("value","0").attr("class","slider").attr("id","myRange-End")
                        .append("p").style("color","#4CAF50").style("margin-left","15px").text("End")
                        .append("span").attr("id","demo-End");
                        
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");

            this.dashboardWidgets=this.div.append("div").attr("class", "dashboard-widgets");

            this.controls=this.dashboardWidgets.append("div").attr("class", "col-xs-8 text-center")
                        .attr("id","instructions")
                        .text("Car controls:");
            this.controls.append("br");
            this.controls.append("span").text("[left/right arrow keys] Turn Left/Right");
            this.controls.append("br");
            this.controls.append("span").text("[up/down arrow keys] Accelerate/Brake");

            this.controls.append("br");
            this.svg=this.dashboardWidgets.append("div")
                        .attr("id", "gauges")
                        .attr("class", "text-center")
                        .style("position", "absolute")
                        .style("margin-left", "370px")
                        .style("margin-top", "430px")
                        .style("zoom", "45%");
            this.svg.append("span").attr("id","speedometer-gauge");
            this.svg.append("span").attr("id","tachometer-gauge")
                .style("float","right");
            
            d3.select("#slidecontainer-end").style("width","15%");

        }else{
            this.customizationDiv.append("div").attr("class","game-customisation-speedometer")
                                .append("div").attr("class","col-xs-12").attr("id","slidecontainer-speedometer")
                                .append("input").attr("type","range").attr("min","0").attr("max","400").attr("value","340").attr("class","slider").attr("id","myRange-Speedometer")
                                .append("p").style("color","#4CAF50").style("margin-left","15px").text("Value of Speedometer:")
                                .append("span").attr("id","demo-Speedometer");

            this.customizationDiv.append("div").attr("class","game-customisation-tachometer")
                                .append("div").attr("class","col-xs-12").attr("id","slidecontainer-tachometer")
                                .append("input").attr("type","range").attr("min","0").attr("max","20").attr("value","16").attr("class","slider").attr("id","myRange-Tachometer")
                                .append("p").style("color","#4CAF50").style("margin-left","15px").text("Value of Tachometer:")
                                .append("span").attr("id","demo-Tachometer");
            
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");

            this.customizationDiv.append("div").attr("class","game-customisation-lanes")
                                .append("div").attr("class","col-xs-12").attr("id","slidecontainer-lanes")
                                .append("input").attr("type","range").attr("min","0").attr("max","3").attr("value","0").attr("class","slider").attr("id","myRange-Lanes")
                                .append("p").style("color","#4CAF50").style("margin-left","15px").text("Number of Track Lanes:")
                                .append("span").attr("id","demo-Lanes");
                                
            this.customizationDiv.append("div").attr("class","game-customisation-hills")
                                .append("div").attr("class","col-xs-12").attr("id","slidecontainer-hills")
                                .append("input").attr("type","range").attr("min","0").attr("max","10").attr("value","0").attr("class","slider").attr("id","myRange-Hills")
                                .append("p").style("color","#4CAF50").style("margin-left","15px").text("Number of Track Hills:")
                                .append("span").attr("id","demo-Hills");
                                
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");

            this.customizationDiv.append("div").attr("class","game-customisation-obstacles")
                                .append("div").attr("class","col-xs-12").attr("id","slidecontainer-obstacles")
                                .append("input").attr("type","range").attr("min","0").attr("max","10").attr("value","0").attr("class","slider").attr("id","myRange-Obstacles")
                                .append("p").style("color","#4CAF50").style("margin-left","15px").text("Number of Track Obstacles:")
                                .append("span").attr("id","demo-Obstacles");
        
            this.customizationDiv.append("div").attr("class","game-customisation-other-cars")
                                .append("div").attr("class","col-xs-12").attr("id","slidecontainer-other-cars")
                                .append("input").attr("type","range").attr("min","0").attr("max","10").attr("value","0").attr("class","slider").attr("id","myRange-Other-Cars")
                                .append("p").style("color","#4CAF50").style("margin-left","15px").text("Number of Other Vehicles on Track:")
                                .append("span").attr("id","demo-Other-Cars");

            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");

            this.customizationDiv.append("div").attr("class","game-customisation-end")
                                .append("div").attr("class","col-xs-12").attr("id","slidecontainer-end")
                                .append("input").attr("type","range").attr("min","0").attr("max","1").attr("value","0").attr("class","slider").attr("id","myRange-End")
                                .append("p").style("color","#4CAF50").style("margin-left","15px").text("End")
                                .append("span").attr("id","demo-End");
                                
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");

            this.dashboardWidgets=this.div.append("div").attr("class", "dashboard-widgets");

            this.controls=this.dashboardWidgets.append("div").attr("class", "col-xs-8 text-center")
                                .attr("id","instructions")
                                .text("Car controls:");
            this.controls.append("br");
            this.controls.append("span").text("[left/right arrow keys] Turn Left/Right");
            this.controls.append("br");
            this.controls.append("span").text("[up/down arrow keys] Accelerate/Brake");
            
            this.controls.append("br");
            this.svg=this.dashboardWidgets.append("div")
                                .attr("id", "gauges")
                                .attr("class", "text-center")
                                .style("position", "absolute")
                                .style("margin-left", "370px")
                                .style("margin-top", "430px")
                                .style("zoom", "45%");
            this.svg.append("span").attr("id","speedometer-gauge");
            this.svg.append("span").attr("id","tachometer-gauge")
                        .style("float","right");

            d3.select("#slidecontainer-end").style("width","6%");
        }

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    }

    Customization.prototype = Object.create(Widget.prototype);
    Customization.prototype.constructor = Customization;
    Customization.prototype.parentClass = Widget.prototype;

    /**
     * @function reveal
     * @description reveal method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.reveal = function () {
        return this.div;
    };

    /**
     * @function render
     * @description Render method of the Customization widget.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.render = function() {
        return this.reveal();
    };

    module.exports = Customization;
});
