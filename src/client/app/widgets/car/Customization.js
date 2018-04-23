/**
 * @module Customization
 * @version 2.0.0
 * @author José Carlos
 * @desc This module helps you to create and read local files with all configurations required for the arcade simulator. 
 *
 * @date Apr 04, 2018
 * last modified @date Apr 18, 2018
 *
 * @example <caption>Usage of Customization within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Customization module
 *     require("widgets/car/Customization");
 *
 *     function main() {
 *            let steeringWheel = "ferrari";
 *            let sliders = {
 *                maxValueSpeedometer: {
 *                    id: "Speedometer",
 *                    value: null
 *                },
 *                maxValueTachometer: {
 *                    id: "Tachometer",
 *                    value: null
 *                },
 *                maxValueLanes: {
 *                    id: "Lanes",
 *                    value: null
 *                },
 *                maxValueHills: {
 *                    id: "Hills",
 *                    value: null
 *                },
 *                maxValueObstacles: {
 *                    id: "Obstacles",
 *                    value: null
 *                },
 *                maxValueOtherCars: {
 *                    id: "Other-Cars",
 *                    value: null
 *                }
 *            };
 *            let initWindowCSSValues = [
 *                {
 *                    id: "mySidenav",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "width",
 *                            value: "630px"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "menu",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "margin-left",
 *                            value: "450px"
 *                        },
 *                        {
 *                            property: "visibility",
 *                            value: "hidden"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "game-window",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "border",
 *                            value: "5px solid black"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "instructions",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "margin-left",
 *                            value: "-60px"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: null,
 *                    class: "dashboard-widgets",
 *                    styles: [
 *                        {
 *                            property: "visibility",
 *                            value: "hidden"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "steering_wheel",
 *                    class: "last-steering_wheel",
 *                    styles: [
 *                        {
 *                            property: "visibility",
 *                            value: "hidden"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "track_img",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "visibility",
 *                            value: "visible"
 *                        }
 *                    ]
 *                }
 *            ];
 *            let reRenderedWindowCSSValues = [
 *                {
 *                    id: "steering_wheel",
 *                    class: "last-steering_wheel",
 *                    styles: [
 *                        {
 *                            property: "display",
 *                            value: "block"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "mySidenav",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "width",
 *                            value: "0px"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "menu",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "margin-left",
 *                            value: "-170px"
 *                        },
 *                        {
 *                            property: "margin-left",
 *                            value: "0px"
 *                        },
 *                        {
 *                            property: "visibility",
 *                            value: "visible"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "track_img",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "visibility",
 *                            value: "hidden"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "instructions",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "margin-left",
 *                            value: "650px"
 *                        },
 *                        {
 *                            property: "margin-top",
 *                            value: "-740px"
 *                        },
 *                        {
 *                            property: "visibility",
 *                            value: "visible"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "gauges",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "position",
 *                            value: "absolute"
 *                        },
 *                        {
 *                            property: "margin-left",
 *                            value: "350px"
 *                        },
 *                        {   
 *                            property: "margin-top",
 *                            value: "-810px"
 *                        },
 *                        {
 *                            property: "visibility",
 *                            value: "visible"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "steering_wheel",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "margin-top",
 *                            value: "200px"
 *                        },
 *                        {
 *                            property: "visibility",
 *                            value: "visible"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: "gamepadImage",
 *                    class: null,
 *                    styles: [
 *                        {
 *                            property: "visibility",
 *                            value: "visible"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: null,
 *                    class: "dashboard-widgets",
 *                    styles: [
 *                        {
 *                            property: "margin-top",
 *                            value: "200px"
 *                        }
 *                    ]
 *                },
 *                {
 *                    id: null,
 *                    class: "customization",
 *                    styles: [
 *                        {
 *                            property: "visibility",
 *                            value: "hidden"
 *                        }
 *                    ]
 *                },
 *            ];
 * 
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
 *          // Reveals the Customization widget
 *          customization.reveal();
 * 
 *          // Hides the Customization widget
 *          customization.hide();
 * 
 *          // Returns the current main div
 *          customization.show();
 * 
 *          // Starts the imagepicker, and sets all initial CSS styles.
 *          customization.setInitRenderingDiv(initWindowCSSValues);
 * 
 *          // Sets the imagepicker actions, and sets all CSS styles
 *          let aux = initWindowCSSValues[initWindowCSSValues.length - 1];
 *          customization.setImagePicker(aux);
 * 
 *          // Updates all sliders (ranges values)
 *          sliders=customization.rangeEvents(sliders);
 * 
 *          // Updates the last selected steering wheel image (imagepicker)
 *          steeringWheel = customization.getSteeringWheelImage();
 * 
 *          // Adds the "last-gauge" id to all div with class "gauge"
 *          customization.setLastRenderingDiv("gauge");
 * 
 *          // Removes all divs(html) within div "speedometer-gauge"
 *          customization.removeParentAllChilds("speedometer-gauge");
 * 
 *          // Removes all divs(html) within div "tachometer-gauge"
 *          customization.removeParentAllChilds("tachometer-gauge");
 * 
 *          // Removes div(html) "steering_wheel"
 *          customization.removeChild("steering_wheel");
 * 
 *          // Sets all reRendered CSS styles.
 *          customization.reRenderedWindowCSS(CSSValues);
 * 
 *          // Re-renders new widgets and sets new layout (new CSS styles)
 *          customization.endRange(onMessageReceived,car,reRenderedWindowCSSValues,sliders,steeringWheel);
 * 
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jshint esnext:true */
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
     *          <li>sliderColor {String}: the sliders circle color (default is "#4CAF50").</li>
     *          <li>imagesSteeringWheels {Array}: array of objects with all the images to insert in the imagepicker, providing the path and value fields (default values are {"basic","ferrari","porsche","sparco"}+"_steering_wheel.svg" and default paths are "widgets/car/steering_wheels/"+{"basic","ferrari","porsche","sparco"}+"_steering_wheel.svg").</li>
     *          <li>sliderRanges {Array}: array of objects with all the sliders to be created, giving the name (to put in the div), the values min, max (slider intervals) and value (default value) (default is [{name: "speedometer",min: 0,max: 400,value: 340},{name: "tachometer",min: 0,max: 20,value: 16},{name: "lanes",min: 0,max: 3,value: 0},{name: "hills",min: 0,max: 10,value: 0},{name: "obstacles",min: 0,max: 10,value: 0},{name: "other-cars",min: 0,max: 10,value: 0}]).</li>
     *          <li>controlsText {Array}: array of objects with information about widget control (default is ["Car controls:","[left/right arrow keys] Turn Left/Right","[up/down arrow keys] Accelerate/Brake"]).</li>
     *          <li>gauges {Array}: array of objects with information about gauge widgets to create (default is [{name:"speedometer-gauge",styleId:"",style:""},{name:"tachometer-gauge",styleId:"float",style:"right"}]).</li>
     *          <li>gaugesStyles {Array}: array of objects with CSS styles to add to the above gauge widgets (default is [{zoom: "45%",marginLeft: "370px",marginTop: "430px"}]).</li>
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
     * @description RemoveParentAllChilds method of the Customization widget. This method removes all the divs(html) within the div with the received id as the argument.
     * That is, it removes all child nodes from the parent div, with id="#(argument id)".
     * @param id {String} the parent div id name, where all child nodes will be removed.
     * @memberof module:Customization
     * @returns {Customization} The created instance of the widget Customization.
     * @instance
     */
    Customization.prototype.removeParentAllChilds = function (id) {
        d3.select("#"+id).selectAll("*").remove();
        return this;
    };

    /**
     * @function removeChild
     * @description removeChild method of the Customization widget. This method removes the node, with id received as argument.
     * @param id {String} the div id name to be removed.
     * @memberof module:Customization
     * @returns {Customization} The created instance of the widget Customization.
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
     * @description SetInitRenderingDiv method of the Customization widget. This method starts the imagepicker.
     * @param initWindowCSSValues {Object} array of objects with all the ids, class, and styles to add. 
     * That is, it has all the CSS parameters, which are necessary in the initial rendering process, which will produce the layout on the screen (widgets organization).
     * For example, one of these objects will be example 4).
     * This object will add the style of the div with id="a", with class="b". And the style that will be added is display:"block;", given by the fields, 
     * property and value. To allow more than one style, the styles field is also an array of objects, with values of all properties to be added.
     * If the id is null, the class field is used to select the respective div. Otherwise the id value is the one to be used. When the two values exist, 
     * what happens is the creation of the attribute class, in the selected div, with the id value.
     * @example 4) {id:"a",class:"b",styles:[{property:"display",value:"block"}]}.
     * @memberof module:Customization
     * @returns {Customization} The created instance of the widget Customization.
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
    };

    /**
     * @function setImagePicker
     * @description SetImagePicker method of the Customization widget. This method is responsible for getting values related to the image selected in the imagepicker.
     * In this, it adds the name of the selected image, taken from the path field, to the div with id="#selectedSteeringWheel", so that the currently selected image can be accessed at any time.
     * Also adds the value of the path field to the div with id/class provided in the aux object, so that it can be viewed in that div (larger size, i.e. highlighted) as well as all its styles.
     * @param aux {Object} the last object of initWindowCSSValues, argument of the setInitRenderingDiv method, which refers to the div where the selected image in the image picker can be highlighted, 
     * as example 3) shows. This object has the id/class of that div, as well as an array of styles to add, with properties and its values.
     * @example 3) {id: "track_img", class: null, styles: [{property: "visibility",value: "visible"}]}
     * @memberof module:Customization
     * @returns {Customization} The created instance of the widget Customization.
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
    };

    /**
     * @function getSteeringWheelImage
     * @description GetSteeringWheelImage method of the Customization widget. This method selects the div text with id="# selectedSteeringWheel", which in turn contains the name 
     * of the last selected image in the imagepicker. This content will be used to render the new Steering Wheel widget.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.getSteeringWheelImage = function () {        
       return d3.select("#selectedSteeringWheel")[0][0].innerHTML;
    };

    
    /**
     * @function setLastRenderingDiv
     * @description SetLastRenderingDiv method of the Customization widget. This method adds the "last-gauge" id to all div with class=".gauge". 
     * It should be invoked after creating new Gauge Widgets(Speedometer, Tachometer). This id eases the re-rendering process because it allows to easily remove previously rendered widgets.
     * @param className {String} the name of the class where those gauges were appended.
     * @memberof module:Customization
     * @returns {Customization} The created instance of the widget Customization.
     * @instance
     */
    Customization.prototype.setLastRenderingDiv = function (className) {
        d3.selectAll("."+className).attr('id','last-gauge');
        return this;
    };

    /**
     * @function reRenderedWindowCSS
     * @description ReRenderedWindowCSS method of the Customization widget. This method is responsible for updating all required styles in the re-rendering process.
     * @param reRenderedWindowCSSValues {Object} array of objects with all the ids, class, and styles to update. 
     * That is, it has all the CSS parameters, which are necessary in the re-rendering process, which will produce the new layout on the screen (re-organized widgets).
     * For example, one of these objects will be example 2).
     * This object will update the style of the div with id="a", with class="b". And the style that will be added is display:"block;", given by the fields, property and value. To allow more than one style, the styles field is also an array of objects, with values of all properties to be added.
     * If the id is null, the class field is used to select the respective div. Otherwise the id value is the one to be used. When the two values exist, what happens is the creation of the attribute class, in the selected div, with the id value.
     * @example 2) {id:"a",class:"b",styles:[{property:"display",value:"block"}]}.
     * @memberof module:Customization
     * @returns {Customization} The created instance of the widget Customization.
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
     * @description RangeEvents method of the Customization widget. This method is responsible for updating the values of the sliders of the customization menu in the sliders object, received as argument, which will be returned at the end.
     * @param sliders {Object} the object with all objects that allows the creation of sliders as well as to store its current values. For five different sliders, this object will have five objects, where each one will have the id of the slider, 
     * which will be used to name the id of its div, and the value of that, which by default is initialized to null.
     * @memberof module:Customization
     * @returns {Object} The updated sliders object received as argument.
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
     * @description EndRange method of the Customization widget. This method is responsible for re-rendering the 
     * desired widgets, in this case, the speedometer, tachometer, and steering wheel, based on the value selected 
     * in the slider "End", which only takes 2 values, 0 by default, which implies that the user is still choosing 
     * customization options, and 1, when the user wants to exit the customization menu, which implies that the user 
     * has already finished customizing.
     * @param callback {Function} the function provided as callback to widgets constructors that will be re-rendered. This function will be defined in the respective demo, where the Customization widget constructor was invoked.
     * @param car {Object} the object with all the widgets created so far in the demo. For example, in demo driving_simulator, car has the widgets accelerate and brake Buttons, Speedometer, Tachometer, SteeringWheel, DrawGamepad, GamepadController, GyroscopeController, among other widgets. 
     * This object is essential so that the re-rendering process can invoke all the methods of the widgets that will be re-render.
     * It is essential to provide this parameter, so that is possible to create the new speedometer and tachometer, based on the values selected in the sliders, in the previous customization menu.
     * @param CSSValues {Object} array of objects with all the ids, class, and styles to update. That is, it has all the CSS parameters, which are necessary in the re-rendering process, which will produce the new layout on the screen (re-organized widgets).
     * For example, one of these objects will be example 1).
     * This object will update the style of the div with id="a", with class="b". And the style that will be added is display:"block;", given by the fields, property and value. To allow more than one style, the styles field is also an array of objects, with values of all properties to be added.
     * If the id is null, the class field is used to select the respective div. Otherwise the id value is the one to be used. When the two values exist, what happens is the creation of the attribute class, in the selected div, with the id value.
     * @example 1) {id:"a",class:"b",styles:[{property:"display",value:"block"}]}.
     * @param sliders {Object} the object with all objects that allows the creation of sliders as well as to store its current values. For five different sliders, this object will have five objects, where each one will have the id of the slider, which will be used to name the id of its div, and the value of that, which by default is initialized to null.
     * @param steeringWheel {String} the string with the steering wheel image name to re-render. It takes the value provided by getSteeringWheelImage method. The default value is "ferrari", which represents the file "ferrari_steering_wheel.svg". 
     * @memberof module:Customization
     * @returns {Customization} The created instance of the widget Customization.
     * @instance
     */
    Customization.prototype.endRange = function (callback,car,CSSValues,sliders,steeringWheel) {
        let reRenderEnd=0;
        let maxValueEnd=d3.select("#myRange-End")[0][0].value;
        
        $("#myRange-End").on("input", (e) => {
            d3.select("#demo-End")[0][0].innerHTML = $(e.target).val() ;
            maxValueEnd = d3.select("#myRange-End")[0][0].value;
            if(maxValueEnd===1){
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