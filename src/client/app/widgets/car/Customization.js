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
 *          let customization = new Customization(
 *          "customization-widget",  // id of the gauge element that will be created
 *          {top: 100, left: 700, width: 750, height: 750}, // coordinates object
 *          {
 *            parent: "dashboard", // defines parent div, which is div id="dashboard" by default
 *            sliderColor: "#4CAF50",
 *            imagesSteeringWheels: [
 *            {
 *              path: "../../../client/app/widgets/car/steering_wheels/basic_steering_wheel.svg",
 *              value: "basic_steering_wheel.svg",
 *            },
 *            {
 *              path: "../../../client/app/widgets/car/steering_wheels/ferrari_steering_wheel.svg",
 *              value: "ferrari_steering_wheel.svg",
 *            },
 *            {
 *              path: "../../../client/app/widgets/car/steering_wheels/porsche_steering_wheel.svg",
 *              value: "porsche_steering_wheel.svg",
 *            },
 *            {
 *              path: "../../../client/app/widgets/car/steering_wheels/sparco_steering_wheel.svg",
 *              value: "sparco_steering_wheel.svg",
 *            }
 *            ],
 *            sliderRanges: [
 *            {
 *              name: "speedometer",
 *              min: 0,
 *              max: 400,
 *              value: 340
 *             },
 *             {
 *              name: "tachometer",
 *              min: 0,
 *              max: 20,
 *              value: 16
 *             },
 *             {
 *               name: "lanes",
 *               min: 0,
 *               max: 3,
 *               value: 0
 *             },
 *             {
 *               name: "hills",
 *               min: 0,
 *               max: 10,
 *               value: 0
 *             },
 *             {
 *               name: "obstacles",
 *               min: 0,
 *               max: 10,
 *               value: 0
 *             },
 *             {
 *               name: "other-cars",
 *               min: 0,
 *               max: 10,
 *               value: 0
 *             }
 *             ],
 *             controlsText: ["Car controls:", "[left/right arrow keys] Turn Left/Right", "[up/down arrow keys] Accelerate/Brake" ],
 *             gauges: [
 *             {
 *               name: "speedometer-gauge",
 *               styleId: "",
 *               style: ""
 *             },
 *             {
 *               name: "tachometer-gauge",
 *               styleId: "float",
 *               style: "right"
 *             }
 *             ],
 *             gaugesStyles: [
 *             {
 *               zoom: "45%",
 *               marginLeft: "370px",
 *               marginTop: "430px"
 *             }
 *             ],
 *             callback: onMessageReceived
 *          } // options
 *          );
 * 
 *          // Render the Customization widget
 *          customization.render();
 * 
 * 
 * 
 * 
 * 
 * 
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

    let iterator = 0;
    let brItr = 0;

    let Widget = require("widgets/Widget");
    let Speedometer = require("widgets/car/Speedometer");
    let Tachometer = require("widgets/car/Tachometer");
    let SteeringWheel = require("widgets/car/SteeringWheel");
     
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

        opt.sliderColor = opt.sliderColor || "#4CAF50";
        opt.imagesSteeringWheels = opt.imagesSteeringWheels || [
            {
                path: "../../../client/app/widgets/car/steering_wheels/basic_steering_wheel.svg",
                value: "basic_steering_wheel.svg",
            },
            {
                path: "../../../client/app/widgets/car/steering_wheels/ferrari_steering_wheel.svg",
                value: "ferrari_steering_wheel.svg",
            },
            {
                path: "../../../client/app/widgets/car/steering_wheels/porsche_steering_wheel.svg",
                value: "porsche_steering_wheel.svg",
            },
            {
                path: "../../../client/app/widgets/car/steering_wheels/sparco_steering_wheel.svg",
                value: "sparco_steering_wheel.svg",
            }
        ];
        opt.sliderRanges = opt.sliderRanges || [
            {
                name: "speedometer",
                min: 0,
                max: 400,
                value: 340
            },
            {
                name: "tachometer",
                min: 0,
                max: 20,
                value: 16
            },
            {
                name: "lanes",
                min: 0,
                max: 3,
                value: 0
            },
            {
                name: "hills",
                min: 0,
                max: 10,
                value: 0
            },
            {
                name: "obstacles",
                min: 0,
                max: 10,
                value: 0
            },
            {
                name: "other-cars",
                min: 0,
                max: 10,
                value: 0
            }
        ];

        opt.controlsText = opt.controlsText || [
            "Car controls:",
            "[left/right arrow keys] Turn Left/Right",
            "[up/down arrow keys] Accelerate/Brake"
        ];
        opt.gauges = opt.gauges || [
            {
                name: "speedometer-gauge",
                styleId: "",
                style: ""
            },
            {
                name: "tachometer-gauge",
                styleId: "float",
                style: "right"
            }
        ];
        opt.gaugesStyles = opt.gaugesStyles || [
            {
                zoom: "45%",
                marginLeft: "370px",
                marginTop: "430px"
            }
        ];

        coords = coords || {};

        this.id = id;
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 250;
        this.height = coords.height || 250;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "dashboard";

        this.sliderColor = opt.sliderColor;
        this.imagesSteeringWheels = opt.imagesSteeringWheels;
        this.sliderRanges = opt.sliderRanges;
        this.controlsText = opt.controlsText;
        this.gauges = opt.gauges;
        this.gaugesStyles = opt.gaugesStyles;

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
        for(iterator=0; iterator<this.imagesSteeringWheels.length; iterator++){
            this.optionsSelect.append("option").attr("data-img-src",this.imagesSteeringWheels[iterator].path).attr("value",this.imagesSteeringWheels[iterator].value).text(this.imagesSteeringWheels[iterator].value);
        }
       
        this.customizationDiv.append("br");
        
        this.customizationDiv.append("h4").style("margin-left","5px").text("Customize");

        this.customizationDiv.append("br");
        let aux="",res="",res2="";
        for(iterator=0; iterator<this.sliderRanges.length; iterator++){
            brItr++;
            this.aux=this.customizationDiv.append("div").attr("class","game-customisation-"+this.sliderRanges[iterator].name)
                                 .append("div").attr("class","col-xs-12").attr("id","slidecontainer-"+this.sliderRanges[iterator].name);
            
            if(this.sliderRanges[iterator].name.match(/-/g)){
                aux = this.sliderRanges[iterator].name.split("-");
                res = aux[0].charAt(0).toUpperCase() + aux[0].slice(1);
                res += " "+aux[1].charAt(0).toUpperCase() + aux[1].slice(1);
                res2 = aux[0].charAt(0).toUpperCase() + aux[0].slice(1);
                res2 += "-"+aux[1].charAt(0).toUpperCase() + aux[1].slice(1);

            }else{
                res = this.sliderRanges[iterator].name.charAt(0).toUpperCase() + this.sliderRanges[iterator].name.slice(1);
                res2 = res;
            }

            this.aux.append("input").attr("type","range").attr("min",""+this.sliderRanges[iterator].min).attr("max",""+this.sliderRanges[iterator].max).attr("value",""+this.sliderRanges[iterator].value)
                    .attr("class","slider")
                    .attr("id","myRange-"+res2);

            this.aux.append("p").style("color",this.sliderColor).style("margin-left","15px").text("Value of "+res+":")
                    .append("span").attr("id","demo-"+res2);

            if(brItr===2){
                this.customizationDiv.append("br");
                this.customizationDiv.append("br");
                this.customizationDiv.append("br");
                brItr=0;
            }
        }

        this.customizationDiv.append("div").attr("class","game-customisation-end")
                    .append("div").attr("class","col-xs-12").attr("id","slidecontainer-end")
                    .append("input").attr("type","range").attr("min","0").attr("max","1").attr("value","0").attr("class","slider").attr("id","myRange-End")
                    .append("p").style("color",this.sliderColor).style("margin-left","15px").text("End")
                    .append("span").attr("id","demo-End");
                    
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");

        this.dashboardWidgets=this.div.append("div").attr("class", "dashboard-widgets");

        this.controls=this.dashboardWidgets.append("div").attr("class", "col-xs-8 text-center")
                    .attr("id","instructions")
                    .text(this.controlsText[0]);

        for(iterator=1; iterator<this.controlsText.length; iterator++){
            this.controls.append("br");
            this.controls.append("span").text(this.controlsText[iterator]);
        }

        this.controls.append("br");
        this.svg=this.dashboardWidgets.append("div")
                    .attr("id", "gauges")
                    .attr("class", "text-center")
                    .style("position", "absolute")
                    .style("margin-left", this.gaugesStyles[0].marginLeft)
                    .style("margin-top", this.gaugesStyles[0].marginTop)
                    .style("zoom", this.gaugesStyles[0].zoom);
                    
        for(iterator=0; iterator<this.gauges.length; iterator++){
            if(this.gauges[iterator].styleId!==""){
                this.svg.append("span").attr("id",this.gauges[iterator].name).style(this.gauges[iterator].styleId,this.gauges[iterator].style);
            }else{
                this.svg.append("span").attr("id",this.gauges[iterator].name);
            }
        }
        
        if(isMobile){
            d3.select("#slidecontainer-end").style("width","15%");
        }else{
            d3.select("#slidecontainer-end").style("width","6%");
        }

        this.customizationDiv.append("p")
                             .attr("id","selectedSteeringWheel")
                             .style("visibility", "hidden")
                             .text("");

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    }

    Customization.prototype = Object.create(Widget.prototype);
    Customization.prototype.constructor = Customization;
    Customization.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description Hide method of the Customization widget. This method changes the current main div display to 'none'.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.hide = function () {
        return this.div.style("display","none");
    };

    /**
     * @function reveal
     * @description Reveal method of the Customization widget. This method changes the current main div display to 'block'.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.reveal = function () {
        return this.div.style("display","block");
    };

    /**
     * @function show
     * @description Show method of the Customization widget. This method returns the current main div.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.show = function () {
        return this.div;
    };

    /**
     * @function removeParentAllChilds
     * @description RemoveParentAllChilds method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.removeParentAllChilds = function (id) {
        d3.select("#"+id).selectAll("*").remove();
        return this;
    };

    /**
     * @function removeChild
     * @description removeChild method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.removeChild = function (id) {
        let child = d3.select("#"+id); 
        let parent = child.select(function() { return this.parentNode; });
        parent.select("#"+id).remove();
        return this;
    };

    /**
     * @function setInitRenderingDiv
     * @description SetInitRenderingDiv method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.setInitRenderingDiv = function (initWindowCSSValues) {
        $("#selectImage").imagepicker({
            hide_select: true
        });
    
        let $container = $('.image_picker_selector');
        // initialize
        $container.imagesLoaded( () => {
            $container.masonry({
                columnWidth: 30,
                itemSelector: '.thumbnail'
            });
        });

        let aux = initWindowCSSValues[initWindowCSSValues.length - 1];
        Customization.prototype.reRenderedWindowCSS(initWindowCSSValues.slice(0, -1));
        Customization.prototype.setImagePicker(aux);
        
        return this;
    }
    /**
     * @function setImagePicker
     * @description SetImagePicker method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.setImagePicker = function (aux) {
        $(".image-picker").imagepicker({
            hide_select: true,
            selected: function (option) {
                let values = this.val();
                let path = ($(this).find("option[value='" + $(this).val() + "']").data('img-src'));
                let steeringWheelStyle = values.split("_");       
                d3.select("#selectedSteeringWheel")
                  .text(steeringWheelStyle[0]);
                let lastCSS = [];
                lastCSS.push(aux);
                Customization.prototype.reRenderedWindowCSS(lastCSS);
                if(aux.id!==null){
                    d3.select("#"+aux.id)               
                      .attr('src', path);
                }else if(aux.class!==null){
                    d3.select("."+aux.class)               
                      .attr('src', path);
                }
            }
        }); 
        return this;   
    }

    /**
     * @function getSteeringWheelImage
     * @description GetSteeringWheelImage method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.getSteeringWheelImage = function () {        
       return d3.select("#selectedSteeringWheel")[0][0].innerHTML;
    }

    
    /**
     * @function setLastRenderingDiv
     * @description SetLastRenderingDiv method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.setLastRenderingDiv = function (className) {
        d3.selectAll("."+className).attr('id','last-gauge');
        return this;
    }

    /**
     * @function reRenderedWindowCSS
     * @description ReRenderedWindowCSS method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.reRenderedWindowCSS = function (reRenderedWindowCSSValues) {
        reRenderedWindowCSSValues.forEach( (el) => {
            if(el.id!==null){
                let aux = d3.select("#"+el.id);
                if(el.class!==null){
                    aux.attr("class", el.class);
                }
                el.styles.forEach( (st) => {
                    aux.style(st.property, st.value);
                });
            }else if(el.class!==null){
                let aux = d3.select("."+el.class);
                el.styles.forEach( (st) => {
                    aux.style(st.property, st.value);
                });
            }
        });
        return this;
    };

    /**
     * @function rangeEvents
     * @description RangeEvents method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.rangeEvents = function (sliders) {
        for(let property in sliders){
            let p = property;
            $("#myRange-"+sliders[p].id).on("input", (e) => {
                d3.select("#demo-"+sliders[p].id)[0][0].innerHTML = $(e.target).val() ;
                sliders[p].value = d3.select("#demo-"+sliders[p].id)[0][0].innerHTML;
                d3.select("#myRange-End")[0][0].value = "0";    
            });

            $("#myRange-"+sliders[p].id).trigger("input");
        }

        return sliders;
    };

    /**
     * @function endRange
     * @description EndRange method of the Customization widget. This method ....
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.endRange = function (callback,car,CSSValues,sliders,steeringWheel) {
        let reRenderEnd=0;
        let maxValueEnd=d3.select("#myRange-End")[0][0].value;
        
        $("#myRange-End").on("input", (e) => {
            d3.select("#demo-End")[0][0].innerHTML = $(e.target).val() ;
            maxValueEnd = d3.select("#myRange-End")[0][0].value;
            if(maxValueEnd==1){
                Customization.prototype.removeParentAllChilds("speedometer-gauge").removeParentAllChilds("tachometer-gauge").removeChild("steering_wheel");
                if(reRenderEnd>=0){
                    reRenderEnd++;
                    sliders=Customization.prototype.rangeEvents(sliders);

                    // ---------------- SPEEDOMETER ----------------
                    car.speedometerGauge = new Speedometer('speedometer-gauge', {
                                label: "kmh",
                                max: sliders.maxValueSpeedometer.value,
                                min: 0,
                                callback: callback
                            });
                    // ---------------- TACHOMETER ----------------
                    car.tachometerGauge = new Tachometer('tachometer-gauge', {
                                max: sliders.maxValueTachometer.value,
                                min: 0,
                                label: "x1000/min",
                                callback: callback
                    });
                    Customization.prototype.setLastRenderingDiv("gauge");
                    steeringWheel = Customization.prototype.getSteeringWheelImage();

                    // ---------------- STEERING WHEEL ----------------
                    car.steeringWheel = new SteeringWheel("steering_wheel", {
                        top: 140,
                        left: 30,
                        width: 600,
                        height: 600
                    }, {
                        style: steeringWheel,
                        callback: callback
                    });
                    Customization.prototype.reRenderedWindowCSS(CSSValues);
                    car.drawGamepad.render();
                }
            }
        });

        $("#myRange-End").trigger("input");
        
        return this;
    };

    /**
     * @function render
     * @description Render method of the Customization widget.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.render = function() {
        return this.show();
    };

    module.exports = Customization;
});