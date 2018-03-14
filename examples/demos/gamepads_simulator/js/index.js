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
        stateParser: './util/PVSioStateParser'
    }
});

require([
        "widgets/Button",
        "widgets/TouchscreenButton",
        "widgets/TouchscreenDisplay",
        "widgets/BasicDisplay",
        "widgets/NumericDisplay",
        "widgets/LED",
        "widgets/car/DrawGamepad",

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

        // Added DrawGamepad Widget Components here
        DrawGamepad,

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

        var draw = {};
        // ----------------------------- DRAWGAMEPAD COMPONENTS -----------------------------
        // draw.drawGamepad = new DrawGamepad("drawGamepad", {
        //     top: 100,
        //     left: 350,
        //     width: 750,
        //     height: 750
        // }, {
        //     parent: "gamepads", // defines parent div, which is div id="drawGamepad" by default
        //     style: "xbox", // defines parent div, which is "ps4" by default
        //     areas: [ // mapped build manually at https://www.image-map.net/
        //         {
        //             type: "circle",
        //             cx: 837,
        //             cy: 262,
        //             r: 34,
        //             opacity: 0.2,
        //             stroke: "black",
        //             strokeWidth: 3,
        //             href: " ",
        //             id: "A"
        //         },
        //         { 
        //             type: "circle",
        //             cx: 905,
        //             cy: 197,
        //             r: 34,
        //             opacity: 0.2,
        //             stroke: "black",
        //             strokeWidth: 3,
        //             href: " ",
        //             id: "B" 
        //         },
        //         { 
        //             type: "circle",
        //             cx: 839,
        //             cy: 131,
        //             r: 34,
        //             opacity: 0.2,
        //             stroke: "black",
        //             strokeWidth: 3,
        //             href: " ",
        //             id: "Y" 
        //         },
        //         { 
        //             type: "circle",
        //             cx: 772,
        //             cy: 197,
        //             r: 34,
        //             opacity: 0.2,
        //             stroke: "black",
        //             strokeWidth: 3,
        //             href: " ",
        //             id: "X"
        //         },
        //         { 
        //             type: "circle",
        //             cx: 659,
        //             cy: 196,
        //             r: 25,
        //             opacity: 0.2,
        //             stroke: "black",
        //             strokeWidth: 3,
        //             href: " ",
        //             id: "menu"
        //         },
        //         { 
        //             type: "circle",
        //             cx: 520,
        //             cy: 195,
        //             r: 25,
        //             opacity: 0.2,
        //             stroke: "black",
        //             strokeWidth: 3,
        //             href: " ",
        //             id: "start" 
        //         },
        //         { 
        //             type: "circle",
        //             cx: 715,
        //             cy: 343,
        //             r: 55,
        //             opacity: 0.2,
        //             stroke: "black",
        //             strokeWidth: 3,
        //             href: " ",
        //             id: "rightAxis" 
        //         },   
        //         { 
        //             type: "circle",
        //             cx: 343,
        //             cy: 195,
        //             r: 55,
        //             opacity: 0.2,
        //             stroke: "black",
        //             strokeWidth: 3,
        //             href: " ",
        //             id: "leftAxis" 
        //         },                                            
        //         { 
        //             type: "rect",
        //             x: 400,
        //             y: 336,
        //             opacity: 0.2,
        //             height: 38,
        //             width: 38,
        //             id: "leftArrow"
        //         }, 
        //         { 
        //             type: "rect",
        //             x: 490,
        //             y: 336,
        //             opacity: 0.2,
        //             height: 38,
        //             width: 38,
        //             id: "rightArrow" 
        //         }, 
        //         { 
        //             type: "rect",
        //             x: 444,
        //             y: 287,
        //             opacity: 0.2,
        //             height: 38,
        //             width: 38,
        //             id: "upArrow" 
        //         },                                          
        //         {   
        //             type: "rect",
        //             x: 444,
        //             y: 376,
        //             opacity: 0.2,
        //             height: 38,
        //             width: 38,
        //             id: "downArrow"
        //         }
        //     ],
        //     callback: onMessageReceived
        // });
        draw.drawGamepad = new DrawGamepad("drawGamepad", {
            top: 100,
            left: 350,
            width: 750,
            height: 750
        }, {
            parent: "gamepads", // defines parent div, which is div id="drawGamepad" by default
            style: "ps4", // defines parent div, which is "ps4" by default
            areas: [ // mapped build manually at https://www.image-map.net/
                {
                    type: "circle",
                    cx: 537,
                    cy: 130,
                    r: 22,
                    opacity: 0.2,
                    stroke: "black",
                    strokeWidth: 3,
                    href: " ",
                    id: "square"
                },
                { 
                    type: "circle",
                    cx: 589,
                    cy: 180,
                    r: 22,
                    opacity: 0.2,
                    stroke: "black",
                    strokeWidth: 3,
                    href: " ",
                    id: "cross"
                },
                { 
                    type: "circle",
                    cx: 638,
                    cy: 130,
                    r: 22,
                    opacity: 0.2,
                    stroke: "black",
                    strokeWidth: 3,
                    href: " ",
                    id: "circle"
                },
                { 
                    type: "circle",
                    cx: 586,
                    cy: 80,
                    r: 22,
                    opacity: 0.2,
                    stroke: "black",
                    strokeWidth: 3,
                    href: " ",
                    id: "triangle"
                },
                { 
                    type: "circle",
                    cx: 483,
                    cy: 223,
                    r: 38,
                    opacity: 0.2,
                    stroke: "black",
                    strokeWidth: 3,
                    href: " ",
                    id: "rightAxis"
                },
                { 
                    type: "circle",
                    cx: 265,
                    cy: 223,
                    r: 38,
                    opacity: 0.2,
                    stroke: "black",
                    strokeWidth: 3,
                    href: " ",
                    id: "leftAxis" 
                },
                { 
                    type: "circle",
                    cx: 376,
                    cy: 228,
                    r: 20,
                    opacity: 0.2,
                    stroke: "black",
                    strokeWidth: 3,
                    href: " ",
                    id: "PS" 
                },                                            
                { 
                    type: "rect",
                    x: 266,
                    y: 31,
                    opacity: 0.2,
                    height: 128,
                    width: 220,
                    id: "touchpad"
                }, 
                { 
                    type: "rect",
                    x: 504,
                    y: 48,
                    opacity: 0.2,
                    height: 36,
                    width: 18,
                    id: "options"
                }, 
                { 
                    type: "rect",
                    x: 225,
                    y: 48,
                    opacity: 0.2,
                    height: 36,
                    width: 18,
                    id: "share"
                },                                          
                {   
                    type: "rect",
                    x: 144,
                    y: 78,
                    opacity: 0.2,
                    height: 32,
                    width: 32,
                    id: "upArrow"
                },  
                { 
                    type: "rect",
                    x: 183,
                    y: 116,
                    opacity: 0.2,
                    height: 32,
                    width: 32,
                    id: "rightArrow"
                },
                { 
                    type: "rect",
                    x: 144,
                    y: 155,
                    opacity: 0.2,
                    height: 32,
                    width: 32,
                    id: "downArrow"
                }, 
                { 
                    type: "rect",
                    x: 106,
                    y: 115,
                    opacity: 0.2,
                    height: 32,
                    width: 32,
                    id: "leftArrow"
                } 
            ],
            callback: onMessageReceived
        });

        // ----------------------------- SOUND INTERACTION -----------------------------
        draw.draw = new Button("draw", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 80 // key p
        });
       
        // Render sound components
        function render(res) {
            draw.drawGamepad.render();
        }

        var demoFolder = "gamepads_simulator";
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
