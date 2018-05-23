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

        ButtonActionsQueue,
        stateParser,
        PVSioWebClient
    ) {
        "use strict";
        var client = PVSioWebClient.getInstance();
        var tick;
        function start_tick() {
            // if (!tick) {
            //     tick = setInterval(function () {
            //         ButtonActionsQueue.getInstance().queueGUIAction("tick", onMessageReceived);
            //     }, 1000);
            // }
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
            label: "kmh",
            max: 260,
            min: 0
        });
        // ---------------- TACHOMETER ----------------
        arcade.tachometerGauge = new Tachometer('tachometer-gauge', {
            max: 9,
            min: 0,
            label: "x1000/min"
        });
        
        // ---------------- STEERING WHEEL ----------------
        arcade.steeringWheel = new SteeringWheel("steering_wheel", {
            top: 140,
            left: 30,
            width: 600,
            height: 600
        }, {
            style: "ferrari",
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
            top: 80,
            left: 650,
            width: 780,
            height: 650
        }, {
            parent: "game-window", // defines parent div, which is div id="game-window" by default
            trackFilename: "track-straight", // track-curves-slopes, // defines track configuration filename, which is "track-curves-slopes.json" by default
            spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
            trackTopography: "curves-slopes", // "straight", // defines initial position after ending 1 lap (restart position in another lap).
            realisticImgs: false,
            vehicle: "car", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
            vehicleImgIndex: 2, // defines vehicle sprite image suffix 
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
            lapNumber: 2,
            // showOfficialLogo: true,
            // loadPVSSpeedPositions: false,
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

        // Render arcade game components
        function render(res) {
            arcade.speedometerGauge.render(evaluate(res.speed.val));
            arcade.tachometerGauge.render(evaluate(res.rpm));
            arcade.steeringWheel.render(evaluate(res.steering));
            arcade.arcadeWidget.render(res);
        }

        var demoFolder = "arcade_game_simulator";
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
