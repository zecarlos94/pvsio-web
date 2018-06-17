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
            parent: "content", // defines parent div, which is div id="body" by default
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
            trackParam: {
                numZones:    12, // number of different portions of the track
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
            objects: ["tree","stump","boulder","tree2","brunetteGirlBack","bush2","hatManBack"],
            obstacle: ["dead_tree2","column","dearRight"],
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
            // trackLayout: [ 
            //     // trackLayout1.json File
            //     // describing the desired track, which is straight line, with 8 zones (8 blocks) and with 
            //     // profiles "flat".
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 8,
            //     }
            // ],
            trackLayout: [ 
                // trackLayout2.json File
                // describing the desired track, which is curve to left, straight line, 
                // curve to right, straight line, curve to left and straight line each with 3 zones (blocks) and with different 
                // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
                // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
                // those angles to define different curvatures, instead of generating the same curvature for the same
                // side
                {
                    topography: {
                        name:"left",
                        curvature: -90
                    },
                    profile: "flat",
                    numZones: 3
                },
                {
                    topography: {
                        name:"straight",
                        curvature: 0
                    },
                    profile: "down",
                    numZones: 3
                },
                {
                    topography: {
                        name:"right",
                        curvature: 90
                    },
                    profile: "flat",
                    numZones: 3
                },
                {
                    topography: {
                        name:"straight",
                        curvature: 0
                    },
                    profile: "up",
                    numZones: 3
                },
                {
                    topography: {
                        name:"left",
                        curvature: -90
                    },
                    profile: "flat",
                    numZones: 3,
                },
                {
                    topography: {
                        name:"straight",
                        curvature: 0
                    },
                    profile: "flat",
                    numZones: 3,
                }
            ],
            // trackLayout: [ 
            //     // trackLayout3.json File
            //     // describing the desired track, which is straight line, followed by curve to left, straight line, 
            //     // curve to right, straight line and curve to left each with 3 zones (blocks) and with different 
            //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1,
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1,
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "up",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "down",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout4.json File
            //     // describing the desired track, which is curve to right, with 4 zones (blocks) and with  
            //     // profile "flat". This layout allows to render a closed circular track (with 4 curves to right 
            //     // where a new curve starts after the previous ends) 
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 4
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout5.json File
            //     // describing the desired track, which is curve to left, straight line, 
            //     // curve to left, straight line, curve to left, straight line, curve to left and straight line,
            //     // each with 1 zone (block) and with profile "flat".
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout6.json File
            //     // describing the desired track, which is curve to left, straight line, 
            //     // curve to right, straight line and curve to left each with 1 zone (block) and with different 
            //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "down",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "up",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout7.json File
            //     // describing the desired track, which is curve to left, with 4 zones (blocks) and with  
            //     // profile "flat". This layout allows to render a closed circular track (with 4 curves to left 
            //     // where a new curve starts after the previous ends) 
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 4
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout8.json File
            //     // describing the desired track, which is curve to right, straight line, 
            //     // curve to left, straight line and curve to right each with 1 zone (block) and with different 
            //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "down",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "up",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout9.json File
            //     // describing the desired track, which is curve to right, straight line, 
            //     // curve to right, straight line, curve to right, straight line, curve to right and straight line,
            //     // each with 1 zone (block) and with profile "flat".
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
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
            trackParam: {
                numZones:    12, // number of different portions of the track
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
            objects: ["tree","stump","boulder","tree2","brunetteGirlBack","bush2","hatManBack"],
            obstacle: ["dead_tree2","column","dearRight"],
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
            // trackLayout: [ 
            //     // trackLayout1.json File
            //     // describing the desired track, which is straight line, with 8 zones (8 blocks) and with 
            //     // profiles "flat".
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 8,
            //     }
            // ],
            trackLayout: [ 
                // trackLayout2.json File
                // describing the desired track, which is curve to left, straight line, 
                // curve to right, straight line, curve to left and straight line each with 3 zones (blocks) and with different 
                // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
                // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
                // those angles to define different curvatures, instead of generating the same curvature for the same
                // side
                {
                    topography: {
                        name:"left",
                        curvature: -90
                    },
                    profile: "flat",
                    numZones: 3
                },
                {
                    topography: {
                        name:"straight",
                        curvature: 0
                    },
                    profile: "down",
                    numZones: 3
                },
                {
                    topography: {
                        name:"right",
                        curvature: 90
                    },
                    profile: "flat",
                    numZones: 3
                },
                {
                    topography: {
                        name:"straight",
                        curvature: 0
                    },
                    profile: "up",
                    numZones: 3
                },
                {
                    topography: {
                        name:"left",
                        curvature: -90
                    },
                    profile: "flat",
                    numZones: 3,
                },
                {
                    topography: {
                        name:"straight",
                        curvature: 0
                    },
                    profile: "flat",
                    numZones: 3,
                }
            ],
            // trackLayout: [ 
            //     // trackLayout3.json File
            //     // describing the desired track, which is straight line, followed by curve to left, straight line, 
            //     // curve to right, straight line and curve to left each with 3 zones (blocks) and with different 
            //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1,
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1,
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "up",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "down",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout4.json File
            //     // describing the desired track, which is curve to right, with 4 zones (blocks) and with  
            //     // profile "flat". This layout allows to render a closed circular track (with 4 curves to right 
            //     // where a new curve starts after the previous ends) 
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 4
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout5.json File
            //     // describing the desired track, which is curve to left, straight line, 
            //     // curve to left, straight line, curve to left, straight line, curve to left and straight line,
            //     // each with 1 zone (block) and with profile "flat".
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout6.json File
            //     // describing the desired track, which is curve to left, straight line, 
            //     // curve to right, straight line and curve to left each with 1 zone (block) and with different 
            //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "down",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "up",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout7.json File
            //     // describing the desired track, which is curve to left, with 4 zones (blocks) and with  
            //     // profile "flat". This layout allows to render a closed circular track (with 4 curves to left 
            //     // where a new curve starts after the previous ends) 
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 4
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout8.json File
            //     // describing the desired track, which is curve to right, straight line, 
            //     // curve to left, straight line and curve to right each with 1 zone (block) and with different 
            //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "down",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"left",
            //             curvature: -90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "up",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
            // trackLayout: [ 
            //     // trackLayout9.json File
            //     // describing the desired track, which is curve to right, straight line, 
            //     // curve to right, straight line, curve to right, straight line, curve to right and straight line,
            //     // each with 1 zone (block) and with profile "flat".
            //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
            //     // those angles to define different curvatures, instead of generating the same curvature for the same
            //     // side
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"right",
            //             curvature: 90
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     },
            //     {
            //         topography: {
            //             name:"straight",
            //             curvature: 0
            //         },
            //         profile: "flat",
            //         numZones: 1
            //     }
            // ],
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
