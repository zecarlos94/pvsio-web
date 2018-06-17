/**
 *
 * @author Jose Carlos
 * @date 17/06/18 17:30:33 PM
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
                }, 1000);
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

        // window.addEventListener('keydown', (event) => {
        //     const keyCode = event.keyCode;
        //     console.log(keyCode);
        //     if(keyCode===85){
        //       // key 'u'
        //       // console.log("UP");
        //       document.getElementById("forearm_flat").style.visibility = "hidden";
        //       document.getElementById("hand_flat").style.visibility = "hidden";
        //       document.getElementById("forearm_down").style.visibility = "hidden";
        //       document.getElementById("hand_down").style.visibility = "hidden";
        //       document.getElementById("hand_up_only").style.visibility = "hidden";
        //       document.getElementById("hand_down_only").style.visibility = "hidden";
        //       document.getElementById("forearm_up").style.visibility = "visible";
        //       document.getElementById("hand_up").style.visibility = "visible";
        //     }else if(keyCode===68){
        //       // key 'd'
        //       // console.log("DOWN");
        //       document.getElementById("forearm_flat").style.visibility = "hidden";
        //       document.getElementById("hand_flat").style.visibility = "hidden";
        //       document.getElementById("forearm_up").style.visibility = "hidden";
        //       document.getElementById("hand_up").style.visibility = "hidden";
        //       document.getElementById("hand_up_only").style.visibility = "hidden";
        //       document.getElementById("hand_down_only").style.visibility = "hidden";
        //       document.getElementById("forearm_down").style.visibility = "visible";
        //       document.getElementById("hand_down").style.visibility = "visible";
        //     }else if(keyCode===70){
        //       // key 'f'
        //       // console.log("FLAT");
        //       document.getElementById("forearm_flat").style.visibility = "visible";
        //       document.getElementById("hand_flat").style.visibility = "visible";
        //       document.getElementById("forearm_up").style.visibility = "hidden";
        //       document.getElementById("hand_up").style.visibility = "hidden";
        //       document.getElementById("forearm_down").style.visibility = "hidden";
        //       document.getElementById("hand_down").style.visibility = "hidden";
        //       document.getElementById("hand_up_only").style.visibility = "hidden";
        //       document.getElementById("hand_down_only").style.visibility = "hidden";
        //     }else if(keyCode===72){
        //       // key 'h'
        //       // console.log("HAND UP");
        //       document.getElementById("forearm_flat").style.visibility = "visible";
        //       document.getElementById("hand_flat").style.visibility = "hidden";
        //       document.getElementById("forearm_down").style.visibility = "hidden";
        //       document.getElementById("hand_down").style.visibility = "hidden";
        //       document.getElementById("forearm_up").style.visibility = "hidden";
        //       document.getElementById("hand_up").style.visibility = "hidden";
        //       document.getElementById("hand_up_only").style.visibility = "visible";
        //       document.getElementById("hand_down_only").style.visibility = "hidden";
        //     }else if(keyCode===74){
        //       // key 'j'
        //       // console.log("HAND DOWN");
        //       document.getElementById("forearm_flat").style.visibility = "visible";
        //       document.getElementById("hand_flat").style.visibility = "hidden";
        //       document.getElementById("forearm_up").style.visibility = "hidden";
        //       document.getElementById("hand_up").style.visibility = "hidden";
        //       document.getElementById("forearm_down").style.visibility = "hidden";
        //       document.getElementById("hand_down").style.visibility = "hidden";
        //       document.getElementById("hand_up_only").style.visibility = "hidden";
        //       document.getElementById("hand_down_only").style.visibility = "visible";
        //     }
        // });

        var gamepad = {};
        // ----------------------------- GAMEPAD CONTROLLER -----------------------------
       
        // ----------------------------- ROBOTIC ARM INTERACTION -----------------------------
        gamepad.upArm = new Button("upArm", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 85 // key 'u'
        });
        gamepad.downArm = new Button("downArm", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 68 // key 'd'
        });
        gamepad.flatArm = new Button("flatArm", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 70 // key 'f'
        });
        gamepad.upOnlyArm = new Button("upOnlyArm", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 72 // key 'h'
        });
        gamepad.downOnlyArm = new Button("downOnlyArm", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 74 // key 'j'
        });

        // Render Gamepad Controller Widget
        function render(res) {
            switch(res.action){
            case "flatArm":
              document.getElementById("forearm_flat").style.visibility = "visible";
              document.getElementById("hand_flat").style.visibility = "visible";
              document.getElementById("forearm_up").style.visibility = "hidden";
              document.getElementById("hand_up").style.visibility = "hidden";
              document.getElementById("forearm_down").style.visibility = "hidden";
              document.getElementById("hand_down").style.visibility = "hidden";
              document.getElementById("hand_up_only").style.visibility = "hidden";
              document.getElementById("hand_down_only").style.visibility = "hidden";
              break;
            case "upArm":
              document.getElementById("forearm_flat").style.visibility = "hidden";
              document.getElementById("hand_flat").style.visibility = "hidden";
              document.getElementById("forearm_down").style.visibility = "hidden";
              document.getElementById("hand_down").style.visibility = "hidden";
              document.getElementById("hand_up_only").style.visibility = "hidden";
              document.getElementById("hand_down_only").style.visibility = "hidden";
              document.getElementById("forearm_up").style.visibility = "visible";
              document.getElementById("hand_up").style.visibility = "visible";
              break;
            case "downArm":
              document.getElementById("forearm_flat").style.visibility = "hidden";
              document.getElementById("hand_flat").style.visibility = "hidden";
              document.getElementById("forearm_up").style.visibility = "hidden";
              document.getElementById("hand_up").style.visibility = "hidden";
              document.getElementById("hand_up_only").style.visibility = "hidden";
              document.getElementById("hand_down_only").style.visibility = "hidden";
              document.getElementById("forearm_down").style.visibility = "visible";
              document.getElementById("hand_down").style.visibility = "visible";
              break;
            case "upOnlyArm":
              document.getElementById("forearm_flat").style.visibility = "visible";
              document.getElementById("hand_flat").style.visibility = "hidden";
              document.getElementById("forearm_down").style.visibility = "hidden";
              document.getElementById("hand_down").style.visibility = "hidden";
              document.getElementById("forearm_up").style.visibility = "hidden";
              document.getElementById("hand_up").style.visibility = "hidden";
              document.getElementById("hand_up_only").style.visibility = "visible";
              document.getElementById("hand_down_only").style.visibility = "hidden";
              break;
            case "downOnlyArm":
              document.getElementById("forearm_flat").style.visibility = "visible";
              document.getElementById("hand_flat").style.visibility = "hidden";
              document.getElementById("forearm_up").style.visibility = "hidden";
              document.getElementById("hand_up").style.visibility = "hidden";
              document.getElementById("forearm_down").style.visibility = "hidden";
              document.getElementById("hand_down").style.visibility = "hidden";
              document.getElementById("hand_up_only").style.visibility = "hidden";
              document.getElementById("hand_down_only").style.visibility = "visible";
              break;
          }
        }

        var demoFolder = "robotic_arm_white";
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
                // start_tick();
            });
        }).addListener("WebSocketConnectionClosed", function (e) {
            console.log("web socket closed");
        }).addListener("processExited", function (e) {
            var msg = "Warning!!!\r\nServer process exited. See console for details.";
            console.log(msg);
        });

        client.connectToServer();
    });
