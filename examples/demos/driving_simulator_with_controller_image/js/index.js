/**
 * @author Paolo Masci, Patrick Oladimeji, José Carlos
 * @date 27/03/15 20:30:33 PM
 * Last Modified @date 27/02/18 09:07:15 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
let mobile=false;

let openKeypad = () => {
    if(mobile){
        mobile=false;
        $(".virtualKeyPad").css({visibility: "hidden"});
        $(".icon.keyboard").attr("title","Click to open virtual keypad controller");
    }
    else{
        mobile=true;
        $(".virtualKeyPad").css({marginBottom: "20px",visibility: "visible"});
        $(".icon.keyboard").attr("title","Click to close virtual keypad controller");
    }
}

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

        "widgets/ButtonActionsQueue",
        "stateParser",
        "PVSioWebClient"
    ],  (
        ButtonExternalController,
        TouchscreenButton,
        TouchscreenDisplay,
        BasicDisplay,
        NumericDisplay,
        LED,

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

        ButtonActionsQueue,
        stateParser,
        PVSioWebClient) => {

        "use strict";
        var client = PVSioWebClient.getInstance();
        var tick;
        let e;
        let startMessage = 0;
        let reRenderEnd=0;
        let steeringWheel = "ferrari";
        let maxValueSpeedometer=$("#myRange-Speedometer").val();
        let maxValueTachometer=$("#myRange-Tachometer").val();
        let maxValueLanes=$("#myRange-Lanes").val();
        let maxValueHills=$("#myRange-Hills").val();
        let maxValueObstacles=$("#myRange-Obstacles").val();
        let maxValueOtherCars=$("#myRange-Other-Cars").val();
        let maxValueEnd=$("#myRange-End").val();
                
        $("#selectImage").imagepicker({
            hide_select: true
        });
    
        let $container = $('.image_picker_selector');
        // initialize
        $container.imagesLoaded( () => {
            $container.masonry({
                columnWidth: 30,
                itemSelector: '.thumbnail'
            });
        });
        $("#mySidenav").css({ width: "630px" });
        $("#menu").css({ marginLeft: "450px", visibility: "hidden" });
        $('#game-window').css('border', '5px solid black');
        $("#instructions").css({ marginLeft: "-60px" });
        $(".dashboard-widgets").css({ visibility: "hidden" });
        
        $(".image-picker").imagepicker({
            hide_select: true,
            selected: function (option) {
                let values = this.val();
                let path = ($(this).find("option[value='" + $(this).val() + "']").data('img-src'));
                // console.log(values);
                // console.log(path);
                let steeringWheelStyle = values.split("_");            
                steeringWheel = steeringWheelStyle[0];
                // console.log(steeringWheel);
    
                $("#track_img").css({ visibility: "visible" });
                $("#track_img").attr('src', path);
            }
        });
        
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

        // ----------------------------- DASHBOARD INTERACTION -----------------------------
        car.up = new ButtonExternalController("accelerate", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 38 // key up
        });
        car.down = new ButtonExternalController("brake", { width: 0, height: 0 }, {
            callback: onMessageReceived,
            evts: ['press/release'],
            keyCode: 40 // key down
        });

        // ----------------------------- DASHBOARD COMPONENTS -----------------------------
        // ---------------- SPEEDOMETER ----------------
        car.speedometerGauge = new Speedometer('speedometer-gauge', {
            label: "kmh",
            max: 260,
            min: 0
        });
        // ---------------- TACHOMETER ----------------
        car.tachometerGauge = new Tachometer('tachometer-gauge', {
            max: 9,
            min: 0,
            label: "x1000/min"
        });

        $('.gauge').attr('id','last-gauge');

        // ---------------- STEERING WHEEL ----------------
        car.steeringWheel = new SteeringWheel("steering_wheel", {
            top: 140,
            left: 30,
            width: 600,
            height: 600
        }, {
            style: steeringWheel || "ferrari",
            callback: onMessageReceived
        });

        $("#steering_wheel").css({ visibility: "hidden" });
        $('#steering_wheel').attr('class','last-steering_wheel');

        /*
        // ---------------- CURRENT SHIFT -------------------------
        car.shiftDisplay = new Shift('current-shift');
        // ---------------- CLOCK ----------------------------------
        car.clockDisplay = new Clock('clock');
        // ---------------- ENVIRONMENT TEMPERATURE ----------------
        car.envThermometer = new Thermometer('env-temp');
        */

        // ----------------------------- CONTROLLERS COMPONENTS --------------------------
        // ---------------- GAMEPAD CONTROLLER ----------------
        car.gamepadController = new GamepadController("gamepad_controller", {
            top: 1000,
            left: 100,
            width: 750,
            height: 750
        }, {
            carAccelerate: car.up,
            carBrake: car.down,
            carSteeringWheel: car.steeringWheel,
            type: "steeringWheelAndPedals", // Default is "gamepad"
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
            callback: onMessageReceived
        });

        // car.gamepadController.listGamepads();
        // car.gamepadController.listGamepadsKnown();

        // ---------------- VIRTUAL KEYPAD CONTROLLER ----------------
        car.virtualKeypadController = new VirtualKeypadController("virtualKeypad_controller", {
            top: 800,
            left: 800,
            width: 750,
            height: 750
        }, {
            parent: "virtualKeyPad", // defines parent div, which is div class="virtualKeyPad" by default
            simulatorActions: "simulatorActions",
            simulatorArrows: "simulatorArrows",
            floatArrows: "floatArrows",
            blockArrows: "blockArrows",
            buttonClass: "ui-button ui-corner-all ui-widget ui-button-icon-only",
            title: "Button with icon only",
            callback: onMessageReceived
        });

        // ----------------------------- DRAWGAMEPAD COMPONENTS -----------------------------
        // car.drawGamepad = new DrawGamepad("drawGamepad", {
        //     top: 100,
        //     left: 350,
        //     width: 750,
        //     height: 750
        // }, {
        //     parent: "gamepadImage", // defines parent div, which is div id="drawGamepad" by default
        //     style: "xbox", // defines parent div, which is "ps4" by default
        //     callback: onMessageReceived
        // });
        car.drawGamepad = new DrawGamepad("drawGamepad", {
            top: 100,
            left: 350,
            width: 750,
            height: 750
        }, {
            parent: "gamepadImage", // defines parent div, which is div id="drawGamepad" by default
            style: "ps4", // defines parent div, which is "ps4" by default
            callback: onMessageReceived
        });

        // Render car dashboard components
        let render = (res) => {
            car.speedometerGauge.render(evaluate(res.speed.val));
            car.tachometerGauge.render(evaluate(res.rpm));
            car.steeringWheel.render(evaluate(res.steering));
            car.gamepadController.render();
        }

        // // Full Left
        // console.log("Full Left Angle: ", car.gamepadController.calculateRotationAngle(-0.16, -1.0));
        // // Full Right
        // console.log("Full Right Angle: ", car.gamepadController.calculateRotationAngle(-0.08, 1.0));

        let removeSpeedometer = () => {
            let parent = document.getElementById("speedometer-gauge");
            let child = document.getElementById("last-gauge");
            parent.removeChild(child);
        }

        let removeTachometer = () => {
            let parent = document.getElementById("tachometer-gauge");
            let child = document.getElementById("last-gauge");
            parent.removeChild(child);
        }

        let removeSteeringWheel = () => {
            let child = document.getElementById("steering_wheel");
            child.parentNode.removeChild(child);
        }

        // Speedometer
        $("#myRange-Speedometer").on("input", (e) => {
            $("#demo-Speedometer").text( $(e.target).val() );
            maxValueSpeedometer = $("#myRange-Speedometer").val();
            document.getElementById("myRange-End").value = "0";            
        });

        $("#myRange-Speedometer").trigger("input");

        // Tachometer
        $("#myRange-Tachometer").on("input", (e) => {
            $("#demo-Tachometer").text( $(e.target).val() );
            maxValueTachometer = $("#myRange-Tachometer").val();
            document.getElementById("myRange-End").value = "0";
        });
    
        $("#myRange-Tachometer").trigger("input");

        // Hills
        // $("#myRange-Hills").on("input", (e) => {
        //     $("#demo-Hills").text( $(e.target).val() );
        //     maxValueTachometer = $("#myRange-Hills").val();
        //     //console.log("MAX HILLS: "+maxValueHills);
        //     });

        //     $("#myRange-Hills").val("This is a test");
        //     $("#myRange-Hills").trigger("input");

        // Obstacles
        // $("#myRange-Obstacles").on("input", (e) => {
        //     $("#demo-Obstacles").text( $(e.target).val() );
        //     maxValueTachometer = $("#myRange-Obstacles").val();
        //     //console.log("MAX OBSTACLES: "+maxValueObstacles);
        //     });

        //     $("#myRange-Obstacles").val("This is a test");
        //     $("#myRange-Obstacles").trigger("input");

        // Other-Cars
        // $("#myRange-Other-Cars").on("input", (e) => {
        //     $("#demo-Other-Cars").text( $(e.target).val() );
        //     maxValueTachometer = $("#myRange-Other-Cars").val();
        //     //console.log("MAX OTHER CARS: "+maxValueOtherCars);
        //     });

        //     $("#myRange-Other-Cars").val("This is a test");
        //     $("#myRange-Other-Cars").trigger("input");

        // End
        $("#myRange-End").on("input", (e) => {
            $("#demo-End").text( $(e.target).val() );
            maxValueEnd = $("#myRange-End").val();
            // console.log("MAX END: "+maxValueEnd);
            if(maxValueEnd==1){
                removeSpeedometer();
                removeTachometer();
                removeSteeringWheel();
                // console.log(steeringWheel);
                if(reRenderEnd>=0){
                    reRenderEnd++;
                    // ---------------- SPEEDOMETER ----------------
                    car.speedometerGauge = new Speedometer('speedometer-gauge', {
                                label: "kmh",
                                max: maxValueSpeedometer,
                                min: 0,
                                callback: onMessageReceived
                            });
                    // ---------------- TACHOMETER ----------------
                    car.tachometerGauge = new Tachometer('tachometer-gauge', {
                        max:maxValueTachometer,
                        min: 0,
                        label: "x1000/min",
                        callback: onMessageReceived
                    });
                    $('.gauge').attr('id','last-gauge');
                    // ---------------- STEERING WHEEL ----------------
                    car.steeringWheel = new SteeringWheel("steering_wheel", {
                        top: 140,
                        left: 30,
                        width: 600,
                        height: 600
                    }, {
                        style: steeringWheel,
                        callback: onMessageReceived
                    });
                    $('#steering_wheel').attr('class','last-steering_wheel');
                    $("#steering_wheel").css({ 'display': '' });

                    $("#mySidenav").css({ width: "0px" });
                    $("#menu").css({ marginLeft: "-170px", marginTop: "0px", visibility: "visible" });
                    $("#track_img").css({ visibility: "hidden" });

                    $(".customization").css({ visibility: "hidden" });
                    $("#instructions").css({ marginLeft: "650px", marginTop: "-750px", visibility: "visible" });
                    $("#gauges").css({ position: "absolute", marginLeft: "350px", marginTop: "-820px", visibility: "visible" });
                    $("#steering_wheel").css({ visibility: "visible" });
                    // $(".virtualKeyPad").css({marginBottom: "20px",visibility: "visible"});
                    
                    $("#gamepadImage").css({visibility: "visible"});
                    car.drawGamepad.render();
                    $("#steering_wheel").css({ marginTop: "200px" });
                    $(".dashboard-widgets").css({ marginTop: "200px" });
                }
            }
        });

        $("#myRange-End").trigger("input");


        let demoFolder = "driving_simulator_with_controller_image";
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