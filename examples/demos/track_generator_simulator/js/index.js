/**
 *
 * @author Paolo Masci, Patrick Oladimeji
 * @date 27/03/15 20:30:33 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
require.config({
    baseUrl: "../../client/app",
    paths: {
        d3: "../lib/d3",
        "pvsioweb": "plugins/prototypebuilder",
        "imagemapper": "../lib/imagemapper",
        "text": "../lib/text",
        "lib": "../lib",
        "cm": "../lib/cm",
        stateParser: './util/PVSioStateParser',
    }
});

require([
        "widgets/Button",
        "widgets/TouchscreenButton",
        "widgets/TouchscreenDisplay",
        "widgets/BasicDisplay",
        "widgets/NumericDisplay",
        "widgets/LED",
        "widgets/car/TrackGenerator",

        "widgets/ButtonActionsQueue",
        "stateParser",
        "PVSioWebClient"
    ], function (
        Button,
        TouchscreenButton,
        TouchscreenDisplay,
        BasicDisplay,
        NumericDisplay,
        LED,

        // Added TrackGenerator Widget Components here
        TrackGenerator,

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

        var trackGenerator = {};
        // -----------------------------  TRACK GENERATOR COMPONENTS -----------------------------
        trackGenerator.trackGeneratorWidget = new TrackGenerator("trackGeneratorWidget", {
            top: 80,
            left: 650,
            width: 780,
            height: 650
        }, {
            parent: "content", // defines parent div, which is div id="content" by default
            spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            render: {
                width: 320,
                height: 240,
                depthOfField: 150,
                camera_distance: 30,
                camera_height: 100
            },
            trackSegmentSize: 5,
            numberOfSegmentPerColor: 4,
            numLanes: 3,
            laneWidth: 0.02,
            params: {
                maxHeight: 900,
                maxCurve:  400,
                numZones:    12, // number of different portions of the track
                curvy:     0.8,
                mountainy: 0.8,
                zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
            },
            trackParam: {
                maxHeight: 900,
                maxCurve:  400,
                numZones:    12, // number of different portions of the track
                curvy:     0.8,
                mountainy: 0.8,
                zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
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
            objects: ["tree","boulder"],
            obstacle: ["boulder"],
            trackLayout: [ 
                // describing the desired track, which is 2 straight lines, followed by curve to left, straight line, 
                // curve to right, straight line, 2 up slopes, curve to left, down slope, curve to right,
                // straight line, each with 3 zones (length) (default is []).
                {
                    topography: "plain",
                    numZones: 3
                },
                {
                    topography: "plain",
                    numZones: 3
                },
                {
                    topography: "left",
                    numZones: 3
                },
                {
                    topography: "plain",
                    numZones: 3
                },
                {
                    topography: "right",
                    numZones: 3
                },
                {
                    topography: "plain",
                    numZones: 3
                },
                {
                    topography: "up",
                    numZones: 3
                },
                {
                    topography: "up",
                    numZones: 3
                },
                {
                    topography: "left",
                    numZones: 3
                },
                {
                    topography: "down",
                    numZones: 3
                },
                {
                    topography: "right",
                    numZones: 3
                },
                {
                    topography: "plain",
                    numZones: 3
                }
            ],
            callback: onMessageReceived
        });

        // ----------------------------- TRACK GENERATOR INTERACTION -----------------------------
        trackGenerator.start = new Button("start", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 49 // key 1
        });
        trackGenerator.stop = new Button("stop", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 50 // key 2
        });

        // Render track generator components
        function render(res) {
            trackGenerator.trackGeneratorWidget.render();
        }

        var demoFolder = "track_generator_simulator";
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
