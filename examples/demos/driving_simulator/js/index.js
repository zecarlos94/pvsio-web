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
            maxValueHills: {
                id: "Hills",
                value: null
            },
            maxValueObstacles: {
                id: "Obstacles",
                value: null
            },
            maxValueOtherCars: {
                id: "Other-Cars",
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
                id: "instructions",
                class: null,
                styles: [
                    {
                        property: "margin-left",
                        value: "650px"
                    },
                    {
                        property: "margin-top",
                        value: "-740px"
                    },
                    {
                        property: "visibility",
                        value: "visible"
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
                        value: "350px"
                    },
                    {   
                        property: "margin-top",
                        value: "-810px"
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
            type: "steeringWheelAndPedals", // Default is "gamepad"
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
            callback: onMessageReceived
        });

        // car.gamepadController.listGamepads();
        // car.gamepadController.listGamepadsKnown();

        // ---------------- VIRTUAL KEYPAD CONTROLLER ----------------
        car.virtualKeypadController = new VirtualKeypadController("virtualKeypad_controller", {
            top: 800,
            left: 800,
            width: 750,
            height: 750
        }, {
            keyboardImgDiv: "mobileDevicesController", // defines parent div, which is div id="mobileDevicesController" by default
            keyboardClass: "icon keyboard",
            keyboardTopMobile: 750,
            keyboardLeftMobile: 1350,
            keyboardTopDesktop: 735,
            keyboardLeftDesktop: 1380,
            // keyboardUrl: "img/keyboard.png", // Image is located at widgets/car/configurations/img/keyboard.png by default
            keyboardHoverInitialTitle: "Click to open virtual keypad controller",
            keyboardHoverSecondTitle: "Click to close virtual keypad controller",
            // keyboardOnclickAction: "alert("Clicked");", // No action by default
            keyboardImageWidthMobile: 80,
            keyboardImageHeightMobile: 60,
            keyboardImageWidthDesktop: 50,
            keyboardImageHeightDesktop: 30,
            parent: "virtualKeyPad", // defines parent div, which is div id="virtualKeyPad" by default
            simulatorActions: "simulatorActions",
            simulatorArrows: "simulatorArrows",
            floatArrows: "floatArrows",
            blockArrows: "blockArrows",
            buttonClass: "ui-button ui-corner-all ui-widget ui-button-icon-only",
            title: "Button with icon only",
            arrowKeysPVS: [ "accelerate", "brake", "steering_wheel_left", "steering_wheel_right"],
            otherKeysPVS: [ "quit", "pause", "resume" ],
            callback: onMessageReceived
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
        //     // buttonsPVS: [ "accelerate", "brake", "y", "x", "menu", "windows", "xbox", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ],
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
            // buttonsPVS: [ "accelerate", "brake", "triangle", "square", "options", "share", "touchpad", "ps", "leftArrow", "upArrow", "rightArrow", "downArrow", "rightStick", "leftStick" ],
            callback: onMessageReceived
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
            callback: onMessageReceived
        });

        // Render car dashboard components
        let render = (res) => {
            car.customization.render();
            car.speedometerGauge.render(evaluate(res.speed.val));
            car.tachometerGauge.render(evaluate(res.rpm));
            car.steeringWheel.render(evaluate(res.steering));
            car.gamepadController.render();
            car.gyroscopeController.render();
            // car.drawGamepad.callPressReleasePVS("accelerate");
            // car.drawGamepad.callClickPVS("leftStick");
        }

        // // Full Left
        // console.log("Full Left Angle: ", car.gamepadController.calculateRotationAngle(-0.16, -1.0));
        // // Full Right
        // console.log("Full Right Angle: ", car.gamepadController.calculateRotationAngle(-0.08, 1.0));

        sliders=car.customization.rangeEvents(sliders);

        car.customization.endRange(onMessageReceived,car,reRenderedWindowCSSValues,sliders,steeringWheel);

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