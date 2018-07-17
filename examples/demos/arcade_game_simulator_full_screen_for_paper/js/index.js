/**
 *
 * @author José Carlos
 * @date 17/06/18 10:30:33 AM
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
        "widgets/car/Gauge",
        // "widgets/car/Speedometer",
        // "widgets/car/Tachometer",
        // "widgets/car/Shift",
        // "widgets/car/Clock",
        // "widgets/car/Thermometer",
        "widgets/car/SteeringWheel",
        "widgets/car/VirtualKeypadController",
        "widgets/car/GamepadController",
        "widgets/car/DrawGamepad",
        "widgets/car/GyroscopeController",
        "widgets/car/Customization",
        "widgets/car/Arcade",
        "widgets/car/LincolnMKCDashboard",

        "widgets/ButtonActionsQueue",
        "stateParser",
        "PVSioWebClient"
    ], function (
        ButtonExternalController,
        TouchscreenButton,
        TouchscreenDisplay,
        BasicDisplay,
        NumericDisplay,
        LED,

        // Added Arcade Widget Components here
        // Added car components here
        Gauge,
        // Speedometer,
        // Tachometer,
        // Shift,
        // Clock,
        // Thermometer,
        SteeringWheel,
        VirtualKeypadController,
        GamepadController,
        DrawGamepad,
        GyroscopeController,
        Customization,
        Arcade,
        LincolnMKCDashboard,

        ButtonActionsQueue,
        stateParser,
        PVSioWebClient
    ) {
        "use strict";
        var client = PVSioWebClient.getInstance();
        var tick;
        function start_tick() {
            if (!tick) {
                 tick = setInterval(function () {
                     ButtonActionsQueue.getInstance().queueGUIAction("tick", onMessageReceived);
                 }, 120);
            }
        }
        function stop_tick() {
            if (tick) {
                clearInterval(tick);
                tick = null;
            }
        }
        function evaluate(str) {
            var v = +str;
            if (str.indexOf("/") >= 0) {
                var args = str.split("/");
                v = +args[0] / +args[1];
            }
            var ans = (v < 100) ? v.toFixed(1).toString() : v.toFixed(0).toString();
            console.log(ans);
            return parseFloat(ans);
        }

        // Function automatically invoked by PVSio-web when the back-end sends states updates
        function onMessageReceived(err, event) {
            if (!err) {
                // get new state
                client.getWebSocket().lastState(event.data);
                // parse and render new state
                var res = event.data.toString();
                if (res.indexOf("(#") === 0) {
                    render(stateParser.parse(res));
                    console.log(res);
                }
            } else {
                console.log(err);
            }
        }

        // Disable Vertical and Horizontal Scrolling on Browser
        $("body").css("overflow", "hidden");

        // Enable Vertical and Horizontal Scrolling on Browser
        // $("body").css("overflow", "auto");

        var arcade = {};

        // arcade.lincolnMKCDashboard = new LincolnMKCDashboard('lincolnMKCDashboard',
        // {
        //     top: 5, left: 0, width: 450, height: 140 
        // },{ 
        //     parent: "content", // defines parent div, which is div id="body" by default 
        //     dashIndex: 1,
        //     design: "before", // "after",
        //     buttonsPVS: [ "startAndStop", "activateSportMode"],
        //     callback: onMessageReceived
        //     } 
        // );

        // // ---------------- VIRTUAL KEYPAD CONTROLLER ----------------
        // arcade.virtualKeypadController = new VirtualKeypadController("virtualKeypad_controller", 
        // {
        //     top: 580,
        //     left: 1280,
        //     width: 750,
        //     height: 750
        // }, {
        //     keyboardImgDiv: "mobileDevicesController", // defines keyboard image div, which is div id="mobileDevicesController" by default
        //     keyboardClass: "icon keyboard",
        //     keyboardLeftDesktop: 1370,
        //     keyboardTopDesktop: 710,
        //     keyboardHoverInitialTitle: "Click to open virtual keypad controller",
        //     keyboardHoverSecondTitle: "Click to close virtual keypad controller",
        //     parent: "content", // defines parent div, which is div id="body" by default
        //     buttonsDiv: "virtualKeyPad", // defines buttons image div, which is div id="virtualKeyPad" by default
        //     simulatorActions: "simulatorActions",
        //     simulatorArrows: "simulatorArrows",
        //     floatArrows: "floatArrows",
        //     blockArrows: "blockArrows",
        //     buttonClass: "ui-button ui-corner-all ui-widget ui-button-icon-only",
        //     arrowKeysPVS: [ "accelerate", "brake", "steering_wheel_left", "steering_wheel_right"],
        //     otherKeysPVS: [ "quit", "pause", "resume" ],
        //     callback: onMessageReceived
        // });

        // ----------------------------- DASHBOARD INTERACTION -----------------------------
        arcade.up = new ButtonExternalController("accelerate", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 38 // key up
        });
        arcade.down = new ButtonExternalController("brake", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 40 // key down
        });

        // // ----------------------------- DASHBOARD COMPONENTS -----------------------------
        // // ---------------- SPEEDOMETER ----------------
        // arcade.speedometerGauge = new Gauge('speedometer-gauge', {
        //     width: 136,
        //     height: 136,
        //     top: 0,
        //     left: 0
        // }, {
        //     max: 260,
        //     min: 0,
        //     label: "kmh",
        //     redZones: [ { from: 240, to: 260 } ],
        //     majorTicks: 11,
        //     innerFillColor: "#0b0605"
        // });
        // arcade.speedometerGauge.render(0);
        // // ---------------- TACHOMETER ----------------
        // arcade.tachometerGauge = new Gauge('tachometer-gauge', {
        //     width: 100,
        //     height: 100,
        //     top: 0,
        //     left: 0
        // }, {
        //     max: 9,
        //     min: 0,
        //     label: "x1000/min",
        //     redZones: [ { from: 7, to: 9 } ],
        //     majorTicks: 10,
        //     innerFillColor: "#0b0605"
        // });
        // arcade.tachometerGauge.render(0);

        // ---------------- STEERING WHEEL ----------------
        arcade.steeringWheel = new SteeringWheel("steering_wheel", 
        {
            top: 470,
            left: 430,
            width: 350,
            height: 350
        }, {
            style: "lincoln_mkc_2015_2", // "lincoln_mkc_2015_1", // will show steering wheel with its gauges (this won't move-static image)
            "z-index": 1, // to overlap the gauges
            callback: onMessageReceived
        });

        // // ---------------- GAMEPAD CONTROLLER ----------------
        // arcade.gamepadController = new GamepadController("gamepad_controller", {
        //     top: 1000,
        //     left: 100,
        //     width: 750,
        //     height: 750
        // }, {
        //     carAccelerate: arcade.up,
        //     carBrake: arcade.down,
        //     carSteeringWheel: arcade.steeringWheel,
        //     accelerateInstructionPVS: "accelerate",
        //     brakeInstructionPVS: "brake",
        //     steeringWheelInstructionPVS: "steering_wheel",
        //     useButtonActionsQueue: false, // Default is false
        //     usePressReleasePVS: true, // Default is true
        //     type: "gamepad", // "steeringWheelAndPedals", // Default is "gamepad"
        //     accelerationIndex: 0,
        //     brakeIndex: 1,
        //     leftArrowIndex: 14,
        //     rightArrowIndex: 15,
        //     accelerationPedalIndex: 1,
        //     brakePedalIndex: 1,
        //     steeringWheelIndex: 0,
        //     analogueStickIndex: 9,
        //     leftAnalogueIndex: 0,
        //     rightAnalogueIndex: 2,
        //     pauseAction: {
        //         pauseIndex: 9,
        //         instructionPVS: "pause"
        //     },
        //     quitAction: {
        //         quitIndex: 8,
        //         instructionPVS: "quit"
        //     },
        //     resumeAction: {
        //         resumeIndex: 16,
        //         instructionPVS: "resume"
        //     },
        //     muteAction: {
        //         muteIndex: 4,
        //         instructionPVS: "mute"
        //     },
        //     unmuteAction: {
        //         unmuteIndex: 5,
        //         instructionPVS: "unmute"
        //     },
        //     useSensitivity: false, // Default is false
        //     // sensitivityValue: 50, // Default is 40%
        //     callback: onMessageReceived
        // });

        // // ----------------------------- GYROSCOPE COMPONENTS -----------------------------
        // arcade.gyroscopeController = new GyroscopeController("Gyroscope_Controller", {
        //     top: 100,
        //     left: 700,
        //     width: 750,
        //     height: 750
        // }, {
        //     parent: "gyroscope", // defines parent div, which is div id="gyroscope" by default
        //     carSteeringWheel: arcade.steeringWheel,
        //     carAccelerate: arcade.up,
        //     carBrake: arcade.down,
        //     useSensitivity: false, // Default is false
        //     // sensitivityValue: 50, // Default is 40%
        //     callback: onMessageReceived
        // });

        // /*
        // // ---------------- CURRENT SHIFT -------------------------
        // arcade.shiftDisplay = new Shift('current-shift');
        // // ---------------- CLOCK ----------------------------------
        // arcade.clockDisplay = new Clock('clock');
        // // ---------------- ENVIRONMENT TEMPERATURE ----------------
        // arcade.envThermometer = new Thermometer('env-temp');
        // */

        // ----------------------------- ARCADE GAME COMPONENTS -----------------------------
        arcade.arcadeWidget = new Arcade("arcadeWidget", {
            top: 0,
            left: 0,
            width: 1440,
            height: 650
        }, {
            parent: "content", // defines parent div, which is div id="body" by default
            scaleWindow: 1, // scales canvas div
            trackFilename: "trackLayout_real", // defines track configuration filename, which is "track-curves-slopes-random.json" by default
            spritesFilename: "spritesheet2", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            spritesFiles: ["spritesheet2","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
            realisticImgs: true,
            useVehicle: false,
            vehicle: "car", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
            // vehicleImgIndex: 2, // defines vehicle sprite image suffix
            logoImgIndex: 3, // defines logo sprite image suffix
            backgroundImgIndex: 1, // defines background sprite image suffix
            stripePositions: {
                trackP1: -0.55,
                trackP2: 0.55,
                borderWidth: 0.08,
                inOutBorderWidth: 0.02,
                landscapeOutBorderWidth: 0.13,
                diffTrackBorder: 0.05,
                finishLineP1: -0.40,
                finishLineP2: 0.40,
                diffLanesFinishLine: 0.05
            },
            lapNumber: 1,
            // showOfficialLogo: true,
            loadPVSSpeedPositions: true,
            // predefinedTracks: 4,
            // newLap_functionNamePVS: "new_lap",
            // action_attribute: "action",
            // direction_attribute: "direction",
            // sound_attribute: "sound",
            // lap_attribute: "lap",
            // speed_attribute: "speed",
            // posx_attribute: "posx",
            // position_attribute: "position",
            // lap_value: "val",
            // speed_value: "val",
            // posx_value: "val",
            // position_value: "val",
            // left_attribute: "left",
            // right_attribute: "right",
            // straight_attribute: "straight",
            // accelerate_attribute: "acc",
            // brake_attribute: "brake",
            // idle_attribute: "idle",
            // quit_attribute: "quit",
            // pause_attribute: "pause",
            // resume_attribute: "resume",
            // mute_attribute: "mute",
            // unmute_attribute: "unmute",
            callback: onMessageReceived
        });

        // ----------------------------- ARCADE GAME INTERACTION -----------------------------
        arcade.resume = new ButtonExternalController("resume", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 32 // key space
        });
        arcade.pause = new ButtonExternalController("pause", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 83 // key 's'
        });
        arcade.quit = new ButtonExternalController("quit", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 81 // key 'q'
        });
        arcade.mute = new ButtonExternalController("mute", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 77 // key 'm'
        });
        arcade.unmute = new ButtonExternalController("unmute", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 85 // key 'u'
        });

        arcade.arcadeWidget.startSimulation();
        // $("#arcadeSimulator_arcadeWidget").css("top", "3px");
        // $("#arcadeSimulator_arcadeWidget").css("left", "0px");
        // $("#arcadeSimulator_arcadeWidget").css("height", "770px");
        // $("#arcadeSimulator_arcadeWidget").css("z-index", "-1");
        // // Placing Gauges behind the steering wheel
        // $("#gauges").css("zoom", "75%");
        // $("#gauges").css("top", "695px");
        // $("#gauges").css("left", "720px");
        // $("#tog_soundWidget_arcadeWidget").css("top", "710px");
        // $("#tog_soundWidget_arcadeWidget").css("left", "1300px");
        // $("#tog_soundWidget_arcadeWidget").css("z-index", "1");
        // $("#mobileDevicesController_virtualKeypad_controller").css("visibility", "hidden");
        
        function render(res) {
            arcade.arcadeWidget.render(res);
        }

        // // Render arcade game components
        // let firstResume = 0;
        // let renderHands = false;
        // function render(res) {
        //     if(res.action==="resume"){
        //         firstResume = 1;
        //         $("#mobileDevicesController_virtualKeypad_controller").css("visibility", "visible");
        //         if(renderHands){
        //             $("#hand_right").css("visibility", "visible");
        //             $("#hand_left").css("visibility", "visible");
        //         }
        //     }
        //     if(res.action==="pause" || res.action==="quit"){
        //         $("#arcadeSimulator_arcadeWidget").css("height", "770px");
        //         firstResume = 0;
        //         // Hide Case Study Dashboard Image
        //         arcade.lincolnMKCDashboard.hide();
        //         $("#gauges").css("visibility", "hidden");
        //         if(renderHands){
        //             $("#hand_right").css("visibility", "hidden");
        //             $("#hand_left").css("visibility", "hidden");
        //         }
        //         arcade.steeringWheel.hide();
        //         arcade.virtualKeypadController.hide();
        //     }
        //     if(res.action!=="pause" && res.action!=="quit" && firstResume===1){
        //         $("#arcadeSimulator_arcadeWidget").css("height", "650px");
        //         // Render Case Study Dashboard Image
        //         arcade.lincolnMKCDashboard.render();
        //         $("#gauges").css("visibility", "visible");
        //         if(renderHands){
        //             $("#hand_right").css("visibility", "visible");
        //             $("#hand_left").css("visibility", "visible");
        //         }
        //         arcade.virtualKeypadController.reveal();
        //         // Overlapping VirtualKeypadController in relation to Arcade Simulator
        //         $("#mobileDevicesController_virtualKeypad_controller").css("z-index", "1");
        //         $("#virtualKeyPad_virtualKeypad_controller").css("z-index", "1");
        //         $("#simulatorArrows").css("margin-top", "-55px");
        //         $("#simulatorArrows").css("margin-left", "20px");
        //         arcade.speedometerGauge.render(evaluate(res.speed.val));
        //         arcade.tachometerGauge.render(evaluate(res.rpm));
        //         arcade.steeringWheel.render(evaluate(res.steering));

        //         if(renderHands){
        //             let rotateAngle = "";
        //             switch(evaluate(res.steering)){
        //                 case 0: 
        //                     rotateAngle = "rotate(" + 8 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "880px",
        //                         "left" :"1105px"
        //                     });
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1330px",
        //                         "left" :"760px"
        //                     });
        //                     break;
        //                 case 10: 
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1100px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1420px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 20: 
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1100px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1420px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 30: 
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1130px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1400px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 40: 
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1130px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1400px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 50: 
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1150px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1380px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 60: 
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1150px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1380px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 70:
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1170px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1360px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 80:
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1170px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1360px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 100:
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1190px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1340px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case 90:
        //                     rotateAngle = "rotate(" + 60 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1170px",
        //                         "left" :"975px"
        //                     });
        //                     rotateAngle = "rotate(" + 20 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1360px",
        //                         "left" :"500px"
        //                     });
        //                     break;
        //                 case -10: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1285px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1520px",
        //                         "left" :"780px"
        //                     });
        //                     break;
        //                 case -20: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1285px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1520px",
        //                         "left" :"780px"
        //                     });
        //                     break;
        //                 case -30: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1285px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1500px",
        //                         "left" :"780px"
        //                     });
        //                     break;
        //                 case -40: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1285px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1500px",
        //                         "left" :"780px"
        //                     });
        //                     break;
        //                 case -50: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1280px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1480px",
        //                         "left" :"780px"
        //                     });
        //                     break;
        //                 case -60: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1280px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1480px",
        //                         "left" :"780px"
        //                     });
        //                     break;
        //                 case -70: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1285px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1460px",
        //                         "left" :"780px"
        //                     });
        //                     break;
        //                 case -80: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1285px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1460px",
        //                         "left" :"780px"
        //                     });
        //                     break;
        //                 case -100: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1280px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1440px",
        //                         "left" :"785px"
        //                     });
        //                     break;
        //                 case -90: 
        //                     rotateAngle = "rotate(" + 0 + "deg)";
        //                     $("#hand_right").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1270px",
        //                         "left" :"1285px"
        //                     });
        //                     rotateAngle = "rotate(" + -8 + "deg)";
        //                     $("#hand_left").css({
        //                         "-webkit-transform" : rotateAngle,
        //                         "transform" : rotateAngle,
        //                         "-webkit-transform-origin" : "50% 50%",
        //                         "transform-origin" : "50% 50%",
        //                         "top" : "1480px",
        //                         "left" :"785px"
        //                     });
        //                     break;
        //             }

        //             // let rotateAngle = "rotate(" + evaluate(res.steering) + "deg)";
        //             // $("#hand_right").css({
        //             //   "-webkit-transform" : rotateAngle,
        //             //   "transform" : rotateAngle,
        //             //   "-webkit-transform-origin" : "50% 50%",
        //             //   "transform-origin" : "50% 50%"
        //             // });
        //             // $("#hand_left").css({
        //             //     "-webkit-transform" : rotateAngle,
        //             //     "transform" : rotateAngle,
        //             //     "-webkit-transform-origin" : "50% 50%",
        //             //     "transform-origin" : "50% 50%"
        //             // });
        //         }
        //     }
            
        //     arcade.gamepadController.render();
        //     arcade.gyroscopeController.render();          
        //     arcade.arcadeWidget.render(res);
        //     // // arcade.lincolnMKCDashboard.callPressReleasePVS("startAndStop");
        //     // // arcade.lincolnMKCDashboard.callClickPVS("activateSportMode");
        // }

        var demoFolder = "arcade_game_simulator_full_screen_for_paper";
        //register event listener for websocket connection from the client
        client.addListener('WebSocketConnectionOpened', function (e) {
            console.log("web socket connected");
            //start pvs process
            client.getWebSocket()
                .startPVSProcess({name: "main.pvs", demoName: demoFolder + "/pvs"}, function (err, event) {
                client.getWebSocket().sendGuiAction("init(0);", onMessageReceived);
                d3.select(".demo-splash").style("display", "none");
                d3.select(".content").style("display", "block");
                // start the simulation
                start_tick();
            });
        }).addListener("WebSocketConnectionClosed", function (e) {
            console.log("web socket closed");
        }).addListener("processExited", function (e) {
            var msg = "Warning!!!\r\nServer process exited. See console for details.";
            console.log(msg);
        });

        client.connectToServer();
    });
