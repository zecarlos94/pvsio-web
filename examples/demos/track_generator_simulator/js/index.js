/**
 *
 * @author José Carlos
 * @date 17/06/18 10:30:33 AM
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
            parent: "content", // defines parent div, which is div id="body" by default
            spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            render: {
                depthOfField: 150,
                camera_distance: 30,
                camera_height: 320
            },
            trackSegmentSize: 5,
            numberOfSegmentPerColor: 4,
            numLanes: 3,
            laneWidth: 0.02,
            trackParam: {
                numZones:    3, // number of different portions of the track
                zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
            },
            // Information regarding current controllable_car's car
            controllable_vehicle: {
                position: 10,
                speed: 0,
                acceleration: 0.05,
                deceleration: 0.3,
                breaking: 0.6,
                turning: 5.0,
                posx: 0,
                maxSpeed: 15
            },
            objects: [
                {
                    filename:"tree",
                    scale: 3.5,
                    positionsX: [
                        -2.4,
                        2.3
                    ]
                },
                {
                    filename:"stump",
                    scale: 3.5,
                    positionsX: [
                        -2.9,
                        4.2
                    ]
                },
                {
                    filename:"boulder",
                    scale: 3.5,
                    positionsX: [
                        -1.8,
                        1.6
                    ]
                },
                {
                    filename:"tree2",
                    scale: 3.5,
                    positionsX: [
                        -1.6,
                        1.8
                    ]
                },
                {
                    filename:"brunetteGirlBack",
                    scale: 6,
                    positionsX: [
                        -1.7,
                        1.9
                    ]
                },
                {
                    filename:"bush2",
                    scale: 6,
                    positionsX: [
                        -1.9,
                        1.7
                    ]
                },
                {
                    filename:"hatManBack",
                    scale: 7,
                    positionsX: [
                        2.9,
                        -2.7
                    ]
                }
            ],
            obstacle: [
                {
                    filename:"dead_tree2",
                    scale: 2.75,
                    positionsX: [
                        0.4
                    ]
                },
                {
                    filename:"column",
                    scale: 2.75,
                    positionsX: [
                        0.4
                    ]
                },
                {
                    filename:"dearRight",
                    scale: 1.75,
                    positionsX: [
                        -0.4,
                        0.4,
                        -0.3,
                        0.2,
                        0
                    ]
                }
            ],
            obstaclePerIteration: 20,
            trackColors: {
                grass1: "#699864",
                border1: "#e00",
                border2: "#fff",
                outborder1: "#496a46",
                outborder_end1: "#474747",
                track_segment1: "#777",
                lane1: "#fff",
                lane2: "#777",
                laneArrow1: "#00FF00",
                track_segment_end:"#000",
                lane_end: "#fff"
            },
            trackLayout: [ 
                // trackLayoutArcade2.json File
                // describing the desired track, which is curve to left, straight line, 
                // curve to right, straight line, each with 1 zone (block) and with different 
                // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
                {
                    topography: {
                        name:"left",
                        curvature: -90
                    },
                    profile: "flat",
                    numZones: 1,
                    trafficSignals: []
                },
                {
                    topography: {
                        name:"straight",
                        curvature: 0
                    },
                    profile: "down",
                    numZones: 1,
                    trafficSignals: []
                },
                {
                    topography: {
                        name:"right",
                        curvature: 90
                    },
                    profile: "flat",
                    numZones: 1,
                    trafficSignals: []
                },
            ],
            callback: onMessageReceived
        });

        trackGenerator.trackGeneratorWidget2 = new TrackGenerator("trackGeneratorWidget2", {
            top: 80,
            left: 650,
            width: 780,
            height: 650
        }, {
            parent: "content", // defines parent div, which is div id="body" by default
            spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            render: {
                depthOfField: 150,
                camera_distance: 30,
                camera_height: 320
            },
            trackSegmentSize: 5,
            numberOfSegmentPerColor: 4,
            numLanes: 3,
            laneWidth: 0.02,
            trackParam: {
                numZones:    12, // number of different portions of the track
                zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
            },
            // Information regarding current controllable_car's car
            controllable_vehicle: {
                position: 10,
                speed: 0,
                acceleration: 0.05,
                deceleration: 0.3,
                breaking: 0.6,
                turning: 5.0,
                posx: 0,
                maxSpeed: 15
            },
            objects: [
                {
                    filename:"tree",
                    scale: 3.5,
                    positionsX: [
                        -2.4,
                        2.3
                    ]
                },
                {
                    filename:"stump",
                    scale: 3.5,
                    positionsX: [
                        -2.9,
                        4.2
                    ]
                },
                {
                    filename:"boulder",
                    scale: 3.5,
                    positionsX: [
                        -1.8,
                        1.6
                    ]
                },
                {
                    filename:"tree2",
                    scale: 3.5,
                    positionsX: [
                        -1.6,
                        1.8
                    ]
                },
                {
                    filename:"brunetteGirlBack",
                    scale: 6,
                    positionsX: [
                        -1.7,
                        1.9
                    ]
                },
                {
                    filename:"bush2",
                    scale: 6,
                    positionsX: [
                        -1.9,
                        1.7
                    ]
                },
                {
                    filename:"hatManBack",
                    scale: 7,
                    positionsX: [
                        2.9,
                        -2.7
                    ]
                }
            ],
            obstacle: [
                {
                    filename:"dead_tree2",
                    scale: 2.75,
                    positionsX: [
                        0.4
                    ]
                },
                {
                    filename:"column",
                    scale: 2.75,
                    positionsX: [
                        0.4
                    ]
                },
                {
                    filename:"dearRight",
                    scale: 1.75,
                    positionsX: [
                        -0.4,
                        0.4,
                        -0.3,
                        0.2,
                        0
                    ]
                }
            ],
            obstaclePerIteration: 20,
            trackColors: {
                grass1: "#699864",
                border1: "#e00",
                border2: "#fff",
                outborder1: "#496a46",
                outborder_end1: "#474747",
                track_segment1: "#777",
                lane1: "#fff",
                lane2: "#777",
                laneArrow1: "#00FF00",
                track_segment_end:"#000",
                lane_end: "#fff"
            },
            trackLayout: [ 
                // trackLayoutArcade2.json File
                // describing the desired track, which is curve to left, straight line, 
                // curve to right, straight line, each with 1 zone (block) and with different 
                // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
                {
                    topography: {
                        name:"left",
                        curvature: -90
                    },
                    profile: "flat",
                    numZones: 1,
                    trafficSignals: []
                },
                {
                    topography: {
                        name:"straight",
                        curvature: 0
                    },
                    profile: "down",
                    numZones: 1,
                    trafficSignals: []
                },
                {
                    topography: {
                        name:"right",
                        curvature: 90
                    },
                    profile: "flat",
                    numZones: 1,
                    trafficSignals: []
                },
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
            trackGenerator.trackGeneratorWidget2.render();
        }

        // API to generate track with parameters received as argument by the constructor, i.e. new TrackGenerator()
        // trackGenerator.trackGeneratorWidget.generateStraightTrack();
        // trackGenerator.trackGeneratorWidget.generateTrackCurvesSlopes();
        trackGenerator.trackGeneratorWidget.generateTrackBasedOnTrackLayoutOptField();
        // trackGenerator.trackGeneratorWidget2.generateStraightTrack();
        // trackGenerator.trackGeneratorWidget2.generateTrackCurvesSlopes();
        trackGenerator.trackGeneratorWidget2.generateTrackBasedOnTrackLayoutOptField();

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
