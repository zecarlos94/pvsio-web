/**
 * @module Arcade
 * @version 1.0.0
 * @author José Carlos
 * @desc This module draws the 2D arcade driving simulator, using HTML5 Canvas.
 *
 * @date Apr 02, 2018
 * last modified @date May 23, 2018
 *
 * @example <caption>Usage of Arcade within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Arcade module
 *     require("widgets/car/Arcade");
 *
 *     function main() {
 *          // After Arcade module was loaded, initialize it
 *          let arcade = new Arcade(
 *               'example', // id of the Arcade element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'game-window',
 *                 trackFilename: "track-curves-slopes", // "track-straight", // defines track configuration filename, which is "track-curves-slopes.json" by default
 *                 spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                 spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
 *                 realisticImgs: false,
 *                 vehicle: "car", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
 *                 vehicleImgIndex: 2, // defines vehicle sprite image suffix
 *                 // logoImgIndex: 1, // defines logo sprite image suffix
 *                 // backgroundImgIndex: 1, // defines background sprite image suffix
 *                 stripePositions: {
 *                    trackP1: -0.50,
 *                    trackP2: 0.50,
 *                    borderWidth: 0.08,
 *                    inOutBorderWidth: 0.02,
 *                    landscapeOutBorderWidth: 0.13,
 *                    diffTrackBorder: 0.05,
 *                    finishLineP1: -0.40,
 *                    finishLineP2: 0.40,
 *                    diffLanesFinishLine: 0.05
 *                  },
 *                  lapNumber: 2,
 *                  // showOfficialLogo: true,
 *                  // loadPVSSpeedPositions: true,
 *                  // predefinedTracks: 5,
 *                  // action_attribute: "action",
 *                  // direction_attribute: "direction",
 *                  // sound_attribute: "sound",
 *                  // lap_attribute: "lap",
 *                  // speed_attribute: "speed",
 *                  // posx_attribute: "posx",
 *                  // position_attribute: "position",
 *                  // lap_value: "val",
 *                  // speed_value: "val",
 *                  // posx_value: "val",
 *                  // position_value: "val",
 *                  // left_attribute: "left",
 *                  // right_attribute: "right",
 *                  // straight_attribute: "straight",
 *                  // accelerate_attribute: "acc",
 *                  // brake_attribute: "brake",
 *                  // idle_attribute: "idle",
 *                  // quit_attribute: "quit",
 *                  // pause_attribute: "pause",
 *                  // resume_attribute: "resume",
 *                  // mute_attribute: "mute",
 *                  // unmute_attribute: "unmute",
 *               }// append on div 'game-window'
 *           );
 *
 *          // Available methods:
 *          // Starts the simulation using constructor's opt fields (arguments)
 *          arcade.startSimulation();
 *
 *          // Render the Arcade widget, updating Widget status with PVS status (vehicle position, posx and speed)
 *          // This API will be called by onMessageReceived callback, which processes PVS status within a PVSio-web demo, so
 *          // each new pvs status can be propagated to the widget.
 *          arcade.render();
 *
 *          // OR
 *
 *          // Hides the Arcade widget
 *          arcade.hide();
 *
 *          // OR
 *
 *          // Reveals the Arcade widget
 *          arcade.reveal();
 *     }
 * });
 *
 * @example <caption>Usage of <strong>Protected API</strong> within Arcade Widget. That is, API which is only used internally by the Arcade Widget to create the desired simulation</caption>
 *     // Loading all spritesheets (images)
 *     arcade.onPageLoad(this.spritesFiles);
 *
 *     // Loading track number of iterations to be rendered
 *     arcade.getNrIterations();
 *
 *     // Detecting current browser
 *     arcade.detectBrowserType();
 *
 *     // Init the canvas, on div with id 'arcadeSimulator'
 *     arcade.init();
 *
 *     // Drawing simulator home page
 *     arcade.renderSplashFrame();
 *
 *     // Drawing simulator pause page
 *     arcade.renderSplashPauseFrame();
 *
 *     // Drawing simulator end page
 *     arcade.renderSplashEndFrame();
 *
 *     // Draws the string "Hello" in the screen coordinates (100,100) with font available at spritesheet image (spritesheetsImages array) at index 1
 *     // By default index 1 has "spritesheet.text.png" image
 *     arcade.drawText("Hello",{x: 100, y: 100}, 1);
 *
 *     // Every 30ms arcade.renderSimulatorFrame method is invoked, drawing the current simulation frame
 *     simulatorInterval = setInterval(arcade.renderSimulatorFrame, 30);
 *
 *     // Updates car's current position (listening for actions: acceleration, etc)
 *     let carSprite = arcade.updateControllableCar();
 *
 *     // Calculates new speed, position, posx and vehicle sprite coordinates x,y based on current direction (listening for actions: acceleration, etc)
 *     arcade.calculateNewControllableCarPosition();
 *
 *     // Sets new speed, position, posx and vehicle sprite coordinates x,y based on vehicleCurrentDirection, newSpeed, newPosition, newPositionX, vehicleXPosition, vehicleYPosition arguments
 *     // Such values must be calculated or given taking into consideration the previous values.
 *     let carSprite = arcade.setControllableCarPosition(vehicleCurrentDirection, newSpeed, newPosition, newPositionX, vehicleXPosition, vehicleYPosition);
 *
 *     // Draws the background image based on car's current horizontal position(posx)
 *     arcade.drawBackground(-posx);
 *
 *     // Setting colors during simulation
 *     arcade.setColorsCanvas(counter < arcadeParams.numberOfSegmentPerColor, "#699864", "#e00", "#fff", "#496a46", "#474747", "#777", "#fff", "#777", "#00FF00");
 *
 *     // Drawing current segment (entire horizontal stripe)
 *     arcade.drawSegment(
 *              render.height / 2 + currentHeight,
 *              currentScaling, currentSegment.curve - baseOffset - lastDelta * currentScaling,
 *              render.height / 2 + endProjectedHeight,
 *              endScaling,
 *              nextSegment.curve - baseOffset - lastDelta * endScaling,
 *              currentSegmentIndex == 2 || currentSegmentIndex == (arcadeParams.numIterations-render.depthOfField)
 *     );
 *
 *     // Draws sprite received as first argument
 *     arcade.drawSprite(
 *      {
 *         y: render.height / 2 + startProjectedHeight,
 *         x: render.width / 2 - currentSegment.sprite.pos * render.width * currentScaling + currentSegment.curve - baseOffset - (controllable_car.posx - baseOffset*2) * currentScaling,
 *         ymax: render.height / 2 + lastProjectedHeight,
 *         s: 0.5*currentScaling,
 *         i: currentSegment.sprite.type,
 *         pos: currentSegment.sprite.pos,
 *         obstacle: currentSegment.sprite.obstacle
 *      },
 *      null,
 *      null,
 *      null,
 *      null
 *     );
 *
 *     // OR
 *     // Draws image carSprite, in coordinates (carSprite.x, carSprite.y) with scale 1 (original size)
 *     arcade.drawSprite(null, carSprite.car, carSprite.x, carSprite.y, 1);
 *
 *     // Sets the color of the finishing line
 *     arcade.prototype.setColorsEndCanvas("#000", "#fff");
 *
 *     // Draws the track current segment portion
 *     arcade.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.5, 0.5, "#fff");
 *
 *     // Draws the lanes
 *     arcade.drawLanes(position1, scale1, offset1, position2, scale2, offset2, arcadeColors.lane, 3, 0.02);
 *
 *     // Draws one lane at position 0 (i.e. in middle of the track) with width laneWidth
 *     arcade.drawLanePos(position1, scale1, offset1, position2, scale2, offset2, arcadeColors.lane, 0, arcadeParams.laneWidth);
 *
 *     // Draws the guiding line
 *     arcade.drawGuidingLine(position1, scale1, offset1, position2, scale2, offset2, -0.02, 0.02, "#00FF00");
 *
 *     // Draws the guiding arrow, turned front, with tail and with color rgb(100,200,187) received as arguments at (10,30) with width 20px and height also 20px
 *     arcade.drawArrowFront(10, 30, 20, 20, "rgb(100,200,187)", 1);
 *
 *     // Draws the guiding arrow, turned left, with tail and with color rgb(100,200,187) received as arguments at (30,20) with width 20px and height also 20px
 *     arcade.drawArrowLeft(30, 20, 20, 20, arcadeColors.laneArrow, 1);
 *
 *     // Draws the guiding arrow, turned right, with tail and with color rgb(100,200,187) received as arguments at (160,150) with width 20px and height also 20px
 *     arcade.drawArrowRight(160, 150, 20, 20, arcadeColors.laneArrow, 1);
 *
 *     // Draws the simple guiding arrow, turned front, with tail and with color laneArrow received as arguments at (canvas.width-50,30)
 *     arcade.drawSimpleArrowFront(canvas.width-50,30,arcadeColors.laneArrow);
 *
 *     // Draws the simple guiding arrow, turned down, with tail and with color laneArrow received as arguments at (canvas.width-50,30)
 *     arcade.drawSimpleArrowDown(canvas.width-50,30,arcadeColors.laneArrow);
 *
 *     // Draws the simple guiding arrow, turned left, with tail and with color laneArrow received as arguments at (canvas.width-50,30)
 *     arcade.drawSimpleArrowLeft(canvas.width-50,30,arcadeColors.laneArrow,{inverse:true});
 *
 *     // Draws the simple guiding arrow, turned right, with tail and with color laneArrow received as arguments at (canvas.width-50,30)
 *     arcade.drawSimpleArrowRight(canvas.width-50,30,arcadeColors.laneArrow,{inverse:true});
 *
 * @example <caption>Usage of API to create a new simulation, after creating a track with curves and slopes, and using a car as a vehicle.
 * Opt field trackFilename is the JSON file, which was created by TrackGenerator Widget or by hand or by other future Widget that creates tracks.
 * </caption>
 *   define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Arcade module
 *     require("widgets/car/Arcade");
 *
 *     function main() {
 *          // After Arcade module was loaded, initialize it
 *          let arcade = new Arcade(
 *               'example', // id of the Arcade element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'game-window',
 *                 trackFilename: "track-curves-slopes", // "track-straight", // defines track configuration filename, which is "track-curves-slopes.json" by default
 *                 spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                 spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
 *                 realisticImgs: false,
 *                 vehicle: "car", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
 *                 vehicleImgIndex: 2, // defines vehicle sprite image suffix
 *                 // logoImgIndex: 1, // defines logo sprite image suffix
 *                 // backgroundImgIndex: 1, // defines background sprite image suffix
 *                 stripePositions: {
 *                    trackP1: -0.50,
 *                    trackP2: 0.50,
 *                    borderWidth: 0.08,
 *                    inOutBorderWidth: 0.02,
 *                    landscapeOutBorderWidth: 0.13,
 *                    diffTrackBorder: 0.05,
 *                    finishLineP1: -0.40,
 *                    finishLineP2: 0.40,
 *                    diffLanesFinishLine: 0.05
 *                  },
 *                  lapNumber: 2,
 *                  // showOfficialLogo: true,
 *                  // loadPVSSpeedPositions: true,
 *                  // predefinedTracks: 5,
 *                  // action_attribute: "action",
 *                  // direction_attribute: "direction",
 *                  // sound_attribute: "sound",
 *                  // lap_attribute: "lap",
 *                  // speed_attribute: "speed",
 *                  // posx_attribute: "posx",
 *                  // position_attribute: "position",
 *                  // lap_value: "val",
 *                  // speed_value: "val",
 *                  // posx_value: "val",
 *                  // position_value: "val",
 *                  // left_attribute: "left",
 *                  // right_attribute: "right",
 *                  // straight_attribute: "straight",
 *                  // accelerate_attribute: "acc",
 *                  // brake_attribute: "brake",
 *                  // idle_attribute: "idle",
 *                  // quit_attribute: "quit",
 *                  // pause_attribute: "pause",
 *                  // resume_attribute: "resume",
 *                  // mute_attribute: "mute",
 *                  // unmute_attribute: "unmute",
 *               }// append on div 'game-window'
 *           );
 *
 *          // Starts the simulation using constructor's opt fields (arguments)
 *          arcade.startSimulation();
 *
 *          // Render the Arcade widget, updating Widget status with PVS status (vehicle position, posx and speed)
 *          // This API will be called by onMessageReceived callback, which processes PVS status within a PVSio-web demo, so
 *          // each new pvs status can be propagated to the widget.
 *          arcade.render();
 *
 *     }
 * });
 *
 * @example <caption>Usage of API to create a new simulation, after creating a track with only straight lines, and using a helicopter as a vehicle.
 * Opt field trackFilename is the JSON file, which was created by TrackGenerator Widget or by hand or by other future Widget that creates tracks.
 * </caption>
 *   define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Arcade module
 *     require("widgets/car/Arcade");
 *
 *     function main() {
 *          // After Arcade module was loaded, initialize it
 *          let arcade = new Arcade(
 *               'example', // id of the Arcade element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'game-window',
 *                 trackFilename: "track-straight", // "track-curves-slopes", // defines track configuration filename, which is "track-curves-slopes.json" by default
 *                 spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                 spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
 *                 realisticImgs: false,
 *                 vehicle: "helicopter", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
 *                 vehicleImgIndex: 1, // defines vehicle sprite image suffix
 *                 // logoImgIndex: 1, // defines logo sprite image suffix
 *                 // backgroundImgIndex: 1, // defines background sprite image suffix
 *                 stripePositions: {
 *                    trackP1: -0.50,
 *                    trackP2: 0.50,
 *                    borderWidth: 0.08,
 *                    inOutBorderWidth: 0.02,
 *                    landscapeOutBorderWidth: 0.13,
 *                    diffTrackBorder: 0.05,
 *                    finishLineP1: -0.40,
 *                    finishLineP2: 0.40,
 *                    diffLanesFinishLine: 0.05
 *                  },
 *                  lapNumber: 2,
 *                  // showOfficialLogo: true,
 *                  // loadPVSSpeedPositions: true,
 *                  // predefinedTracks: 5,
 *                  // action_attribute: "action",
 *                  // direction_attribute: "direction",
 *                  // sound_attribute: "sound",
 *                  // lap_attribute: "lap",
 *                  // speed_attribute: "speed",
 *                  // posx_attribute: "posx",
 *                  // position_attribute: "position",
 *                  // lap_value: "val",
 *                  // speed_value: "val",
 *                  // posx_value: "val",
 *                  // position_value: "val",
 *                  // left_attribute: "left",
 *                  // right_attribute: "right",
 *                  // straight_attribute: "straight",
 *                  // accelerate_attribute: "acc",
 *                  // brake_attribute: "brake",
 *                  // idle_attribute: "idle",
 *                  // quit_attribute: "quit",
 *                  // pause_attribute: "pause",
 *                  // resume_attribute: "resume",
 *                  // mute_attribute: "mute",
 *                  // unmute_attribute: "unmute",
 *               }// append on div 'game-window'
 *           );
 *
 *          // Starts the simulation using constructor's opt fields (arguments)
 *          arcade.startSimulation();
 *
 *          // Render the Arcade widget, updating Widget status with PVS status (vehicle position, posx and speed)
 *          // This API will be called by onMessageReceived callback, which processes PVS status within a PVSio-web demo, so
 *          // each new pvs status can be propagated to the widget.
 *          arcade.render();
 *
 *     }
 * });
 *
 */
