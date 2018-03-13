/**
 * @author José Carlos
 * @date 27/03/15 20:30:33 PM
 * Last Modified @date 27/02/18 09:07:15 PM
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
        "widgets/car/SoundWidget",

        "widgets/ButtonActionsQueue",
        "stateParser",
        "PVSioWebClient"
    ],  (
        Button,
        TouchscreenButton,
        TouchscreenDisplay,
        BasicDisplay,
        NumericDisplay,
        LED,
        SoundWidget,

        ButtonActionsQueue,
        stateParser,
        PVSioWebClient) => {

        "use strict";
        var client = PVSioWebClient.getInstance();
        var tick;
        let e;
        let startMessage = 0;
      
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

         // ---------------- SoundWidget CONTROLLER ----------------
         car.soundWidget = new SoundWidget("soundWidget", {
            top: 800,
            left: 800,
            width: 750,
            height: 750
        }, {
            parent: "tog", // defines parent div, which is div class="tog" by default
            mutedImg: "img/song/muted.png", 
            notMutedImg: "img/song/notMuted.png", 
            loopSong: "song/ferrari_idle.mp3", 
            song: "song/other/racer.mp3",
            callback: onMessageReceived
        });

        // Render sound widget
        let render = (res) => {
            car.soundWidget.render();
        }

        // you can also add here the listener and switch the imgs here by invoking the method
        // car.soundWidget.toggle();
        // or
        // use jquery and switch (the first one is better)

        let demoFolder = "demo_sound";
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