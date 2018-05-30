/**
 * @author Paolo Masci, Patrick Oladimeji, José Carlos
 * @date 27/03/15 20:30:33 PM
 * Last Modified @date 27/02/18 09:07:15 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
require.config({
    baseUrl: "../../client/app",
    paths: {
        "jquery-ui": "../lib/jquery-ui",
        d3: "../lib/d3",
        "pvsioweb": "plugins/prototypebuilder",
        "imagemapper": "../lib/imagemapper",
        "text": "../lib/text",
        "lib": "../lib",
        "cm": "../lib/cm",
        stateParser: './util/PVSioStateParser',
        "image-picker": "../lib/image-picker",
        jchronometer: '../lib/jchronometer/jchronometer.js'
    }
});

require([
        "widgets/car/ButtonExternalController",
        "widgets/TouchscreenButton",
        "widgets/TouchscreenDisplay",
        "widgets/BasicDisplay",
        "widgets/NumericDisplay",
        "widgets/LED",

        // Added car components here
        "widgets/car/Speedometer",
        "widgets/car/Tachometer",
        // "widgets/car/Shift",
        // "widgets/car/Clock",
        // "widgets/car/Thermometer",
        "widgets/car/SteeringWheel",
        "widgets/car/VirtualKeypadController",
        "widgets/car/GamepadController",
        "widgets/car/DrawGamepad",
        "widgets/car/GyroscopeController",
        "widgets/car/Customization",

        "widgets/ButtonActionsQueue",
        "stateParser",
        "PVSioWebClient"
    ],  (
        ButtonExternalController,
        TouchscreenButton,
        TouchscreenDisplay,
        BasicDisplay,
        NumericDisplay,
        LED,

        // Added car components here
        Speedometer,
        Tachometer,
        // Shift,
        // Clock,
        // Thermometer,
        SteeringWheel,
        VirtualKeypadController,
        GamepadController,
        DrawGamepad,
        GyroscopeController,
        Customization,

        ButtonActionsQueue,
        stateParser,
        PVSioWebClient) => {

        "use strict";
        var client = PVSioWebClient.getInstance();
        var tick;
        let e;
        let startMessage = 0;
        let steeringWheel = "ferrari";
        let sliders = {
            maxValueSpeedometer: {
                id: "Speedometer",
                value: null
            },
            maxValueTachometer: {
                id: "Tachometer",
                value: null
            },
            maxValueLanes: {
                id: "Lanes",
                value: null
            },
            maxValueObstacles: {
                id: "Obstacles",
                value: null
            }
        };
        let initWindowCSSValues = [
            {
                id: "mySidenav",
                class: null,
                styles: [
                    {
                        property: "width",
                        value: "630px"
                    }
                ]
            },
            {
                id: "menu",
                class: null,
                styles: [
                    {
                        property: "margin-left",
                        value: "450px"
                    },
                    {
                        property: "visibility",
                        value: "hidden"
                    }
                ]
            },
            {
                id: "game-window",
                class: null,
                styles: [
                    {
                        property: "border",
                        value: "5px solid black"
                    }
                ]
            },
            {
                id: "instructions",
                class: null,
                styles: [
                    {
                        property: "margin-left",
                        value: "-60px"
                    }
                ]
            },
            {
                id: null,
                class: "dashboard-widgets",
                styles: [
                    {
                        property: "visibility",
                        value: "hidden"
                    }
                ]
            },
            {
                id: "steering_wheel",
                class: "last-steering_wheel",
                styles: [
                    {
                        property: "visibility",
                        value: "hidden"
                    }
                ]
            },
            {
                id: "track_img",
                class: null,
                styles: [
                    {
                        property: "visibility",
                        value: "visible"
                    }
                ]
            }
        ];
        let reRenderedWindowCSSValues = [
            {
                id: "steering_wheel",
                class: "last-steering_wheel",
                styles: [
                    {
                        property: "display",
                        value: "block"
                    }
                ]
            },
            {
                id: "mySidenav",
                class: null,
                styles: [
                    {
                        property: "width",
                        value: "0px"
                    }
                ]
            },
            {
                id: "menu",
                class: null,
                styles: [
                    {
                        property: "margin-left",
                        value: "-170px"
                    },
                    {
                        property: "margin-left",
                        value: "0px"
                    },
                    {
                        property: "visibility",
                        value: "visible"
                    }
                ]
            },
            {
                id: "track_img",
                class: null,
                styles: [
                    {
                        property: "visibility",
                        value: "hidden"
                    }
                ]
            },
            {
                id: "game-window",
                class: null,
                styles: [
                    {
                        property: "border",
                        value: "none"
                    }
                ]
            },
            {
                id: "instructions",
                class: null,
                styles: [
                    {
                        property: "margin-left",
                        value: "650px"
                    },
                    {
                        property: "margin-top",
                        value: "-1500px"
                    },
                    {
                        property: "visibility",
                        value: "visible"
                    }
                ]
            },
            {
                id: "writeTopography",
                class: null,
                styles: [
                    {
                        property: "display",
                        value: "none"
                    }
                ]
            },
            {
                id: "writeSpritesheetJSONFilename",
                class: null,
                styles: [
                    {
                        property: "display",
                        value: "none"
                    }
                ]
            },
            {
                id: "writeSpritesheetImages",
                class: null,
                styles: [
                    {
                        property: "display",
                        value: "none"
                    }
                ]
            },
            {
                id: "writeLandscapeObjects",
                class: null,
                styles: [
                    {
                        property: "display",
                        value: "none"
                    }
                ]
            },
            {
                id: "writeTrackObstacles",
                class: null,
                styles: [
                    {
                        property: "display",
                        value: "none"
                    }
                ]
            },
            {
                id: "writeTrackParams",
                class: null,
                styles: [
                    {
                        property: "display",
                        value: "none"
                    }
                ]
            },
            {
                id: "colorPicker",
                class: null,
                styles: [
                    {
                        property: "display",
                        value: "none"
                    }
                ]
            },
            {
                id: "gauges",
                class: null,
                styles: [
                    {
                        property: "position",
                        value: "absolute"
                    },
                    {
                        property: "margin-left",
                        value: "300px"
                    },
                    {   
                        property: "margin-top",
                        value: "-2500px"
                    },
                    {
                        property: "visibility",
                        value: "visible"
                    }
                ]
            },
            {
                id: "steering_wheel",
                class: null,
                styles: [
                    {
                        property: "margin-top",
                        value: "200px"
                    },
                    {
                        property: "visibility",
                        value: "visible"
                    }
                ]
            },
            {
                id: "gamepadImage",
                class: null,
                styles: [
                    {
                        property: "visibility",
                        value: "visible"
                    }
                ]
            },
            {
                id: null,
                class: "dashboard-widgets",
                styles: [
                    {
                        property: "margin-top",
                        value: "200px"
                    }
                ]
            },
            {
                id: null,
                class: "customization",
                styles: [
                    {
                        property: "visibility",
                        value: "hidden"
                    }
                ]
            },
        ];
                              
        let start_tick = () => {
            //if (!tick) {
            //    tick = setInterval(function () {
            //        ButtonActionsQueue.getInstance().queueGUIAction("tick", onMessageReceived);
            //    }, 1000);
            //}
        }
        let stop_tick = () => {
            if (tick) {
                clearInterval(tick);
                tick = null;
            }
        }
        let evaluate = (str) => {
            let v = +str;
            if (str.indexOf("/") >= 0) {
                let args = str.split("/");
                v = +args[0] / +args[1];
            }
            let ans = (v < 100) ? v.toFixed(1).toString() : v.toFixed(0).toString();
            console.log(ans);
            return parseFloat(ans);
        }

        // Function automatically invoked by PVSio-web when the back-end sends states updates
        let onMessageReceived = (err, event) => {
            if (!err) {
                // get new state
                client.getWebSocket().lastState(event.data);
                // parse and render new state
                let res = event.data.toString();
                if (res.indexOf("(#") === 0) {
                    render(stateParser.parse(res));
                    console.log(res);
                }
            } else {
                console.log(err);
            }
        }

        var car = {};
        
        // ----------------------------- CUSTOMIZATION COMPONENTS -----------------------------
        car.customization = new Customization("customization-widget", {
            top: 100,
            left: 700,
            width: 750,
            height: 750
        }, {
            parent: "dashboard", // defines parent div, which is div id="dashboard" by default
            sliderColor: "#4CAF50",
            imagesSteeringWheels: [
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
            ],
            sliderRanges: [
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
                    max: 10,
                    value: 0
                },
                {
                    name: "obstacles",
                    min: 0,
                    max: 100,
                    value: 0
                }
            ],
            controlsText: [
                "Car controls:",
                "[left/right arrow keys] Turn Left/Right",
                "[up/down arrow keys] Accelerate/Brake"
            ],
            gauges: [
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
            ],
            gaugesStyles: [
                {
                    zoom: "45%",
                    marginLeft: "370px",
                    marginTop: "430px"
                }
            ],
            callback: onMessageReceived
        });

        // ----------------------------- DASHBOARD INTERACTION -----------------------------
        car.up = new ButtonExternalController("accelerate", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 38 // key up
        });
        car.down = new ButtonExternalController("brake", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 40 // key down
        });

        // ----------------------------- ARCADE GAME INTERACTION -----------------------------
        car.resume = new ButtonExternalController("resume", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 32 // key space
        });
        car.pause = new ButtonExternalController("pause", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 83 // key 's'
        });
        car.quit = new ButtonExternalController("quit", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 81 // key 'q'
        });
        car.mute = new ButtonExternalController("mute", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 77 // key 'm'
        });
        car.unmute = new ButtonExternalController("unmute", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 85 // key 'u'
        });

        // ----------------------------- DASHBOARD COMPONENTS -----------------------------
        // ---------------- SPEEDOMETER ----------------
        car.speedometerGauge = new Speedometer('speedometer-gauge', {
            label: "kmh",
            max: 260,
            min: 0
        });
        // ---------------- TACHOMETER ----------------
        car.tachometerGauge = new Tachometer('tachometer-gauge', {
            max: 9,
            min: 0,
            label: "x1000/min"
        });
        
        car.customization.setLastRenderingDiv("gauge");

        // ---------------- STEERING WHEEL ----------------
        car.steeringWheel = new SteeringWheel("steering_wheel", {
            top: 140,
            left: 30,
            width: 600,
            height: 600
        }, {
            style: steeringWheel || "ferrari",
            callback: onMessageReceived
        });

        car.customization.setInitRenderingDiv(initWindowCSSValues);

        /*
        // ---------------- CURRENT SHIFT -------------------------
        car.shiftDisplay = new Shift('current-shift');
        // ---------------- CLOCK ----------------------------------
        car.clockDisplay = new Clock('clock');
        // ---------------- ENVIRONMENT TEMPERATURE ----------------
        car.envThermometer = new Thermometer('env-temp');
        */
        
        // ----------------------------- CONTROLLERS COMPONENTS --------------------------
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
        //     callback: onMessageReceived
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
            callback: onMessageReceived
        });

        // Render car dashboard components
        let lastResPVS;
        let render = (res) => {
            lastResPVS = res;
            car.customization.render();
            car.speedometerGauge.render(evaluate(res.speed.val));
            car.tachometerGauge.render(evaluate(res.rpm));
            car.steeringWheel.render(evaluate(res.steering));
            if(parseInt(d3.select("#demo-End")[0][0].innerHTML)===1){
                car.arcadeWidget.render(res);
            }
        }

        sliders=car.customization.rangeEvents(sliders);

        car.customization.endRange(lastResPVS,onMessageReceived,car,reRenderedWindowCSSValues,sliders,steeringWheel);

        let demoFolder = "driving_simulator";
        //register event listener for websocket connection from the client
        client.addListener('WebSocketConnectionOpened',  (e) => {
            console.log("web socket connected");
            //start pvs process
            client.getWebSocket()
                .startPVSProcess({name: "main.pvs", demoName: demoFolder + "/pvs"},  (err, event) => {
                client.getWebSocket().sendGuiAction("init(0);", onMessageReceived);
                d3.select(".demo-splash").style("display", "none");
                d3.select(".content").style("display", "block");
                // start the simulation
                start_tick();
            });
        }).addListener("WebSocketConnectionClosed", (e) => {
            console.log("web socket closed");
        }).addListener("processExited", (e) => {
            let msg = "Warning!!!\r\nServer process exited. See console for details.";
            console.log(msg);
        });

        client.connectToServer();
    });