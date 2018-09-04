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
            filePath: "track_generator_simulator_for_paper/img/",
            spritesFilename: "spritesheet2", // defines spritesheet configuration filename, which is "spritesheet.json" by default
            render: {
                depthOfField: 150,
                camera_distance: 30,
                camera_height: 320
            },
            trackSegmentSize: 5,
            numberOfSegmentPerColor: 4,
            numLanes: 2,
            laneWidth: 0.02,
            trackParam: {
                numZones:    4, // number of different portions of the track
                zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
            },
            // Information regarding current controllable_vehicle's sprite
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
                    filename:"real_tree",
                    scale: 3.5,
                    positionsX: [
                        -2.4,
                        2.3
                    ]
                },
                {
                    filename:"real_tree2",
                    scale: 3.5,
                    positionsX: [
                        -2.9,
                        4.2
                    ]
                },
                {
                    filename:"real_tree3",
                    scale: 3.5,
                    positionsX: [
                        -1.8,
                        1.6
                    ]
                },
                {
                    filename:"real_tree4",
                    scale: 3.5,
                    positionsX: [
                        -1.6,
                        1.8
                    ]
                },
                {
                    filename:"real_building",
                    scale: 6,
                    positionsX: [
                        -1.7,
                        1.9
                    ]
                },
                {
                    filename:"real_building2",
                    scale: 6,
                    positionsX: [
                        -1.9,
                        1.7
                    ]
                },
                {
                    filename:"real_skyscraper",
                    scale: 7,
                    positionsX: [
                        2.9,
                        -2.7
                    ]
                }
            ],
            // obstacle: [
            //     // {
            //     //     filename:"under_construction_barrier",
            //     //     scale: 2.75,
            //     //     positionsX: [
            //     //         0.4
            //     //     ]
            //     // },
            //     // {
            //     //     filename:"road_work_ahead",
            //     //     scale: 2.75,
            //     //     positionsX: [
            //     //         0.4
            //     //     ]
            //     // },
            //     {
            //         filename:"traffic_cone",
            //         scale: 1.75,
            //         positionsX: [
            //             -0.4,
            //             0.4,
            //             -0.3,
            //             0.2,
            //             0
            //         ]
            //     }
            // ],
            obstaclePerIteration: 20,
            trackColors: {
                grass1: "#344C32",
                border1: "#ffa500",
                border2: "#ffffff",
                outborder1: "#7F967D",
                outborder_end1: "#474747",
                track_segment1: "#777777",
                lane1: "#ffffff",
                lane2: "#777777",
                laneArrow1: "#ffff00",
                track_segment_end:"#000000",
                lane_end: "#ffffff"
            },
            trackLayout: [ 
                // trackLayout_real.json File
                // describing the desired track, which is 4 curve to left.
                {
                    topography: {
                        name:"left",
                        curvature: -90
                    },
                    profile: "flat",
                    numZones: 4,
                    trafficSignals: [
                        {
                            filename:"traffic_light_green",
                            zone: 1,
                            scale: 4,
                            posX: -0.5,
                            zoneDistance: 5 // (max distance is zoneSize) 
                        },
                        {
                            filename:"dangerous_curve_left",
                            zone: 1,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 20 // (max distance is zoneSize) 
                        },
                        {
                            filename:"50kmh_limit",
                            zone: 1,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 90 // (max distance is zoneSize) 
                        },
                        {
                            filename:"vehicle_surpass_forbidden",
                            zone: 1,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 130 // (max distance is zoneSize) 
                        },
                        {
                            filename:"dangerous_curve_left",
                            zone: 2,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 20 // (max distance is zoneSize) 
                        },
                        {
                            filename:"30kmh_limit",
                            zone: 2,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 90 // (max distance is zoneSize) 
                        },
                        {
                            filename:"dangerous_curve_left",
                            zone: 3,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 20 // (max distance is zoneSize) 
                        },
                        {
                            filename:"50kmh_limit",
                            zone: 3,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 90 // (max distance is zoneSize) 
                        },
                        {
                            filename:"dangerous_curve_left",
                            zone: 4,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 20 // (max distance is zoneSize) 
                        },
                        {
                            filename:"30kmh_limit",
                            zone: 4,
                            scale: 3,
                            posX: -0.4,
                            zoneDistance: 90 // (max distance is zoneSize) 
                        },
                        {
                            filename:"traffic_light_red",
                            zone: 4,
                            scale: 4,
                            posX: -0.5,
                            zoneDistance: 100 // (max distance is zoneSize) 
                        }
                    ]
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

        // API to generate track with parameters received as argument by the constructor, i.e. new TrackGenerator()
        // trackGenerator.trackGeneratorWidget.generateStraightTrack();
        // trackGenerator.trackGeneratorWidget.generateTrackCurvesSlopes();
        trackGenerator.trackGeneratorWidget.generateTrackBasedOnTrackLayoutOptField();

        var demoFolder = "track_generator_simulator_for_paper";
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
