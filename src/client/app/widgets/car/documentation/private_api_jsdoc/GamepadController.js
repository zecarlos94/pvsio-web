/**
 * @module GamepadController
 * @version 4.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator
 * using Gamepad API available at {@link https://github.com/bwiklund/gamepad.js} (See it in action here: {@link http://html5gamepad.com/}).
 * 
 * Uses navigator.getGamepads()[0] to detect any gamepad connections and
 * to collect the buttons clicked. For more information consult the following links,
 * {@link https://www.w3.org/TR/gamepad/#gamepadbutton-interface},
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API}
 *
 * @date October 23, 2017
 * last modified @date Aug 14, 2018
 *
 * @example <caption>Usage of API to create a new GamepadController Widget, to listen events "gamepadconnected" and "gamepaddisconnected" within a PVSio-web demo.
 * This widget is also self-contained, i.e., the event handler function will call the rotate and the press/release methods for each click event captured.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the GamepadController module
 *     require("widgets/car/GamepadController");
 *
 *     function main() {
 *          // After GamepadController module was loaded, initialize it
 *          let gamepadController = new GamepadController(
 *               'example', // id of the gamepadController element that will be created
 *               { top: 1000, left: 100, width: 500, height: 500 }, // coordinates object
 *               {
 *                  carAccelerate: car.up, 
 *                  carBrake: car.down,
 *                  carSteeringWheel: car.steeringWheel,
 *                  accelerateInstructionPVS: "accelerate",
 *                  brakeInstructionPVS: "brake",
 *                  steeringWheelInstructionPVS: "steering_wheel",
 *                  useButtonActionsQueue: false, // Default is false
 *                  usePressReleasePVS: true, // Default is true 
 *                  type: "steeringWheelAndPedals", // Default is "gamepad"
 *                  accelerationIndex: 0,
 *                  brakeIndex: 1,
 *                  leftArrowIndex: 14,
 *                  rightArrowIndex: 15,
 *                  accelerationPedalIndex: 1,
 *                  brakePedalIndex: 1,
 *                  steeringWheelIndex: 0,
 *                  analogueStickIndex: 9,
 *                  leftAnalogueIndex: 0,
 *                  rightAnalogueIndex: 2,
 *                  pauseAction: {
 *                       pauseIndex: 9,
 *                      instructionPVS: "pause"
 *                  },
 *                  quitAction: {
 *                      quitIndex: 8,
 *                      instructionPVS: "quit"
 *                  },
 *                  resumeAction: {
 *                      resumeIndex: 16,
 *                      instructionPVS: "resume"
 *                  },
 *                  muteAction: {
 *                      muteIndex: 4,
 *                      instructionPVS: "mute"
 *                  },
 *                  unmuteAction: {
 *                      unmuteIndex: 5,
 *                      instructionPVS: "unmute"
 *                  },
 *                  useSensitivity: false, // Default is false
 *                  sensitivityValue: 50 // Default is 40%
 *               }
 *           );
 *
 *          // Available methods:
 *          // Render the GamepadController widget
 *          gamepadController.render();
 *     }
 * });
 * 
 * @example <caption>Usage of <strong>Private API</strong> within GamepadController Widget. That is, API which is only used internally by the GamepadController Widget to handle the events captured.</caption>
 *  
 *          // Connects the gamepad captured by "gamepadconnected" event
 *          gamepadController.connectGamepad(event.gamepad);
 * 
 *          // Disconnects the gamepad captured by "gamepaddisconnected" event
 *          gamepadController.disconnectGamepad(event.gamepad);
 * 
 *          // Calculates the rotation angle
 *          let angle = gamepadController.calculateRotationAngle(y, x);
 * 
 *          // Calculates the rotation angle with sensitivity
 *          let angleWithSensitivity = gamepadController.calculateRotationAngleWithSensitivity(y, x, sensitivity);
 * 
 *          // Converts angle in radians to degrees
 *          let degAngle = gamepadController.radiansToDegrees(radAngle);
 * 
 *          // Converts angle in degrees to radians
 *          let radAngle = gamepadController.degToRadians(degAngle);
 * 
 *          // Updates all gamepads known, i.e. loads all connected gamepads (captured by the proper event)
 *          gamepadController.listGamepads();
 * 
 *          // Removes gamepad g, captured by the "gamepaddisconnected" event
 *          gamepadController.removeGamepad(g);
 * 
 *          // Saves gamepad g, captured by the "gamepadconnected" event
 *          gamepadController.saveGamepad(g);
 * 
 *          // Updates all connected gamepads information(axes values, buttons pressed/released) in its respective divs
 *          gamepadController.updateStatus();
 * 
 *          // MAPPINGS
 *          // For all tested and operational external controllers, mapping methods have been created to change the value of the attribute "name" 
 *          // in the respective divs, created by the method saveGamepad.
 *          // Thus, the updateStatus method can update the new captured values in the connected gamepads and populate that attribute with the mapped name. 
 *          // If another gamepad is used and a mapping function doesn't exist, the attribute is populated with the value "other". 
 *          // For example, if using PS4 gamepad and clicking the X button, the attribute "name" changes from "button" to "button cross" during that click. 
 *          // If gamepad XBOX1 is used, then this attribute would change to "button a", since position 0 of these gamepads correspond to different "names". 
 *          // If another gamepad is used, then this attribute would change to "button other", since there is no mapping method for this new gamepad. 
 *         
 *          // These methods only served to assist the debugging process when using more than one gamepad, to see the produced divs by this Widget and 
 *          // to see how the method updateStatus updated the correct values.
 * 
 *          // Maps button key of PS4 gamepad
 *          mappedName = mappingPS4GamepadButtons(key);
 * 
 *          // Maps button key of XBOX1 gamepad
 *          mappedName = mappingXBOX1GamepadButtons(key);
 * 
 *          // Maps button key of Logitech G29 on PS4 Mode racing steering wheel external controller
 *          mappedName = mappingLogitechG29PS4ModeButtons(key);
 * 
 *          // Maps button key of Logitech G29 on PS3 Mode racing steering wheel external controller
 *          mappedName = mappingLogitechG29PS3ModeButtons(key);
 * 
 *          // Maps axis key of PS4 gamepad
 *          mappedAxis = GamepadController.prototype.mappingPS4GamepadAxes(key);
 * 
 *          // Maps axis key of XBOX1 gamepad
 *          mappedAxis = GamepadController.prototype.mappingXBOX1GamepadAxes(key);
 * 
 *          // Maps axis key of Logitech G29 on PS4 Mode racing steering wheel external controller
 *          mappedAxis = GamepadController.prototype.mappingLogitechG29PS4ModeAxes(key);
 * 
 *          // Maps axis key of Logitech G29 on PS3 Mode racing steering wheel external controller 
 *          mappedAxis = GamepadController.prototype.mappingLogitechG29PS3ModeAxes(key);
 * 
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jshint esnext:true */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    /**
     * @description Array 'gamepadsKnown' has all connected gamepads.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let gamepadsKnown = [];
    let gamepadEvents;
    /**
     * @description 'gamepadPS4Id' has PS4 gamepad unique ID, to use the proper mapping method.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let gamepadPS4Id = "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)";
    /**
     * @description 'gamepadXBOX1Id' has Xbox One gamepad unique ID, to use the proper mapping method.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let gamepadXBOX1Id = "Xbox One Controller (STANDARD GAMEPAD Vendor: 045e Product: 02ea)";
    /**
     * @description 'g29RacingPS4ModeId' has G29 Driving Force Racing Wheel unique ID, to use the proper mapping method in PS4 mode. Available at {@link https://www.amazon.co.uk/Logitech-Driving-Racing-Pedals-UK-Plug/dp/B00YUOVBZK}
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let g29RacingPS4ModeId = "G29 Driving Force Racing Wheel (Vendor: 046d Product: c260)";
    /**
     * @description 'g29RacingPS3ModeId' has G29 Driving Force Racing Wheel unique ID, to use the proper mapping method in PS3 mode. Available at {@link https://www.amazon.co.uk/Logitech-Driving-Racing-Pedals-UK-Plug/dp/B00YUOVBZK}
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let g29RacingPS3ModeId = "G29 Driving Force Racing Wheel (Vendor: 046d Product: c294)";
    /**
     * @description ButtonExternalController 'carAccelerate' to be clicked when a certain gamepad button is pressed.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let carAccelerate;
    /**
     * @description ButtonExternalController 'carBrake' to be clicked when a certain gamepad button is pressed.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let carBrake;
    /**
     * @description SteeringWheel 'carSteeringWheel' to be rotated with gamepad axes values.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let carSteeringWheel;
    /**
     * @description Field 'type' allows to differentiate the axes of the external controller, i.e. to differentiate between gamepad axes and a more complex controller such as steeringWheelAndPedals axes. 
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let type;
    /**
     * @description Index 'accelerationIndex' is the external controller index where acceleration action will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let accelerationIndex;
    /**
     * @description Index 'brakeIndex' is the external controller index where brake action will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let brakeIndex;
    /**
     * @description Index 'leftArrowIndex' is the external controller index where turn left action(steering wheel left rotation) will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let leftArrowIndex;
    /**
     * @description Index 'rightArrowIndex' is the external controller index where turn right action(steering wheel right rotation) will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let rightArrowIndex;
    /**
     * @description Index 'accelerationPedalIndex' is the external controller(pedals external controller) index where acceleration action will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let accelerationPedalIndex;
    /**
     * @description Index 'brakePedalIndex' is the external controller(pedals external controller) index where brake action will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let brakePedalIndex;
    /**
     * @description Index 'steeringWheelIndex' is the external controller(steering wheel external controller) index where steeringWheel widget rotate method will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let steeringWheelIndex;
    /**
     * @description Index 'analogueStickIndex' is the external controller index where steeringWheel widget rotate method will be invoked, based on X axis calculated angle.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let analogueStickIndex;
    /**
     * @description Index 'leftAnalogueIndex' is the external controller index where steeringWheel widget rotate method will be invoked, based on X,Y axes calculated angle.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let leftAnalogueIndex;
    /**
     * @description Index 'rightAnalogueIndex' is the external controller index where steeringWheel widget rotate method will be invoked, based on X,Y axes calculated angle.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let rightAnalogueIndex;
    /**
     * @description Index 'pauseIndex' is the external controller index where pause menu pvs instruction will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let pauseIndex;
    /**
     * @description Index 'quitIndex' is the external controller index where quit menu pvs instruction will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let quitIndex;        
    /**
     * @description Index 'resumeIndex' is the external controller index where resume menu pvs instruction will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let resumeIndex;
    /**
     * @description Index 'muteIndex' is the external controller index where mute pvs instruction will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let muteIndex;
    /**
     * @description Index 'unmuteIndex' is the external controller index where unmute pvs instruction will be invoked.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let unmuteIndex;
     /**
     * @description String 'pauseInstructionPVS' is the pause menu pvs instruction name.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let pauseInstructionPVS;
    /**
     * @description String 'quitInstructionPVS' is the quit menu pvs instruction name.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let quitInstructionPVS;        
    /**
     * @description String 'resumeInstructionPVS' is the resume menu pvs instruction name.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let resumeInstructionPVS;
    /**
     * @description String 'muteInstructionPVS' is the mute pvs instruction name.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let muteInstructionPVS;
    /**
     * @description String 'unmuteInstructionPVS' is the unmute pvs instruction name.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let unmuteInstructionPVS;
    /**
     * @description Boolean 'useSensitivity' is the variable that allows to change between the two rotations APIs (with an without sensitivity)
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let useSensitivity;
    /**
     * @description Integer 'sensitivityValue' is the sensitivity value to be applied on the rotation API with sensitivity
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let sensitivityValue;
    /**
     * @description Function 'callback' is the callback to apply to ButtonActionsQueue.queueGUIAction()
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let callback;
    /**
     * @description String 'accelerateInstructionPVS' is the accelerate pvs instruction name.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let accelerateInstructionPVS;
    /**
     * @description String 'brakeInstructionPVS' is the brake pvs instruction name.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let brakeInstructionPVS;
    /**
     * @description String 'steeringWheelInstructionPVS' is the steeringWheelInstructionPVS pvs instruction name.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let steeringWheelInstructionPVS;
    /**
     * @description Boolean 'useButtonActionsQueue' is the variable that allows to change press()/release() object invocations and ButtonActionsQueue invocations.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let useButtonActionsQueue;
    /**
     * @description Boolean 'usePressReleasePVS' is the variable that allows to change press()/release() and click() invocations.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    let usePressReleasePVS;

    /**
     * @description Listening for event 'gamepadconnected' to update known gamepads array.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    gamepadEvents = window.addEventListener("gamepadconnected", ( event ) => {
        // All buttons and axes values can be accessed through
        // event.gamepad;
        GamepadController.prototype.connectGamepad(event.gamepad);
        console.log("Gamepad Connected");

    });

    /**
     * @description Listening for event 'gamepaddisconnected' to update known gamepads array.
     * @public
     * @memberof module:GamepadController
     * @instance
     */
    gamepadEvents = window.addEventListener("gamepaddisconnected", ( event ) => {
        // All buttons and axes values can be accessed through
        // event.gamepad;
        GamepadController.prototype.disconnectGamepad(event.gamepad);
        console.log("Gamepad Disconnected");
    });

    let Widget = require("widgets/Widget"),
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance(),
        ButtonExternalController = require("widgets/car/ButtonExternalController"),
        SteeringWheel = require("widgets/car/SteeringWheel"); // In order to render rotations when button clicked


    /**
     * @function constructor
     * @public
     * @description Constructor for the GamepadController widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     * @param [opt.carAccelerate] {ButtonExternalController} Button 'accelerate' to accelerate when a certain gamepad button is pressed.
     * @param [opt.carBrake] {ButtonExternalController} Button 'brake' to brake when a certain gamepad button is pressed.
     * @param [opt.carSteeringWheel] {SteeringWheel} SteeringWheel 'steering_wheel' to rotate the current steering wheel with gamepad axes values.
     * @param [opt.accelerateInstructionPVS] {String} String with the name of the pvs instruction for 'accelerate' action (Default is "accelerate"). 
     * @param [opt.brakeInstructionPVS] {String} String with the name of the pvs instruction for 'brake' action (Default is "brake"). 
     * @param [opt.steeringWheelInstructionPVS] {String} String with the name of the pvs instruction prefix regarding the direction changes with steering wheel (Default is "steering_wheel"). 
     * @param [opt.useButtonActionsQueue] {Bool} is the variable that allows to change press()/release() object invocations and ButtonActionsQueue invocations (Default is false).
     * @param [opt.usePressReleasePVS] {Bool} is the variable that allows to change press()/release() click() invocations (Default is true).
     * @param [opt.type] {String} Field 'type' allows to differentiate the axes of the external controller, i.e. to differentiate between gamepad axes and a more complex controller 
     *          such as steeringWheelAndPedals axes (Default is "gamepad". Other possible value is "steeringWheelAndPedals").
     *          accelerationIndex {Int} Index 'accelerationIndex' is the external controller index where acceleration action will be invoked (Default is 0).
     * @param [opt.brakeIndex] {Int} Index 'brakeIndex' is the external controller index where brake action will be invoked (Default is 1).
     * @param [opt.leftArrowIndex] {Int} Index 'leftArrowIndex' is the external controller index where turn left action(steering wheel left rotation) will be invoked (Default is 14).
     * @param [opt.rightArrowIndex] {Int} Index 'rightArrowIndex' is the external controller index where turn right action(steering wheel right rotation) will be invoked (Default is 15).
     * @param [opt.accelerationPedalIndex] {Int} Index 'accelerationPedalIndex' is the external controller(pedals external controller) index where acceleration action will be invoked (Default is 1).
     * @param [opt.brakePedalIndex] {Int} Index 'brakePedalIndex' is the external controller(pedals external controller) index where brake action will be invoked (Default is 1).
     * @param [opt.steeringWheelIndex] {Int} Index 'steeringWheelIndex' is the external controller(steering wheel external controller) index where steeringWheel widget rotate method will be invoked (Default is 0).
     * @param [opt.analogueStickIndex] {Int} Index 'analogueStickIndex' is the external controller index where steeringWheel widget rotate method will be invoked, based on X axis calculated angle (Default is 9).
     * @param [opt.leftAnalogueIndex] {Int} Index 'leftAnalogueIndex' is the external controller index where steeringWheel widget rotate method will be invoked, based on X,Y axes calculated angle (Default is 0).
     * @param [opt.rightAnalogueIndex] {Int} Index 'rightAnalogueIndex' is the external controller index where steeringWheel widget rotate method will be invoked, based on X,Y axes calculated angle (Default is 2). 
     * @param [opt.pauseAction] {Object} Object with index 'pauseIndex', the external controller index where pause menu pvs instruction will be invoked, and string instructionPVS, which is the name of the pvs instruction for this action (Default is 9 and "pause"). 
     * @param [opt.quitAction] {Object} Object with index 'quitIndex', the external controller index where quit menu pvs instruction will be invoked, and string instructionPVS, which is the name of the pvs instruction for this action (Default is 8 and "quit"). 
     * @param [opt.resumeAction] {Object} Object with index 'resumeIndex', the external controller index where resume menu pvs instruction will be invoked, and string instructionPVS, which is the name of the pvs instruction for this action (Default is 16 and "resume"). 
     * @param [opt.muteAction] {Object} Object with index 'muteIndex', the external controller index where mute pvs instruction will be invoked, and string instructionPVS, which is the name of the pvs instruction for this action (Default is 4 and "mute"). 
     * @param [opt.unmuteAction] {Object} Object with index 'unmuteIndex', the external controller index where unmute pvs instruction will be invoked, and string instructionPVS, which is the name of the pvs instruction for this action (Default is 5 and "unmute"). 
     * @param [opt.useSensitivity] {Boolean} boolean to determine which rotation API will be invoked, i.e., with or without sensitivity (default is false).
     * @param [opt.sensitivityValue] {Int} the sensivity value to be provided to the rotation API with sensitivity (default is 40).
     * @returns {GamepadController} The created instance of the widget GamepadController.
     * @memberof module:GamepadController
     * @instance
     */
    function GamepadController(id, coords, opt) {
        opt = opt || {};
        opt.style = opt.style || "";
        opt.opacity = opt.opacity || 1;
        opt.carAccelerate = opt.carAccelerate;
        opt.carBrake = opt.carBrake;
        opt.carSteeringWheel = opt.carSteeringWheel;
        opt.accelerateInstructionPVS = opt.accelerateInstructionPVS || "accelerate";
        opt.brakeInstructionPVS = opt.brakeInstructionPVS || "brake";
        opt.steeringWheelInstructionPVS = opt.steeringWheelInstructionPVS || "steering_wheel";
        opt.useButtonActionsQueue = opt.useButtonActionsQueue;
        opt.usePressReleasePVS = opt.usePressReleasePVS;
        opt.type = opt.type || "gamepad";
        opt.accelerationIndex = opt.accelerationIndex || 0;
        opt.brakeIndex = opt.brakeIndex || 1;
        opt.leftArrowIndex = opt.leftArrowIndex || 14;
        opt.rightArrowIndex = opt.rightArrowIndex || 15;
        opt.accelerationPedalIndex = opt.accelerationPedalIndex || 1;
        opt.brakePedalIndex = opt.brakePedalIndex || 1;
        opt.steeringWheelIndex = opt.steeringWheelIndex || 0;
        opt.analogueStickIndex = opt.analogueStickIndex || 9;
        opt.leftAnalogueIndex = opt.leftAnalogueIndex || 0;
        opt.rightAnalogueIndex = opt.rightAnalogueIndex || 2;
        opt.pauseAction = opt.pauseAction;
        opt.quitAction = opt.quitAction;
        opt.resumeAction = opt.resumeAction;
        opt.muteAction = opt.muteAction;
        opt.unmuteAction = opt.unmuteAction;
        opt.useSensitivity = opt.useSensitivity || false;
        opt.sensitivityValue = opt.sensitivityValue || 40;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;
        carAccelerate = (opt.carAccelerate) ? opt.carAccelerate : null;
        carBrake = (opt.carBrake) ? opt.carBrake : null;
        carSteeringWheel = (opt.carSteeringWheel) ? opt.carSteeringWheel : null;
        accelerateInstructionPVS = (opt.accelerateInstructionPVS) ? opt.accelerateInstructionPVS : "accelerate";
        brakeInstructionPVS = (opt.brakeInstructionPVS) ? opt.brakeInstructionPVS : "brake";
        steeringWheelInstructionPVS = (opt.steeringWheelInstructionPVS) ? opt.steeringWheelInstructionPVS : "steering_wheel";
        useButtonActionsQueue = (opt.useButtonActionsQueue) ? opt.useButtonActionsQueue : false;
        usePressReleasePVS = (opt.usePressReleasePVS) ? opt.usePressReleasePVS : true;
        type = (opt.type) ? opt.type : "gamepad";
        accelerationIndex = (opt.accelerationIndex) ? opt.accelerationIndex : 0;
        brakeIndex = (opt.brakeIndex) ? opt.brakeIndex : 1;
        leftArrowIndex = (opt.leftArrowIndex) ? opt.leftArrowIndex : 14;
        rightArrowIndex = (opt.rightArrowIndex) ? opt.rightArrowIndex : 15;
        accelerationPedalIndex = (opt.accelerationPedalIndex) ? opt.accelerationPedalIndex : 1;
        brakePedalIndex = (opt.brakePedalIndex) ? opt.brakePedalIndex : 1;
        steeringWheelIndex = (opt.steeringWheelIndex) ? opt.steeringWheelIndex : 0;
        analogueStickIndex = (opt.analogueStickIndex) ? opt.analogueStickIndex : 9;
        leftAnalogueIndex = (opt.leftAnalogueIndex) ? opt.leftAnalogueIndex : 0;
        rightAnalogueIndex = (opt.rightAnalogueIndex) ? opt.rightAnalogueIndex : 2;
        pauseIndex = (opt.pauseAction) ? opt.pauseAction.pauseIndex : 9;
        quitIndex = (opt.quitAction) ? opt.quitAction.quitIndex : 8;
        resumeIndex = (opt.resumeAction) ? opt.resumeAction.resumeIndex : 16;
        muteIndex = (opt.muteAction) ? opt.muteAction.muteIndex : 4;
        unmuteIndex = (opt.unmuteAction) ? opt.unmuteAction.unmuteIndex : 5;
        pauseInstructionPVS = (opt.pauseAction) ? opt.pauseAction.instructionPVS : "pause";
        quitInstructionPVS = (opt.quitAction) ? opt.quitAction.instructionPVS : "quit";
        resumeInstructionPVS = (opt.resumeAction) ? opt.resumeAction.instructionPVS : "resume";
        muteInstructionPVS = (opt.muteAction) ? opt.muteAction.instructionPVS : "mute";
        unmuteInstructionPVS = (opt.unmuteAction) ? opt.unmuteAction.instructionPVS : "unmute";
        useSensitivity = (opt.useSensitivity) ? opt.useSensitivity : false;
        sensitivityValue = (opt.sensitivityValue) ? opt.sensitivityValue : 40;
        
        this.div = d3.select("#gamepads");

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;
        callback = this.callback;

        Widget.call(this, id, coords, opt);
        return this;
    }

    GamepadController.prototype = Object.create(Widget.prototype);
    GamepadController.prototype.constructor =GamepadController;
    GamepadController.prototype.parentClass = Widget.prototype;

    /**
     * @function mappingLogitechG29PS3ModeButtons
     * @public
     * @description MappingLogitechG29PS3ModeButtons method of the GamepadController widget. This method maps all read buttons to Logitech G29 PS3 Mode buttons.
     * @param key {Int} The key instance, i.e. the gamepad button index to be mapped into Logitech G29 PS3 Mode names.
     * @memberof module:GamepadController
     * @returns {String} The mapped value of key.
     * @instance
     */
    GamepadController.prototype.mappingLogitechG29PS3ModeButtons = function (key) {
       
        let logitechG29PS3ModeMappingButtons = [
            {key: 0, value: 'button square'}, 
            {key: 1, value: 'button cross'}, 
            {key: 2, value: 'button circle'},
            {key: 3, value: 'button triangle'},
            {key: 4, value: 'button l1 (left steering wheel paddle shifter)'},
            {key: 5, value: 'button r1 (right steering wheel paddle shifter)'},
            {key: 6, value: 'button l2'},
            {key: 7, value: 'button r2'},
            {key: 8, value: 'button share'},
            {key: 9, value: 'button options'},
            {key: 10, value: 'button l3'},
            {key: 11, value: 'button r3'},
            {key: 12, value: 'button PS'}
        ];

        return logitechG29PS3ModeMappingButtons[key].value;
    };

     /**
     * @function mappingLogitechG29PS3ModeAxes
     * @public
     * @description MappingLogitechG29PS3ModeAxes method of the GamepadController widget. This method maps all read axes to Logitech G29 PS3 Mode axes.
     * @param key {Int} The key instance, i.e. the gamepad axis index to be mapped into Logitech G29 PS3 Mode names.
     * @memberof module:GamepadController
     * @returns {String} The mapped value of key.
     * @instance
     */
    GamepadController.prototype.mappingLogitechG29PS3ModeAxes = function (key) {
       
        let logitechG29PS3ModeMappingAxes = [
            {key: 0, value: 'steering wheel left/right'},
            {key: 1, value: 'Accelerator/Brake Pedals'},
            {key: 2, value: 'unknown'},
            {key: 3, value: 'unknown'},
            {key: 4, value: 'unknown'},
            {key: 5, value: 'unknown'},
            {key: 6, value: 'unknown'},
            {key: 7, value: 'unknown'},
            {key: 8, value: 'unknown'},
            {key: 9, value: 'left axis stick left/right/up/down'}
        ];

        return logitechG29PS3ModeMappingAxes[key].value;
    };

    /**
     * @function mappingLogitechG29PS4ModeButtons
     * @public
     * @description MappingLogitechG29PS4ModeButtons method of the GamepadController widget. This method maps all read buttons to Logitech G29 PS4 Mode buttons.
     * @param key {Int} The key instance, i.e. the gamepad button index to be mapped into Logitech G29 PS4 Mode names.
     * @memberof module:GamepadController
     * @returns {String} The mapped value of key.
     * @instance
     */
    GamepadController.prototype.mappingLogitechG29PS4ModeButtons = function (key) {
       
        let logitechG29PS4ModeMappingButtons = [
            {key: 0, value: 'button square'}, 
            {key: 1, value: 'button cross'}, 
            {key: 2, value: 'button circle'},
            {key: 3, value: 'button triangle'},
            {key: 4, value: 'button l1 (left steering wheel paddle shifter)'},
            {key: 5, value: 'button r1 (right steering wheel paddle shifter)'},
            {key: 6, value: 'button l2'},
            {key: 7, value: 'button r2'},
            {key: 8, value: 'button share'},
            {key: 9, value: 'button options'},
            {key: 10, value: 'button l3'},
            {key: 11, value: 'button r3'},
            {key: 12, value: 'button PS'},
            {key: 13, value: 'unknown'}
        ];

        return logitechG29PS4ModeMappingButtons[key].value;
    };

     /**
     * @function mappingLogitechG29PS4ModeAxes
     * @public
     * @description MappingLogitechG29PS4ModeAxes method of the GamepadController widget. This method maps all read axes to Logitech G29 PS4 Mode axes.
     * @param key {Int} The key instance, i.e. the gamepad axis index to be mapped into Logitech G29 PS4 Mode names.
     * @memberof module:GamepadController
     * @returns {String} The mapped value of key.
     * @instance
     */
    GamepadController.prototype.mappingLogitechG29PS4ModeAxes = function (key) {
       
        let logitechG29PS4ModeMappingAxes = [
            {key: 0, value: 'unknown'},
            {key: 1, value: 'unknown'},
            {key: 2, value: 'unknown'},
            {key: 3, value: 'unknown'},
            {key: 4, value: 'unknown'},
            {key: 5, value: 'unknown'},
            {key: 6, value: 'unknown'},
            {key: 7, value: 'unknown'},
            {key: 8, value: 'unknown'},
            {key: 9, value: 'left axis stick left/right/up/down'}
        ];

        return logitechG29PS4ModeMappingAxes[key].value;
    };


    /**
     * @function mappingPS4GamepadButtons
     * @public
     * @description MappingPS4GamepadButtons method of the GamepadController widget. This method maps all read buttons to PS4 buttons.
     * @param key {Int} The key instance, i.e. the gamepad button index to be mapped into PS4 names.
     * @memberof module:GamepadController
     * @returns {String} The mapped value of key.
     * @instance
     */
    GamepadController.prototype.mappingPS4GamepadButtons = function (key) {
       
        let ps4MappingButtons = [
            {key: 0, value: 'button cross'}, 
            {key: 1, value: 'button circle'}, 
            {key: 2, value: 'button square'},
            {key: 3, value: 'button triangle'},
            {key: 4, value: 'button l1'},
            {key: 5, value: 'button r1'},
            {key: 6, value: 'button l2'},
            {key: 7, value: 'button r2'},
            {key: 8, value: 'button share'},
            {key: 9, value: 'button options'},
            {key: 10, value: 'button l3 (press left axis stick)'},
            {key: 11, value: 'button r3 (press right axis stick)'},
            {key: 12, value: 'button up arrow'},
            {key: 13, value: 'button down arrow'},
            {key: 14, value: 'button left arrow'},
            {key: 15, value: 'button right arrow'},
            {key: 16, value: 'button sony ps'},
            {key: 17, value: 'button touchpad'}
        ];

        return ps4MappingButtons[key].value;
    };

     /**
     * @function mappingPS4GamepadAxes
     * @public
     * @description MappingPS4GamepadAxes method of the GamepadController widget. This method maps all read axes to PS4 axes.
     * @param key {Int} The key instance, i.e. the gamepad axis index to be mapped into PS4 names.
     * @memberof module:GamepadController
     * @returns {String} The mapped value of key.
     * @instance
     */
    GamepadController.prototype.mappingPS4GamepadAxes = function (key) {
       
        let ps4MappingAxes = [
            {key: 0, value: 'left axis stick left/right'},
            {key: 1, value: 'left axis stick up/down'},
            {key: 2, value: 'right axis stick left/right'},
            {key: 3, value: 'right axis stick up/down'}
        ];

        return ps4MappingAxes[key].value;
    };

    /**
     * @function mappingXBOX1GamepadButtons
     * @public
     * @description MappingXBOX1GamepadButtons method of the GamepadController widget. This method maps all read buttons to XBOX1 buttons.
     * @param key {Int} The key instance, i.e. the gamepad button index to be mapped into XBOX1 names.
     * @memberof module:GamepadController
     * @returns {String} The mapped value of key.
     * @instance
     */
    GamepadController.prototype.mappingXBOX1GamepadButtons = function (key) {
    
        let xbox1MappingButtons = [
            {key: 0, value: 'button a'}, 
            {key: 1, value: 'button b'}, 
            {key: 2, value: 'button x'},
            {key: 3, value: 'button y'},
            {key: 4, value: 'button lb'},
            {key: 5, value: 'button rb'},
            {key: 6, value: 'button lt'},
            {key: 7, value: 'button rt'},
            {key: 8, value: 'button windows'},
            {key: 9, value: 'button menu'},
            {key: 10, value: 'button left axis stick pressed'},
            {key: 11, value: 'button right axis stick pressed'},
            {key: 12, value: 'button up arrow'},
            {key: 13, value: 'button down arrow'},
            {key: 14, value: 'button left arrow'},
            {key: 15, value: 'button right arrow'},
            {key: 16, value: 'button XBOX'}
        ];

        return xbox1MappingButtons[key].value;
    };

    /**
     * @function mappingXBOX1GamepadAxes
     * @public
     * @description MappingXBOX1GamepadAxes method of the GamepadController widget. This method maps all read axes to XBOX1 axes.
     * @param key {Int} The key instance, i.e. the gamepad axis index to be mapped into XBOX1 names.
     * @memberof module:GamepadController
     * @returns {String} The mapped value of key.
     * @instance
     */
    GamepadController.prototype.mappingXBOX1GamepadAxes = function (key) {
    
        let xbox1MappingAxes = [
            {key: 0, value: 'left axis stick left/right'},
            {key: 1, value: 'left axis stick up/down'},
            {key: 2, value: 'right axis stick left/right'},
            {key: 3, value: 'right axis stick up/down'}
        ];

        return xbox1MappingAxes[key].value;
    };

    /**
     * @function degToRadians
     * @public
     * @description DegToRadians method of the GamepadController widget. This method converts angles from degrees to radians.
     * @param deg {Float} The angle in degrees instance.
     * @memberof module:GamepadController
     * @returns {Double} The calculated angle in radians.
     * @instance
     */
    GamepadController.prototype.degToRadians = function (deg) {
        return deg * Math.PI / 180;
    };
    
    /**
     * @function radiansToDegrees
     * @public
     * @description RadiansToDegrees method of the GamepadController widget. This method converts angles from radians to degrees.
     * @param rad {Float} The angle in radians instance.
     * @memberof module:GamepadController
     * @returns {Double} The calculated angle in degrees.
     * @instance
     */
    GamepadController.prototype.radiansToDegrees = function (rad) {
        return rad * 180 / Math.PI;
    };

     /**
     * @function calculateRotationAngle
     * @public
     * @description CalculateRotationAngle method of the GamepadController widget. This method converts angles from radians to degrees. Default sensitivity is 100.
     * @param y {Float} The value of vertical axis(up to/or down), between -1 and 1.
     * @param x {Float} The value of horizontal axis(left to/or right), between -1 and 1.  
     * @memberof module:GamepadController
     * @returns {Double} The angle in degrees calculated based on horizontal and vertical axis values read from gamepad.
     * @instance
     */
    GamepadController.prototype.calculateRotationAngle = function (y,x) {
        let angle = 0;
        if(y===null){
            angle = x*100; 
            // Defining interval min,max for rotation(between -90 and 90 degrees)
            if(angle<-90) {
                angle = -90; 
            }else if(angle>90) {
                angle = 90;
            }
        }else{
            if (x !== 0.0 || y !== 0.0) {
                angle = this.radiansToDegrees( Math.atan2(x, y) );
                // Defining interval min,max for rotation(between -90 and 90 degrees)
                if(angle<-90) {
                    angle = -90; 
                }else if(angle>90) {
                    angle = 90;
                }
            }
        }
        return angle;
    };

    /**
     * @function calculateRotationAngleWithSensitivity
     * @public
     * @description CalculateRotationAngleWithSensitivity method of the GamepadController widget. This method converts angles from radians to degrees.
     * @param y {Float} The value of vertical axis(up to/or down), between -1 and 1.
     * @param x {Float} The value of horizontal axis(left to/or right), between -1 and 1. 
     * @param sensitivity {Int} The value of sensitivity of the steering wheel rotation angle, between 1 and 100.
     * @memberof module:GamepadController
     * @returns {Double} The angle in degrees calculated based on horizontal and vertical axis values read from gamepad.
     * @instance
     */
    GamepadController.prototype.calculateRotationAngleWithSensitivity = function (y,x,s) {
        let angle = 0;
        let sensitivity = s/100;
        if(y===null){
            angle = x*100*sensitivity;
        }else{
            if (x !== 0.0 || y !== 0.0) {
                angle = this.radiansToDegrees( Math.atan2(x, y) ) * sensitivity;
            }
        }
        return angle;
    };

    /**
     * @function listGamepads
     * @public
     * @description ListGamepads method of the GamepadController widget. This method lists all connected gamepads and saved those on gamepadsKnown array.
     * @memberof module:GamepadController
     * @returns {GamepadController} The created instance of the widget GamepadController.
     * @instance
     */
    GamepadController.prototype.listGamepads = function () {
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
              if (gamepads[i].index in gamepadsKnown) {
                    gamepadsKnown[gamepads[i].index] = gamepads[i];
              }
            }
        }
        return this;
    };

    /**
     * @function disconnectGamepad
     * @public
     * @description DisconnectGamepad method of the GamepadController widget. This method disconnects 'gamepad'.
     * @param gamepad {Gamepad} The gamepad instance, i.e. its buttons, axes, unique id, among others.
     * @memberof module:GamepadController
     * @returns {GamepadController} The created instance of the widget GamepadController.
     * @instance
     */
    GamepadController.prototype.disconnectGamepad = function (gamepad) {
       this.removeGamepad(gamepad);
       return this;
    };
      
    /**
     * @function removeGamepad
     * @public
     * @description RemoveGamepad method of the GamepadController widget. This method removes 'gamepad' from gamepadsKnown array and removes its div on the frontend demo.
     * @param gamepad {Gamepad} The gamepad instance, i.e. its buttons, axes, unique id, among others.
     * @memberof module:GamepadController
     * @returns {GamepadController} The created instance of the widget GamepadController.
     * @instance
     */
    GamepadController.prototype.removeGamepad = function (gamepad) {
        delete gamepadsKnown[gamepad.index];
        let divToRemove = document.getElementById("gamepad_" + gamepad.index);
        divToRemove.remove();
        return this;
    };
  
    /**
     * @function connectGamepad
     * @public
     * @description ConnectGamepad method of the GamepadController widget. This method connects 'gamepad'.
     * @param gamepad {Gamepad} The gamepad instance, i.e. its buttons, axes, unique id, among others.
     * @memberof module:GamepadController
     * @returns {GamepadController} The created instance of the widget GamepadController.
     * @instance
     */
    GamepadController.prototype.connectGamepad = function (gamepad) {
        if(gamepad.id===""){
            alert("External controller was not loaded properly. Please reload Demo and reconnect your external controller again!");
        }else{
            this.saveGamepad(gamepad);
        }
        return this;
    };

    /**
     * @function saveGamepad
     * @public
     * @description SaveGamepad method of the GamepadController widget. This method add 'gamepad' to gamepadsKnown array and add its div on the frontend demo.
     * Also invokes updateStatus method to continuously update the aforementioned div with the current values of pressed buttons and angles read from gamepad axes.
     * @param gamepad {Gamepad} The gamepad instance, i.e. its buttons, axes, unique id, among others.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.saveGamepad = function (gamepad) {
        gamepadsKnown[gamepad.index] = gamepad;

        let granParent = document.getElementById("content");

        let parent = document.getElementById("gamepads");
        granParent.appendChild(parent);
        
        let d = document.createElement("div");
        d.setAttribute("id", "gamepad_" + gamepad.index);
        parent.appendChild(d);
      
        let t = document.createElement("h1");
        t.style.visibility = "hidden";
        t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
        d.appendChild(t);
      
        let b = document.createElement("div");
        b.className = "buttons";
        b.style.visibility = "hidden";
        for (let i = 0; i < gamepad.buttons.length; i++) {
          let e = document.createElement("span");
          e.className = "button";
          e.setAttribute("name", "button");
          e.innerHTML = i;
          b.appendChild(e);
        }
      
        d.appendChild(b);
      
        let a = document.createElement("div");
        a.className = "axes";
        a.style.visibility = "hidden";
      
        for (let i = 0; i < gamepad.axes.length; i++) {
          let p = document.createElement("progress");
          p.className = "axis";
          p.setAttribute("name", "axis");
        //   p.setAttribute("max", "2");
          p.setAttribute("value", "1");
          p.innerHTML = i;
          a.appendChild(p);
        }
      
        d.appendChild(a);
      
        let start = document.getElementById("start");
        if (start) {
          start.style.display = "none";
        }
      
        document.body.appendChild(granParent);
        requestAnimationFrame(this.updateStatus);
    };

     /**
     * @function updateStatus
     * @public
     * @description UpdateStatus method of the GamepadController widget. This method updates all connected gamepads divs with their current values of pressed buttons and of angles read from gamepad axes.
     * @memberof module:GamepadController
     * @instance
     */
    GamepadController.prototype.updateStatus = function () {
        if (!gamepadEvents) {
            GamepadController.prototype.listGamepads();
        }
        
        let j, i = 0;
        for (j in gamepadsKnown) {
            let controller = gamepadsKnown[j];
            let d = document.getElementById("gamepad_" + j);
            let buttons = d.getElementsByClassName("button");

            for (i = 0; i < controller.buttons.length; i++) {
                let b = buttons[i];
                let val = controller.buttons[i];
                let pressed = (val === 1.0);
                if (typeof(val) === "object") {
                    pressed = val.pressed;
                    val = val.value;
                }
                let pct = Math.round(val * 100) + "%";
                b.style.backgroundSize = pct + " " + pct;
                let clickedOnce=false;  
                let mappedName;                          
                if (pressed) {
                    try {
                        if(controller.id===gamepadPS4Id){
                            mappedName = GamepadController.prototype.mappingPS4GamepadButtons(i);
                        }else if(controller.id===gamepadXBOX1Id){
                            mappedName = GamepadController.prototype.mappingXBOX1GamepadButtons(i);
                        }else if(controller.id===g29RacingPS4ModeId){
                            mappedName = GamepadController.prototype.mappingLogitechG29PS4ModeButtons(i);
                        }else if(controller.id===g29RacingPS3ModeId){
                            mappedName = GamepadController.prototype.mappingLogitechG29PS3ModeButtons(i);
                        }else{
                            mappedName = "other";
                        }  
                        b.setAttribute("name", mappedName +" pressed");
                    } catch (error) {
                        console.log("Error Reading Gamepad Configurations!");
                    }
                    if(carAccelerate && carBrake && carSteeringWheel){
                        if(i===accelerationIndex){ 
                            // Button Square - Logitech G29 PS4 Mode External Controller
                            // Button Cross - PS4 Gamepad/External Controller
                            // Button A - XBOX1 Gamepad/External Controller
                            if(!clickedOnce){
                                if(usePressReleasePVS){
                                    if(useButtonActionsQueue){
                                        ButtonActionsQueue.queueGUIAction("press_"+accelerateInstructionPVS, callback);
                                        ButtonActionsQueue.queueGUIAction("release_"+accelerateInstructionPVS, callback);
                                    }else{
                                        carAccelerate.press();
                                        // carAccelerate.release();
                                    }
                                }else{
                                    if(useButtonActionsQueue){
                                        ButtonActionsQueue.queueGUIAction("click_"+accelerateInstructionPVS, callback);
                                    }else{
                                        carAccelerate.click();
                                    }
                                }
                                clickedOnce=true;
                            }
                        }else if(i===brakeIndex){ 
                            // Button Cross - Logitech G29 PS4 Mode External Controller
                            // Button Circle - PS4 Gamepad/External Controller
                            // Button B - XBOX1 Gamepad/External Controller
                            if(!clickedOnce){
                                if(usePressReleasePVS){
                                    if(useButtonActionsQueue){
                                        ButtonActionsQueue.queueGUIAction("press_"+brakeInstructionPVS, callback);
                                        ButtonActionsQueue.queueGUIAction("release_"+brakeInstructionPVS, callback);
                                    }else{
                                        carBrake.press();
                                        // carBrake.release();
                                    }
                                }else{
                                    if(useButtonActionsQueue){
                                        ButtonActionsQueue.queueGUIAction("click_"+brakeInstructionPVS, callback);
                                    }else{
                                        carBrake.click();
                                    }
                                }
                                clickedOnce=true;
                            }
                        }else if(i===leftArrowIndex){ // Left Arrow - PS4 and XBOX1 Gamepad/External Controller
                            // Logitech G29 PS4 Mode External Controller does not have this button
                            if(!clickedOnce){
                                if(useButtonActionsQueue){
                                    ButtonActionsQueue.queueGUIAction(steeringWheelInstructionPVS+"_left", callback);
                                }else{
                                    carSteeringWheel.btn_rotate_left.click();
                                }
                                clickedOnce=true;
                            }
                        }else if(i===rightArrowIndex){ // Right Arrow - PS4 and XBOX1 Gamepad/External Controller
                            // Logitech G29 PS4 Mode External Controller does not have this button
                            if(!clickedOnce){
                                if(useButtonActionsQueue){
                                    ButtonActionsQueue.queueGUIAction(steeringWheelInstructionPVS+"_right", callback);
                                }else{
                                    carSteeringWheel.btn_rotate_right.click();
                                }
                                clickedOnce=true;
                            }
                        }
                        else if(i===pauseIndex){ 
                            if(!clickedOnce){
                                ButtonActionsQueue.queueGUIAction("press_"+pauseInstructionPVS, callback);
                                ButtonActionsQueue.queueGUIAction("release_"+pauseInstructionPVS, callback);
                                clickedOnce=true;
                            }
                        }   
                        else if(i===quitIndex){ 
                            if(!clickedOnce){
                                ButtonActionsQueue.queueGUIAction("press_"+quitInstructionPVS, callback);
                                ButtonActionsQueue.queueGUIAction("release_"+quitInstructionPVS, callback);
                                clickedOnce=true;
                            }
                        }   
                        else if(i===resumeIndex){ 
                            if(!clickedOnce){
                                ButtonActionsQueue.queueGUIAction("press_"+resumeInstructionPVS, callback);
                                ButtonActionsQueue.queueGUIAction("release_"+resumeInstructionPVS, callback);
                                clickedOnce=true;
                            }
                        }  
                        else if(i===muteIndex){ 
                            if(!clickedOnce){
                                ButtonActionsQueue.queueGUIAction("press_"+muteInstructionPVS, callback);
                                ButtonActionsQueue.queueGUIAction("release_"+muteInstructionPVS, callback);
                                clickedOnce=true;
                            }
                        }  
                        else if(i===unmuteIndex){ 
                            if(!clickedOnce){
                                ButtonActionsQueue.queueGUIAction("press_"+unmuteInstructionPVS, callback);
                                ButtonActionsQueue.queueGUIAction("release_"+unmuteInstructionPVS, callback);
                                clickedOnce=true;
                            }
                        }                                
                    }
                } else {
                    b.setAttribute("name", "button");
                }
            }
            let stickThreshold = 0.10; // remove "noise" values read in the idle sticks.
            let angleRotationSteeringWheel = 0;
            let axes = d.getElementsByClassName("axis");
            let mappedAxis;
            for (i = 0; i < controller.axes.length; i++) {
                try {
                    if(controller.id===gamepadPS4Id){
                        mappedAxis = GamepadController.prototype.mappingPS4GamepadAxes(i);
                    }else if(controller.id===gamepadXBOX1Id){
                        mappedAxis = GamepadController.prototype.mappingXBOX1GamepadAxes(i);
                    }else if(controller.id===g29RacingPS4ModeId){
                        mappedAxis = GamepadController.prototype.mappingLogitechG29PS4ModeAxes(i);
                    }else if(controller.id===g29RacingPS3ModeId){
                        mappedAxis = GamepadController.prototype.mappingLogitechG29PS3ModeAxes(i);
                    }else{
                        mappedAxis = "other";
                    }
                }catch (error) {
                    console.log("Error Reading Gamepad Configurations!");
                }
                let a = axes[i];
                a.innerHTML = i;
                a.setAttribute("name", mappedAxis + " moving");
                a.setAttribute("value", controller.axes[i].toFixed(4));
                // Max and Min values of 1 and -1 for all gamepads
                if(carSteeringWheel){
                    if(controller.axes[i]>stickThreshold || controller.axes[i]<-stickThreshold){
                        if(type==="steeringWheelAndPedals"){
                            // For Logitech G29 PS3 Mode and PS4 Mode External Controller
                            // Idle values varies from -0.0118 to -0.0510 and achieves value of -1 (full left) and of 1 (full right)
                            if(i===steeringWheelIndex){ // steering wheel left/right rotation
                                if(useSensitivity){
                                    angleRotationSteeringWheel = GamepadController.prototype.calculateRotationAngleWithSensitivity(null, controller.axes[i].toFixed(4), sensitivityValue); // sensitivityValue% sensitivity, means less rotation, i.e. lower rotation angle.
                                }else{
                                    angleRotationSteeringWheel = GamepadController.prototype.calculateRotationAngle(null, controller.axes[i].toFixed(4));
                                }
                                if(useButtonActionsQueue){
                                    ButtonActionsQueue.queueGUIAction(steeringWheelInstructionPVS+"_rotate(" + angleRotationSteeringWheel + ")", callback);
                                }else{
                                    carSteeringWheel.rotate(angleRotationSteeringWheel);
                                }
                            }else if(i===accelerationPedalIndex || i===brakePedalIndex){ // pedals(brake and accelerator)
                                // Idle value of -0.0039 and achieves value of 1(full brake) and of -1 (full accelerator)
                                if(controller.axes[i].toFixed(4)>0 && controller.axes[i].toFixed(4)<=1){
                                    if(usePressReleasePVS){
                                        if(useButtonActionsQueue){
                                            ButtonActionsQueue.queueGUIAction("press_"+brakeInstructionPVS, callback);
                                            ButtonActionsQueue.queueGUIAction("release_"+brakeInstructionPVS, callback);
                                        }else{
                                            carBrake.press();
                                            // carBrake.release();
                                        }
                                    }else{
                                        if(useButtonActionsQueue){
                                            ButtonActionsQueue.queueGUIAction("click_"+brakeInstructionPVS, callback);
                                        }else{
                                            carBrake.click();
                                        }
                                    }
                                }
                                else if(controller.axes[i].toFixed(4)<0 && controller.axes[i].toFixed(4)>=-1){
                                    if(usePressReleasePVS){
                                        if(useButtonActionsQueue){
                                            ButtonActionsQueue.queueGUIAction("press_"+accelerateInstructionPVS, callback);
                                            ButtonActionsQueue.queueGUIAction("release_"+accelerateInstructionPVS, callback);
                                        }else{
                                            carAccelerate.press();
                                            // carAccelerate.release();
                                        }
                                    }else{
                                        if(useButtonActionsQueue){
                                            ButtonActionsQueue.queueGUIAction("click_"+accelerateInstructionPVS, callback);
                                        }else{
                                            carAccelerate.click();
                                        }
                                    }
                                }
                            }else if(i===analogueStickIndex){ // stick
                                // Idle values varies from 1.20 to 1.30 and achieves value of 0.71 (full left) and of -0.71 (full right)
                                if(controller.axes[i].toFixed(4)>0 && controller.axes[i].toFixed(4)<1){
                                    if(useButtonActionsQueue){
                                        ButtonActionsQueue.queueGUIAction(steeringWheelInstructionPVS+"_left", callback);
                                    }else{
                                        carSteeringWheel.btn_rotate_left.click();
                                    }
                                }
                                else if(controller.axes[i].toFixed(4)<0 && controller.axes[i].toFixed(4)>-1){
                                    if(useButtonActionsQueue){
                                        ButtonActionsQueue.queueGUIAction(steeringWheelInstructionPVS+"_right", callback);
                                    }else{
                                        carSteeringWheel.btn_rotate_right.click();
                                    }
                                }
                            }   
                        }else if(type==="gamepad"){
                            if(i===leftAnalogueIndex){ // left stick - PS4, XBOX1 and other Gamepad/External Controllers (Standard positions with 2 sticks)
                                if(useSensitivity){
                                    angleRotationSteeringWheel = GamepadController.prototype.calculateRotationAngleWithSensitivity(controller.axes[i+1].toFixed(4), controller.axes[i].toFixed(4), sensitivityValue); // sensitivityValue% sensitivity, means less rotation, i.e. lower rotation angle.
                                }
                                else{
                                    angleRotationSteeringWheel = GamepadController.prototype.calculateRotationAngle(controller.axes[i+1].toFixed(4), controller.axes[i].toFixed(4));
                                }
                                if(useButtonActionsQueue){
                                    ButtonActionsQueue.queueGUIAction(steeringWheelInstructionPVS+"_rotate(" + angleRotationSteeringWheel + ")", callback);
                                }else{
                                    carSteeringWheel.rotate(angleRotationSteeringWheel);
                                }
                            }else if(i===rightAnalogueIndex){ // right stick - PS4, XBOX1 and other Gamepad/External Controllers (Standard positions with 2 sticks)
                                if(useSensitivity){
                                    angleRotationSteeringWheel = GamepadController.prototype.calculateRotationAngleWithSensitivity(controller.axes[i+1].toFixed(4), controller.axes[i].toFixed(4), sensitivityValue); // sensitivityValue% sensitivity, means less rotation, i.e. lower rotation angle.
                                }
                                else{
                                    angleRotationSteeringWheel = GamepadController.prototype.calculateRotationAngle(controller.axes[i+1].toFixed(4), controller.axes[i].toFixed(4));
                                }
                                if(useButtonActionsQueue){
                                    ButtonActionsQueue.queueGUIAction(steeringWheelInstructionPVS+"_rotate(" + angleRotationSteeringWheel + ")", callback);
                                }
                                else{
                                    carSteeringWheel.rotate(angleRotationSteeringWheel);
                                }
                            }
                        }
                    }
                }
            }
        }
        requestAnimationFrame(GamepadController.prototype.updateStatus);
    };

    /**
     * @description Running listGamepads method every 500ms to update known gamepads after detecting new connections(gamepadEvents).
     * @memberof module:GamepadController
     * @instance
     */
    if (!gamepadEvents) {
        setInterval(this.listGamepads, 500);
    }

    module.exports = GamepadController;
});