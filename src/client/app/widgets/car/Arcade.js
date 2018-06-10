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
 *                  // newLap_functionNamePVS: "new_lap",
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
 *                  // newLap_functionNamePVS: "new_lap",
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
 *                  // newLap_functionNamePVS: "new_lap",
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
     *          <li>newLap_functionNamePVS {String}: allows to set pvs function name for new lap. (default is "new_lap").</li>
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

        this.lastPVSValues = {
            lastSpeedPVS: null,
            lastRPMPVS: null,
            lastPositionPVS: 10,
            lastPosXPVS: 0
        };
    
        this.configurationFiles = {
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
    
        this.currentBrowser = { chrome: false, mozilla: false, opera: false, msie: false, safari: false};
    
        this.simulatorLogos = {
            simulatorLogo1: null,
            simulatorLogo2: null
        };

        this.spritesheetsImages = [];
        this.realPrefix="";
        this.readSprite=false;
        this.readConfiguration=false;
        this.readParams=false;
        this.sptB = null;

        // Coordinates of vehicle faced left and right in spritesheet, Coordinates of background in spritesheet, Coordinates of logo in spritesheet
        this.main_sprites = {
            vehicle_faced_left: null,
            vehicle_faced_right: null,
            background: null,
            logo: null,
        };
        this.vehicle_faced_front=null;
        this.spritesAvailable=[];

        // Information regarding the rendering process (what users will see/how the game is viewed)
        this.vehicle = { 
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
            unmute_attribute: {},
            newLap_functionNamePVS: {}
        };

        this.spritesImgsInformation = {
            vehicleType: null,
            vehicleRealistic: null,
            vehicleIndex: null,
            logoIndex: null,
            backgroundIndex: null
        };
    
        this.controllable_car=null;
        this.renderCanvas=null;
    
        this.arcadeParams = {
            laneWidth: null,
            numLanes: null,
            numberOfSegmentPerColor: null,
            trackParam: null,
            trackSegmentSize: null,
            numIterations: null
        };
    
        this.stripeConfiguration = {
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

        // Information regarding the PNG spritesheets with all objects and letters that allows the desired renderization
        this.spritesFiles;

        // Variables for calculating the vehicle's position, which will be provided as arguments to setControllabeCarPosition method
        this.auxiliaryPVSValues = {
            vehicleCurrentDirectionAux: null, 
            newSpeedAux: null, 
            newPositionAux: null, 
            newPositionXAux: null, 
            vehicleXPositionAux: null, 
            vehicleYPositionAux: null
        };

        this.canvasInformations = {
            showOfficialLogo: null, // Information regarding the visibility of the official logo
            canvas: null, //  Information regarding the canvas
            context: null, //  Information regarding the context of the above canvas (2D driving simulator)
            chronometer: null, //  Keep tracking controllable_car's lap time
            time: null, //  Keep tracking controllable_car's lap time
            currentTimeString: null //  Shows controllable_car's lap time
        };

        //  Tracking controllable_car's position
        this.lastDelta = 0;

        this.intervals = {
            splashInterval: null,
            simulatorInterval: null
        };
        this.loadingTrackNrIterations;

        // Information regarding the tracks (auxiliary for drawTrackLoop method) loaded from the JSON file
        this.track = [];

        // Information regarding the available sprites loaded from the JSON file
        this.spritesReadJSON = [];

        // Information regarding the number of laps of the present simulation
        this.lapInformation = {
            lapNumber: null,
            lastLapNumber: 1,
            currentLapNumber: 1,
            counterAux: 0,
            currentPercentage: 0,
            callback: null
        };

        this.arcadeColors = {
            grass: null,
            border: null,
            outborder: null,
            outborder_end: null,
            track_segment: null,
            lane: null,
            laneArrow: null
        };

        // Read from JSON configuration file
        this.readColorsJSON = {
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
      
        this.vehicle.newLap_functionNamePVS = {};
        this.vehicle.newLap_functionNamePVS = opt.newLap_functionNamePVS || "new_lap";

        this.vehicle.action_attribute = {};
        this.vehicle.action_attribute = opt.action_attribute || "action";

        this.vehicle.direction_attribute = {};
        this.vehicle.direction_attribute = opt.direction_attribute || "direction";

        this.vehicle.sound_attribute = {};
        this.vehicle.sound_attribute = opt.sound_attribute || "sound";

        this.vehicle.lap_attribute = {};
        this.vehicle.lap_attribute = opt.lap_attribute || "lap";

        this.vehicle.speed_attribute = {};
        this.vehicle.speed_attribute = opt.speed_attribute || "speed";

        this.vehicle.posx_attribute = {};
        this.vehicle.posx_attribute = opt.posx_attribute || "posx";

        this.vehicle.position_attribute = {};
        this.vehicle.position_attribute = opt.position_attribute || "position";

        this.vehicle.lap_value = {};
        this.vehicle.lap_value = opt.lap_value || "val";

        this.vehicle.speed_value = {};
        this.vehicle.speed_value = opt.speed_value || "val";

        this.vehicle.posx_value = {};
        this.vehicle.posx_value = opt.posx_value || "val";

        this.vehicle.position_value = {};
        this.vehicle.position_value = opt.position_value || "val";

        this.vehicle.left_attribute = {};
        this.vehicle.left_attribute = opt.left_attribute || "left";

        this.vehicle.right_attribute = {};
        this.vehicle.right_attribute = opt.right_attribute || "right";

        this.vehicle.straight_attribute = {};
        this.vehicle.straight_attribute = opt.straight_attribute || "straight";

        this.vehicle.accelerate_attribute = {};
        this.vehicle.accelerate_attribute = opt.accelerate_attribute || "acc";

        this.vehicle.brake_attribute = {};
        this.vehicle.brake_attribute = opt.brake_attribute || "brake";
        
        this.vehicle.idle_attribute = {};
        this.vehicle.idle_attribute = opt.idle_attribute || "idle";

        this.vehicle.quit_attribute = {};
        this.vehicle.quit_attribute = opt.quit_attribute || "quit";

        this.vehicle.pause_attribute = {};
        this.vehicle.pause_attribute = opt.pause_attribute || "pause";

        this.vehicle.resume_attribute = {};
        this.vehicle.resume_attribute = opt.resume_attribute || "resume";

        this.vehicle.mute_attribute = {};
        this.vehicle.mute_attribute = opt.mute_attribute || "mute";

        this.vehicle.unmute_attribute = {};
        this.vehicle.unmute_attribute = opt.unmute_attribute ||"unmute";

        this.id = id;
        this.top = coords.top || 100;
        this.left = coords.left || 700;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.WIDGETSTATE = null;
        this.WIDGETID = this.id;
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

        this.lapInformation.lapNumber = this.lapNumber;

        this.stripeConfiguration.trackP1=this.stripePositions.trackP1;
        this.stripeConfiguration.trackP2=this.stripePositions.trackP2;
        this.stripeConfiguration.borderWidth=this.stripePositions.borderWidth;
        this.stripeConfiguration.inOutBorderWidth=this.stripePositions.inOutBorderWidth;
        this.stripeConfiguration.landscapeOutBorderWidth=this.stripePositions.landscapeOutBorderWidth;
        this.stripeConfiguration.diffTrackBorder=this.stripePositions.diffTrackBorder;
        this.stripeConfiguration.borderP1=this.stripeConfiguration.trackP1-this.stripeConfiguration.diffTrackBorder;
        this.stripeConfiguration.borderP2=this.stripeConfiguration.trackP1-this.stripeConfiguration.diffTrackBorder+this.stripeConfiguration.borderWidth;
        this.stripeConfiguration.inBorderP1=this.stripeConfiguration.borderP2;
        this.stripeConfiguration.inBorderP2=this.stripeConfiguration.borderP2+this.stripeConfiguration.inOutBorderWidth;
        this.stripeConfiguration.outBorderP1=this.stripeConfiguration.borderP1;
        this.stripeConfiguration.outBorderP2=this.stripeConfiguration.borderP1-this.stripeConfiguration.inOutBorderWidth;
        this.stripeConfiguration.landscapeOutBorderP1=this.stripeConfiguration.outBorderP2-this.stripeConfiguration.landscapeOutBorderWidth;
        this.stripeConfiguration.landscapeOutBorderP2=this.stripeConfiguration.outBorderP2;

        this.stripeConfiguration.finishLineP1=this.stripePositions.finishLineP1;
        this.stripeConfiguration.finishLineP2=this.stripePositions.finishLineP2;
        this.stripeConfiguration.diffLanesFinishLine=this.stripePositions.diffLanesFinishLine;
        this.stripeConfiguration.laneP1=this.stripeConfiguration.finishLineP1;
        this.stripeConfiguration.laneP2=this.stripeConfiguration.finishLineP1+this.stripeConfiguration.diffLanesFinishLine;
        this.stripeConfiguration.laneP3=this.stripeConfiguration.laneP2+this.stripeConfiguration.diffLanesFinishLine;
        this.stripeConfiguration.laneP4=this.stripeConfiguration.laneP3+this.stripeConfiguration.diffLanesFinishLine;
        this.stripeConfiguration.laneP5=this.stripeConfiguration.laneP4+this.stripeConfiguration.diffLanesFinishLine;
        this.stripeConfiguration.laneP6=this.stripeConfiguration.laneP5+this.stripeConfiguration.diffLanesFinishLine;
        this.stripeConfiguration.laneP7=this.stripeConfiguration.laneP6+this.stripeConfiguration.diffLanesFinishLine;
        this.stripeConfiguration.laneP8=this.stripeConfiguration.laneP7+this.stripeConfiguration.diffLanesFinishLine;

        this.spritesImgsInformation.vehicleType = this.vehicle;
        this.spritesImgsInformation.vehicleRealistic = this.realisticImgs;
        this.spritesImgsInformation.vehicleIndex = this.vehicleImgIndex;
        this.spritesImgsInformation.logoIndex = this.logoImgIndex;
        this.spritesImgsInformation.backgroundIndex = this.backgroundImgIndex;
        this.canvasInformations.showOfficialLogo = this.showOfficialLogo;

        // Loading track and spritesheet based on trackFilename and spritesFilename options
        let _this = this;
        require([this.trackFilename], function(track) {
            _this.div.append("div").attr("id", "track_file_loaded_opt_field_"+_this.WIDGETID).style("visibility","hidden").text(track);
            return _this;
        });

        require([this.spritesFilename], function(spritesheet) {
            _this.div.append("div").attr("id", "spritesheet_file_loaded_opt_field_"+_this.WIDGETID).style("visibility","hidden").text(spritesheet);
            return _this;
        });

        // Set of tracks built with TrackGenerator widget using trackLayout opt field
        this.configurationFiles.trackLayout1Predefined = require("text!widgets/car/configurations/trackLayout1.json");
        this.configurationFiles.trackLayout2Predefined = require("text!widgets/car/configurations/trackLayout2.json");
        this.configurationFiles.trackLayout3Predefined = require("text!widgets/car/configurations/trackLayout3.json");
        this.configurationFiles.trackLayout4Predefined = require("text!widgets/car/configurations/trackLayout4.json");
        this.configurationFiles.trackLayout5Predefined = require("text!widgets/car/configurations/trackLayout5.json");
        this.configurationFiles.trackLayout6Predefined = require("text!widgets/car/configurations/trackLayout6.json");
        this.configurationFiles.trackLayout7Predefined = require("text!widgets/car/configurations/trackLayout7.json");
        this.configurationFiles.trackLayout8Predefined = require("text!widgets/car/configurations/trackLayout8.json");
        this.configurationFiles.trackLayout9Predefined = require("text!widgets/car/configurations/trackLayout9.json");

        // Requiring predefined JSON files
        this.configurationFiles.trackStraightJSONPredefined = require("text!widgets/car/configurations/track-straight-random.json");
        this.configurationFiles.trackCurvesSlopesJSONPredefined = require("text!widgets/car/configurations/track-curves-slopes-random.json");
        this.configurationFiles.spritesheetJSONPredefined = require("text!widgets/car/configurations/spritesheet.json");

        this.div = d3.select(this.parent)
                        .attr("class","container game_view")
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px")
                        .style("width", this.width + "px")
                        .style("height", this.height + "px");
                        // .style("border", "5px solid black");

        this.div.append("canvas").attr("id", "arcadeSimulator_"+this.id)
                .style("-webkit-transform","scale(2.4)")
                .style("margin-top", "170px")
                .style("margin-left", "215px");

        this.soundWidget = new Sound("soundWidget_"+this.id, {
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

        this.soundWidget.hide();
        this.soundOff = this.soundWidget.getSoundOff();

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;
        this.lapInformation.callback = this.callback;

        Widget.call(this, id, coords, opt);

        return this;
    }

    Arcade.prototype = Object.create(Widget.prototype);
    Arcade.prototype.constructor = Arcade;
    Arcade.prototype.parentClass = Widget.prototype;

    /**
     * @function startSimulation
     * @public
     * @description StartSimulation method of the Arcade widget. This method sets timeout to load all configuration files provided as opt fields (dynamic require).
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.startSimulation = function () {
        // Solution derived from https://stackoverflow.com/questions/2749244/javascript-setinterval-and-this-solution
        
        // this.intervalID = setInterval(
        //     (function(self) {         //Self-executing func which takes 'this' as self
        //         return function() {   //Return a function in the context of 'self'
        //             self.retrieve_rate(); //Thing you wanted to run as non-window 'this'
        //         }
        //     })(this),
        //     this.INTERVAL     //normal interval, 'this' scope not impacted here.
        // ); 

        setTimeout(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() {   //Return a function in the context of 'self'
                    self.startSimulationAux(); //Thing you wanted to run as non-window 'this'
                }
            })(this),
            50     //normal interval, 'this' scope not impacted here.
        ); 
    };

    /**
     * @function startSimulationAux
     * @public
     * @description StartSimulationAux method of the Arcade widget. This method loads the desired JSON Files and starts the corresponding simulation.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.startSimulationAux = function () { 
        if(this.predefinedTracks!==null){
            switch(this.predefinedTracks){
                case 1:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout1Predefined;
                    break;
                case 2:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout2Predefined;
                    break;
                case 3:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout3Predefined;
                    break;
                case 4:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout4Predefined;
                    break;
                case 5:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout5Predefined;
                    break;
                case 6:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout6Predefined;
                    break;
                case 7:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout7Predefined;
                    break;
                case 8:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout8Predefined;
                    break;
                case 9:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackLayout9Predefined;
                    break;
                case -1:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackStraightJSONPredefined;
                    break;
                case -2:
                    this.configurationFiles.trackJSON = this.configurationFiles.trackCurvesSlopesJSONPredefined;
                    break;
            }
            this.configurationFiles.spritesheetJSON = document.getElementById("spritesheet_file_loaded_opt_field_"+this.WIDGETID).innerHTML;
        }else{
            this.configurationFiles.trackJSON = document.getElementById("track_file_loaded_opt_field_"+this.WIDGETID).innerHTML;
            this.configurationFiles.spritesheetJSON = document.getElementById("spritesheet_file_loaded_opt_field_"+this.WIDGETID).innerHTML;
        }
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
            this.currentBrowser.chrome = true;
        } else if (userAgent.indexOf("Safari") > -1) {
            this.currentBrowser.safari = true;
        } else if (userAgent.indexOf("Opera") > -1) {
            this.currentBrowser.opera = true;
        } else if (userAgent.indexOf("Firefox") > -1) {
            this.currentBrowser.mozilla = true;
        } else if (userAgent.indexOf("MSIE") > -1) {
            this.currentBrowser.msie = true;
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
        this.canvasInformations.canvas = document.getElementById("arcadeSimulator_"+this.WIDGETID);
        this.canvasInformations.context = this.canvasInformations.canvas.getContext('2d');
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
        this.WIDGETSTATE = pvsState;
        return this.reveal();
    };

    module.exports = Arcade;
});
