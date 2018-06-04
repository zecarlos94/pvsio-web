/**
 * @module Customization
 * @version 2.0.0
 * @author José Carlos
 * @desc This module helps you to create and read local files with all configurations required for the arcade simulator. 
 *
 * @date Apr 04, 2018
 * last modified @date May 23, 2018
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
 *                }
 *                maxValueObstacles: {
 *                    id: "Obstacles",
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
 *                            value: "-910px"
 *                        },
 *                        {
 *                            property: "visibility",
 *                            value: "visible"
 *                        }
 *                    ]
 *                },
 *                {
 *                   id: "writeTopography",
 *                   class: null,
 *                   styles: [
 *                       {
 *                           property: "display",
 *                           value: "none"
 *                       }
 *                   ]
 *               },
 *               {
 *                   id: "colorPicker",
 *                   class: null,
 *                   styles: [
 *                       {
 *                          property: "display",
 *                          value: "none"
 *                       }
 *                   ]
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
 *                            value: "-1180px"
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
 *               name: "obstacles",
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
 *          // Available methods:
 *          // Render the Customization widget
 *          customization.render();
 * 
 *          // OR
 * 
 *          // Reveals the Customization widget
 *          customization.reveal();
 * 
 *          // OR
 * 
 *          // Hides the Customization widget
 *          customization.hide();
 * 
 *          // OR
 * 
 *          // Returns the current main div
 *          customization.show();
 * 
 *          // Starts the imagepicker, and sets all initial CSS styles.
 *          customization.setInitRenderingDiv(initWindowCSSValues);
 * 
 *          // Updates all sliders (ranges values)
 *          sliders=customization.rangeEvents(sliders);
 * 
 *          // Adds the "last-gauge" id to all div with class "gauge"
 *          customization.setLastRenderingDiv("gauge");
 * 
 *          // Re-renders new widgets and sets new layout (new CSS styles)
 *          customization.endRange(onMessageReceived,car,reRenderedWindowCSSValues,sliders,steeringWheel);
 * 
 *     }
 * });
 * 
 * @example <caption>Usage of <strong>Protected API</strong> within Customization Widget. That is, API which is only used internally by the Customization Widget to create the customization menu.</caption>
 *          
 *          // Sets the imagepicker actions, and sets all CSS styles
 *          let aux = initWindowCSSValues[initWindowCSSValues.length - 1];
 *          customization.setImagePicker(aux);
 * 
 *          // Updates the last selected steering wheel image (imagepicker)
 *          steeringWheel = customization.getSteeringWheelImage();
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
 * @example <caption>Usage of API to create a new customization menu.</caption>
 *   define(function (require, exports, module) {
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
 *                }
 *                maxValueObstacles: {
 *                    id: "Obstacles",
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
 *                            value: "-910px"
 *                        },
 *                        {
 *                            property: "visibility",
 *                            value: "visible"
 *                        }
 *                    ]
 *                },
 *                {
 *                   id: "writeTopography",
 *                   class: null,
 *                   styles: [
 *                       {
 *                           property: "display",
 *                           value: "none"
 *                       }
 *                   ]
 *               },
 *               {
 *                   id: "colorPicker",
 *                   class: null,
 *                   styles: [
 *                       {
 *                          property: "display",
 *                          value: "none"
 *                       }
 *                   ]
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
 *                            value: "-1180px"
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
 *               name: "obstacles",
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
 *          // Adds the "last-gauge" id to all div with class "gauge"
 *          customization.setLastRenderingDiv("gauge");
 * 
 *          // Starts the imagepicker, and sets all initial CSS styles.
 *          customization.setInitRenderingDiv(initWindowCSSValues);
 *
 *          // Updates all sliders (ranges values)
 *          sliders=customization.rangeEvents(sliders);
 * 
 *          // Re-renders new widgets and sets new layout (new CSS styles)
 *          customization.endRange(onMessageReceived,car,reRenderedWindowCSSValues,sliders,steeringWheel);
 *     }
 * });
 * 
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
    let DrawGamepad = require("widgets/car/DrawGamepad");
    let GyroscopeController = require("widgets/car/GyroscopeController");
    let VirtualKeypadController = require("widgets/car/VirtualKeypadController");
    let GamepadController = require("widgets/car/GamepadController");
    let TrackGenerator = require("widgets/car/TrackGenerator");
    let Arcade = require("widgets/car/Arcade");
     
    /**
     * @function constructor
     * @public
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
                name: "obstacles",
                min: 0,
                max: 10,
                value: 0
            },
            {
                name: "laps",
                min: 0,
                max: 3,
                value: 0
            },
            {
                name: "pvs",
                min: 0,
                max: 1,
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

        this.customizationDiv.append("h4").style("margin-left","5px").text("Select Track Colors");
        this.customizationDiv.append("br");

        this.setColors = this.customizationDiv.append("div").attr("id","colorPicker").style("margin-left","40px");

        let default_grass1 = "#699864";
        let default_border1 = "#ee0000";
        let default_border2 = "#ffffff";
        let default_outborder = "#496a46";
        let default_outborder_end = "#474747";
        let default_track_segment = "#777777";
        let default_track_segment_end = "#000000";        
        let default_lane1 = "#ffffff";
        let default_lane2 = "#777777";
        let default_laneArrow = "#00FF00";
        let default_lane_end = "#ffffff";

        this.setColors.append("input").attr("id","grass").attr("type","color").attr("value",default_grass1);
        this.setColors.append("span").text("Grass").style("margin-left","10px");
        this.setColors.append("span").attr("id","hex1").text(default_grass1).style("margin-left","10px");

        let grassInput = document.getElementById("grass");
        let grassColor = document.getElementById("hex1");

        grassInput.addEventListener("input", function() {
            grassColor.innerHTML = grassInput.value;
        }, false); 

        this.setColors.append("input").attr("id","outborder").attr("type","color").attr("value",default_outborder).style("margin-left","55px");
        this.setColors.append("span").text("Outborder").style("margin-left","10px");
        this.setColors.append("span").attr("id","hex2").text(default_outborder).style("margin-left","10px");

        let outborderInput = document.getElementById("outborder");
        let outborderColor = document.getElementById("hex2");

        outborderInput.addEventListener("input", function() {
            outborderColor.innerHTML = outborderInput.value;
        }, false); 

        this.setColors.append("br");
        this.setColors.append("br");
        this.setColors.append("br");

        this.setColors.append("input").attr("id","border1").attr("type","color").attr("value",default_border1);
        this.setColors.append("span").text("Border1").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex3").text(default_border1).style("margin-left","10px");

        let border1Input = document.getElementById("border1");
        let border1Color = document.getElementById("hex3");

        border1Input.addEventListener("input", function() {
            border1Color.innerHTML = border1Input.value;
        }, false); 

        this.setColors.append("input").attr("id","outborderEnd").attr("type","color").attr("value",default_outborder_end).style("margin-left","40px");
        this.setColors.append("span").text("OutborderEnd").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex4").text(default_outborder_end).style("margin-left","10px");

        let outborderEndInput = document.getElementById("outborderEnd");
        let outborderEndColor = document.getElementById("hex4");

        outborderEndInput.addEventListener("input", function() {
            outborderEndColor.innerHTML = outborderEndInput.value;
        }, false); 

        this.setColors.append("br");
        this.setColors.append("br");
        this.setColors.append("br");

        this.setColors.append("input").attr("id","border2").attr("type","color").attr("value",default_border2);
        this.setColors.append("span").text("Border2").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex5").text(default_border2).style("margin-left","10px");

        let border2Input = document.getElementById("border2");
        let border2Color = document.getElementById("hex5");

        border2Input.addEventListener("input", function() {
            border2Color.innerHTML = border2Input.value;
        }, false);


        this.setColors.append("input").attr("id","trackSegment").attr("type","color").attr("value",default_track_segment).style("margin-left","40px");
        this.setColors.append("span").text("TrackSegment").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex6").text(default_track_segment).style("margin-left","10px");

        let trackSegmentInput = document.getElementById("trackSegment");
        let trackSegmentColor = document.getElementById("hex6");

        trackSegmentInput.addEventListener("input", function() {
            trackSegmentColor.innerHTML = trackSegmentInput.value;
        }, false);

        this.setColors.append("br");
        this.setColors.append("br");
        this.setColors.append("br");

        this.setColors.append("input").attr("id","lane1").attr("type","color").attr("value",default_lane1);
        this.setColors.append("span").text("Lane1").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex7").text(default_lane1).style("margin-left","10px");

        let lane1Input = document.getElementById("lane1");
        let lane1Color = document.getElementById("hex7");

        lane1Input.addEventListener("input", function() {
            lane1Color.innerHTML = lane1Input.value;
        }, false); 

        this.setColors.append("input").attr("id","trackSegmentEnd").attr("type","color").attr("value",default_track_segment_end).style("margin-left","55px");
        this.setColors.append("span").text("TrackSegmentEnd").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex8").text(default_track_segment_end).style("margin-left","10px");

        let trackSegmentEndInput = document.getElementById("trackSegmentEnd");
        let trackSegmentEndColor = document.getElementById("hex8");

        trackSegmentEndInput.addEventListener("input", function() {
            trackSegmentEndColor.innerHTML = trackSegmentEndInput.value;
        }, false);

        this.setColors.append("br");
        this.setColors.append("br");
        this.setColors.append("br");

        this.setColors.append("input").attr("id","lane2").attr("type","color").attr("value",default_lane2);
        this.setColors.append("span").text("Lane2").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex9").text(default_lane2).style("margin-left","10px");

        let lane2Input = document.getElementById("lane2");
        let lane2Color = document.getElementById("hex9");

        lane2Input.addEventListener("input", function() {
            lane2Color.innerHTML = lane2Input.value;
        }, false); 

        this.setColors.append("input").attr("id","laneArrow").attr("type","color").attr("value",default_laneArrow).style("margin-left","55px");
        this.setColors.append("span").text("LaneArrow").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex10").text(default_laneArrow).style("margin-left","10px");

        let laneArrowInput = document.getElementById("laneArrow");
        let laneArrowColor = document.getElementById("hex10");

        laneArrowInput.addEventListener("input", function() {
            laneArrowColor.innerHTML = laneArrowInput.value;
        }, false); 

        this.setColors.append("br");
        this.setColors.append("br");
        this.setColors.append("br");

        this.setColors.append("input").attr("id","laneEnd").attr("type","color").attr("value",default_lane_end);
        this.setColors.append("span").text("LaneEnd").style("margin-left","10px");        
        this.setColors.append("span").attr("id","hex11").text(default_lane_end).style("margin-left","10px");

        let laneEndInput = document.getElementById("laneEnd");
        let laneEndColor = document.getElementById("hex11");

        laneEndInput.addEventListener("input", function() {
            laneEndColor.innerHTML = laneEndInput.value;
        }, false); 

        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");

        this.customizationDiv.append("h4").style("margin-left","5px").text("Track Topography");
        this.customizationDiv.append("br");
        this.writeTopography=this.customizationDiv.append("div").attr("id","writeTopography");
        
        this.writeTopography.append("p").style("margin-left","40px")
                             .text("Use keywords: \"left\", \"right\" and \"straight\" after \"name\:\"");
        this.writeTopography.append("p").style("margin-left","40px")
                             .text("to describe the topography name of the track");
        this.writeTopography.append("p").style("margin-left","40px")
                             .text("Use 0, 90 and -90 after \"curvature\:\"");
        this.writeTopography.append("p").style("margin-left","40px")
                             .text("to describe the curvature degrees of that segment");
        this.writeTopography.append("p").style("margin-left","40px")
                             .text("Use keywords: \"flat\", \"up\" and \"down\" after \"profile\:\"");
        this.writeTopography.append("p").style("margin-left","40px")
                             .text("to describe the profile of the track");
        this.writeTopography.append("p").style("margin-left","40px")
                             .text("Set each topography zone length after numZones\:");
        this.writeTopography.append("textarea").attr("id","topography").attr("rows","2").attr("cols","60").style("margin-left","40px")
                            .text("[{\"topography\":{\"name\":\"\",\"curvature\":},\"profile\":\"\",\"numZones\":}]");

        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");

        this.customizationDiv.append("h4").style("margin-left","5px").text("Spritesheet JSON Filename");
        this.customizationDiv.append("br");
        this.writeSpritesheetJSONFilename=this.customizationDiv.append("div").attr("id","writeSpritesheetJSONFilename");
        this.writeSpritesheetJSONFilename.append("p").style("margin-left","40px")
                             .text("Do not add file extension! JSON only!");
        this.writeSpritesheetJSONFilename.append("textarea").attr("id","spritesheetJSONFilename").attr("rows","2").attr("cols","60").style("margin-left","40px")
                             .text("");

        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");

        this.customizationDiv.append("h4").style("margin-left","5px").text("Spritesheet Images");
        this.customizationDiv.append("br");
        this.writeSpritesheetImages=this.customizationDiv.append("div").attr("id","writeSpritesheetImages");
        
        this.writeSpritesheetImages.append("p").style("margin-left","40px")
                             .text("Do not add file extension! PNG only!");
        this.writeSpritesheetImages.append("textarea").attr("id","spritesheetImages").attr("rows","2").attr("cols","60").style("margin-left","40px")
                             .text("");

        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        
        this.customizationDiv.append("h4").style("margin-left","5px").text("Landscape Objects");
        this.customizationDiv.append("br");
        this.writeLandscapeObjects=this.customizationDiv.append("div").attr("id","writeLandscapeObjects");
        this.writeLandscapeObjects.append("p").style("margin-left","40px")
        .text("Add \"\" to each object");
        this.writeLandscapeObjects.append("textarea").attr("id","landscapeObjects").attr("rows","2").attr("cols","60").style("margin-left","40px")
                             .text("[]");

        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");

        this.customizationDiv.append("h4").style("margin-left","5px").text("Track Obstacles");
        this.customizationDiv.append("br");
        this.writeTrackObstacles=this.customizationDiv.append("div").attr("id","writeTrackObstacles");
        this.writeTrackObstacles.append("p").style("margin-left","40px")
        .text("Add \"\" to each obstacle");
        this.writeTrackObstacles.append("textarea").attr("id","trackObstacles").attr("rows","2").attr("cols","60").style("margin-left","40px")
                             .text("[]");

        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");

        this.customizationDiv.append("h4").style("margin-left","5px").text("Track Params");
        this.customizationDiv.append("br");
        this.writeTrackParams=this.customizationDiv.append("div").attr("id","writeTrackParams");
        this.writeTrackParams.append("p").style("margin-left","40px")
        .text("Add value after \:");
        this.writeTrackParams.append("p").style("margin-left","40px")
        .text("numZones is the number of different portions of the track");
        this.writeTrackParams.append("p").style("margin-left","40px")
        .text("zoneSize is the length of each numZones");
        this.writeTrackParams.append("textarea").attr("id","trackParams").attr("rows","2").attr("cols","60").style("margin-left","40px")
                             .text("{numZones:, zoneSize:}");

        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
        this.customizationDiv.append("br");

        this.customizationDiv.append("h4").style("margin-left","5px").text("Arcade Vehicle");
        this.customizationDiv.append("br");
        this.writeArcadeVehicle=this.customizationDiv.append("div").attr("id","writeArcadeVehicle");
        this.writeArcadeVehicle.append("p").style("margin-left","40px")
                             .text("Write: if arcade widget will use realistic vehicle image or not (Bool), ");
        this.writeArcadeVehicle.append("p").style("margin-left","40px")
                             .text("the desired vehicle and the vehicle index available on spritesheet JSON");
        this.writeArcadeVehicle.append("p").style("margin-left","40px")
                             .text("file provided earlier, separated by commas!");
        this.writeArcadeVehicle.append("p").style("margin-left","40px")
                             .text("Supported Vehicles are: \"airplane\",\"bicycle\",\"car\",\"helicopter\"");
        this.writeArcadeVehicle.append("p").style("margin-left","40px")
                             .text("and \"motorbike\"");
        this.writeArcadeVehicle.append("textarea").attr("id","arcadeVehicle").attr("rows","2").attr("cols","60").style("margin-left","40px")
                             .text("");

        this.customizationDiv.append("br");
        this.customizationDiv.append("br");
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

            if(res.match(/Obstacles/)){
                this.aux.append("p").style("color",this.sliderColor).style("margin-left","15px").text("Frequence of "+res+":")
                        .append("span").attr("id","demo-"+res2);
            }else if(res.match(/Lanes/)){
                this.aux.append("p").style("color",this.sliderColor).style("margin-left","15px").text("Number of "+res+":")
                        .append("span").attr("id","demo-"+res2);
            }
            else if(res.match(/Lap/)){
                this.aux.append("p").style("color",this.sliderColor).style("margin-left","15px").text("Number of "+res+":")
                        .append("span").attr("id","demo-"+res2);
            }else if(res.match(/Pvs/)){
                this.aux.append("p").style("color",this.sliderColor).style("margin-left","15px").text("Use "+res.toUpperCase()+" Instructions:")
                        .append("span").attr("id","demo-"+res2);
            }else{
                this.aux.append("p").style("color",this.sliderColor).style("margin-left","15px").text("Value of "+res+":")
                        .append("span").attr("id","demo-"+res2);
            }

            if(brItr===2){
                if(isMobile){
                    // this.customizationDiv.append("br");
                    // this.customizationDiv.append("br");
                    // this.customizationDiv.append("br");
                    // this.customizationDiv.append("br");
                    // this.customizationDiv.append("br");
                    // this.customizationDiv.append("br");
                }else{
                    this.customizationDiv.append("br");
                    this.customizationDiv.append("br");
                    this.customizationDiv.append("br");
                }
                brItr=0;
            }
        }

        this.endRangeSliderDiv=this.customizationDiv.append("div").attr("class","game-customisation-end")
                                   .append("div").attr("class","col-xs-12").attr("id","slidecontainer-end");
        this.endRangeSliderDiv.append("input").attr("type","range").attr("min","0").attr("max","1").attr("value","0").attr("class","slider").attr("id","myRange-End");
        this.endRangeSliderDiv.append("p").style("color",this.sliderColor).style("margin-left","15px").text("End:")
                              .append("span").attr("id","demo-End");
                    
        if(isMobile){
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
        }else{
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
            this.customizationDiv.append("br");
        }

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
     * @public
     * @description Hide method of the Customization widget. This method changes the current main div display to 'none'.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.hide = function () {
        return this.div.style("display","none");
    };

    /**
     * @function reveal
     * @public
     * @description Reveal method of the Customization widget. This method changes the current main div display to 'block'.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.reveal = function () {
        return this.div.style("display","block");
    };

    /**
     * @function show
     * @public
     * @description Show method of the Customization widget. This method returns the current main div.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.show = function () {
        return this.div;
    };

    /**
     * @function removeParentAllChilds
     * @protected
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
     * @protected
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
     * @public
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
     * @protected
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
     * @protected
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
     * @public
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
     * @protected
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
     * @public
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
     * @public
     * @description EndRange method of the Customization widget. This method is responsible for re-rendering the 
     * desired widgets, in this case, the speedometer, tachometer, and steering wheel, based on the value selected 
     * in the slider "End", which only takes 2 values, 0 by default, which implies that the user is still choosing 
     * customization options, and 1, when the user wants to exit the customization menu, which implies that the user 
     * has already finished customizing.
     * @param initalPVSState {Array} the initial state that PVSio-web back-end sends, parsed with stateParser parse method. 
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
    Customization.prototype.endRange = function (initalPVSState,callback,car,CSSValues,sliders,steeringWheel) {
        let reRenderEnd=0;
        let maxValueEnd=d3.select("#myRange-End")[0][0].value;

        $("#myRange-End").on("input", (e) => {
            d3.select("#demo-End")[0][0].innerHTML = $(e.target).val() ;
            maxValueEnd = d3.select("#myRange-End")[0][0].value;
            if(maxValueEnd==="1"){
                Customization.prototype.removeParentAllChilds("speedometer-gauge").removeParentAllChilds("tachometer-gauge").removeChild("steering_wheel");
 
                // Get final selected colors
                let colorGrass_Final=d3.select("#hex1")[0][0].innerText;
                let colorBorder1_Final=d3.select("#hex3")[0][0].innerText;
                let colorBorder2_Final=d3.select("#hex5")[0][0].innerText;
                let colorOutborder_Final=d3.select("#hex2")[0][0].innerText;
                let colorOutborderEnd_Final=d3.select("#hex4")[0][0].innerText;
                let colorTrackSegment_Final=d3.select("#hex6")[0][0].innerText;
                let colorTrackSegmentEnd_Final=d3.select("#hex8")[0][0].innerText;
                let colorLane1_Final=d3.select("#hex7")[0][0].innerText;
                let colorLane2_Final=d3.select("#hex9")[0][0].innerText;
                let colorLaneArrow_Final=d3.select("#hex10")[0][0].innerText;
                let colorLaneEnd_Final=d3.select("#hex11")[0][0].innerText;

                // console.log(colorGrass_Final);
                // console.log(colorBorder1_Final);
                // console.log(colorBorder2_Final);
                // console.log(colorOutborder_Final);
                // console.log(colorOutborderEnd_Final);
                // console.log(colorTrackSegment_Final);
                // console.log(colorTrackSegmentEnd_Final);
                // console.log(colorLane1_Final);
                // console.log(colorLane2_Final);
                // console.log(colorLaneArrow_Final);
                // console.log(colorLaneEnd_Final);

                let topography_Final=d3.select("#topography")[0][0].value;
                let spritesheetJSONFilename_Final=d3.select("#spritesheetJSONFilename")[0][0].value;
                let spritesheetImages_Final=d3.select("#spritesheetImages")[0][0].value;
                let landscapeObjects_Final=d3.select("#landscapeObjects")[0][0].value;
                let trackObstacles_Final=d3.select("#trackObstacles")[0][0].value;
                let trackParams_Final=d3.select("#trackParams")[0][0].value;
                let numZones_Final=trackParams_Final.split(",")[0].split(":")[1];
                let zoneSize_Final=trackParams_Final.split(",")[1].split(":")[1].slice(0, -1);
                let arcadeVehicle_Final=d3.select("#arcadeVehicle")[0][0].value;

                if(reRenderEnd>=0){
                    reRenderEnd++;
                    sliders=Customization.prototype.rangeEvents(sliders);

                    let numLanes_Final=sliders.maxValueLanes.value;
                    let freqObstacles_Final=sliders.maxValueObstacles.value;
                    let numLaps_Final=sliders.maxValueLapNumber.value;
                    let usePVS_Final=sliders.maxValuePVSInstructions.value;

                    // TODO send this values to TrackGenerator Widget to create the desired track

                    // ---------------- SPEEDOMETER ----------------
                    car.speedometerGauge = new Speedometer('speedometer-gauge', {
                                max: sliders.maxValueSpeedometer.value,
                                min: 0,
                                label: "kmh",
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
                        left: 10,
                        width: 600,
                        height: 600
                    }, {
                        style: steeringWheel,
                        callback: callback
                    });

                    // ----------------------------- DRAWGAMEPAD COMPONENTS -----------------------------
                    // car.drawGamepad = new DrawGamepad("drawGamepad", {
                    //     top: 100,
                    //     left: 350,
                    //     width: 750,
                    //     height: 750
                    // }, {
                    //     parent: "gamepadImage", // defines parent div, which is div id="drawGamepad" by default
                    //     style: "xbox", // defines parent div, which is "ps4" by default
                    //     buttonsPVS: [ "accelerate", "brake", "mute", "unmute", "pause", "quit", "resume", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ],
                    //     callback: callback
                    // });
                    car.drawGamepad = new DrawGamepad("drawGamepad", {
                        top: 100,
                        left: 350,
                        width: 750,
                        height: 750
                    }, {
                        parent: "gamepadImage", // defines parent div, which is div id="drawGamepad" by default
                        style: "ps4", // defines parent div, which is "ps4" by default
                        buttonsPVS: [ "accelerate", "brake", "unmute", "mute", "pause", "quit", "touchpad", "resume", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ],
                        callback: callback
                    });

                    // ----------------------------- CONTROLLERS COMPONENTS --------------------------
                    // ---------------- GAMEPAD CONTROLLER ----------------
                    car.gamepadController = new GamepadController("gamepad_controller", {
                        top: 1000,
                        left: 100,
                        width: 750,
                        height: 750
                    }, {
                        carAccelerate: car.up,
                        carBrake: car.down,
                        carSteeringWheel: car.steeringWheel,
                        accelerateInstructionPVS: "accelerate",
                        brakeInstructionPVS: "brake",
                        steeringWheelInstructionPVS: "steering_wheel",
                        useButtonActionsQueue: false, // Default is false
                        usePressReleasePVS: true, // Default is true
                        type: "gamepad", // "steeringWheelAndPedals", // Default is "gamepad"
                        accelerationIndex: 0,
                        brakeIndex: 1,
                        leftArrowIndex: 14,
                        rightArrowIndex: 15,
                        accelerationPedalIndex: 1,
                        brakePedalIndex: 1,
                        steeringWheelIndex: 0,
                        analogueStickIndex: 9,
                        leftAnalogueIndex: 0,
                        rightAnalogueIndex: 2,
                        pauseAction: {
                            pauseIndex: 9,
                            instructionPVS: "pause"
                        },
                        quitAction: {
                            quitIndex: 8,
                            instructionPVS: "quit"
                        },
                        resumeAction: {
                            resumeIndex: 16,
                            instructionPVS: "resume"
                        },
                        muteAction: {
                            muteIndex: 4,
                            instructionPVS: "mute"
                        },
                        unmuteAction: {
                            unmuteIndex: 5,
                            instructionPVS: "unmute"
                        },
                        useSensitivity: false, // Default is false
                        sensitivityValue: 50, // Default is 40%
                        callback: callback
                    });

                    // ---------------- VIRTUAL KEYPAD CONTROLLER ----------------
                    car.virtualKeypadController = new VirtualKeypadController("virtualKeypad_controller", {
                        top: 800,
                        left: 800,
                        width: 750,
                        height: 750
                    }, {
                        keyboardImgDiv: "mobileDevicesController", // defines parent div, which is div id="mobileDevicesController" by default
                        keyboardClass: "icon keyboard",
                        keyboardLeftDesktop: 1370,
                        keyboardHoverInitialTitle: "Click to open virtual keypad controller",
                        keyboardHoverSecondTitle: "Click to close virtual keypad controller",
                        parent: "virtualKeyPad", // defines parent div, which is div id="virtualKeyPad" by default
                        simulatorActions: "simulatorActions",
                        simulatorArrows: "simulatorArrows",
                        floatArrows: "floatArrows",
                        blockArrows: "blockArrows",
                        buttonClass: "ui-button ui-corner-all ui-widget ui-button-icon-only",
                        arrowKeysPVS: [ "accelerate", "brake", "steering_wheel_left", "steering_wheel_right"],
                        otherKeysPVS: [ "quit", "pause", "resume" ],
                        callback: callback
                    });

                    // ----------------------------- GYROSCOPE COMPONENTS -----------------------------
                    car.gyroscopeController = new GyroscopeController("Gyroscope_Controller", {
                        top: 100,
                        left: 700,
                        width: 750,
                        height: 750
                    }, {
                        parent: "gyroscope", // defines parent div, which is div id="gyroscope" by default
                        carSteeringWheel: car.steeringWheel,
                        carAccelerate: car.up,
                        carBrake: car.down,
                        useSensitivity: false, // Default is false
                        sensitivityValue: 50, // Default is 40%
                        callback: callback
                    });

                    Customization.prototype.reRenderedWindowCSS(CSSValues);
                    car.virtualKeypadController.render();
                    car.gamepadController.render();
                    car.gyroscopeController.render();
                    car.drawGamepad.render();


                    (spritesheetJSONFilename_Final==="") ? spritesheetJSONFilename_Final = "spritesheet" : spritesheetJSONFilename_Final;
                    (spritesheetImages_Final==="") ? spritesheetImages_Final = "[\"spritesheet\",\"spritesheet.text\"]" : spritesheetImages_Final;
                    (numZones_Final==="") ? numZones_Final = 12 : numZones_Final;
                    (zoneSize_Final==="") ? zoneSize_Final = 250 : numZones_Final;
                    (landscapeObjects_Final==="[]") ? landscapeObjects_Final = "[\"tree\",\"boulder\"]" : landscapeObjects_Final;
                    (trackObstacles_Final==="[]") ? trackObstacles_Final = "[\"boulder\"]" : trackObstacles_Final;
                    (topography_Final==="[{\"topography\":{\"name\":\"\",\"curvature\":},\"profile\":\"\",\"numZones\":}]") ? topography_Final = "[ \
                        {\"topography\":{\"name\":\"straight\",\"curvature\":0},\"profile\":\"flat\",\"numZones\":3}, \
                        {\"topography\":{\"name\":\"left\",\"curvature\":90},\"profile\":\"flat\",\"numZones\":3}, \
                        {\"topography\":{\"name\":\"straight\",\"curvature\":0},\"profile\":\"up\",\"numZones\":3}, \
                        {\"topography\":{\"name\":\"right\",\"curvature\":-90},\"profile\":\"flat\",\"numZones\":3}, \
                        {\"topography\":{\"name\":\"straight\",\"curvature\":0},\"profile\":\"down\",\"numZones\":3}, \
                        {\"topography\":{\"name\":\"left\",\"curvature\":90},\"profile\":\"flat\",\"numZones\":3}]" : topography_Final;
                    (arcadeVehicle_Final==="") ? arcadeVehicle_Final = "false,car,2" : arcadeVehicle_Final;

                    let realisticImgs_Final = JSON.parse(arcadeVehicle_Final.split(",")[0]);
                    let vehicle_Final = arcadeVehicle_Final.split(",")[1];
                    let vehicleImgIndex_Final = parseInt(arcadeVehicle_Final.split(",")[2]);
                    let loadPVSSpeedPositions_Final = (parseInt(usePVS_Final)===0) ? false : true;

                    // console.log(spritesheetJSONFilename_Final);
                    // console.log(JSON.parse(spritesheetImages_Final));
                    // console.log(parseInt(numLanes_Final));
                    // console.log(parseInt(numZones_Final));
                    // console.log(parseInt(zoneSize_Final));
                    // console.log(JSON.parse(landscapeObjects_Final));
                    // console.log(JSON.parse(trackObstacles_Final));
                    // console.log(parseInt(freqObstacles_Final));
                    // console.log(JSON.parse(topography_Final));
                    // console.log(JSON.parse(topography_Final)[2].topography + ", " + JSON.parse(topography_Final)[2].numZones);
                    // console.log(arcadeVehicle_Final.split(","));
                    // console.log(realisticImgs_Final);
                    // console.log(vehicle_Final);
                    // console.log(vehicleImgIndex_Final);

                    // -----------------------------  TRACK GENERATOR COMPONENTS -----------------------------
                    car.trackGeneratorWidget = new TrackGenerator("trackGeneratorWidget", {
                        top: 80,
                        left: 650,
                        width: 780,
                        height: 650
                    }, {
                        parent: "content", // defines parent div, which is div id="content" by default
                        spritesFilename: spritesheetJSONFilename_Final, // defines spritesheet configuration filename, which is "spritesheet.json" by default
                        render: {
                            width: 320,
                            height: 240,
                            depthOfField: 150,
                            camera_distance: 30,
                            camera_height: 100
                        },
                        trackSegmentSize: 5,
                        numberOfSegmentPerColor: 4,
                        numLanes: parseInt(numLanes_Final),
                        laneWidth: 0.02,
                        trackParam: {
                            maxHeight: 900,
                            maxCurve:  400,
                            numZones:  parseInt(numZones_Final), // number of different portions of the track
                            curvy:     0.8,
                            mountainy: 0.8,
                            zoneSize:  parseInt(zoneSize_Final) // length of each numZones (the bigger this value. the longer it will take to finish)
                        },
                        // Information regarding current controllable_car's car
                        controllable_car: {
                            position: 10,
                            speed: 0,
                            acceleration: 0.05,
                            deceleration: 0.04,
                            breaking: 0.3,
                            turning: 5.0,
                            posx: 0,
                            maxSpeed: 20
                        },
                        topSpeed: 250,
                        objects: JSON.parse(landscapeObjects_Final),
                        obstacle: JSON.parse(trackObstacles_Final),
                        obstaclePerIteration: parseInt(freqObstacles_Final),
                        trackColors: {
                            grass1: colorGrass_Final,
                            border1: colorBorder1_Final,
                            border2: colorBorder2_Final,
                            outborder1: colorOutborder_Final,
                            outborder_end1: colorOutborderEnd_Final,
                            track_segment1: colorTrackSegment_Final,
                            lane1: colorLane1_Final,
                            lane2: colorLane2_Final,
                            laneArrow1: colorLaneArrow_Final,
                            track_segment_end: colorTrackSegmentEnd_Final,
                            lane_end: colorLaneEnd_Final
                        },
                        trackLayout: JSON.parse(topography_Final),
                        callback: callback
                    });

                    car.trackGeneratorWidget.hide();
                    // API to generate track with parameters received as argument by the constructor, i.e. new TrackGenerator()
                    // car.trackGeneratorWidget.generateStraightTrack();
                    car.trackGeneratorWidget.generateTrackCurvesSlopes();

                    // ----------------------------- ARCADE GAME COMPONENTS -----------------------------
                    car.arcadeWidget = new Arcade("arcadeWidget", {
                        top: 80,
                        left: 650,
                        width: 780,
                        height: 650
                    }, {
                        parent: "game-window", // defines parent div, which is div id="game-window" by default
                        trackFilename: "track-curves-slopes", // "track-straight", // defines track configuration filename, which is "track-curves-slopes.json" by default
                        spritesFilename: spritesheetJSONFilename_Final, // defines spritesheet configuration filename, which is "spritesheet.json" by default
                        spritesFiles: JSON.parse(spritesheetImages_Final), // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
                        trackTopography: "curves-slopes", // "straight", // defines initial position after ending 1 lap (restart position in another lap).
                        realisticImgs: realisticImgs_Final,
                        vehicle: vehicle_Final, // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
                        vehicleImgIndex: vehicleImgIndex_Final, // defines vehicle sprite image suffix 
                        // logoImgIndex: 1, // defines logo sprite image suffix 
                        // backgroundImgIndex: 1, // defines background sprite image suffix 
                        stripePositions: {
                            trackP1: -0.50,
                            trackP2: 0.50,
                            borderWidth: 0.08,
                            inOutBorderWidth: 0.02,
                            landscapeOutBorderWidth: 0.13,
                            diffTrackBorder: 0.05,
                            finishLineP1: -0.40,
                            finishLineP2: 0.40,
                            diffLanesFinishLine: 0.05
                        },
                        lapNumber: parseInt(numLaps_Final),
                        // showOfficialLogo: true,
                        loadPVSSpeedPositions: loadPVSSpeedPositions_Final,
                        callback: callback
                    });
                    
                    d3.select("#arcadeSimulator")
                        .style("margin-top", "0px")
                        .style("margin-left", "0px")
                        .style("position", "absolute")
                        .style("top", "165px")
                        .style("left", "225px");

                    car.arcadeWidget.startSimulation();
                    car.arcadeWidget.render(initalPVSState);
                }
            }
        });

        $("#myRange-End").trigger("input");
        
        return this;
    };

    /**
     * @function render
     * @public
     * @description Render method of the Customization widget.
     * @memberof module:Customization
     * @instance
     */
    Customization.prototype.render = function() {
        return this.show();
    };

    module.exports = Customization;
});