/*jslint lets: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jshint esnext:true */

require.config({
    baseUrl: "../../client/app",
    paths: {
        jquery: '../lib/jquery.js',
        jchronometer: '../lib/jchronometer/jchronometer.js'
    }
});

/*global define*/
define(function (require, exports, module) {
    "use strict";

    let Widget = require("widgets/Widget");
    let Sound = require("widgets/car/Sound");
    let ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();

    let WIDGETSTATE = null;
    let loadPVSSpeedPositions = null;    
    let lastPVSValues = {
        lastSpeedPVS: null,
        lastRPMPVS: null,
        lastPositionPVS: 10,
        lastPosXPVS: 0
    };

    let predefinedTracks;
    let configurationFiles = {
        spritesheetJSON: null,
        trackJSON: null,
        spritesheetJSONPredefined: null,
        trackStraightJSONPredefined: null,
        trackCurvesSlopesJSONPredefined: null,
        trackLayout1Predefined: null,
        trackLayout2Predefined: null,
        trackLayout3Predefined: null,
        trackLayout4Predefined: null,
        trackLayout5Predefined: null,
        trackLayout6Predefined: null,
        trackLayout7Predefined: null,
        trackLayout8Predefined: null,
        trackLayout9Predefined: null
    };

    let currentBrowser = { chrome: false, mozilla: false, opera: false, msie: false, safari: false};

    let simulatorLogos = {
        simulatorLogo1: null,
        simulatorLogo2: null
    };
    let spritesheetsImages = [];
    let realPrefix="";
    let readSprite=false;
    let readConfiguration=false;
    let readParams=false;
    let sptB = null;

    // Coordinates of vehicle faced left and right in spritesheet, Coordinates of background in spritesheet, Coordinates of logo in spritesheet
    let main_sprites = {
        vehicle_faced_left: null,
        vehicle_faced_right: null,
        background: null,
        logo: null,
    };
    let vehicle_faced_front;
    let spritesAvailable=[];

    // Information regarding the rendering process (what users will see/how the game is viewed)
    let vehicle = { 
        action_attribute: {},
        direction_attribute: {},
        sound_attribute: {},
        lap_attribute: {},
        speed_attribute: {},
        posx_attribute: {},
        position_attribute: {},
        lap_value: {},
        speed_value: {},
        posx_value: {},
        position_value: {},
        left_attribute: {},
        right_attribute: {},
        straight_attribute: {},
        accelerate_attribute: {},
        brake_attribute: {},
        idle_attribute: {},
        quit_attribute: {},
        pause_attribute: {},
        resume_attribute: {},
        mute_attribute: {},
        unmute_attribute: {}
    };

    let spritesImgsInformation = {
        vehicleType: null,
        vehicleRealistic: null,
        vehicleIndex: null,
        logoIndex: null,
        backgroundIndex: null
    };

    let controllable_car=null;
    let render=null;

    let arcadeParams = {
        laneWidth: null,
        numLanes: null,
        numberOfSegmentPerColor: null,
        trackParam: null,
        trackSegmentSize: null,
        numIterations: null
    };

    let stripeConfiguration = {
        trackP1: null,
        trackP2: null,
        borderWidth: null,
        inOutBorderWidth: null,
        landscapeOutBorderWidth: null,
        diffTrackBorder: null,
        borderP1: null,
        borderP2: null,
        inBorderP1: null,
        inBorderP2: null,
        outBorderP1: null,
        outBorderP2: null,
        landscapeOutBorderP1: null,
        landscapeOutBorderP2: null,
        finishLineP1: null,
        finishLineP2: null,
        diffLanesFinishLine: null,
        laneP1: null,
        laneP2: null,
        laneP3: null,
        laneP4: null,
        laneP5: null,
        laneP6: null,
        laneP7: null,
        laneP8: null
    };

    /*
    * Start of Arcade Global Variables
    */

    // Information regarding the PNG spritesheets with all objects and letters that allows the desired renderization
    let spritesFiles;

    // Variables for calculating the vehicle's position, which will be provided as arguments to setControllabeCarPosition method
    let auxiliaryPVSValues = {
        vehicleCurrentDirectionAux: null, 
        newSpeedAux: null, 
        newPositionAux: null, 
        newPositionXAux: null, 
        vehicleXPositionAux: null, 
        vehicleYPositionAux: null
    };

    let canvasInformations = {
        showOfficialLogo: null, // Information regarding the visibility of the official logo
        canvas: null, //  Information regarding the canvas
        context: null, //  Information regarding the context of the above canvas (2D driving simulator)
        chronometer: null, //  Keep tracking controllable_car's lap time
        time: null, //  Keep tracking controllable_car's lap time
        currentTimeString: null //  Shows controllable_car's lap time
    };

    //  Tracking controllable_car's position
    let lastDelta = 0;

    let intervals = {
        splashInterval: null,
        simulatorInterval: null
    };
    let loadingTrackNrIterations;

    // Information regarding the tracks (auxiliary for drawTrackLoop method) loaded from the JSON file
    let track = [];

    // Information regarding the available sprites loaded from the JSON file
    let spritesReadJSON = [];

    // Information regarding the arcade simulator music
    let soundOff=false;
    let soundWidget;

    // Information regarding the number of laps of the present simulation
    let lapInformation = {
        lapNumber: null,
        lastLapNumber: 1,
        currentLapNumber: 1,
        counterAux: 0,
        currentPercentage: 0,
        callback: null
    };

    /*
    * End of Arcade Global Variables
    */

    /*
    * Start of Arcade Colors
    */
    let arcadeColors = {
        grass: null,
        border: null,
        outborder: null,
        outborder_end: null,
        track_segment: null,
        lane: null,
        laneArrow: null
    };

    // Read from JSON configuration file
    let readColorsJSON = {
        grass1: null, 
        border1: null, 
        border2: null, 
        outborder1: null, 
        outborder_end1: null, 
        track_segment1: null, 
        lane1: null, 
        lane2: null, 
        laneArrow1: null, 
        track_segment_end: null, 
        lane_end: null
    };
    /*
    * End of Arcade Colors
    */

    /**
     * @function constructor
     * @public
     * @description Constructor for the Arcade widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent {String}: the HTML element where the display will be appended (default is "game-window").</li>
     *          <li>trackFilename {String}: the track configuration filename, i.e. JSON file with the track that will be drawed as well as the required sprite coordinates, etc (default is "track").</li>
     *          <li>spritesFilename {String}: the spritesheet configuration filename, i.e. JSON file with the all available sprites, whose coordinates are the same in trackFilename, i.e. the track must have been generated with this JSON as well so the coordinates will match (default is "spritesheet").</li>
     *          <li>spritesFiles {Array}: array with spritesheets(images) names (default is ["spritesheet","spritesheet.text"]).</li>
     *          <li>vehicleImgIndex {Int}: number placed as suffix in the JSON file with the sprite of the vehicle image (front, left side, right side) (default is null).</li>
     *          <li>logoImgIndex {Int}: number placed as suffix in the JSON file with the sprite of the logo image (default is null).</li>
     *          <li>backgroundImgIndex {Int}: number placed as suffix in the JSON file with the sprite of the background image (default is null).</li>
     *          <li>realisticImgs {Bool}: value that indicates if the sprite of the vehicle to be used is a realistic image or if it is a pixelated image as in arcade games (default is "false").</li>
     *          <li>vehicle {String}: the type of vehicle to be used in the simulation. The types available are ["airplane", "bicycle", "car", "helicopter", "motorbike"]. It should be noted that these types must exist in the spritesheet if they are to be used. (default is "car").</li>
     *          <li>stripePositions {Object}: position values and respective widths (borders, track and finish line) to be rendered on a stripe. (default is { trackP1: -0.50, trackP2: 0.50, borderWidth: 0.08, inOutBorderWidth: 0.02, landscapeOutBorderWidth: 0.13, diffTrackBorder: 0.05, finishLineP1: -0.40, finishLineP2: 0.40, diffLanesFinishLine: 0.05 }).</li>
     *          <li>lapNumber {Int}: the number of desired laps in the simulation (default is 2 laps).</li>
     *          <li>showOfficialLogo {Bool}: the option to render extra image, on the bottom-left corner, which is the PVSio-web logo created in this thesis (default is false).</li>
     *          <li>loadPVSSpeedPositions {Bool}: allows to use PVS calculated positions and speed in the simulation. (default is true).</li>
     *          <li>predefinedTracks {Int}: allows to use predefined tracks, present on JSON files with filename "trackLayout"+predefined+".json", in car/configurations/ directory. (default is null).</li>
     *          <li>action_attribute {String}: allows to set pvs attribute name for action. (default is "action").</li>
     *          <li>direction_attribute {String}: allows to set pvs attribute name for direction. (default is "direction").</li>
     *          <li>sound_attribute {String}: allows to set pvs attribute name for sound. (default is "sound").</li>
     *          <li>lap_attribute {String}: allows to set pvs attribute name for lap. (default is "lap").</li>
     *          <li>speed_attribute {String}: allows to set pvs attribute name for speed. (default is "speed").</li>
     *          <li>posx_attribute {String}: allows to set pvs attribute name for posx. (default is "posx").</li>
     *          <li>position_attribute {String}: allows to set pvs attribute name for position. (default is "position").</li>
     *          <li>lap_value {String}: allows to set pvs val name for lap attribute. (default is "val").</li>
     *          <li>speed_value {String}: allows to set pvs val name for speed attribute. (default is "val").</li>
     *          <li>posx_value {String}: allows to set pvs val name for posx attribute. (default is "val").</li>
     *          <li>position_value {String}: allows to set pvs val name for position attribute. (default is "val").</li>
     *          <li>left_attribute {String}: allows to set pvs attribute name for left direction. (default is "left").</li>
     *          <li>right_attribute {String}: allows to set pvs attribute name for right direction. (default is "right").</li>
     *          <li>accelerate_attribute {String}: allows to set pvs attribute name for accelerate action. (default is "acc").</li>
     *          <li>brake_attribute {String}: allows to set pvs attribute name for brake action. (default is "brake").</li>
     *          <li>idle_attribute {String}: allows to set pvs attribute name for idle action. (default is "idle").</li>
     *          <li>quit_attribute {String}: allows to set pvs attribute name for quit action. (default is "quit").</li>
     *          <li>pause_attribute {String}: allows to set pvs attribute name for pause action. (default is "pause").</li>
     *          <li>resume_attribute {String}: allows to set pvs attribute name for resume action. (default is "resume").</li>
     *          <li>mute_attribute {String}: allows to set pvs attribute name for mute sound. (default is "mute").</li>
     *          <li>unmute_attribute {String}: allows to set pvs attribute name for unmute sound. (default is "unmute").</li>
     * @returns {Arcade} The created instance of the widget Arcade.
     * @memberof module:Arcade
     * @instance
     */
    function Arcade(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent || "game-window";
        opt.trackFilename = opt.trackFilename;
        opt.spritesFilename = opt.spritesFilename;
        opt.spritesFiles =  opt.spritesFiles;
        opt.vehicleImgIndex = opt.vehicleImgIndex;
        opt.logoImgIndex = opt.logoImgIndex;
        opt.backgroundImgIndex = opt.backgroundImgIndex;
        opt.realisticImgs = opt.realisticImgs;
        opt.vehicle = opt.vehicle;
        opt.stripePositions = opt.stripePositions;
        opt.showOfficialLogo = opt.showOfficialLogo;
        opt.lapNumber = opt.lapNumber;
        opt.loadPVSSpeedPositions = opt.loadPVSSpeedPositions;
        opt.predefinedTracks = opt.predefinedTracks;

        vehicle.action_attribute = {};
        vehicle.action_attribute = opt.action_attribute || "action";

        vehicle.direction_attribute = {};
        vehicle.direction_attribute = opt.direction_attribute || "direction";

        vehicle.sound_attribute = {};
        vehicle.sound_attribute = opt.sound_attribute || "sound";

        vehicle.lap_attribute = {};
        vehicle.lap_attribute = opt.lap_attribute || "lap";

        vehicle.speed_attribute = {};
        vehicle.speed_attribute = opt.speed_attribute || "speed";

        vehicle.posx_attribute = {};
        vehicle.posx_attribute = opt.posx_attribute || "posx";

        vehicle.position_attribute = {};
        vehicle.position_attribute = opt.position_attribute || "position";

        vehicle.lap_value = {};
        vehicle.lap_value = opt.lap_value || "val";

        vehicle.speed_value = {};
        vehicle.speed_value = opt.speed_value || "val";

        vehicle.posx_value = {};
        vehicle.posx_value = opt.posx_value || "val";

        vehicle.position_value = {};
        vehicle.position_value = opt.position_value || "val";

        vehicle.left_attribute = {};
        vehicle.left_attribute = opt.left_attribute || "left";

        vehicle.right_attribute = {};
        vehicle.right_attribute = opt.right_attribute || "right";

        vehicle.straight_attribute = {};
        vehicle.straight_attribute = opt.straight_attribute || "straight";

        vehicle.accelerate_attribute = {};
        vehicle.accelerate_attribute = opt.accelerate_attribute || "acc";

        vehicle.brake_attribute = {};
        vehicle.brake_attribute = opt.brake_attribute || "brake";
        
        vehicle.idle_attribute = {};
        vehicle.idle_attribute = opt.idle_attribute || "idle";

        vehicle.quit_attribute = {};
        vehicle.quit_attribute = opt.quit_attribute || "quit";

        vehicle.pause_attribute = {};
        vehicle.pause_attribute = opt.pause_attribute || "pause";

        vehicle.resume_attribute = {};
        vehicle.resume_attribute = opt.resume_attribute || "resume";

        vehicle.mute_attribute = {};
        vehicle.mute_attribute = opt.mute_attribute || "mute";

        vehicle.unmute_attribute = {};
        vehicle.unmute_attribute = opt.unmute_attribute ||"unmute";

        this.id = id;
        this.top = coords.top || 100;
        this.left = coords.left || 700;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "game-window";
        this.trackFilename = (opt.trackFilename) ? ("text!widgets/car/configurations/" + opt.trackFilename + ".json") : "text!widgets/car/configurations/track-curves-slopes-random.json";
        this.spritesFilename = (opt.spritesFilename) ? ("text!widgets/car/configurations/" + opt.spritesFilename + ".json") : "text!widgets/car/configurations/spritesheet.json";
        this.spritesFiles = (opt.spritesFiles) ? opt.spritesFiles : ["spritesheet","spritesheet.text"];
        this.vehicleImgIndex = (opt.vehicleImgIndex) ? opt.vehicleImgIndex : null;
        this.logoImgIndex = (opt.logoImgIndex) ? opt.logoImgIndex : null;
        this.backgroundImgIndex = (opt.backgroundImgIndex) ? opt.backgroundImgIndex : null;
        this.realisticImgs = (opt.realisticImgs) ? opt.realisticImgs : false;
        this.vehicle = (opt.vehicle) ? opt.vehicle : "car"; // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
        this.stripePositions = (opt.stripePositions) ? opt.stripePositions : { trackP1: -0.50, trackP2: 0.50, borderWidth: 0.08, inOutBorderWidth: 0.02, landscapeOutBorderWidth: 0.13, diffTrackBorder: 0.05, finishLineP1: -0.40, finishLineP2: 0.40, diffLanesFinishLine: 0.05 };
        this.showOfficialLogo = (opt.showOfficialLogo) ? opt.showOfficialLogo : false;
        this.lapNumber = (opt.lapNumber) ? opt.lapNumber : 2;
        this.loadPVSSpeedPositions = (opt.loadPVSSpeedPositions) ? opt.loadPVSSpeedPositions : true;
        this.predefinedTracks = (opt.predefinedTracks) ? opt.predefinedTracks : null;

        spritesFiles = this.spritesFiles;
        lapInformation.lapNumber = this.lapNumber;
        loadPVSSpeedPositions = this.loadPVSSpeedPositions;
        predefinedTracks = this.predefinedTracks;

        stripeConfiguration.trackP1=this.stripePositions.trackP1;
        stripeConfiguration.trackP2=this.stripePositions.trackP2;
        stripeConfiguration.borderWidth=this.stripePositions.borderWidth;
        stripeConfiguration.inOutBorderWidth=this.stripePositions.inOutBorderWidth;
        stripeConfiguration.landscapeOutBorderWidth=this.stripePositions.landscapeOutBorderWidth;
        stripeConfiguration.diffTrackBorder=this.stripePositions.diffTrackBorder;
        stripeConfiguration.borderP1=stripeConfiguration.trackP1-stripeConfiguration.diffTrackBorder;
        stripeConfiguration.borderP2=stripeConfiguration.trackP1-stripeConfiguration.diffTrackBorder+stripeConfiguration.borderWidth;
        stripeConfiguration.inBorderP1=stripeConfiguration.borderP2;
        stripeConfiguration.inBorderP2=stripeConfiguration.borderP2+stripeConfiguration.inOutBorderWidth;
        stripeConfiguration.outBorderP1=stripeConfiguration.borderP1;
        stripeConfiguration.outBorderP2=stripeConfiguration.borderP1-stripeConfiguration.inOutBorderWidth;
        stripeConfiguration.landscapeOutBorderP1=stripeConfiguration.outBorderP2-stripeConfiguration.landscapeOutBorderWidth;
        stripeConfiguration.landscapeOutBorderP2=stripeConfiguration.outBorderP2;

        stripeConfiguration.finishLineP1=this.stripePositions.finishLineP1;
        stripeConfiguration.finishLineP2=this.stripePositions.finishLineP2;
        stripeConfiguration.diffLanesFinishLine=this.stripePositions.diffLanesFinishLine;
        stripeConfiguration.laneP1=stripeConfiguration.finishLineP1;
        stripeConfiguration.laneP2=stripeConfiguration.finishLineP1+stripeConfiguration.diffLanesFinishLine;
        stripeConfiguration.laneP3=stripeConfiguration.laneP2+stripeConfiguration.diffLanesFinishLine;
        stripeConfiguration.laneP4=stripeConfiguration.laneP3+stripeConfiguration.diffLanesFinishLine;
        stripeConfiguration.laneP5=stripeConfiguration.laneP4+stripeConfiguration.diffLanesFinishLine;
        stripeConfiguration.laneP6=stripeConfiguration.laneP5+stripeConfiguration.diffLanesFinishLine;
        stripeConfiguration.laneP7=stripeConfiguration.laneP6+stripeConfiguration.diffLanesFinishLine;
        stripeConfiguration.laneP8=stripeConfiguration.laneP7+stripeConfiguration.diffLanesFinishLine;

        spritesImgsInformation.vehicleType = this.vehicle;
        spritesImgsInformation.vehicleRealistic = this.realisticImgs;
        spritesImgsInformation.vehicleIndex = this.vehicleImgIndex;
        spritesImgsInformation.logoIndex = this.logoImgIndex;
        spritesImgsInformation.backgroundIndex = this.backgroundImgIndex;
        canvasInformations.showOfficialLogo = this.showOfficialLogo;

        // Loading track and spritesheet based on trackFilename and spritesFilename options
        let _this = this;
        require([this.trackFilename], function(track) {
            _this.div.append("div").attr("id", "track_file_loaded_opt_field").style("visibility","hidden").text(track);
            return _this;
        });

        require([this.spritesFilename], function(spritesheet) {
            _this.div.append("div").attr("id", "spritesheet_file_loaded_opt_field").style("visibility","hidden").text(spritesheet);
            return _this;
        });

        // Set of tracks built with TrackGenerator widget using trackLayout opt field
        configurationFiles.trackLayout1Predefined = require("text!widgets/car/configurations/trackLayout1.json");
        configurationFiles.trackLayout2Predefined = require("text!widgets/car/configurations/trackLayout2.json");
        configurationFiles.trackLayout3Predefined = require("text!widgets/car/configurations/trackLayout3.json");
        configurationFiles.trackLayout4Predefined = require("text!widgets/car/configurations/trackLayout4.json");
        configurationFiles.trackLayout5Predefined = require("text!widgets/car/configurations/trackLayout5.json");
        configurationFiles.trackLayout6Predefined = require("text!widgets/car/configurations/trackLayout6.json");
        configurationFiles.trackLayout7Predefined = require("text!widgets/car/configurations/trackLayout7.json");
        configurationFiles.trackLayout8Predefined = require("text!widgets/car/configurations/trackLayout8.json");
        configurationFiles.trackLayout9Predefined = require("text!widgets/car/configurations/trackLayout9.json");

        // Requiring predefined JSON files
        configurationFiles.trackStraightJSONPredefined = require("text!widgets/car/configurations/track-straight-random.json");
        configurationFiles.trackCurvesSlopesJSONPredefined = require("text!widgets/car/configurations/track-curves-slopes-random.json");
        configurationFiles.spritesheetJSONPredefined = require("text!widgets/car/configurations/spritesheet.json");

        this.div = d3.select(this.parent)
                        .attr("class","container game_view")
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px")
                        .style("width", this.width + "px")
                        .style("height", this.height + "px");
                        // .style("border", "5px solid black");

        this.div.append("canvas").attr("id", "arcadeSimulator")
                .style("-webkit-transform","scale(2.4)")
                .style("margin-top", "170px")
                .style("margin-left", "215px");

        soundWidget = new Sound("soundWidget", {
            top: 625,
            left: 610,
            width: 750,
            height: 750
        }, {
            callback: opt.callback,
            soundOff: "false",
            songs: [
                    {
                        url: "../../client/app/widgets/car/configurations/song/sound.mp3",
                        loop: false
                    },
                    {
                        url: "../../client/app/widgets/car/configurations/song/loop.mp3", // car_idle_sound
                        loop: true
                    },
                    {
                        url: "../../client/app/widgets/car/configurations/song/car_startup.mp3", // car_startup_sound
                        loop: false
                    },
                    {
                        url: "../../client/app/widgets/car/configurations/song/car_accelerating.mp3", // car_accelerating_sound
                        loop: false
                    }
            ]
        });

        soundWidget.hide();
        soundOff = soundWidget.getSoundOff();

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;
        lapInformation.callback = this.callback;

        Widget.call(this, id, coords, opt);

        return this;
    }

    Arcade.prototype = Object.create(Widget.prototype);
    Arcade.prototype.constructor = Arcade;
    Arcade.prototype.parentClass = Widget.prototype;

     /**
     * @function startSimulation
     * @public
     * @description StartSimulation method of the Arcade widget. This method loads the desired JSON Files and starts the corresponding simulation.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.startSimulation = function () {
        setTimeout(function(){
            if(predefinedTracks!==null){
                switch(predefinedTracks){
                    case 1:
                        configurationFiles.trackJSON = configurationFiles.trackLayout1Predefined;
                        break;
                    case 2:
                        configurationFiles.trackJSON = configurationFiles.trackLayout2Predefined;
                        break;
                    case 3:
                        configurationFiles.trackJSON = configurationFiles.trackLayout3Predefined;
                        break;
                    case 4:
                        configurationFiles.trackJSON = configurationFiles.trackLayout4Predefined;
                        break;
                    case 5:
                        configurationFiles.trackJSON = configurationFiles.trackLayout5Predefined;
                        break;
                    case 6:
                        configurationFiles.trackJSON = configurationFiles.trackLayout6Predefined;
                        break;
                    case 7:
                        configurationFiles.trackJSON = configurationFiles.trackLayout7Predefined;
                        break;
                    case 8:
                        configurationFiles.trackJSON = configurationFiles.trackLayout8Predefined;
                        break;
                    case 9:
                        configurationFiles.trackJSON = configurationFiles.trackLayout9Predefined;
                        break;
                    case -1:
                        configurationFiles.trackJSON = configurationFiles.trackStraightJSONPredefined;
                        break;
                    case -2:
                        configurationFiles.trackJSON = configurationFiles.trackCurvesSlopesJSONPredefined;
                        break;
                }
                configurationFiles.spritesheetJSON = document.getElementById("spritesheet_file_loaded_opt_field").innerHTML;
            }else{
                configurationFiles.trackJSON = document.getElementById("track_file_loaded_opt_field").innerHTML;
                configurationFiles.spritesheetJSON = document.getElementById("spritesheet_file_loaded_opt_field").innerHTML;
            }
            if(configurationFiles.trackJSON){
                let aux = JSON.parse(configurationFiles.trackJSON);
                controllable_car=aux.controllable_car;
                arcadeParams.laneWidth=aux.laneWidth;
                arcadeParams.numLanes=aux.numLanes;
                arcadeParams.numberOfSegmentPerColor=aux.numberOfSegmentPerColor;
                render=aux.render;
                arcadeParams.trackParam=aux.trackParam;
                arcadeParams.trackSegmentSize=aux.trackSegmentSize;
                readColorsJSON.grass1=aux.trackColors.grass1;
                readColorsJSON.border1=aux.trackColors.border1;
                readColorsJSON.border2=aux.trackColors.border2;
                readColorsJSON.outborder1=aux.trackColors.outborder1;
                readColorsJSON.outborder_end1=aux.trackColors.outborder_end1;
                readColorsJSON.track_segment1=aux.trackColors.track_segment1;
                readColorsJSON.lane1=aux.trackColors.lane1;
                readColorsJSON.lane2=aux.trackColors.lane2;
                readColorsJSON.laneArrow1=aux.trackColors.laneArrow1;
                readColorsJSON.track_segment_end=aux.trackColors.track_segment_end;
                readColorsJSON.lane_end=aux.trackColors.lane_end;
                readParams=true;
                track=aux.track;
                readConfiguration=true;
            }

            let backgroundRegex, logoRegex, frontRegex, leftRegex, rightRegex;

            if(spritesImgsInformation.vehicleRealistic){
                realPrefix="real_";
            }else{
                realPrefix="";
            }

            if(spritesImgsInformation.backgroundIndex!==null){
                backgroundRegex = new RegExp("^"+realPrefix+"background"+this.backgroundImgIndex+"$");
            }else{
                backgroundRegex = new RegExp("^"+realPrefix+"background");
            }

            if(spritesImgsInformation.logoIndex!==null){
                logoRegex   = new RegExp("^"+realPrefix+"logo"+this.logoImgIndex+"$");
            }else{
                logoRegex   = new RegExp("^"+realPrefix+"logo$");
            }

            if(spritesImgsInformation.vehicleIndex!==null){
                frontRegex      = new RegExp("^"+realPrefix+this.vehicle+this.vehicleImgIndex+"_faced_front$");
                leftRegex       = new RegExp("^"+realPrefix+this.vehicle+this.vehicleImgIndex+"_faced_left$");
                rightRegex      = new RegExp("^"+realPrefix+this.vehicle+this.vehicleImgIndex+"_faced_right$");
            }else{
                frontRegex      = new RegExp("^"+realPrefix+this.vehicle+"_faced_front$");
                leftRegex       = new RegExp("^"+realPrefix+this.vehicle+"_faced_left$");
                rightRegex      = new RegExp("^"+realPrefix+this.vehicle+"_faced_right$");
            }

            // console.log(spritesAvailable);

            if(configurationFiles.spritesheetJSON){
                spritesReadJSON = JSON.parse(configurationFiles.spritesheetJSON);
                // Reading all JSON Sprites Available
                for(let k=0;k<spritesReadJSON.frames.length;k++){
                    spritesAvailable[k]={
                        name:spritesReadJSON.frames[k].filename.split(".")[0],
                        value:spritesReadJSON.frames[k].frame
                    };
                    if(spritesAvailable[k].name.match(backgroundRegex)){
                        main_sprites.background = spritesAvailable[k].value;
                    }
                    if(spritesAvailable[k].name.match(logoRegex)){
                        main_sprites.logo = spritesAvailable[k].value;
                    }
                    if(spritesAvailable[k].name.match(frontRegex)){
                        vehicle_faced_front = spritesAvailable[k].value;
                    }
                    if(spritesAvailable[k].name.match(leftRegex)){
                        main_sprites.vehicle_faced_left = spritesAvailable[k].value;
                    }
                    if(spritesAvailable[k].name.match(rightRegex)){
                        main_sprites.vehicle_faced_right = spritesAvailable[k].value;
                    }
                }

                if(main_sprites.background===undefined){
                    if(spritesImgsInformation.vehicleRealistic){
                        if(spritesImgsInformation.backgroundIndex!==null){ // realistic image with that index does not exist
                            backgroundRegex = new RegExp("^"+realPrefix+"background$");
                        }else{  // realistic image does not exist
                            backgroundRegex = new RegExp("^background");
                        }
                    }else{
                        backgroundRegex = new RegExp("^background");
                    }

                    for(let k=0;k<spritesReadJSON.frames.length;k++){
                        spritesAvailable[k]={
                            name:spritesReadJSON.frames[k].filename.split(".")[0],
                            value:spritesReadJSON.frames[k].frame
                        };
                        if(spritesAvailable[k].name.match(backgroundRegex)){
                            main_sprites.background = spritesAvailable[k].value;
                        }
                    }
                }

                if(main_sprites.logo===undefined){
                    if(spritesImgsInformation.vehicleRealistic){
                        if(spritesImgsInformation.logoIndex!==null){
                            logoRegex   = new RegExp("^"+realPrefix+"logo$");
                        }else{
                            logoRegex   = new RegExp("^logo$");
                        }
                    }else{
                        logoRegex   = new RegExp("^logo$");
                    }

                    for(let k=0;k<spritesReadJSON.frames.length;k++){
                        spritesAvailable[k]={
                            name:spritesReadJSON.frames[k].filename.split(".")[0],
                            value:spritesReadJSON.frames[k].frame
                        };
                        if(spritesAvailable[k].name.match(logoRegex)){
                            main_sprites.logo = spritesAvailable[k].value;
                        }
                    }
                }

                if(vehicle_faced_front===undefined || main_sprites.vehicle_faced_left===undefined || main_sprites.vehicle_faced_right===undefined){
                    if(spritesImgsInformation.vehicleRealistic){
                        if(spritesImgsInformation.vehicleIndex!==null){ // Realistic image with index does not exist
                            frontRegex      = new RegExp("^"+realPrefix+spritesImgsInformation.vehicleType+"_faced_front$");
                            leftRegex       = new RegExp("^"+realPrefix+spritesImgsInformation.vehicleType+"_faced_left$");
                            rightRegex      = new RegExp("^"+realPrefix+spritesImgsInformation.vehicleType+"_faced_right$");
                        }else{ // Realistic image without index does not exist
                            frontRegex      = new RegExp("^"+spritesImgsInformation.vehicleType+"_faced_front$");
                            leftRegex       = new RegExp("^"+spritesImgsInformation.vehicleType+"_faced_left$");
                            rightRegex      = new RegExp("^"+spritesImgsInformation.vehicleType+"_faced_right$");
                        }
                    }
                    else{
                        frontRegex      = new RegExp("^"+spritesImgsInformation.vehicleType+"_faced_front$");
                        leftRegex       = new RegExp("^"+spritesImgsInformation.vehicleType+"_faced_left$");
                        rightRegex      = new RegExp("^"+spritesImgsInformation.vehicleType+"_faced_right$");
                    }

                    for(let k=0;k<spritesReadJSON.frames.length;k++){
                        spritesAvailable[k]={
                            name:spritesReadJSON.frames[k].filename.split(".")[0],
                            value:spritesReadJSON.frames[k].frame
                        };
                        if(spritesAvailable[k].name.match(frontRegex)){
                            vehicle_faced_front = spritesAvailable[k].value;
                        }
                        if(spritesAvailable[k].name.match(leftRegex)){
                            main_sprites.vehicle_faced_left = spritesAvailable[k].value;
                        }
                        if(spritesAvailable[k].name.match(rightRegex)){
                            main_sprites.vehicle_faced_right = spritesAvailable[k].value;
                        }
                    }
                }
                if(main_sprites.background!==undefined && main_sprites.logo!==undefined && vehicle_faced_front!==undefined && main_sprites.vehicle_faced_left!==undefined && main_sprites.vehicle_faced_right!==undefined){
                    readSprite=true;
                }else{
                    for(let k=0;k<spritesReadJSON.frames.length;k++){
                        spritesAvailable[k]={
                            name:spritesReadJSON.frames[k].filename.split(".")[0],
                            value:spritesReadJSON.frames[k].frame
                        };
                        if(spritesAvailable[k].name.match(/^background$/)){
                            main_sprites.background = spritesAvailable[k].value;
                        }
                        if(spritesAvailable[k].name.match(/^logo$/)){
                            main_sprites.logo = spritesAvailable[k].value;
                        }
                        if(spritesImgsInformation.vehicleType==="airplane"){
                            if(spritesAvailable[k].name.match(/^airplane_faced_front$/)){
                                vehicle_faced_front = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^airplane_faced_left$/)){
                                main_sprites.vehicle_faced_left = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^airplane_faced_right$/)){
                                main_sprites.vehicle_faced_right = spritesAvailable[k].value;
                            }
                        }
                        else if(spritesImgsInformation.vehicleType==="bicycle"){
                            if(spritesAvailable[k].name.match(/^bicycle_faced_front$/)){
                                vehicle_faced_front = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^bicycle_faced_left$/)){
                                main_sprites.vehicle_faced_left = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^bicycle_faced_right$/)){
                                main_sprites.vehicle_faced_right = spritesAvailable[k].value;
                            }
                        }
                        else if(spritesImgsInformation.vehicleType==="car") {
                            if(spritesAvailable[k].name.match(/^car_faced_front$/)){
                                vehicle_faced_front = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^car_faced_left$/)){
                                main_sprites.vehicle_faced_left = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^car_faced_right$/)){
                                main_sprites.vehicle_faced_right = spritesAvailable[k].value;
                            }
                        }
                        else if(spritesImgsInformation.vehicleType==="helicopter"){
                            if(spritesAvailable[k].name.match(/^helicopter_faced_front$/)){
                                vehicle_faced_front = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^helicopter_faced_left$/)){
                                main_sprites.vehicle_faced_left = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^helicopter_faced_right$/)){
                                main_sprites.vehicle_faced_right = spritesAvailable[k].value;
                            }
                        }
                        else if(spritesImgsInformation.vehicleType==="motorbike"){
                            if(spritesAvailable[k].name.match(/^motorbike_faced_front$/)){
                                vehicle_faced_front = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^motorbike_faced_left$/)){
                                main_sprites.vehicle_faced_left = spritesAvailable[k].value;
                            }
                            if(spritesAvailable[k].name.match(/^motorbike_faced_right$/)){
                                main_sprites.vehicle_faced_right = spritesAvailable[k].value;
                            }
                        }
                    }
                    readSprite=true;
                }
            }

            Arcade.prototype.onPageLoad(spritesFiles);
            loadingTrackNrIterations = setInterval(function(){ Arcade.prototype.getNrIterations(); }, 500);
        }, 50);
        return this;
    };

    /**
     * @function hide
     * @public
     * @description Hide method of the Arcade widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @public
     * @description Reveal method of the Arcade widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

    /**
     * @function getNrIterations
     * @protected
     * @description GetNrIterations method of the Arcade widget. This method computes the number of iterations required to draw the track defined in the JSON configuration file.
     * In the final version, the JSON structure, see example 1), will be the same, however fields 'height' and 'curve' will have other values
     * other than 0 and 0, respectively.
     * @example
     * 1) JSON Structure Straight Version
     *
     * {
     *     "trackParam": {
     *       "numZones": 12,
     *       "zoneSize": 250
     *     },
     *     "render": {
     *       "width": 320,
     *       "height": 240,
     *       "depthOfField": 150,
     *       "camera_distance": 30,
     *       "camera_height": 100
     *     },
     *     "trackSegmentSize": 5,
     *     "numberOfSegmentPerColor": 4,
     *     "numLanes": 3,
     *     "laneWidth": 0.02,
     *     "controllable_car": {
     *       "position": 10,
     *       "speed": 0,
     *       "acceleration": 0.05,
     *       "deceleration": 0.04,
     *       "breaking": 0.3,
     *       "turning": 5.0,
     *       "posx": 0,
     *       "maxSpeed": 20
     *     },
     *     "track": [
     *        {"height":0,"curve":0,"sprite":{"type":{"x":535,"y":648,"w":168,"h":248},"pos":-0.14646203875343766,"obstacle":1}},
     *        {"height":0,"curve":0,"sprite":{"type":{"x":535,"y":648,"w":168,"h":248},"pos":3.5676653178824482,"obstacle":0}}
     *     ]
     * }
     *
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.getNrIterations = function () {
        try {
            arcadeParams.numIterations = arcadeParams.trackParam.numZones * arcadeParams.trackParam.zoneSize;
            clearInterval(loadingTrackNrIterations);
        } catch (error) {
            console.log("Error Loading Track... "+error);
        }

        return this;
    };

    /**
     * @function onPageLoad
     * @protected
     * @description onPageLoad method of the Arcade widget. This method starts the arcade simulation and loads the required spritesheets, with all sprites defined in track object.
     * @param spritesFiles {Array} array of strings, with the names of the sprites images (spritesheets) to use. By default two are used, one for the objects and another for the font (text).
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.onPageLoad = function (spritesFiles) {
        Arcade.prototype.detectBrowserType();
        if(currentBrowser.chrome){ // can be ensured that all CSS will work as it is supposed!!!
            Arcade.prototype.init();

            simulatorLogos.simulatorLogo1 = new Image();
            simulatorLogos.simulatorLogo1.src = "../../client/app/widgets/car/configurations/img/simulatorLogo1.png";

            simulatorLogos.simulatorLogo2 = new Image();
            simulatorLogos.simulatorLogo2.src = "../../client/app/widgets/car/configurations/img/simulatorLogo2.png";

            spritesFiles.forEach(function(el,index){
                spritesheetsImages[index] = new Image();
            });

            spritesheetsImages[0].onload = function(){
                intervals.splashInterval = setInterval(Arcade.prototype.renderSplashFrame, 30);
            };

            spritesheetsImages.forEach(function(el,index){
                spritesheetsImages[index].src = "../../client/app/widgets/car/configurations/img/"+spritesFiles[index]+".png";
            });
        }
        return this;
    };

    /**
     * @function renderSplashFrame
     * @protected
     * @description RenderSplashFrame method of the Arcade widget. This method draws the simulator home page, where the commands to control the simulator are displayed.
     * It is also initialized the lap timer, using jchronometer lib, as soon as the user uses the command to start the simulation(renderSimulatorFrame).
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
     Arcade.prototype.renderSplashFrame = function () {
        canvasInformations.canvas.height = 240;
        canvasInformations.canvas.width = 320;
        canvasInformations.context.fillStyle = "rgb(100,200,187)";
        canvasInformations.context.fillRect(0, 0, canvasInformations.canvas.width, canvasInformations.canvas.height);

        if(readParams){
            canvasInformations.canvas = $("#arcadeSimulator")[0];
            canvasInformations.context = canvasInformations.canvas.getContext('2d');
            // canvasInformations.canvas.height = render.height;
            // canvasInformations.canvas.width = render.width;

            if(readConfiguration && readSprite){
                canvasInformations.context.drawImage(spritesheetsImages[0],  main_sprites.logo.x, main_sprites.logo.y, main_sprites.logo.w, main_sprites.logo.h, 110, 15, 0.7*main_sprites.logo.w, 0.7*main_sprites.logo.h);

                Arcade.prototype.drawText("Instructions:",{x: 120, y: 90}, 1);
                Arcade.prototype.drawText("Click on space bar to start",{x: 60, y: 110}, 1);
                Arcade.prototype.drawText("Click on key s to pause",{x: 60, y: 120}, 1);
                Arcade.prototype.drawText("Click on key q to end",{x: 60, y: 130}, 1);
                Arcade.prototype.drawText("Use left and rigth arrows",{x: 80, y: 145}, 1);
                Arcade.prototype.drawText("to control the vehicle",{x: 90, y: 155}, 1);
                Arcade.prototype.drawText("You can start now",{x: 110, y: 175}, 1);
                Arcade.prototype.drawText("Credits:",{x: 145, y: 195}, 1);
                Arcade.prototype.drawText("Jose Carlos and PVSio-web",{x: 70, y: 210}, 1);
                Arcade.prototype.drawText("Interactive Prototype Builder",{x: 60, y: 220}, 1);

                if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.resume_attribute){
                    clearInterval(intervals.splashInterval);
                    intervals.simulatorInterval = setInterval(Arcade.prototype.renderSimulatorFrame, 30);
                    soundWidget.reveal();
                    soundWidget.unmute();
                    soundWidget.pauseAll();

                    canvasInformations.chronometer = new Chronometer(
                        { precision: 10,
                        ontimeupdate: function (t) {
                            canvasInformations.time = Chronometer.utils.humanFormat(canvasInformations.chronometer.getElapsedTime()).split(":");
                        }
                    });
                    canvasInformations.chronometer.start();
                    soundOff = soundWidget.getSoundOff();
                    if(!soundOff && WIDGETSTATE[vehicle.sound_attribute]==="unmute"){
                        soundWidget.playSound(2); //startup song
                        soundWidget.playSound(0); //background song
                        soundWidget.setVolume(0.4,0);
                        soundWidget.onEndedSound(2,[
                            {
                            indexPlayNext: 1, //idle song
                            newVolume: 1.0
                            }
                        ]);
                    }
                }
            }else{
                Arcade.prototype.drawText("Loading Configurations...",{x: 100, y: 95}, 1);
            }
        }else{
            Arcade.prototype.drawText("Loading Parameters...",{x: 100, y: 68}, 1);
        }

        return this;
    };

    /**
     * @function renderSplashPauseFrame
     * @protected
     * @description RenderSplashPauseFrame method of the Arcade widget. This method draws the simulator pause page, where the commands to control the simulator and to resume the simulation(renderSimulatorFrame) are displayed.
     * It is also resumed the lap timer, using jchronometer lib, as soon as the user uses the command to resume the simulation.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderSplashPauseFrame = function () {
        canvasInformations.canvas.height = 240;
        canvasInformations.canvas.width = 320;
        canvasInformations.context.fillStyle = "rgb(100,200,187)"; //"rgb(0,0,0)";
        canvasInformations.context.fillRect(0, 0, canvasInformations.canvas.width, canvasInformations.canvas.height);
        // canvasInformations.context.fillRect(0, 0, render.width, render.height);

        canvasInformations.context.drawImage(spritesheetsImages[0],  main_sprites.logo.x, main_sprites.logo.y, main_sprites.logo.w, main_sprites.logo.h, 110, 15, 0.7*main_sprites.logo.w, 0.7*main_sprites.logo.h);

        Arcade.prototype.drawText("Click on space bar to resume",{x: 60, y: 100}, 1);
        Arcade.prototype.drawText("Use left and rigth arrows",{x: 70, y: 135}, 1);
        Arcade.prototype.drawText("to control the car",{x: 100, y: 155}, 1);
        Arcade.prototype.drawText("Credits:",{x: 145, y: 195}, 1);
        Arcade.prototype.drawText("Jose Carlos and PVSio-web",{x: 70, y: 210}, 1);
        Arcade.prototype.drawText("Interactive Prototype Builder",{x: 60, y: 220}, 1);

        if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.resume_attribute){
            canvasInformations.chronometer.start();

            clearInterval(intervals.splashInterval);
            intervals.simulatorInterval = setInterval(Arcade.prototype.renderSimulatorFrame, 30);

            soundWidget.reveal();
            soundWidget.unmute();
            soundWidget.pauseAll();
            soundOff = soundWidget.getSoundOff();
            if(!soundOff){
                soundWidget.playSound(2); //startup song
                soundWidget.playSound(0); //background song
                soundWidget.setVolume(0.4,0);
                soundWidget.onEndedSound(2,[
                    {
                    indexPlayNext: 1, //idle song
                    newVolume: 1.0
                    }
                ]);
            }
        }

        return this;
    };

    /**
     * @function renderSplashEndFrame
     * @protected
     * @description RenderSplashEndFrame method of the Arcade widget. This method draws the simulator end page, where the commands to control the simulator and to start another simulation(renderSimulatorFrame) are displayed.
     * It is also initialized the new lap timer, using jchronometer lib, as soon as the user uses the command to start the new simulation.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderSplashEndFrame = function () {
        canvasInformations.canvas.height = 240;
        canvasInformations.canvas.width = 320;
        canvasInformations.context.fillStyle = "rgb(100,200,187)";//"rgb(0,0,0)";
        canvasInformations.context.fillRect(0, 0, canvasInformations.canvas.width, canvasInformations.canvas.height);
        // canvasInformations.context.fillRect(0, 0, render.width, render.height);

        canvasInformations.context.drawImage(spritesheetsImages[0],  main_sprites.logo.x, main_sprites.logo.y, main_sprites.logo.w, main_sprites.logo.h, 110, 15, 0.7*main_sprites.logo.w, 0.7*main_sprites.logo.h);

        Arcade.prototype.drawText("Thank you for playing!",{x: 90, y: 100}, 1);
        Arcade.prototype.drawText("Click on space bar to start again",{x: 40, y: 125}, 1);
        Arcade.prototype.drawText("Credits:",{x: 145, y: 195}, 1);
        Arcade.prototype.drawText("Jose Carlos and PVSio-web",{x: 70, y: 210}, 1);
        Arcade.prototype.drawText("Interactive Prototype Builder",{x: 60, y: 220}, 1);

        if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.resume_attribute){
            clearInterval(intervals.splashInterval);
            clearInterval(intervals.simulatorInterval);
            controllable_car = {
                position: 10,
                speed: 0,
                acceleration: 0.05,
                deceleration: 0.3,
                breaking: 0.6,
                turning: 5.0,
                posx: 0,
                maxSpeed: 15
            };


            intervals.simulatorInterval = setInterval(Arcade.prototype.renderSimulatorFrame, 30);
            canvasInformations.chronometer.start();

            soundWidget.reveal();
            soundWidget.unmute();
            soundWidget.pauseAll();
            soundOff = soundWidget.getSoundOff();
            if(!soundOff){
                soundWidget.playSound(2); //startup song
                soundWidget.playSound(0); //background song
                soundWidget.setVolume(0.4,0);
                soundWidget.onEndedSound(2,[
                    {
                    indexPlayNext: 1, //idle song
                    newVolume: 1.0
                    }
                ]);
            }
        }
        return this;
    };

    /**
     * @function drawText
     * @protected
     * @description DrawText method of the Arcade widget. This method draws text using sprite letters to simulate the arcade look.
     * That is, reading string and for each letter draw the corresponding sprite letter, using image spritesheetsImages[imageIndex].
     * @param string {String} Text to be rendered with the available text font.
     * @param pos {Object} Screen coordinates, i.e. object with x, y, width and height values.
     * @param imageIndex {Int} spritesheetsImages (array) index, which has the text font sprite image.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawText = function (string, pos, imageIndex) {
        string = string.toUpperCase();
        let cur = pos.x;
        for(let i=0; i < string.length; i++) {
            canvasInformations.context.drawImage(spritesheetsImages[imageIndex], (string.charCodeAt(i) - 32) * 8, 0, 8, 8, cur, pos.y, 8, 8);
            cur += 8;
        }
        return this;
    };

    /**
     * @function drawLanePos
     * @protected
     * @description DrawLanePos method of the Arcade widget. This method draws one lane in the desired position, received as argument.
     * @param pos1 {Float}
     * @param scale1 {Float}
     * @param offset1 {Float}
     * @param pos2 {Float}
     * @param scale2 {Float}
     * @param offset2 {Float}
     * @param color {String} CSS color to render the lane, usually hexadecimal value.
     * @param indexPos {Float} Desired position where lane will be rendered.
     * @param laneWidth {Float} The width of each lane to be rendered.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawLanePos = function (pos1, scale1, offset1, pos2, scale2, offset2, color, indexPos, laneWidth) {
        Arcade.prototype.drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2,  indexPos-laneWidth, indexPos, color);
        return this;
    };

    /**
     * @function drawLanes
     * @protected
     * @description DrawLanes method of the Arcade widget. This method draws lanes according to numLanes, received as argument.
     * @param pos1 {Float}
     * @param scale1 {Float}
     * @param offset1 {Float}
     * @param pos2 {Float}
     * @param scale2 {Float}
     * @param offset2 {Float}
     * @param color {String} CSS color to render the lane, usually hexadecimal value.
     * @param numLanes {Int} Number of lanes to be rendered.
     * @param laneWidth {Float} The width of each lane to be rendered.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawLanes = function (pos1, scale1, offset1, pos2, scale2, offset2, color, numLanes, laneWidth) {
        let alpha = 1.10/numLanes;
        if(numLanes>3){
            for(let i=0;i<numLanes;i++){
                Arcade.prototype.drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2, -0.55+(i*alpha), -0.55+(i*alpha)+laneWidth, color);
                Arcade.prototype.drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2,  0.55-(i*alpha)-laneWidth, 0.55-(i*alpha), color);
            }
        }else{
            Arcade.prototype.drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2, -0.55+alpha, -0.55+alpha+laneWidth, color);
            Arcade.prototype.drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2,  0.55-alpha-laneWidth, 0.55-alpha, color);
        }
        return this;
    };

    /**
     * @function drawGuidingLine
     * @protected
     * @description DrawGuidingLine method of the Arcade widget. This method draws a guiding line within the track.
     * @param pos1 {Float}
     * @param scale1 {Float}
     * @param offset1 {Float}
     * @param pos2 {Float}
     * @param scale2 {Float}
     * @param offset2 {Float}
     * @param delta1 {Float}
     * @param delta2 {Float}
     * @param color {String} CSS color to render the lane, usually hexadecimal value.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawGuidingLine = function (pos1, scale1, offset1, pos2, scale2, offset2, delta1, delta2, color) {
        let demiWidth = render.width / 2;
        canvasInformations.context.fillStyle = color;
        canvasInformations.context.beginPath();
        canvasInformations.context.moveTo(demiWidth + delta1 * render.width * scale1 + offset1, pos1);
        canvasInformations.context.lineTo(demiWidth + delta1 * render.width * scale2 + offset2, pos2);
        canvasInformations.context.lineTo(demiWidth + delta2 * render.width * scale2 + offset2, pos2);
        canvasInformations.context.lineTo(demiWidth + delta2 * render.width * scale1 + offset1, pos1);
        canvasInformations.context.fill();
        return this;
    };

    /**
     * @function drawSimpleArrowFront
     * @protected
     * @description DrawSimpleArrowFront method of the Arcade widget. This method draws a guiding arrow on right top corner of the canvas.
     * @param x {Int} Coordinate X of starting point, i.e. where simple arrow will be drawed.
     * @param y {Int} Coordinate Y of starting point, i.e. where simple arrow will be drawed.
     * @param color {String} CSS color to render the simple arrow, usually hexadecimal value.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawSimpleArrowFront = function (x,y,color){
        canvasInformations.context.fillStyle = color;
        canvasInformations.context.strokeStyle = color;
        canvasInformations.context.lineWidth = 6;
        canvasInformations.context.beginPath();
        canvasInformations.context.moveTo(x,y+10);
        canvasInformations.context.lineTo(x+10,y);
        canvasInformations.context.lineTo(x+20,y+10);
        canvasInformations.context.stroke();
        return this;
    };

    /**
     * @function drawSimpleArrowDown
     * @protected
     * @description DrawSimpleArrowDown method of the Arcade widget. This method draws a guiding arrow on right top corner of the canvas.
     * @param x {Int} Coordinate X of starting point, i.e. where simple arrow will be drawed.
     * @param y {Int} Coordinate Y of starting point, i.e. where simple arrow will be drawed.
     * @param color {String} CSS color to render the simple arrow, usually hexadecimal value.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawSimpleArrowDown = function (x,y,color){
        canvasInformations.context.fillStyle = color;
        canvasInformations.context.strokeStyle = color;
        canvasInformations.context.lineWidth = 6;
        canvasInformations.context.beginPath();
        canvasInformations.context.moveTo(x,y);
        canvasInformations.context.lineTo(x+10,y+10);
        canvasInformations.context.lineTo(x+20,y);
        canvasInformations.context.stroke();
        return this;
    };

    /**
     * @function drawSimpleArrowLeft
     * @protected
     * @description DrawSimpleArrowLeft method of the Arcade widget. This method draws a guiding arrow on right top corner of the canvas.
     * @param x {Int} Coordinate X of starting point, i.e. where simple arrow will be drawed.
     * @param y {Int} Coordinate Y of starting point, i.e. where simple arrow will be drawed.
     * @param color {String} CSS color to render the simple arrow, usually hexadecimal value.
     * @param direction {Object} Object with inverse property, which indicates whether the guide
     * arrow points in the opposite direction of the vehicle, i.e. if it points to the lane,
     * i.e. if it indicates the direction the vehicle should follow, or if the guide arrow points
     * in the direction of the vehicle, i.e., points to the direction of the vehicle at the present
     * moment of the simulation. The abovementioned object is then {inverse:true}.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawSimpleArrowLeft = function (x,y,color,direction){
        if(direction.inverse){
            canvasInformations.context.fillStyle = color;
            canvasInformations.context.strokeStyle = color;
            canvasInformations.context.lineWidth = 6;
            canvasInformations.context.beginPath();
            canvasInformations.context.moveTo(x+13,y);
            canvasInformations.context.lineTo(x+3,y+10);
            canvasInformations.context.lineTo(x+13,y+20);
            canvasInformations.context.stroke();
        }else {
            Arcade.prototype.drawSimpleArrowRight(x,y,color,{inverse:true});
        }
        return this;
    };

    /**
     * @function drawSimpleArrowRight
     * @protected
     * @description DrawSimpleArrowRight method of the Arcade widget. This method draws a guiding arrow on right top corner of the canvas.
     * @param x {Int} Coordinate X of starting point, i.e. where simple arrow will be drawed.
     * @param y {Int} Coordinate Y of starting point, i.e. where simple arrow will be drawed.
     * @param color {String} CSS color to render the simple arrow, usually hexadecimal value.
     * @param direction {Object} Object with inverse property, which indicates whether the guide
     * arrow points in the opposite direction of the vehicle, i.e. if it points to the lane,
     * i.e. if it indicates the direction the vehicle should follow, or if the guide arrow points
     * in the direction of the vehicle, i.e., points to the direction of the vehicle at the present
     * moment of the simulation. The abovementioned object is then {inverse:true}.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawSimpleArrowRight = function (x,y,color,direction){
        if(direction.inverse){
            canvasInformations.context.fillStyle = color;
            canvasInformations.context.strokeStyle = color;
            canvasInformations.context.lineWidth = 6;
            canvasInformations.context.beginPath();
            canvasInformations.context.moveTo(x,y);
            canvasInformations.context.lineTo(x+10,y+10);
            canvasInformations.context.lineTo(x,y+20);
            canvasInformations.context.stroke();
        }else {
            Arcade.prototype.drawSimpleArrowLeft(x,y,color,{inverse:true});
        }
        return this;
    };

    /**
     * @function drawArrowFront
     * @protected
     * @description DrawArrowFront method of the Arcade widget. This method draws a guiding arrow in front of the vehicle.
     * @param x {Int} Coordinate X of starting point, i.e. where arrow apex will be drawed.
     * @param y {Int} Coordinate Y of starting point, i.e. where arrow apex will be drawed.
     * @param width {Int} Arrow width(triangle).
     * @param height {Int} Arrow height(triangle).
     * @param color {String} CSS color to render the arrow, usually hexadecimal value.
     * @param withLine {Int} Boolean, i.e. value 0 does not render line(arrow tail) and 1 renders.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawArrowFront = function (x, y, width, height, color, withLine){
        // Arrow Head
        canvasInformations.context.fillStyle = color;
        canvasInformations.context.beginPath();
        canvasInformations.context.moveTo(x, y);
        canvasInformations.context.lineTo(x - width, y + height);
        canvasInformations.context.lineTo(x + width, y + height);
        canvasInformations.context.closePath();
        canvasInformations.context.fill();

        if(withLine===1){
            // Arrow Line
            canvasInformations.context.strokeStyle = color;
            canvasInformations.context.fillStyle = color;
            canvasInformations.context.lineWidth = 6;
            canvasInformations.context.beginPath();
            canvasInformations.context.moveTo(x, y+10);
            canvasInformations.context.lineTo(x, y+35);
            canvasInformations.context.stroke();
            canvasInformations.context.fill();
        }
        return this;
    };

    /**
     * @function drawArrowRight
     * @protected
     * @description DrawArrowRight method of the Arcade widget. This method draws a guiding arrow, turned right, in front of the vehicle.
     * @param x {Int} Coordinate X of starting point, i.e. where arrow apex will be drawed.
     * @param y {Int} Coordinate Y of starting point, i.e. where arrow apex will be drawed.
     * @param width {Int} Arrow width(triangle).
     * @param height {Int} Arrow height(triangle).
     * @param color {String} CSS color to render the arrow, usually hexadecimal value.
     * @param withLine {Int} Boolean, i.e. value 0 does not render line(arrow tail) and 1 renders.
     * @param direction {Object} Object with inverse property, which indicates whether the guide
     * arrow points in the opposite direction of the vehicle, i.e. if it points to the lane,
     * i.e. if it indicates the direction the vehicle should follow, or if the guide arrow points
     * in the direction of the vehicle, i.e., points to the direction of the vehicle at the present
     * moment of the simulation. The abovementioned object is then {inverse:true}.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawArrowRight = function (x, y, width, height, color, withLine, direction) {
        if(direction.inverse){
            canvasInformations.context.fillStyle = color;
            canvasInformations.context.beginPath();
            canvasInformations.context.moveTo(x, y); // reposition at x (horizontal axis), y (vertical axis)
            canvasInformations.context.lineTo(x, y + height);  // draw straight down by height
            canvasInformations.context.lineTo(x - width, y + height/2); // draw up toward left
            canvasInformations.context.closePath(); // connect and fill
            canvasInformations.context.fill();

            if(withLine===1){
                // Arrow Line
                canvasInformations.context.strokeStyle = color;
                canvasInformations.context.fillStyle = color;
                canvasInformations.context.lineWidth = 6;
                canvasInformations.context.beginPath();
                canvasInformations.context.moveTo(x + width/2 - width, y + height - 5);
                canvasInformations.context.lineTo(x - width + 2, y + height/2 + 20);
                canvasInformations.context.stroke();
                canvasInformations.context.fill();
            }
        }else{
            Arcade.prototype.drawArrowLeft(x, y, width, height, color, withLine, {inverse:true});
        }
        return this;
    };

    /**
     * @function drawArrowLeft
     * @protected
     * @description DrawArrowLeft method of the Arcade widget. This method draws a guiding arrow, turned left, in front of the vehicle.
     * @param x {Int} Coordinate X of starting point, i.e. where arrow apex will be drawed.
     * @param y {Int} Coordinate Y of starting point, i.e. where arrow apex will be drawed.
     * @param width {Int} Arrow width(triangle).
     * @param height {Int} Arrow height(triangle).
     * @param color {String} CSS color to render the arrow, usually hexadecimal value.
     * @param withLine {Int} Boolean, i.e. value 0 does not render line(arrow tail) and 1 renders.
     * @param direction {Object} Object with inverse property, which indicates whether the guide
     * arrow points in the opposite direction of the vehicle, i.e. if it points to the lane,
     * i.e. if it indicates the direction the vehicle should follow, or if the guide arrow points
     * in the direction of the vehicle, i.e., points to the direction of the vehicle at the present
     * moment of the simulation. The abovementioned object is then {inverse:true}.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawArrowLeft = function (x, y, width, height, color, withLine, direction){
        if(direction.inverse){
            canvasInformations.context.save();
            canvasInformations.context.fillStyle = color;
            canvasInformations.context.beginPath();
            canvasInformations.context.moveTo(x, y);
            canvasInformations.context.lineTo(x, y + height);
            canvasInformations.context.lineTo(x + width, y + height/2);
            canvasInformations.context.closePath();
            canvasInformations.context.fill();

            if(withLine===1){
                // Arrow Line
                canvasInformations.context.strokeStyle = color;
                canvasInformations.context.fillStyle = color;
                canvasInformations.context.lineWidth = 6;
                canvasInformations.context.beginPath();
                canvasInformations.context.moveTo(x + width/2, y + height - 5);
                canvasInformations.context.lineTo(x + width - 2, y + height/2 + 20);
                canvasInformations.context.stroke();
                canvasInformations.context.fill();
            }
            canvasInformations.context.restore();
        }else{
            Arcade.prototype.drawArrowRight(x, y, width, height, color, withLine, {inverse:true});
        }
        return this;
    };

    /**
     * @function drawSprite
     * @protected
     * @description DrawSprite method of the Arcade widget. This method draws an image of spritesheetsImages array. Usually it uses index 0, since this method is used to
     * draw objects and index 0 has the spritesheet image with all available objects. This method either receives only a sprite (and null as other arguments) or receives
     * an image, x, y and scale (sprite as a null argument). This allows to use render different images and sprites.
     * @param sprite {Float} Sprite to be rendered.
     * @param image {Float} Image to be rendered.
     * @param x {Float} X screen coordinate, used to place the object to be rendered.
     * @param y {Float} Y screen coordinate, used to place the object to be rendered.
     * @param scale {Float} Scaling value to render object. It is used to enlarge or to shrink the object to better fit in the screen.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawSprite = function (sprite, image, x, y, scale) {
        if(sprite!==null){
            let destY = sprite.y - sprite.i.h * sprite.s;
            let h = null;
            if(sprite.ymax < sprite.y) {
                h = Math.min(sprite.i.h * (sprite.ymax - destY) / (sprite.i.h * sprite.s), sprite.i.h);
            } else {
                h = sprite.i.h;
            }
            if(h > 0) canvasInformations.context.drawImage(spritesheetsImages[0],  sprite.i.x, sprite.i.y, sprite.i.w, h, sprite.x, destY, sprite.s * sprite.i.w, sprite.s * h);
        }else{
            canvasInformations.context.drawImage(spritesheetsImages[0],  image.x, image.y, image.w, image.h, x, y, scale*image.w, scale*image.h);
        }
        return this;
    };

    /**
     * @function drawSegmentPortion
     * @protected
     * @description DrawSegmentPortion method of the Arcade widget. This method draws a segment portion.
     * @param pos1 {Float}
     * @param scale1 {Float}
     * @param offset1 {Float}
     * @param pos2 {Float}
     * @param scale2 {Float}
     * @param offset2 {Float}
     * @param delta1 {Float}
     * @param delta2 {Float}
     * @param color {String} CSS color to render the lane, usually hexadecimal value.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawSegmentPortion = function (pos1, scale1, offset1, pos2, scale2, offset2, delta1, delta2, color) {
        let demiWidth = render.width / 2;

        canvasInformations.context.fillStyle = color;
        canvasInformations.context.beginPath();
        canvasInformations.context.moveTo(demiWidth + delta1 * render.width * scale1 + offset1, pos1);
        canvasInformations.context.lineTo(demiWidth + delta1 * render.width * scale2 + offset2, pos2);
        canvasInformations.context.lineTo(demiWidth + delta2 * render.width * scale2 + offset2, pos2);
        canvasInformations.context.lineTo(demiWidth + delta2 * render.width * scale1 + offset1, pos1);
        canvasInformations.context.fill();
        return this;
    };

    /**
     * @function drawBackground
     * @protected
     * @description DrawBackground method of the Arcade widget. This method draws the main_sprites.background image, in position 'position'.
     * @param position {Float} Value of posx in controllable_car object, i.e. horizontal position, which is computed by adding/subtracting the turning field value every time the vehicle is turned left or right, in updateControllableCar method.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawBackground = function (position) {
        let first = position / 2 % (main_sprites.background.w);
        //(image, x, y, scale) args
        Arcade.prototype.drawSprite(null, main_sprites.background, first-main_sprites.background.w +1, 0, 1);
        Arcade.prototype.drawSprite(null, main_sprites.background, first+main_sprites.background.w-1, 0, 1);
        Arcade.prototype.drawSprite(null, main_sprites.background, first, 0, 1);
        return this;
    };

     /**
     * @function setColorsEndCanvas
     * @protected
     * @description SetColorsEndCanvas method of the Arcade widget. This method set the final colors of the track segment and lane.
     * The goal is to create the illusion of the starting/finishing line, which is black and white, and therefore, different from the colors that
     * those two segments have during the simulation.
     * @param track_segment {String} CSS color to render the final track segment, usually hexadecimal value.
     * @param lane {String} CSS color to render the final lane, usually hexadecimal value.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.setColorsEndCanvas = function (track_segment, lane) {
        arcadeColors.track_segment = track_segment;
        arcadeColors.lane          = lane;
        return this;
    };

    /**
     * @function setColorsCanvas
     * @protected
     * @description SetColorsCanvas method of the Arcade widget. This method set the initial colors of canvas, which will prevail until the end of the track is reached.
     * @param alternate {Boolean} Value of comparison "counter < numberOfSegmentPerColor", which allows to choose the color of the segment depending on which segment is currently being rendered.
     * That is, numberOfSegmentPerColor has the number of sequential segments to be colored with the same color, and when reached the following segments must be rendered with another color so the simulator can
     * offer alternate colors. This is used, for instance, to render the track separators (separates track from landscape), which is colored red and white alternately.
     * @param border1 {String} CSS color to render the first border sequence of segments, usually hexadecimal value.
     * @param border2 {String} CSS color to render the second border sequence of segments, usually hexadecimal value.
     * @param outborder1 {String} CSS color to render the outborder (line that separates the track from the track separator) segments, usually hexadecimal value.
     * @param outborder_end1 {String} CSS color to render the outborder_end (line that separates the track separator from the landscape) segments, usually hexadecimal value.
     * @param track_segment1 {String} CSS color to render the track segments, usually hexadecimal value.
     * @param lane1 {String} CSS color to render the first lane sequence of segments (allows discontinuous lanes), usually hexadecimal value. To have continuous lanes, lane1 and lane2 arguments must have the same value (color).
     * @param lane2 {String} CSS color to render the second lane sequence of segments, usually hexadecimal value.
     * @param laneArrow1 {String} CSS color to render the guiding arrow segment, usually hexadecimal value.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.setColorsCanvas = function (alternate, grass1, border1, border2, outborder1, outborder_end1, track_segment1, lane1, lane2, laneArrow1) {
        arcadeColors.grass          = grass1;
        arcadeColors.border         = (alternate) ? border1 : border2;
        arcadeColors.outborder      = outborder1;
        arcadeColors.outborder_end  = outborder_end1;
        arcadeColors.track_segment  = track_segment1;
        arcadeColors.lane           = (alternate) ? lane1 : lane2;
        arcadeColors.laneArrow      = laneArrow1;
        return this;
    };

    /**
     * @function drawSegment
     * @protected
     * @description DrawSegment method of the Arcade widget. This method draws a segment of the simulator(which corresponds to an entire strip of the canvas).
     * To do so, this method uses drawSegmentPortion, setColorsEndCanvas methods. The latter is used to draw the finishing line (different colors).
     * @param position1 {Float}
     * @param scale1 {Float}
     * @param offset1 {Float}
     * @param position2 {Float}
     * @param scale2 {Float}
     * @param offset2 {Float}
     * @param finishStart {Boolean} Value of comparison "currentSegmentIndex == 2 || currentSegmentIndex == (arcadeParams.numIterations-render.depthOfField)", which verifies if current segment
     * is the second or the last segment, i.e. the starting segment or the final segment to be rendered.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawSegment = function (position1, scale1, offset1, position2, scale2, offset2, finishStart) {
        if(finishStart){
            Arcade.prototype.setColorsEndCanvas(readColorsJSON.track_segment_end, readColorsJSON.lane_end);
            // setColorsEndCanvas("#000", "#fff");

            //draw grass:
            canvasInformations.context.fillStyle = arcadeColors.grass;
            canvasInformations.context.fillRect(0,position2,render.width,(position1-position2));

            // draw the track
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.trackP1, stripeConfiguration.trackP2, "#fff");

            //draw the track border
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.borderP1, stripeConfiguration.borderP2, arcadeColors.border);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.borderP2, -stripeConfiguration.borderP1, arcadeColors.border);

            //draw the track outborder dark green
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.inBorderP1, stripeConfiguration.inBorderP2, arcadeColors.outborder_end);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.landscapeOutBorderP1, stripeConfiguration.landscapeOutBorderP2, arcadeColors.outborder);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.outBorderP2, stripeConfiguration.outBorderP1, arcadeColors.outborder_end);

            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.inBorderP2, -stripeConfiguration.inBorderP1, arcadeColors.outborder_end);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.landscapeOutBorderP2, -stripeConfiguration.landscapeOutBorderP1, arcadeColors.outborder);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.outBorderP1, -stripeConfiguration.outBorderP2, arcadeColors.outborder_end);

            // // draw the lane line
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.laneP1, stripeConfiguration.laneP2, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.laneP3, stripeConfiguration.laneP4, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.laneP5, stripeConfiguration.laneP6, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.laneP7, stripeConfiguration.laneP8, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.laneP8, 0, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.laneP6, -stripeConfiguration.laneP7, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.laneP4, -stripeConfiguration.laneP5, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.laneP2, -stripeConfiguration.laneP3, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.laneP1+stripeConfiguration.diffLanesFinishLine, -stripeConfiguration.laneP1, "#000");

            // draw arrow or guiding line
            // Arcade.prototype.drawGuidingLine(position1, scale1, offset1, position2, scale2, offset2, -0.02, 0.02, arcadeColors.laneArrow);
            if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute]===vehicle.straight_attribute){
                // Arcade.prototype.drawArrowFront(160, 150, 12, 18, arcadeColors.laneArrow, 1);
                Arcade.prototype.drawSimpleArrowFront(canvasInformations.canvas.width-50,30,arcadeColors.laneArrow);
            }else if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute]===vehicle.right_attribute){
                // Arcade.prototype.drawArrowLeft(160, 150, 20, 20, arcadeColors.laneArrow, 1, {inverse:false});
                Arcade.prototype.drawSimpleArrowLeft(canvasInformations.canvas.width-50,30,arcadeColors.laneArrow,{inverse:false});
            }else if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute]===vehicle.left_attribute){
                // Arcade.prototype.drawArrowRight(160, 150, 20, 20, arcadeColors.laneArrow, 1, {inverse:false});
                Arcade.prototype.drawSimpleArrowRight(canvasInformations.canvas.width-50,30,arcadeColors.laneArrow,{inverse:false});
            }
        }
        else{
            //draw grass:
            canvasInformations.context.fillStyle = arcadeColors.grass;
            canvasInformations.context.fillRect(0,position2,render.width,(position1-position2));

            // draw the track
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.trackP1, stripeConfiguration.trackP2, arcadeColors.track_segment);

            //draw the track border
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.borderP1, stripeConfiguration.borderP2, arcadeColors.border);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.borderP2, -stripeConfiguration.borderP1, arcadeColors.border);

            //draw the track outborder dark green
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.inBorderP1, stripeConfiguration.inBorderP2, arcadeColors.outborder_end);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.landscapeOutBorderP1, stripeConfiguration.landscapeOutBorderP2, arcadeColors.outborder);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, stripeConfiguration.outBorderP2, stripeConfiguration.outBorderP1, arcadeColors.outborder_end);

            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.inBorderP2, -stripeConfiguration.inBorderP1, arcadeColors.outborder_end);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.landscapeOutBorderP2, -stripeConfiguration.landscapeOutBorderP1, arcadeColors.outborder);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -stripeConfiguration.outBorderP1, -stripeConfiguration.outBorderP2, arcadeColors.outborder_end);

            // draw the lane line
            Arcade.prototype.drawLanes(position1, scale1, offset1, position2, scale2, offset2, arcadeColors.lane, arcadeParams.numLanes, arcadeParams.laneWidth);
            // Arcade.prototype.drawLanePos(position1, scale1, offset1, position2, scale2, offset2, arcadeColors.lane, 0, arcadeParams.laneWidth);

            // draw arrow or guiding line
            // Arcade.prototype.drawGuidingLine(position1, scale1, offset1, position2, scale2, offset2, -0.02, 0.02, arcadeColors.laneArrow);
            if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute]===vehicle.straight_attribute){
                // Arcade.prototype.drawArrowFront(160, 150, 12, 18, arcadeColors.laneArrow, 1);
                Arcade.prototype.drawSimpleArrowFront(canvasInformations.canvas.width-50,30,arcadeColors.laneArrow);
            }else if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute]===vehicle.right_attribute){
                // Arcade.prototype.drawArrowLeft(160, 150, 20, 20, arcadeColors.laneArrow, 1, {inverse:false});
                Arcade.prototype.drawSimpleArrowLeft(canvasInformations.canvas.width-50,30,arcadeColors.laneArrow, {inverse:false});
            }else if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute]===vehicle.left_attribute){
                // Arcade.prototype.drawArrowRight(160, 150, 20, 20, arcadeColors.laneArrow, 1, {inverse:false});
                Arcade.prototype.drawSimpleArrowRight(canvasInformations.canvas.width-50,30,arcadeColors.laneArrow, {inverse:false});
            }
        }
        return this;
    };

    /**
     * @function updateControllableCar
     * @protected
     * @description UpdateControllableCar method of the Arcade widget. This method updates the controllable car position and speed.
     * @memberof module:Arcade
     * @returns {carSprite} The created object with car sprite (image) and its X,Y coordinates, to be rendered after current position and speed has been changed.
     * That is, returns the new state after the action performed by the user (acceleration, braking, change of direction).
     * @instance
     */
    Arcade.prototype.updateControllableCar = function () {

        if(vehicle_faced_front===undefined || main_sprites.vehicle_faced_left===undefined || main_sprites.vehicle_faced_right===undefined){
            console.log("Check if constructor args are correct!");
            console.log("Maybe Vehicle Image does not exist! Check Spritesheet image and Spritesheet.json");
            console.log("Vehicle Image Type and Realistic Image does not have a match");
        }

        //  Update the car state
        // TODO understand lastDelta
        if (Math.abs(lastDelta) > 130){
            if (controllable_car.speed > 3) {
                controllable_car.speed -= 0.2;
            }
        } else {
            // readSprite acceleration controls
            soundOff = soundWidget.getSoundOff();
            if (WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.accelerate_attribute) {
                controllable_car.speed += controllable_car.acceleration;
                if(!soundOff){
                  soundWidget.playSound(3); //accelerating song
                }
            } else if (WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.brake_attribute) {
                controllable_car.speed -= controllable_car.breaking;
                if(!soundOff){
                  soundWidget.pauseSound(3); //accelerating song
                }
            } else {
                controllable_car.speed -= controllable_car.deceleration;
                if(!soundOff){
                  soundWidget.pauseSound(3); //accelerating song
                }
            }
        }
        controllable_car.speed = Math.max(controllable_car.speed, 0); //cannot go in reverse
        controllable_car.speed = Math.min(controllable_car.speed, controllable_car.maxSpeed); //maximum speed
        controllable_car.position += controllable_car.speed;
        let carSprite;
        let vehicleXFrontPosition;
        let vehicleYFrontPosition;

        let vehicleXLeftPosition;
        let vehicleYLeftPosition;

        let vehicleXRightPosition;
        let vehicleYRightPosition;

        switch (spritesImgsInformation.vehicleType) {
            case "airplane":
                if(spritesImgsInformation.vehicleIndex===2){
                    vehicleXFrontPosition = 50;
                    vehicleYFrontPosition = 110;
                    vehicleXLeftPosition= 50;
                    vehicleYLeftPosition= 70;
                    vehicleXRightPosition= 50;
                    vehicleYRightPosition= 70;
                }else{
                    vehicleXFrontPosition = 110;
                    vehicleYFrontPosition = 100;
                    vehicleXLeftPosition= 110;
                    vehicleYLeftPosition= 100;
                    vehicleXRightPosition= 110;
                    vehicleYRightPosition= 100;
                }
                break;
            case "bicycle":
                if(spritesImgsInformation.vehicleRealistic){
                    vehicleXFrontPosition = 135;
                    vehicleYFrontPosition = 160;
                    vehicleXLeftPosition= 135;
                    vehicleYLeftPosition= 160;
                    vehicleXRightPosition= 135;
                    vehicleYRightPosition= 160;
                }else{
                    vehicleXFrontPosition = 140;
                    vehicleYFrontPosition = 175;
                    vehicleXLeftPosition= 140;
                    vehicleYLeftPosition= 175;
                    vehicleXRightPosition= 140;
                    vehicleYRightPosition= 175;
                }
                break;
            case "car":
                if(spritesImgsInformation.vehicleRealistic){
                    vehicleXFrontPosition = 125;
                    vehicleYFrontPosition = 180;
                    vehicleXLeftPosition= 125;
                    vehicleYLeftPosition= 180;
                    vehicleXRightPosition= 125;
                    vehicleYRightPosition= 180;
                }else{
                    vehicleXFrontPosition = 125;
                    vehicleYFrontPosition = 190;
                    vehicleXLeftPosition= 125;
                    vehicleYLeftPosition= 190;
                    vehicleXRightPosition= 125;
                    vehicleYRightPosition= 190;
                }
                break;
            case "helicopter":
                vehicleXFrontPosition = 100;
                vehicleYFrontPosition = 90;
                vehicleXLeftPosition= 70;
                vehicleYLeftPosition= 60;
                vehicleXRightPosition= 70;
                vehicleYRightPosition= 60;
                break;
            case "motorbike":
                if(spritesImgsInformation.vehicleRealistic){
                    vehicleXFrontPosition = 130;
                    vehicleYFrontPosition = 160;
                    vehicleXLeftPosition= 130;
                    vehicleYLeftPosition= 160;
                    vehicleXRightPosition= 130;
                    vehicleYRightPosition= 160;
                }else{
                    vehicleXFrontPosition = 150;
                    vehicleYFrontPosition = 175;
                    vehicleXLeftPosition= 120;
                    vehicleYLeftPosition= 175;
                    vehicleXRightPosition= 140;
                    vehicleYRightPosition= 175;
                }
                break;
        }

        // car turning
        if (WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute]===vehicle.left_attribute) {
            if(controllable_car.speed > 0){
                controllable_car.posx -= controllable_car.turning;
            }
            carSprite = {
                car: main_sprites.vehicle_faced_left,
                x: vehicleXLeftPosition,
                y: vehicleYLeftPosition
            };
        } else if (WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute]===vehicle.right_attribute) {
            if(controllable_car.speed > 0){
                controllable_car.posx += controllable_car.turning;
            }
            carSprite = {
                car: main_sprites.vehicle_faced_right,
                x: vehicleXRightPosition,
                y: vehicleYRightPosition
            };
        } else {
            carSprite = {
                car: vehicle_faced_front,
                x: vehicleXFrontPosition,
                y: vehicleYFrontPosition
            };
        }
        return carSprite;
    };

    /**
     * @function setControllableCarPosition
     * @protected
     * @description SetControllableCarPosition method of the Arcade widget. This method sets the controllable car position, posx, speed and vehicle sprite based on current direction.
     * @param {String} vehicleCurrentDirection the current vehicle direction, that allows to select the proper vehicle sprite(faced front, left or right).
     * @param {Float} newSpeed the new value of speed.
     * @param {Float} newPosition the new value of position.
     * @param {Float} newPositionX the new value of posx.
     * @param {Int} vehicleXPosition the X-coordinate of the sprite of the vehicle with vehicleCurrentDirection as its current direction.
     * @param {Int} vehicleYPosition the Y-coordinate of the sprite of the vehicle with vehicleCurrentDirection as its current direction.
     * @returns {carSprite} The created object with car sprite (image) and its X,Y coordinates, to be rendered after current position and speed has been changed.
     * That is, returns the new state after the action performed by the user (acceleration, braking, change of direction).
     * @instance
     */
    Arcade.prototype.setControllableCarPosition = function (vehicleCurrentDirection, newSpeed, newPosition, newPositionX, vehicleXPosition, vehicleYPosition) {

        if(vehicle_faced_front===undefined || main_sprites.vehicle_faced_left===undefined || main_sprites.vehicle_faced_right===undefined){
            console.log("Check if constructor args are correct!");
            console.log("Maybe Vehicle Image does not exist! Check Spritesheet image and Spritesheet.json");
            console.log("Vehicle Image Type and Realistic Image does not have a match");
        }

        controllable_car.speed    = newSpeed;
        controllable_car.position = newPosition;

        let carSprite;

        if(controllable_car.speed > 0){
            controllable_car.posx = newPositionX;
        }

        if(vehicleCurrentDirection===vehicle.straight_attribute){
            carSprite = {
                car: vehicle_faced_front,
                x: vehicleXPosition,
                y: vehicleYPosition
            };
        }else if(vehicleCurrentDirection===vehicle.left_attribute){
            carSprite = {
                car: main_sprites.vehicle_faced_left,
                x: vehicleXPosition,
                y: vehicleYPosition
            };
        }else if(vehicleCurrentDirection===vehicle.right_attribute){
            carSprite = {
                car: main_sprites.vehicle_faced_right,
                x: vehicleXPosition,
                y: vehicleYPosition
            };
        }

        return carSprite;
    };

    /**
     * @function calculateNewControllableCarPosition
     * @protected
     * @description calculateNewControllableCarPosition method of the Arcade widget. This method calculates the new controllable car position, based on
     * its speed, current position and posx values updated by the render method, using PVS status.
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.calculateNewControllableCarPosition = function () {

        if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.speed_attribute][vehicle.speed_value]!=="0"){
            // readSprite acceleration controls
            soundOff = soundWidget.getSoundOff();
            let currentSpeedPVS = WIDGETSTATE[vehicle.speed_attribute][vehicle.speed_value];
            let arraySpeed = currentSpeedPVS.split("/");
            let speedValue = parseInt(arraySpeed[0])/parseInt(arraySpeed[1]);
            if(!isNaN(speedValue)){
                lastPVSValues.lastSpeedPVS = Math.ceil(speedValue);
            }
            if(Math.abs(lastDelta) > 130){
                if (auxiliaryPVSValues.newSpeedAux > 150) {
                    auxiliaryPVSValues.newSpeedAux -= lastPVSValues.lastSpeedPVS*0.10;
                }
            }else{
                auxiliaryPVSValues.newSpeedAux = lastPVSValues.lastSpeedPVS*0.10;
            }

            if (WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.accelerate_attribute) {
                if(!soundOff){
                    soundWidget.playSound(3); //accelerating song
                }
            }else if (WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.brake_attribute) {
                if(!soundOff){
                    soundWidget.pauseSound(3); //accelerating song
                }
            }else if (WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.idle_attribute){
                if(!soundOff){
                    soundWidget.pauseSound(3); //accelerating song
                }
            }
        }

        if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.posx_attribute][vehicle.posx_value]!=="0.0"){
            let currentPositionXPVS = WIDGETSTATE[vehicle.posx_attribute][vehicle.posx_value];
            let positionXValue = parseInt(currentPositionXPVS);
            if(!isNaN(positionXValue)){
                lastPVSValues.lastPosXPVS = Math.ceil(positionXValue);
            }
            auxiliaryPVSValues.newPositionXAux = lastPVSValues.lastPosXPVS;
        }

        auxiliaryPVSValues.vehicleCurrentDirectionAux = WIDGETSTATE!==null && WIDGETSTATE[vehicle.direction_attribute];
        if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.position_attribute][vehicle.position_value]!=="10.0"){
            let currentPositionPVS = WIDGETSTATE[vehicle.position_attribute][vehicle.position_value];
            let arrayPosition = currentPositionPVS.split("/");
            let positionValue = parseInt(arrayPosition[0])/parseInt(arrayPosition[1]);
            if(!isNaN(positionValue)){
                lastPVSValues.lastPositionPVS = Math.ceil(positionValue);
            }
            auxiliaryPVSValues.newPositionAux = lastPVSValues.lastPositionPVS;
        }

        switch (spritesImgsInformation.vehicleType) {
            case "airplane":
                if(spritesImgsInformation.vehicleIndex===2){
                    if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 50;
                        auxiliaryPVSValues.vehicleYPositionAux= 70;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 50;
                        auxiliaryPVSValues.vehicleYPositionAux= 70;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux = 50;
                        auxiliaryPVSValues.vehicleYPositionAux = 110;
                    }
                }else{
                    if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 110;
                        auxiliaryPVSValues.vehicleYPositionAux= 100;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 110;
                        auxiliaryPVSValues.vehicleYPositionAux= 100;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux = 110;
                        auxiliaryPVSValues.vehicleYPositionAux = 100;
                    }
                }
                break;
            case "bicycle":
                if(spritesImgsInformation.vehicleRealistic){
                    if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 135;
                        auxiliaryPVSValues.vehicleYPositionAux= 160;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 135;
                        auxiliaryPVSValues.vehicleYPositionAux= 160;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux = 135;
                        auxiliaryPVSValues.vehicleYPositionAux = 160;
                    }
                }else{
                    if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 140;
                        auxiliaryPVSValues.vehicleYPositionAux= 175;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 140;
                        auxiliaryPVSValues.vehicleYPositionAux= 175;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux = 140;
                        auxiliaryPVSValues.vehicleYPositionAux = 175;
                    }
                }
                break;
            case "car":
                if(spritesImgsInformation.vehicleRealistic){
                    if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 125;
                        auxiliaryPVSValues.vehicleYPositionAux= 180;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 125;
                        auxiliaryPVSValues.vehicleYPositionAux= 180;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux = 125;
                        auxiliaryPVSValues.vehicleYPositionAux = 180;
                    }
                }else{
                    if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 125;
                        auxiliaryPVSValues.vehicleYPositionAux= 190;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 125;
                        auxiliaryPVSValues.vehicleYPositionAux= 190;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux = 125;
                        auxiliaryPVSValues.vehicleYPositionAux = 190;
                    }
                }
                break;
            case "helicopter":
                if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                    auxiliaryPVSValues.vehicleXPositionAux= 70;
                    auxiliaryPVSValues.vehicleYPositionAux= 60;
                }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                    auxiliaryPVSValues.vehicleXPositionAux= 70;
                    auxiliaryPVSValues.vehicleYPositionAux= 60;
                }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                    auxiliaryPVSValues.vehicleXPositionAux = 100;
                    auxiliaryPVSValues.vehicleYPositionAux = 90;
                }
                break;
            case "motorbike":
                if(spritesImgsInformation.vehicleRealistic){
                    if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 130;
                        auxiliaryPVSValues.vehicleYPositionAux= 160;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 130;
                        auxiliaryPVSValues.vehicleYPositionAux= 160;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux = 130;
                        auxiliaryPVSValues.vehicleYPositionAux = 160;
                    }
                }else{
                    if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.left_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 120;
                        auxiliaryPVSValues.vehicleYPositionAux= 175;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.right_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux= 140;
                        auxiliaryPVSValues.vehicleYPositionAux= 175;
                    }else if(auxiliaryPVSValues.vehicleCurrentDirectionAux===vehicle.straight_attribute){
                        auxiliaryPVSValues.vehicleXPositionAux = 150;
                        auxiliaryPVSValues.vehicleYPositionAux = 175;
                    }
                }
                break;
        }

        return this;
    };

    /**
     * @function renderSimulatorFrame
     * @protected
     * @description RenderSimulatorFrame method of the Arcade widget. This method renders each frame during the simulation.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderSimulatorFrame = function () {

        // Sometimes it causes exceptions on console.log, but it is a bug in chrome browser
        // see more at: https://github.com/sampotts/plyr/issues/331
        if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.sound_attribute]===vehicle.mute_attribute){
            soundWidget.mute();
        }else if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.sound_attribute]===vehicle.unmute_attribute){
            soundWidget.reveal();
            soundWidget.unmute();
            soundWidget.pauseAll();
            soundWidget.playSound(2); //startup song
            soundWidget.playSound(0); //background song
            soundWidget.setVolume(0.4,0);
            soundWidget.onEndedSound(2,[
                {
                indexPlayNext: 1, //idle song
                newVolume: 1.0
                }
            ]);
        }

        if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.quit_attribute){ // Key 'q' ends current simulator
            canvasInformations.chronometer.stop();
            soundWidget.hide();
            clearInterval(intervals.simulatorInterval);
            intervals.splashInterval = setInterval(Arcade.prototype.renderSplashEndFrame, 30);
            soundWidget.pauseAll();
        }

        if(WIDGETSTATE!==null && WIDGETSTATE[vehicle.action_attribute]===vehicle.pause_attribute){ // Key 's' pauses current simulator
            canvasInformations.chronometer.pause();
            soundWidget.hide();
            clearInterval(intervals.simulatorInterval);
            intervals.splashInterval = setInterval(Arcade.prototype.renderSplashPauseFrame, 30);
            soundWidget.pauseAll();
        }

        // Clean screen
        //canvasInformations.context.fillStyle = "#dc9"; // rgb(221, 204, 153) matches first background color
        canvasInformations.context.fillStyle = "#76665d"; // rgb(139, 120, 106)
        canvasInformations.context.fillRect(0, 0, render.width, render.height);

        let carSprite = null;

        if(loadPVSSpeedPositions){
            // Using PVS results
            Arcade.prototype.calculateNewControllableCarPosition();
            carSprite = Arcade.prototype.setControllableCarPosition(auxiliaryPVSValues.vehicleCurrentDirectionAux, auxiliaryPVSValues.newSpeedAux, auxiliaryPVSValues.newPositionAux, auxiliaryPVSValues.newPositionXAux, auxiliaryPVSValues.vehicleXPositionAux, auxiliaryPVSValues.vehicleYPositionAux);
        }else{
            // Using only JS to update rendered vehicle
            carSprite = Arcade.prototype.updateControllableCar();
        }

        Arcade.prototype.drawBackground(-controllable_car.posx);

        let spriteBuffer = [];

        // Render the track
        let absoluteIndex = Math.floor(controllable_car.position / arcadeParams.trackSegmentSize);

        let currentSegmentIndex    = (absoluteIndex - 2) % track.length;
        let currentSegmentPosition = (absoluteIndex - 2) * arcadeParams.trackSegmentSize - controllable_car.position;
        let currentSegment         = track[currentSegmentIndex];

        let lastProjectedHeight     = Number.POSITIVE_INFINITY;
        let probedDepth             = 0;
        let counter                 = absoluteIndex % (2 * arcadeParams.numberOfSegmentPerColor); // for alternating color band

        let controllable_carPosSegmentHeight     = track[absoluteIndex % track.length].height;
        let controllable_carPosNextSegmentHeight = track[(absoluteIndex + 1) % track.length].height;
        let controllable_carPosRelative          = (controllable_car.position % arcadeParams.trackSegmentSize) / arcadeParams.trackSegmentSize;
        let controllable_carHeight               = render.camera_height + controllable_carPosSegmentHeight + (controllable_carPosNextSegmentHeight - controllable_carPosSegmentHeight) * controllable_carPosRelative;

        let baseOffset                 =  currentSegment.curve + (track[(currentSegmentIndex + 1) % track.length].curve - currentSegment.curve) * controllable_carPosRelative;

        lastDelta = controllable_car.posx - baseOffset*2;

        let iter = render.depthOfField;
        while (iter--) {
            // Next Segment:
            let nextSegmentIndex       = (currentSegmentIndex + 1) % track.length;
            let nextSegment            = track[nextSegmentIndex];

            let startProjectedHeight = Math.floor((controllable_carHeight - currentSegment.height) * render.camera_distance / (render.camera_distance + currentSegmentPosition));
            let startScaling         = 30 / (render.camera_distance + currentSegmentPosition);

            let endProjectedHeight   = Math.floor((controllable_carHeight - nextSegment.height) * render.camera_distance / (render.camera_distance + currentSegmentPosition + arcadeParams.trackSegmentSize));
            let endScaling           = 30 / (render.camera_distance + currentSegmentPosition + arcadeParams.trackSegmentSize);

            let currentHeight        = Math.min(lastProjectedHeight, startProjectedHeight);
            let currentScaling       = startScaling;

            if(currentHeight > endProjectedHeight){
                Arcade.prototype.setColorsCanvas(counter < arcadeParams.numberOfSegmentPerColor, readColorsJSON.grass1, readColorsJSON.border1, readColorsJSON.border2, readColorsJSON.outborder1, readColorsJSON.outborder_end1, readColorsJSON.track_segment1, readColorsJSON.lane1, readColorsJSON.lane2, readColorsJSON.laneArrow1);
                Arcade.prototype.drawSegment(
                    render.height / 2 + currentHeight,
                    currentScaling, currentSegment.curve - baseOffset - lastDelta * currentScaling,
                    render.height / 2 + endProjectedHeight,
                    endScaling,
                    nextSegment.curve - baseOffset - lastDelta * endScaling,
                    currentSegmentIndex === 2 || currentSegmentIndex === (arcadeParams.numIterations-render.depthOfField));
            }
            if(currentSegment.sprite){
                spriteBuffer.push(
                    {
                        y: render.height / 2 + startProjectedHeight,
                        x: render.width / 2 - currentSegment.sprite.pos * render.width * currentScaling + currentSegment.curve - baseOffset - (controllable_car.posx - baseOffset*2) * currentScaling,
                        ymax: render.height / 2 + lastProjectedHeight,
                        s: currentScaling,
                        i: currentSegment.sprite.type,
                        pos: currentSegment.sprite.pos,
                        obstacle: currentSegment.sprite.obstacle
                    }
                );
            }

            lastProjectedHeight    = currentHeight;

            probedDepth            = currentSegmentPosition;

            currentSegmentIndex    = nextSegmentIndex;
            currentSegment         = nextSegment;

            currentSegmentPosition += arcadeParams.trackSegmentSize;

            counter = (counter + 1) % (2 * arcadeParams.numberOfSegmentPerColor);
        }

        while((sptB = spriteBuffer.pop())!==undefined) {
            Arcade.prototype.drawSprite(sptB, null, null, null, null);
        }

        // Draw the car
        Arcade.prototype.drawSprite(null, carSprite.car, carSprite.x, carSprite.y, 1);

        lapInformation.currentPercentage = Math.round(absoluteIndex/(arcadeParams.numIterations-render.depthOfField)*100);

        if(WIDGETSTATE!==null){
            lapInformation.currentLapNumber = parseInt(WIDGETSTATE[vehicle.lap_attribute][vehicle.lap_value]);

            if(absoluteIndex >= arcadeParams.numIterations-render.depthOfField-1){
                if(lapInformation.currentLapNumber<=lapInformation.lapNumber && lapInformation.counterAux===0){
                    ButtonActionsQueue.queueGUIAction("new_lap", lapInformation.callback);
                }
                lapInformation.counterAux=1;
            }

            if(lapInformation.lastLapNumber===lapInformation.currentLapNumber-1){
                lapInformation.lastLapNumber=lapInformation.currentLapNumber;
                lapInformation.counterAux=0;
            }

            if(lapInformation.currentLapNumber===lapInformation.lapNumber){
                Arcade.prototype.drawText("1 Lap",{x: 10, y: 15}, 1);
                Arcade.prototype.drawText("To Go",{x: 10, y: 25}, 1);
            }

            if(lapInformation.currentLapNumber===lapInformation.lapNumber && lapInformation.currentPercentage>=100){
                clearInterval(intervals.simulatorInterval);
                Arcade.prototype.drawText("Simulation Ended!", {x: 90, y: 40}, 1);
                Arcade.prototype.drawText("Wait 5 Seconds To Reload", {x: 60, y: 60}, 1);
                Arcade.prototype.drawText("The Simulator", {x: 100, y: 70}, 1);
                soundWidget.pauseAll();

                // Delayed function call by 5 seconds to reload simulator
                setTimeout(function() { location.reload(); }, 5000);
            }
        }

        // Draw Header
        if(lapInformation.currentLapNumber<lapInformation.lapNumber){
            Arcade.prototype.drawText("Lap "+lapInformation.currentLapNumber+"/"+lapInformation.lapNumber,{x: 10, y: 1}, 1);
        }else{
            Arcade.prototype.drawText("Lap "+lapInformation.lapNumber+"/"+lapInformation.lapNumber,{x: 10, y: 1}, 1);
        }

        // lapInformation.currentPercentage = Math.round(absoluteIndex/(arcadeParams.numIterations-render.depthOfField)*100);
        if(lapInformation.currentPercentage>100){
            Arcade.prototype.drawText("Current Lap 100%",{x: 100, y: 1},1);
        }else{
            Arcade.prototype.drawText("Current Lap "+lapInformation.currentPercentage+"%",{x: 100, y: 1},1);
        }

        // Draw Virtual Speedometer and Tachometer based on Speedometer, Tachometer Widgets
        if(WIDGETSTATE!==null){
            if(WIDGETSTATE[vehicle.speed_attribute][vehicle.speed_value]!=="0"){
                let currentSpeedPVS = WIDGETSTATE[vehicle.speed_attribute][vehicle.speed_value];
                let arraySpeed = currentSpeedPVS.split("/");
                let speedValue = parseInt(arraySpeed[0])/parseInt(arraySpeed[1]);
                if(!isNaN(speedValue)){
                    lastPVSValues.lastSpeedPVS = Math.ceil(speedValue);
                }
                Arcade.prototype.drawText(""+lastPVSValues.lastSpeedPVS+" kmh", {x: 260, y: 1}, 1);
            }else{
                Arcade.prototype.drawText(""+0+" kmh", {x: 260, y: 1}, 1);
            }
            if(WIDGETSTATE.rpm!=="0"){
                let currentRPMPVS = WIDGETSTATE.rpm;
                let arrayRPM = currentRPMPVS.split("/");
                let rpmValue = parseInt(arrayRPM[0])/parseInt(arrayRPM[1]);
                if(!isNaN(rpmValue)){
                    lastPVSValues.lastRPMPVS = Math.ceil(rpmValue);
                }
                Arcade.prototype.drawText(""+lastPVSValues.lastRPMPVS+" rpm", {x: 260, y: 10}, 1);
            }else{
                Arcade.prototype.drawText(""+0+" rpm", {x: 260, y: 10}, 1);
            }
        }

        // Draw Lap Time
        let res = canvasInformations.time[0].split("-");
        canvasInformations.currentTimeString = res[0] + " h:" + canvasInformations.time[1] + " m:" + canvasInformations.time[2] + " s:" + canvasInformations.time[3] + " ms";
        Arcade.prototype.drawText(canvasInformations.currentTimeString, {x: 80, y: 15}, 1);

        // Draw Simulator Logo
        if(canvasInformations.showOfficialLogo){
            // canvasInformations.context.drawImage(simulatorLogos.simulatorLogo1,15,215,0.6*60,0.6*32);
            canvasInformations.context.drawImage(simulatorLogos.simulatorLogo2,15,215,0.6*60,0.6*32);
            // canvasInformations.context.drawImage(simulatorLogos.simulatorLogo1,10,225,0.4*60,0.4*32);
            // canvasInformations.context.drawImage(simulatorLogos.simulatorLogo2,10,225,0.4*60,0.4*32);
        }

        return this;
    };

    /**
     * @function detectBrowserType
     * @protected
     * @description DetectBrowserType method of the Arcade widget. This method detects current open Browser.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.detectBrowserType = function () {
        let userAgent = navigator.userAgent;
        if(userAgent.indexOf("Chrome") > -1) {
            currentBrowser.chrome = true;
        } else if (userAgent.indexOf("Safari") > -1) {
            currentBrowser.safari = true;
        } else if (userAgent.indexOf("Opera") > -1) {
            currentBrowser.opera = true;
        } else if (userAgent.indexOf("Firefox") > -1) {
            currentBrowser.mozilla = true;
        } else if (userAgent.indexOf("MSIE") > -1) {
            currentBrowser.msie = true;
        }
        return this;
    };

     /**
     * @function init
     * @protected
     * @description Init method of the Arcade widget. This method inits the canvas and adds the events onkeydown and onkeyup to capture the desired actions, i.e. accelerate, brake, etc.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.init = function () {
        canvasInformations.canvas = document.getElementById("arcadeSimulator");
        canvasInformations.context = canvasInformations.canvas.getContext('2d');
        return this;
    };

    /**
     * @function render
     * @public
     * @description Render method of the Arcade widget.
     * @param pvsState {Float} the new PVS state.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.render = function (pvsState) {
        WIDGETSTATE = pvsState;
        return this.reveal();
    };

    module.exports = Arcade;
});
