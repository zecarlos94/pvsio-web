/**
 *
 * @author Paolo Masci, Patrick Oladimeji
 * @date 27/03/15 20:30:33 PM
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
        "widgets/car/Arcade",
        "widgets/car/ArcadeWithoutLaps",

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
        Arcade,
        ArcadeWithoutLaps,

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

        var arcade = {};

        // ----------------------------- DRAWGAMEPAD COMPONENTS -----------------------------
        // arcade.drawGamepad = new DrawGamepad("drawGamepad", {
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
        arcade.drawGamepad = new DrawGamepad("drawGamepad", {
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

        document.getElementById("gamepadImage").style.visibility = "visible";

        // ---------------- VIRTUAL KEYPAD CONTROLLER ----------------
        arcade.virtualKeypadController = new VirtualKeypadController("virtualKeypad_controller", {
            top: 1050,
            left: 200,
            width: 750,
            height: 750
        }, {
            keyboardImgDiv: "mobileDevicesController", // defines parent div, which is div id="mobileDevicesController" by default
            keyboardClass: "icon keyboard",
            keyboardLeftDesktop: 50,
            keyboardTopDesktop: 900,
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
            callback: onMessageReceived
        });

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

        // ----------------------------- DASHBOARD COMPONENTS -----------------------------
        // ---------------- SPEEDOMETER ----------------
        arcade.speedometerGauge = new Speedometer('speedometer-gauge', {
            max: 260,
            min: 0,
            label: "kmh"
        });
        // ---------------- TACHOMETER ----------------
        arcade.tachometerGauge = new Tachometer('tachometer-gauge', {
            max: 9,
            min: 0,
            label: "x1000/min"
        });

        // ---------------- STEERING WHEEL ----------------
        arcade.steeringWheel = new SteeringWheel("steering_wheel", {
            top: 300,
            left: 10,
            width: 600,
            height: 600
        }, {
            style: "ferrari",
            callback: onMessageReceived
        });

        // ---------------- GAMEPAD CONTROLLER ----------------
        arcade.gamepadController = new GamepadController("gamepad_controller", {
            top: 1000,
            left: 100,
            width: 750,
            height: 750
        }, {
            carAccelerate: arcade.up,
            carBrake: arcade.down,
            carSteeringWheel: arcade.steeringWheel,
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
            // sensitivityValue: 50, // Default is 40%
            callback: onMessageReceived
        });

        // ----------------------------- GYROSCOPE COMPONENTS -----------------------------
        arcade.gyroscopeController = new GyroscopeController("Gyroscope_Controller", {
            top: 100,
            left: 700,
            width: 750,
            height: 750
        }, {
            parent: "gyroscope", // defines parent div, which is div id="gyroscope" by default
            carSteeringWheel: arcade.steeringWheel,
            carAccelerate: arcade.up,
            carBrake: arcade.down,
            useSensitivity: false, // Default is false
            // sensitivityValue: 50, // Default is 40%
            callback: onMessageReceived
        });

        /*
        // ---------------- CURRENT SHIFT -------------------------
        arcade.shiftDisplay = new Shift('current-shift');
        // ---------------- CLOCK ----------------------------------
        arcade.clockDisplay = new Clock('clock');
        // ---------------- ENVIRONMENT TEMPERATURE ----------------
        arcade.envThermometer = new Thermometer('env-temp');
        */

        // ----------------------------- ARCADE GAME COMPONENTS -----------------------------
        arcade.arcadeWidget = new Arcade("arcadeWidget", {
            top: 300,
            left: 860,
            width: 320,
            height: 240
        }, {
            parent: "content", // defines parent div, which is div id="body" by default
            trackFilename: "trackLayout2",// "track-curves-slopes-random", // "track-straight-random", // defines track configuration filename, which is "track-curves-slopes-random.json" by default
            spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
            realisticImgs: false,
            vehicle: "car", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
            vehicleImgIndex: 2, // defines vehicle sprite image suffix
            // logoImgIndex: 1, // defines logo sprite image suffix
            // backgroundImgIndex: 1, // defines background sprite image suffix
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
            lapNumber: 3,
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

        arcade.arcadeWidget2 = new Arcade("arcadeWidget2", {
            top: 850,
            left: 860,
            width: 320,
            height: 240
        }, {
            parent: "content", // defines parent div, which is div id="body" by default
            trackFilename: "track-straight-random", // defines track configuration filename, which is "track-curves-slopes-random.json" by default
            spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
            realisticImgs: false,
            vehicle: "helicopter", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
            vehicleImgIndex: 1, // defines vehicle sprite image suffix
            // logoImgIndex: 1, // defines logo sprite image suffix
            // backgroundImgIndex: 1, // defines background sprite image suffix
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
            lapNumber: 2,
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

        arcade.arcadeWidget3 = new Arcade("arcadeWidget3", {
            top: 1400,
            left: 860,
            width: 320,
            height: 240
        }, {
            parent: "content", // defines parent div, which is div id="body" by default
            trackFilename: "track-curves-slopes-random", // defines track configuration filename, which is "track-curves-slopes-random.json" by default
            spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
            realisticImgs: false,
            vehicle: "motorbike", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
            vehicleImgIndex: 1, // defines vehicle sprite image suffix
            // logoImgIndex: 1, // defines logo sprite image suffix
            // backgroundImgIndex: 1, // defines background sprite image suffix
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
        arcade.arcadeWidget2.startSimulation();
        arcade.arcadeWidget3.startSimulation();

        // Render arcade game components
        function render(res) {
            arcade.speedometerGauge.render(evaluate(res.speed.val));
            arcade.tachometerGauge.render(evaluate(res.rpm));
            arcade.steeringWheel.render(evaluate(res.steering));
            arcade.gamepadController.render();
            arcade.gyroscopeController.render();          
            arcade.arcadeWidget.render(res);
            arcade.arcadeWidget2.render(res);
            arcade.arcadeWidget3.render(res);
            arcade.drawGamepad.render();
            // arcade.drawGamepad.callPressReleasePVS("accelerate");
            // arcade.drawGamepad.callClickPVS("leftStick");
        }

        var demoFolder = "arcade_game_simulator_shared_across_instances";
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
