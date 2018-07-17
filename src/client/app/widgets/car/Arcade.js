/**
 * @module Arcade
 * @version 2.0.0
 * @author José Carlos
 * @desc This module draws the 2D arcade driving simulator, using HTML5 Canvas.
 *
 * @date Apr 02, 2018
 * last modified @date Jun 16, 2018
 *
 * @example <caption>Usage of API to create a new simulation within a PVSio-web demo, after creating a track with curves and slopes, and using a car as a vehicle.
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
 *               { parent: 'content',
 *                 scaleWindow: 2.2, // scales canvas div
 *                 trackFilename: "track-curves-slopes", // "track-straight", // defines track configuration filename, which is "track-curves-slopes.json" by default
 *                 spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                 spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
 *                 realisticImgs: false,
 *                 useVehicle: true,
 *                 vehicle: "car", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
 *                 vehicleImgIndex: 2, // defines vehicle sprite image suffix
 *                 // logoImgIndex: 1, // defines logo sprite image suffix
 *                 // backgroundImgIndex: 1, // defines background sprite image suffix
 *                 stripePositions: {
 *                    trackP1: -0.55,
 *                    trackP2: 0.55,
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
 *               }// append on div 'content'
 *           );
 *
 *          // Starts the simulation using constructor's opt fields (arguments)
 *          arcade.startSimulation();
 *
 *          // Render the Arcade widget, updating Widget status with PVS status (vehicle position, posx and speed)
 *          // This API will be called by onMessageReceived callback, which processes PVS status within a PVSio-web demo, so
 *          // each new pvs status can be propagated to the widget.
 *          // 'res' is provided by the function that automatically is invoked by PVSio-web when the back-end sends states updates, i.e.,
 *          // 'res' has the latest pvs state.
 *          arcade.render(res);
 *     }
 * });
 *
 * @example <caption>Usage of API to create a new simulation within a PVSio-web demo, after creating a track with only straight lines, and using a helicopter as a vehicle.
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
 *               { parent: 'content',
 *                 scaleWindow: 2.2, // scales canvas div
 *                 trackFilename: "track-straight", // "track-curves-slopes", // defines track configuration filename, which is "track-curves-slopes.json" by default
 *                 spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                 spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
 *                 realisticImgs: false,
 *                 useVehicle: true,
 *                 vehicle: "helicopter", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
 *                 vehicleImgIndex: 1, // defines vehicle sprite image suffix
 *                 // logoImgIndex: 1, // defines logo sprite image suffix
 *                 // backgroundImgIndex: 1, // defines background sprite image suffix
 *                 stripePositions: {
 *                    trackP1: -0.55,
 *                    trackP2: 0.55,
 *                    borderWidth: 0.08,
 *                    inOutBorderWidth: 0.02,
 *                    landscapeOutBorderWidth: 0.13,
 *                    diffTrackBorder: 0.05,
 *                    finishLineP1: -0.40,
 *                    finishLineP2: 0.40,
 *                    diffLanesFinishLine: 0.05
 *                  },
 *                  // lapNumber: 2, // By default is 0, i.e. infinit loop
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
 *               }// append on div 'content'
 *           );
 *
 *          // Starts the simulation using constructor's opt fields (arguments)
 *          arcade.startSimulation();
 *
 *          // Render the Arcade widget, updating Widget status with PVS status (vehicle position, posx and speed)
 *          // This API will be called by onMessageReceived callback, which processes PVS status within a PVSio-web demo, so
 *          // each new pvs status can be propagated to the widget.
 *          // 'res' is provided by the function that automatically is invoked by PVSio-web when the back-end sends states updates, i.e.,
 *          // 'res' has the latest pvs state.
 *          arcade.render(res);
 *     }
 * });
 *
 *
 * @example <caption>Usage of other public API's of Arcade Widget.</caption>
 *
 *  Using variable Arcade created in the previous example is also possible to call the following,
 *
 *       // Hides the Arcade widget.
 *       arcade.hide();
 *
 *       // Reveals the Arcade widget.
 *       arcade.reveal();
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
     * @param [opt.parent] {String} the HTML element where the display will be appended (default is "body").
	 * @param [opt.scaleWindow] {Float} the scale to be set on canvas (default is 2.2).
	 * @param [opt.trackFilename] {String} the track configuration filename, i.e. JSON file with the track that will be drawed as well as the required sprite coordinates, etc (default is "track").
	 * @param [opt.spritesFilename] {String} the spritesheet configuration filename, i.e. JSON file with the all available sprites, whose coordinates are the same in trackFilename, i.e. the track must have been generated with this JSON as well so the coordinates will match (default is "spritesheet").
	 * @param [opt.spritesFiles] {Array} array with spritesheets(images) names (default is ["spritesheet","spritesheet.text"]).
	 * @param [opt.vehicleImgIndex] {Int} number placed as suffix in the JSON file with the sprite of the vehicle image (front, left side, right side) (default is null).
	 * @param [opt.logoImgIndex] {Int} number placed as suffix in the JSON file with the sprite of the logo image (default is null).
	 * @param [opt.backgroundImgIndex] {Int} number placed as suffix in the JSON file with the sprite of the background image (default is null).
	 * @param [opt.realisticImgs] {Bool} value that indicates if the sprite of the vehicle to be used is a realistic image or if it is a pixelated image as in arcade games (default is "false").
	 * @param [opt.useVehicle] {Bool} value that indicates if arcade will display a sprite of the vehicle (default is true).
	 * @param [opt.vehicle] {String} the type of vehicle to be used in the simulation. The types available are ["airplane", "bicycle", "car", "helicopter", "motorbike"]. It should be noted that these types must exist in the spritesheet if they are to be used. (default is "car").
	 * @param [opt.stripePositions] {Object} position values and respective widths (borders, track and finish line) to be rendered on a stripe. (default is { trackP1: -0.55, trackP2: 0.55, borderWidth: 0.08, inOutBorderWidth: 0.02, landscapeOutBorderWidth: 0.13, diffTrackBorder: 0.05, finishLineP1: -0.40, finishLineP2: 0.40, diffLanesFinishLine: 0.05 }).
	 * @param [opt.lapNumber] {Int} the number of desired laps in the simulation (default is 2 laps).
	 * @param [opt.showOfficialLogo] {Bool} the option to render extra image, on the bottom-left corner, which is the PVSio-web logo created in this thesis (default is false).
	 * @param [opt.loadPVSSpeedPositions] {Bool} allows to use PVS calculated positions and speed in the simulation. (default is true).
	 * @param [opt.predefinedTracks] {Int} allows to use predefined tracks, present on JSON files with filename "trackLayout"+predefined+".json", in car/configurations/ directory. (default is null).
	 * @param [opt.newLap_functionNamePVS] {String} allows to set pvs function name for new lap. (default is "new_lap").
	 * @param [opt.action_attribute] {String} allows to set pvs attribute name for action. (default is "action").
	 * @param [opt.direction_attribute] {String} allows to set pvs attribute name for direction. (default is "direction").
	 * @param [opt.sound_attribute] {String} allows to set pvs attribute name for sound. (default is "sound").
	 * @param [opt.lap_attribute] {String} allows to set pvs attribute name for lap. (default is "lap").
	 * @param [opt.speed_attribute] {String} allows to set pvs attribute name for speed. (default is "speed").
	 * @param [opt.posx_attribute] {String} allows to set pvs attribute name for posx. (default is "posx").
	 * @param [opt.position_attribute] {String} allows to set pvs attribute name for position. (default is "position").
	 * @param [opt.lap_value] {String} allows to set pvs val name for lap attribute. (default is "val").
	 * @param [opt.speed_value] {String} allows to set pvs val name for speed attribute. (default is "val").
	 * @param [opt.posx_value] {String} allows to set pvs val name for posx attribute. (default is "val").
	 * @param [opt.position_value] {String} allows to set pvs val name for position attribute. (default is "val").
	 * @param [opt.left_attribute] {String} allows to set pvs attribute name for left direction. (default is "left").
	 * @param [opt.right_attribute] {String} allows to set pvs attribute name for right direction. (default is "right").
	 * @param [opt.accelerate_attribute] {String} allows to set pvs attribute name for accelerate action. (default is "acc").
	 * @param [opt.brake_attribute] {String} allows to set pvs attribute name for brake action. (default is "brake").
	 * @param [opt.idle_attribute] {String} allows to set pvs attribute name for idle action. (default is "idle").
	 * @param [opt.quit_attribute] {String} allows to set pvs attribute name for quit action. (default is "quit").
	 * @param [opt.pause_attribute] {String} allows to set pvs attribute name for pause action. (default is "pause").
	 * @param [opt.resume_attribute] {String} allows to set pvs attribute name for resume action. (default is "resume").
	 * @param [opt.mute_attribute] {String} allows to set pvs attribute name for mute sound. (default is "mute").
	 * @param [opt.unmute_attribute] {String} allows to set pvs attribute name for unmute sound. (default is "unmute").
   	 * @returns {Arcade} The created instance of the widget Arcade.
     * @memberof module:Arcade
     * @instance
     */
    function Arcade(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent;
        opt.trackFilename = opt.trackFilename;
        opt.spritesFilename = opt.spritesFilename;
        opt.spritesFiles =  opt.spritesFiles;
        opt.vehicleImgIndex = opt.vehicleImgIndex;
        opt.logoImgIndex = opt.logoImgIndex;
        opt.backgroundImgIndex = opt.backgroundImgIndex;
        opt.realisticImgs = opt.realisticImgs;
        opt.useVehicle = opt.useVehicle;
        opt.vehicle = opt.vehicle;
        opt.stripePositions = opt.stripePositions;
        opt.showOfficialLogo = opt.showOfficialLogo;
        opt.lapNumber = opt.lapNumber;
        opt.loadPVSSpeedPositions = opt.loadPVSSpeedPositions;
        opt.predefinedTracks = opt.predefinedTracks;
        opt.scaleWindow = opt.scaleWindow;

        this.lastPVSValues = {
        	lastSoundPVS: null,
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
    
        this.controllable_vehicle=null;

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
            chronometer: null, //  Keep tracking controllable_vehicle's lap time
            time: null, //  Keep tracking controllable_vehicle's lap time
            currentTimeString: null //  Shows controllable_vehicle's lap time
        };

        //  Tracking controllable_vehicle's position
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
       
        this.id     = id;
        this.top    = (coords.top!==undefined) ? coords.top : 100;
        this.left   = (coords.left!==undefined) ? coords.left : 700;
        this.width  = (coords.width!==undefined) ? coords.width : 700;
        this.height = (coords.height!==undefined) ? coords.height : 500;

        this.WIDGETSTATE = null;
        this.WIDGETID = this.id;

        this.trackFilename = (opt.trackFilename) ? ("text!widgets/car/configurations/" + opt.trackFilename + ".json") : "text!widgets/car/configurations/track-curves-slopes-random.json";
        this.spritesFilename = (opt.spritesFilename) ? ("text!widgets/car/configurations/" + opt.spritesFilename + ".json") : "text!widgets/car/configurations/spritesheet.json";
        this.spritesFiles = (opt.spritesFiles) ? opt.spritesFiles : ["spritesheet","spritesheet.text"];
        this.spritesImgsInformation.vehicleIndex = (opt.vehicleImgIndex) ? opt.vehicleImgIndex : null;
        this.spritesImgsInformation.logoIndex = (opt.logoImgIndex) ? opt.logoImgIndex : null;
        this.spritesImgsInformation.backgroundIndex = (opt.backgroundImgIndex) ? opt.backgroundImgIndex : null;
        this.spritesImgsInformation.vehicleRealistic = (opt.realisticImgs) ? opt.realisticImgs : false;
        this.spritesImgsInformation.vehicleType = (opt.vehicle) ? opt.vehicle : "car"; // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
        this.stripePositions = (opt.stripePositions) ? opt.stripePositions : { trackP1: -0.55, trackP2: 0.55, borderWidth: 0.08, inOutBorderWidth: 0.02, landscapeOutBorderWidth: 0.13, diffTrackBorder: 0.05, finishLineP1: -0.40, finishLineP2: 0.40, diffLanesFinishLine: 0.05 };
        this.canvasInformations.showOfficialLogo = (opt.showOfficialLogo) ? opt.showOfficialLogo : false;
        this.lapNumber = (opt.lapNumber) ? opt.lapNumber : 0;
        this.loadPVSSpeedPositions = (opt.loadPVSSpeedPositions) ? opt.loadPVSSpeedPositions : true;
        this.predefinedTracks = (opt.predefinedTracks) ? opt.predefinedTracks : null;

        this.lapInformation.lapNumber = this.lapNumber;
        this.useVehicle = (!opt.useVehicle) ? opt.useVehicle : true;

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

        this.scaleWindow = (opt.scaleWindow) ? (opt.scaleWindow) : 1;
		this.parent = (opt.parent) ? ("#" + opt.parent) : "body";

        this.div = d3.select(this.parent).append("div").attr("id", "game_window_"+this.WIDGETID);

        this.div.append("canvas").attr("id", "arcadeSimulator_"+this.id)
                .style("-webkit-transform","scale("+this.scaleWindow+")")
                .style("position", "absolute")
                .style("top", this.top + "px")
                .style("left", this.left + "px")
                .style("width", this.width + "px")
                .style("height", this.height + "px");

        this.soundWidget = new Sound("soundWidget_"+this.id, {
            top: (this.top+350),
            left: (this.left-230),
            width: 750,
            height: 750
        }, {
            parent: this.parent.slice(1), // removing '#'
            callback: opt.callback,
            invokePVS: true,
            mute_functionNamePVS: "mute",
            unmute_functionNamePVS: "unmute",
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

        this.soundWidget.startSound();
        this.soundWidget.hide();
        this.soundOff = this.soundWidget.getSoundOff();

        if(this.soundOff){
            this.lastPVSValues.lastSoundPVS = this.vehicle.mute_attribute;
        }else{
            this.lastPVSValues.lastSoundPVS = this.vehicle.unmute_attribute;
        }

        // ----------- STATIC TO REMOVE --------------------
        this.lap = 1;
        this.numLaps = 3;
                
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
        setTimeout(
            (function(self) {
                return function() {   
                    self.startSimulationAux();
                }
            })(this),
            250 
        ); 
        return this;
    };

    /**
     * @function startSimulationAux
     * @private
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
            this.configurationFiles.spritesheetJSON = d3.select("#spritesheet_file_loaded_opt_field_"+this.WIDGETID)[0][0].innerHTML;
        }else{
            this.configurationFiles.trackJSON = d3.select("#track_file_loaded_opt_field_"+this.WIDGETID)[0][0].innerHTML;
            this.configurationFiles.spritesheetJSON = d3.select("#spritesheet_file_loaded_opt_field_"+this.WIDGETID)[0][0].innerHTML;
        }
        if(this.configurationFiles.trackJSON){
            let aux = JSON.parse(this.configurationFiles.trackJSON);
            this.controllable_vehicle=aux.controllable_vehicle;
            this.arcadeParams.laneWidth=aux.laneWidth;
            this.arcadeParams.numLanes=aux.numLanes;
            this.arcadeParams.numberOfSegmentPerColor=aux.numberOfSegmentPerColor;
            this.renderCanvas=aux.render;
            this.arcadeParams.trackParam=aux.trackParam;
            this.arcadeParams.trackSegmentSize=aux.trackSegmentSize;
            this.readColorsJSON.grass1=aux.trackColors.grass1;
            this.readColorsJSON.border1=aux.trackColors.border1;
            this.readColorsJSON.border2=aux.trackColors.border2;
            this.readColorsJSON.outborder1=aux.trackColors.outborder1;
            this.readColorsJSON.outborder_end1=aux.trackColors.outborder_end1;
            this.readColorsJSON.track_segment1=aux.trackColors.track_segment1;
            this.readColorsJSON.lane1=aux.trackColors.lane1;
            this.readColorsJSON.lane2=aux.trackColors.lane2;
            this.readColorsJSON.laneArrow1=aux.trackColors.laneArrow1;
            this.readColorsJSON.track_segment_end=aux.trackColors.track_segment_end;
            this.readColorsJSON.lane_end=aux.trackColors.lane_end;
            this.renderCanvas.width=this.width;
            this.renderCanvas.height=this.height;
            this.readParams=true;
            this.track=aux.track;
            this.readConfiguration=true;
        }

        let backgroundRegex, logoRegex, frontRegex, leftRegex, rightRegex;

        if(this.spritesImgsInformation.vehicleRealistic){
            this.realPrefix="real_";
        }else{
            this.realPrefix="";
        }

        if(this.spritesImgsInformation.backgroundIndex!==null){
            backgroundRegex = new RegExp("^"+this.realPrefix+"background"+this.spritesImgsInformation.backgroundIndex+"$");
        }else{
            backgroundRegex = new RegExp("^"+this.realPrefix+"background");
        }

        if(this.spritesImgsInformation.logoIndex!==null){
            logoRegex   = new RegExp("^"+this.realPrefix+"logo"+this.spritesImgsInformation.logoIndex+"$");
        }else{
            logoRegex   = new RegExp("^"+this.realPrefix+"logo$");
        }

		if(this.spritesImgsInformation.vehicleIndex!==null){
            frontRegex      = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+this.spritesImgsInformation.vehicleIndex+"_faced_front$");
            leftRegex       = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+this.spritesImgsInformation.vehicleIndex+"_faced_left$");
            rightRegex      = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+this.spritesImgsInformation.vehicleIndex+"_faced_right$");
        }else{
            frontRegex      = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+"_faced_front$");
            leftRegex       = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+"_faced_left$");
            rightRegex      = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+"_faced_right$");
        }

        if(this.configurationFiles.spritesheetJSON){
		    this.spritesReadJSON = JSON.parse(this.configurationFiles.spritesheetJSON);
		    // Reading all JSON Sprites Available
		    for(let k=0;k<this.spritesReadJSON.frames.length;k++){
		        this.spritesAvailable[k]={
		            name:this.spritesReadJSON.frames[k].filename.split(".")[0],
		            value:this.spritesReadJSON.frames[k].frame
		        };
		        if(this.spritesAvailable[k].name.match(backgroundRegex)){
		            this.main_sprites.background = this.spritesAvailable[k].value;
		        }
		        if(this.spritesAvailable[k].name.match(logoRegex)){
		            this.main_sprites.logo = this.spritesAvailable[k].value;
		        }
		        if(this.spritesAvailable[k].name.match(frontRegex)){
		            this.vehicle_faced_front = this.spritesAvailable[k].value;
		        }
		        if(this.spritesAvailable[k].name.match(leftRegex)){
		            this.main_sprites.vehicle_faced_left = this.spritesAvailable[k].value;
		        }
		        if(this.spritesAvailable[k].name.match(rightRegex)){
		            this.main_sprites.vehicle_faced_right = this.spritesAvailable[k].value;
		        }
		    }

		    if(this.main_sprites.background===undefined || this.main_sprites.background===null){
                if(this.spritesImgsInformation.vehicleRealistic){
                    if(this.spritesImgsInformation.backgroundIndex!==null){ // realistic image with that index does not exist
                        backgroundRegex = new RegExp("^"+this.realPrefix+"background$");
                    }else{  // realistic image does not exist
                        backgroundRegex = new RegExp("^background");
                    }
                }else{
                    backgroundRegex = new RegExp("^background");
                }

                for(let k=0;k<this.spritesReadJSON.frames.length;k++){
                    this.spritesAvailable[k]={
                        name:this.spritesReadJSON.frames[k].filename.split(".")[0],
                        value:this.spritesReadJSON.frames[k].frame
                    };
                    if(this.spritesAvailable[k].name.match(backgroundRegex)){
                        this.main_sprites.background = this.spritesAvailable[k].value;
                    }
                }
            }

            if(this.main_sprites.logo===undefined || this.main_sprites.logo===null){
                if(this.spritesImgsInformation.vehicleRealistic){
                    if(this.spritesImgsInformation.logoIndex!==null){
                        logoRegex   = new RegExp("^"+this.realPrefix+"logo$");
                    }else{
                        logoRegex   = new RegExp("^logo$");
                    }
                }else{
                    logoRegex   = new RegExp("^logo$");
                }

                for(let k=0;k<this.spritesReadJSON.frames.length;k++){
                    this.spritesAvailable[k]={
                        name:this.spritesReadJSON.frames[k].filename.split(".")[0],
                        value:this.spritesReadJSON.frames[k].frame
                    };
                    if(this.spritesAvailable[k].name.match(logoRegex)){
                        this.main_sprites.logo = this.spritesAvailable[k].value;
                    }
                }
            }

            if(this.vehicle_faced_front===undefined || this.main_sprites.vehicle_faced_left===undefined || this.main_sprites.vehicle_faced_right===undefined || this.vehicle_faced_front===null || this.main_sprites.vehicle_faced_left===null || this.main_sprites.vehicle_faced_right===null){
                if(this.spritesImgsInformation.vehicleRealistic){
                    if(this.spritesImgsInformation.vehicleIndex!==null){ // Realistic image with index does not exist
                        frontRegex      = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+"_faced_front$");
                        leftRegex       = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+"_faced_left$");
                        rightRegex      = new RegExp("^"+this.realPrefix+this.spritesImgsInformation.vehicleType+"_faced_right$");
                    }else{ // Realistic image without index does not exist
                        frontRegex      = new RegExp("^"+this.spritesImgsInformation.vehicleType+"_faced_front$");
                        leftRegex       = new RegExp("^"+this.spritesImgsInformation.vehicleType+"_faced_left$");
                        rightRegex      = new RegExp("^"+this.spritesImgsInformation.vehicleType+"_faced_right$");
                    }
                }
                else{
                    frontRegex      = new RegExp("^"+this.spritesImgsInformation.vehicleType+"_faced_front$");
                    leftRegex       = new RegExp("^"+this.spritesImgsInformation.vehicleType+"_faced_left$");
                    rightRegex      = new RegExp("^"+this.spritesImgsInformation.vehicleType+"_faced_right$");
                }

                for(let k=0;k<this.spritesReadJSON.frames.length;k++){
                    this.spritesAvailable[k]={
                        name:this.spritesReadJSON.frames[k].filename.split(".")[0],
                        value:this.spritesReadJSON.frames[k].frame
                    };
                    if(this.spritesAvailable[k].name.match(frontRegex)){
                        this.vehicle_faced_front = this.spritesAvailable[k].value;
                    }
                    if(this.spritesAvailable[k].name.match(leftRegex)){
                        this.main_sprites.vehicle_faced_left = this.spritesAvailable[k].value;
                    }
                    if(this.spritesAvailable[k].name.match(rightRegex)){
                        this.main_sprites.vehicle_faced_right = this.spritesAvailable[k].value;
                    }
                }
            }

            if(this.main_sprites.background!==undefined && this.main_sprites.logo!==undefined && this.vehicle_faced_front!==undefined && this.main_sprites.vehicle_faced_left!==undefined && this.main_sprites.vehicle_faced_right!==undefined && this.main_sprites.background!==null && this.main_sprites.logo!==null && this.vehicle_faced_front!==null && this.main_sprites.vehicle_faced_left!==null && this.main_sprites.vehicle_faced_right!==null){
                this.readSprite=true;
            }else{
                for(let k=0;k<this.spritesReadJSON.frames.length;k++){
                    this.spritesAvailable[k]={
                        name:this.spritesReadJSON.frames[k].filename.split(".")[0],
                        value:this.spritesReadJSON.frames[k].frame
                    };
                    if(this.spritesAvailable[k].name.match(/^background$/)){
                        this.main_sprites.background = this.spritesAvailable[k].value;
                    }
                    if(this.spritesAvailable[k].name.match(/^logo$/)){
                        this.main_sprites.logo = this.spritesAvailable[k].value;
                    }
                    if(this.spritesImgsInformation.vehicleType==="airplane"){
                        if(this.spritesAvailable[k].name.match(/^airplane_faced_front$/)){
                            this.vehicle_faced_front = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^airplane_faced_left$/)){
                            this.main_sprites.vehicle_faced_left = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^airplane_faced_right$/)){
                            this.main_sprites.vehicle_faced_right = this.spritesAvailable[k].value;
                        }
                    }
                    else if(this.spritesImgsInformation.vehicleType==="bicycle"){
                        if(this.spritesAvailable[k].name.match(/^bicycle_faced_front$/)){
                            this.vehicle_faced_front = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^bicycle_faced_left$/)){
                            this.main_sprites.vehicle_faced_left = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^bicycle_faced_right$/)){
                            this.main_sprites.vehicle_faced_right = this.spritesAvailable[k].value;
                        }
                    }
                    else if(this.spritesImgsInformation.vehicleType==="car") {
                        if(this.spritesAvailable[k].name.match(/^car_faced_front$/)){
                            this.vehicle_faced_front = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^car_faced_left$/)){
                            this.main_sprites.vehicle_faced_left = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^car_faced_right$/)){
                            this.main_sprites.vehicle_faced_right = this.spritesAvailable[k].value;
                        }
                    }
                    else if(this.spritesImgsInformation.vehicleType==="helicopter"){
                        if(this.spritesAvailable[k].name.match(/^helicopter_faced_front$/)){
                            this.vehicle_faced_front = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^helicopter_faced_left$/)){
                            this.main_sprites.vehicle_faced_left = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^helicopter_faced_right$/)){
                            this.main_sprites.vehicle_faced_right = this.spritesAvailable[k].value;
                        }
                    }
                    else if(this.spritesImgsInformation.vehicleType==="motorbike"){
                        if(this.spritesAvailable[k].name.match(/^motorbike_faced_front$/)){
                            this.vehicle_faced_front = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^motorbike_faced_left$/)){
                            this.main_sprites.vehicle_faced_left = this.spritesAvailable[k].value;
                        }
                        if(this.spritesAvailable[k].name.match(/^motorbike_faced_right$/)){
                            this.main_sprites.vehicle_faced_right = this.spritesAvailable[k].value;
                        }
                    }
                }
                this.readSprite=true;
            }
		}

        this.onPageLoad(this.spritesFiles);
        // Solution derived from https://stackoverflow.com/questions/2749244/javascript-setinterval-and-this-solution
        // this.loadingTrackNrIterations = setInterval(
        //     (function(self) {         //Self-executing func which takes 'this' as self
        //         return function() {   //Return a function in the context of 'self'
        //             self.getNrIterations(); //Thing you wanted to run as non-window 'this'
        //         }
        //     })(this),
        //     500     //normal interval, 'this' scope not impacted here.
        // ); 
        return this;
    };

    /**
     * @function onPageLoad
     * @private
     * @description OnPageLoad method of the Arcade widget. This method starts the arcade simulation and loads the required spritesheets, with all sprites defined in track object.
     * @param spritesFiles {Array} array of strings, with the names of the sprites images (spritesheets) to use. By default two are used, one for the objects and another for the font (text).
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.onPageLoad = function (spritesFiles) {
        this.detectBrowserType();
        if(this.currentBrowser.chrome){ // can be ensured that all CSS will work as it is supposed!!!
            this.init();

            this.simulatorLogos.simulatorLogo1 = new Image();
            this.simulatorLogos.simulatorLogo1.src = "../../client/app/widgets/car/configurations/img/simulatorLogo1.png";

            this.simulatorLogos.simulatorLogo2 = new Image();
            this.simulatorLogos.simulatorLogo2.src = "../../client/app/widgets/car/configurations/img/simulatorLogo2.png";

            this.spritesFiles.forEach(
            (function(self) {         
                return function(el,ind) {   
                    self.spritesheetsImages[ind] = new Image();
                    self.spritesheetsImages[ind].src = "../../client/app/widgets/car/configurations/img/"+self.spritesFiles[ind]+".png";
                }
            })(this));

            this.spritesheetsImages[0].onload = (function(self) {         
                return function() {   
                    self.intervals.splashInterval  = setInterval(
                        (function(self2) {         
                            return function() {  
                                self2.renderSimulation(); 
                            }
                        })(self),
                        30    
                    ); 
                }
            })(this);
        }
        return this;
    };


    /**
     * @function init
     * @private
     * @description Init method of the Arcade widget. This method inits the canvas and adds the events onkeydown and onkeyup to capture the desired actions, i.e. accelerate, brake, etc.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.init = function () { 
        // configure canvas
        this.canvasInformations.canvas = d3.select("#arcadeSimulator_"+this.WIDGETID)[0][0];
        this.canvasInformations.context = this.canvasInformations.canvas.getContext('2d');
        
        this.canvasInformations.canvas.height = this.renderCanvas.height;
        this.canvasInformations.canvas.width = this.renderCanvas.width;

        return this;
    };

     /**
     * @function renderPauseMenu
     * @private
     * @description RenderPauseMenu method of the Arcade widget. This method draws the simulator pause page, where the commands to control the simulator and to resume the simulation(renderSimulatorFrame) are displayed.
     * It is also resumed the lap timer, using jchronometer lib, as soon as the user uses the command to resume the simulation.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderPauseMenu = function () {
        this.canvasInformations.context.fillStyle = "rgb(100,200,187)";
        this.canvasInformations.context.fillRect(0, 0, this.canvasInformations.canvas.width, this.canvasInformations.canvas.height);

        let centerX = Math.floor(this.renderCanvas.width / 2);
        let centerY = Math.floor(this.renderCanvas.height / 2);
        let ratioFonts   = Math.ceil(this.renderCanvas.width / this.renderCanvas.height);
        this.canvasInformations.context.drawImage(this.spritesheetsImages[0], this.main_sprites.logo.x, this.main_sprites.logo.y, this.main_sprites.logo.w, this.main_sprites.logo.h, centerX-this.main_sprites.logo.w, 0.5*this.main_sprites.logo.h, ratioFonts*this.main_sprites.logo.w, ratioFonts*this.main_sprites.logo.h);
        // this.canvasInformations.context.drawImage(this.spritesheetsImages[0], this.main_sprites.logo.x, this.main_sprites.logo.y, this.main_sprites.logo.w, this.main_sprites.logo.h, centerX-0.5*this.main_sprites.logo.w, centerY-1.5*this.main_sprites.logo.h, (1+(1/ratioFonts))*this.main_sprites.logo.w, (1+(1/ratioFonts))*this.main_sprites.logo.h);
        let centerDeviation = 40;
        let centerDeviationSpritesFont = 70;

        if(this.realPrefix!==""){
            this.drawText("Click on space bar to resume",{x: centerX-4*centerDeviation, y: centerY}, 1, ratioFonts);
            this.drawText("Use left and rigth arrows",{x: centerX-4*centerDeviation, y: centerY+3*centerDeviation}, 1, ratioFonts);
            this.drawText("to control the vehicle",{x: centerX-3*centerDeviation, y: centerY+4*centerDeviation}, 1, ratioFonts);
            this.drawText("Credits:",{x: centerX, y: centerY+6*centerDeviation}, 1, ratioFonts);
            this.drawText("Jose Carlos and PVSio-web",{x: centerX-4*centerDeviation, y: centerY+7*centerDeviation}, 1, ratioFonts);
            this.drawText("Interactive Prototype Builder",{x: centerX-5*centerDeviation, y: centerY+8*centerDeviation}, 1, ratioFonts);
        }else{
            this.drawText("Click on space bar to resume",{x: centerX-3*centerDeviationSpritesFont, y: centerY-0.5*centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("Use left and rigth arrows",{x: centerX-3*centerDeviationSpritesFont, y: centerY+centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("to control the vehicle",{x: centerX-2.5*centerDeviationSpritesFont, y: centerY+1.5*centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("Credits:",{x: centerX, y: centerY+3*centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("Jose Carlos and PVSio-web",{x: centerX-3*centerDeviationSpritesFont, y: centerY+3.5*centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("Interactive Prototype Builder",{x: centerX-3.5*centerDeviationSpritesFont, y: centerY+4*centerDeviationSpritesFont}, 1, ratioFonts);
        }

        if(this.WIDGETSTATE!==null && this.WIDGETSTATE[this.vehicle.action_attribute]===this.vehicle.resume_attribute){
            this.canvasInformations.chronometer.start();
            clearInterval(this.intervals.splashInterval);
                
            this.intervals.simulatorInterval = setInterval(
                    (function(self) {         
                    return function() {   
                        self.renderEachSimulationFrame(); 
                    }
                })(this),
                30  
            ); 

            this.soundWidget.reveal();
            this.soundOff = this.soundWidget.getSoundOff();
            if(!this.soundOff){
                this.soundWidget.playSound(2); //startup song
                this.soundWidget.playSound(0); //background song
                this.soundWidget.setVolume(0.4,0);
                this.soundWidget.onEndedSound(2,[
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
     * @function renderEndMenu
     * @private
     * @description RenderEndMenu method of the Arcade widget. This method draws the simulator end page, where the commands to control the simulator and to start another simulation(renderSimulatorFrame) are displayed.
     * It is also initialized the new lap timer, using jchronometer lib, as soon as the user uses the command to start the new simulation.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderEndMenu = function () {
        this.canvasInformations.context.fillStyle = "rgb(100,200,187)";
        this.canvasInformations.context.fillRect(0, 0, this.canvasInformations.canvas.width, this.canvasInformations.canvas.height);

        let centerX = Math.floor(this.renderCanvas.width / 2);
        let centerY = Math.floor(this.renderCanvas.height / 2);
        let ratioFonts   = Math.ceil(this.renderCanvas.width / this.renderCanvas.height);
        this.canvasInformations.context.drawImage(this.spritesheetsImages[0], this.main_sprites.logo.x, this.main_sprites.logo.y, this.main_sprites.logo.w, this.main_sprites.logo.h, centerX-this.main_sprites.logo.w, 0.5*this.main_sprites.logo.h, ratioFonts*this.main_sprites.logo.w, ratioFonts*this.main_sprites.logo.h);
        // this.canvasInformations.context.drawImage(this.spritesheetsImages[0], this.main_sprites.logo.x, this.main_sprites.logo.y, this.main_sprites.logo.w, this.main_sprites.logo.h, centerX-0.5*this.main_sprites.logo.w, centerY-1.5*this.main_sprites.logo.h, (1+(1/ratioFonts))*this.main_sprites.logo.w, (1+(1/ratioFonts))*this.main_sprites.logo.h);
        let centerDeviation = 40;
        let centerDeviationSpritesFont = 70;

        if(this.realPrefix!==""){
            this.drawText("Thank you for playing!",{x: centerX-3*centerDeviation, y: centerY}, 1, ratioFonts);
            this.drawText("Click on space bar to start again",{x: centerX-5*centerDeviation, y: centerY+3*centerDeviation}, 1, ratioFonts);
            this.drawText("Credits:",{x: centerX, y: centerY+6*centerDeviation}, 1, ratioFonts);
            this.drawText("Jose Carlos and PVSio-web",{x: centerX-4*centerDeviation, y: centerY+7*centerDeviation}, 1, ratioFonts);
            this.drawText("Interactive Prototype Builder",{x: centerX-5*centerDeviation, y: centerY+8*centerDeviation}, 1, ratioFonts);
        }else{
            this.drawText("Thank you for playing!",{x: centerX-2.5*centerDeviationSpritesFont, y: centerY-0.5*centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("Click on space bar to start again",{x: centerX-4.5*centerDeviationSpritesFont, y: centerY+centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("Credits:",{x: centerX, y: centerY+3*centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("Jose Carlos and PVSio-web",{x: centerX-3*centerDeviationSpritesFont, y: centerY+3.5*centerDeviationSpritesFont}, 1, ratioFonts);
            this.drawText("Interactive Prototype Builder",{x: centerX-3.5*centerDeviationSpritesFont, y: centerY+4*centerDeviationSpritesFont}, 1, ratioFonts);
        }
        
        if(this.WIDGETSTATE!==null && this.WIDGETSTATE[this.vehicle.action_attribute]===this.vehicle.resume_attribute){
            clearInterval(this.intervals.simulatorInterval);
            clearInterval(this.intervals.splashInterval);
            this.controllable_vehicle = {
                position: 10,
                speed: 0,
                acceleration: 0.05,
                deceleration: 0.3,
                breaking: 0.6,
                turning: 5.0,
                posx: 0,
                maxSpeed: 15
            };

            this.intervals.simulatorInterval = setInterval(
                    (function(self) {         
                    return function() { 
                        self.renderEachSimulationFrame(); 
                    }
                })(this),
                30   
            );
            this.canvasInformations.chronometer.start();

            this.soundWidget.reveal();
            this.soundOff = this.soundWidget.getSoundOff();
            if(!this.soundOff){
                this.soundWidget.playSound(2); //startup song
                this.soundWidget.playSound(0); //background song
                this.soundWidget.setVolume(0.4,0);
                this.soundWidget.onEndedSound(2,[
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
     * @function renderSimulation
     * @private
     * @description RenderSimulation method of the Arcade widget. This method draws the simulator home page, where the commands to control the simulator are displayed.
     * It is also initialized the lap timer, using jchronometer lib, as soon as the user uses the command to start the simulation(renderSimulatorFrame).
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderSimulation = function(){
        // clean previous canvas window frame (to prevent any overlay between each frame)
        this.canvasInformations.context.fillStyle = "rgb(100,200,187)";
        this.canvasInformations.context.fillRect(0, 0, this.canvasInformations.canvas.width, this.canvasInformations.canvas.height);

        if(this.readParams){
            if(this.readConfiguration && this.readSprite){
                let centerX = Math.floor(this.renderCanvas.width / 2);
                let centerY = Math.floor(this.renderCanvas.height / 2);
                let ratioFonts   = Math.ceil(this.renderCanvas.width / this.renderCanvas.height);
                this.canvasInformations.context.drawImage(this.spritesheetsImages[0], this.main_sprites.logo.x, this.main_sprites.logo.y, this.main_sprites.logo.w, this.main_sprites.logo.h, centerX-this.main_sprites.logo.w, 0.5*this.main_sprites.logo.h, ratioFonts*this.main_sprites.logo.w, ratioFonts*this.main_sprites.logo.h);
                
                let centerDeviation = 40;
                let centerDeviationSpritesFont = 70;

                if(this.realPrefix!==""){
                    this.drawText("Instructions:",{x: centerX-centerDeviation, y: centerY-centerDeviation}, 1, ratioFonts);
                    this.drawText("Click on space bar to start",{x: centerX-4*centerDeviation, y: centerY}, 1, ratioFonts);
                    this.drawText("Click on key s to pause",{x: centerX-3*centerDeviation, y: centerY+centerDeviation}, 1, ratioFonts);
                    this.drawText("Click on key q to end",{x: centerX-3*centerDeviation, y: centerY+2*centerDeviation}, 1, ratioFonts);
                    this.drawText("Use left and rigth arrows",{x: centerX-4*centerDeviation, y: centerY+3*centerDeviation}, 1, ratioFonts);
                    this.drawText("to control the vehicle",{x: centerX-3*centerDeviation, y: centerY+4*centerDeviation}, 1, ratioFonts);
                    this.drawText("You can start now",{x: centerX-2*centerDeviation, y: centerY+5*centerDeviation}, 1, ratioFonts);
                    this.drawText("Credits:",{x: centerX, y: centerY+6*centerDeviation}, 1, ratioFonts);
                    this.drawText("Jose Carlos and PVSio-web",{x: centerX-4*centerDeviation, y: centerY+7*centerDeviation}, 1, ratioFonts);
                    this.drawText("Interactive Prototype Builder",{x: centerX-5*centerDeviation, y: centerY+8*centerDeviation}, 1, ratioFonts);
                }else{
                    this.drawText("Instructions:",{x: centerX-centerDeviationSpritesFont, y: centerY-centerDeviationSpritesFont}, 1, ratioFonts);
                    this.drawText("Click on space bar to start",{x: centerX-3*centerDeviationSpritesFont, y: centerY-0.5*centerDeviationSpritesFont}, 1, ratioFonts);
                    this.drawText("Click on key s to pause",{x: centerX-2.5*centerDeviationSpritesFont, y: centerY}, 1, ratioFonts);
                    this.drawText("Click on key q to end",{x: centerX-2*centerDeviationSpritesFont, y: centerY+0.5*centerDeviationSpritesFont}, 1, ratioFonts);
                    this.drawText("Use left and rigth arrows",{x: centerX-3*centerDeviationSpritesFont, y: centerY+centerDeviationSpritesFont}, 1, ratioFonts);
                    this.drawText("to control the vehicle",{x: centerX-2.5*centerDeviationSpritesFont, y: centerY+1.5*centerDeviationSpritesFont}, 1, ratioFonts);
                    this.drawText("You can start now",{x: centerX-1.5*centerDeviationSpritesFont, y: centerY+2*centerDeviationSpritesFont}, 1, ratioFonts);
                    this.drawText("Credits:",{x: centerX, y: centerY+3*centerDeviationSpritesFont}, 1, ratioFonts);
                    this.drawText("Jose Carlos and PVSio-web",{x: centerX-3*centerDeviationSpritesFont, y: centerY+3.5*centerDeviationSpritesFont}, 1, ratioFonts);
                    this.drawText("Interactive Prototype Builder",{x: centerX-3.5*centerDeviationSpritesFont, y: centerY+4*centerDeviationSpritesFont}, 1, ratioFonts);
                }

                if(this.WIDGETSTATE!==null && this.WIDGETSTATE[this.vehicle.action_attribute]===this.vehicle.resume_attribute){
                    clearInterval(this.intervals.splashInterval);

                    this.intervals.simulatorInterval = setInterval(
                            (function(self) {        
                            return function() {   
                                self.renderEachSimulationFrame(); 
                            }
                        })(this),
                        30    
                    ); 
                                        
                    this.soundWidget.reveal();

                    this.canvasInformations.chronometer = new Chronometer(
                        { precision: 10,
                        ontimeupdate: (function(self) {         
                            return function(t) { 
                                self.canvasInformations.time = Chronometer.utils.humanFormat(self.canvasInformations.chronometer.getElapsedTime()).split(":");
                            }
                        })(this)
                    });
                    this.canvasInformations.chronometer.start();

                    this.soundOff = this.soundWidget.getSoundOff();
                    if(!this.soundOff && this.WIDGETSTATE[this.vehicle.sound_attribute]===this.vehicle.unmute_attribute){
                        this.soundWidget.playSound(2); //startup song
                        this.soundWidget.playSound(0); //background song
                        this.soundWidget.setVolume(0.4,0);
                        this.soundWidget.onEndedSound(2,[
                            {
                            indexPlayNext: 1, //idle song
                            newVolume: 1.0
                            }
                        ]);
                    }
                }
            }else{
                this.drawText("Loading Configurations...",{x: 100, y: 95}, 1, 1);
            }
        }else{
            this.drawText("Loading Parameters...",{x: 100, y: 68}, 1, 1);
        }
        return this;
    }

    /**
     * @function updatePlayer
     * @public
     * @description UpdatePlayer method of the Arcade widget.
     * @memberof module:Arcade
     * @instance
     */
    //renders one frame
    Arcade.prototype.updatePlayer = function(){
        // --------------------------
        // -- Update the car state --
        // --------------------------
        
        if (Math.abs(this.lastDelta) > 130){
            // if (this.controllable_vehicle.speed > 3) {
            //     this.controllable_vehicle.speed -= 0.2;
            // }
        } else {
            // read acceleration controls
            if(this.WIDGETSTATE!==null && this.WIDGETSTATE!==undefined){
                if(this.WIDGETSTATE.action==="acc"){
                    this.controllable_vehicle.speed += this.controllable_vehicle.acceleration;
                }else if(this.WIDGETSTATE.action==="brake"){
                    this.controllable_vehicle.speed -= this.controllable_vehicle.breaking;
                }
                // else{
                //     this.controllable_vehicle.speed -= this.controllable_vehicle.deceleration;
                // }
            }

        }
        this.controllable_vehicle.speed = Math.max(this.controllable_vehicle.speed, 0); //cannot go in reverse
        this.controllable_vehicle.speed = Math.min(this.controllable_vehicle.speed, this.controllable_vehicle.maxSpeed); //maximum speed
        this.controllable_vehicle.position += this.controllable_vehicle.speed;
        
        let carSprite;

        // car turning
        if(this.WIDGETSTATE!==null && this.WIDGETSTATE!==undefined){
            if(this.WIDGETSTATE.direction==="left"){
                // 37 left
                if(this.controllable_vehicle.speed > 0){
                    this.controllable_vehicle.posx -= this.controllable_vehicle.turning;
                }
                carSprite = {
                    a: this.main_sprites.vehicle_faced_left,
                    x: 117,
                    y: 190
                };
                // console.log("left");
            }else if(this.WIDGETSTATE.direction==="right"){
                // 39 right
                if(this.controllable_vehicle.speed > 0){
                    this.controllable_vehicle.posx += this.controllable_vehicle.turning;
                }
                carSprite = {
                    a: this.main_sprites.vehicle_faced_right,
                    x: 125,
                    y: 190
                };
                // console.log("right");
            }else if(this.WIDGETSTATE.direction==="straight"){
                carSprite = {
                    a: this.vehicle_faced_front, 
                    x:125, 
                    y:190
                };
                // console.log("front");
            }
        }
        return this;
    };

    /**
     * @function renderEachSimulationFrame
     * @public
     * @description RenderEachSimulationFrame method of the Arcade widget.
     * @memberof module:Arcade
     * @instance
     */
    //renders one frame
    Arcade.prototype.renderEachSimulationFrame = function(){
        if(this.WIDGETSTATE!==null && this.WIDGETSTATE[this.vehicle.action_attribute]===this.vehicle.quit_attribute){ // Key 'q' ends current simulator
            this.canvasInformations.chronometer.stop();
            this.soundWidget.hide();
            clearInterval(this.intervals.simulatorInterval);
            this.intervals.splashInterval = setInterval(
                    (function(self) {         
                    return function() {  
                        self.renderEndMenu(); 
                    }
                })(this),
                30     
            );
            this.soundWidget.pauseAll();
        }

        if(this.WIDGETSTATE!==null && this.WIDGETSTATE[this.vehicle.action_attribute]===this.vehicle.pause_attribute){ // Key 's' pauses current simulator
            this.canvasInformations.chronometer.pause();
            this.soundWidget.hide();
            clearInterval(this.intervals.simulatorInterval);
            this.intervals.splashInterval = setInterval(
                    (function(self) {         
                    return function() {   
                        self.renderPauseMenu(); 
                    }
                })(this),
                30    
            );
            this.soundWidget.pauseAll();
        }

        // Clean screen
        this.canvasInformations.context.fillStyle = "#dc9";
        this.canvasInformations.context.fillRect(0, 0,  this.canvasInformations.canvas.width,  this.canvasInformations.canvas.height);
        
        this.updatePlayer();
     
        let spriteBuffer = [];
        
        // --------------------------
        // --   Render the track    --
        // --------------------------
        let absoluteIndex = Math.floor(this.controllable_vehicle.position / this.arcadeParams.trackSegmentSize);
        
        if(absoluteIndex >= this.arcadeParams.trackParam.length-this.renderCanvas.depthOfField-1){
            if(this.lap<this.numLaps){
                this.controllable_vehicle.position= 10;
                this.controllable_vehicle.posx= 0;
                this.lap++;
            }else{
                clearInterval(this.intervals.simulatorInterval);
            }
        }
        
        let currentSegmentIndex    = (absoluteIndex - 2) % this.track.length;
        let currentSegmentPosition = (absoluteIndex - 2) * this.arcadeParams.trackSegmentSize - this.controllable_vehicle.position;
        let currentSegment         = this.track[currentSegmentIndex];
        
        let lastProjectedHeight     = Number.POSITIVE_INFINITY;
        let probedDepth             = 0;
        let counter                 = absoluteIndex % (2 * this.arcadeParams.numberOfSegmentPerColor); // for alternating color band
        
        let playerPosSegmentHeight     = this.track[absoluteIndex % this.track.length].height;
        let playerPosNextSegmentHeight = this.track[(absoluteIndex + 1) % this.track.length].height;
        let playerPosRelative          = (this.controllable_vehicle.position % this.arcadeParams.trackSegmentSize) / this.arcadeParams.trackSegmentSize;
        let playerHeight               = this.renderCanvas.camera_height + playerPosSegmentHeight + (playerPosNextSegmentHeight - playerPosSegmentHeight) * playerPosRelative;
        
        let baseOffset                 =  currentSegment.curve + (this.track[(currentSegmentIndex + 1) % this.track.length].curve - currentSegment.curve) * playerPosRelative;
        
        this.lastDelta = this.controllable_vehicle.posx - baseOffset*2;
        
        let iter = this.renderCanvas.depthOfField;
        
        while (iter--) {
            // Next Segment:
            let nextSegmentIndex       = (currentSegmentIndex + 1) % this.track.length;
            let nextSegment            = this.track[nextSegmentIndex];

            let startProjectedHeight = Math.floor((playerHeight - currentSegment.height) * this.renderCanvas.camera_distance / (this.renderCanvas.camera_distance + currentSegmentPosition));
            let startScaling         = 30 / (this.renderCanvas.camera_distance + currentSegmentPosition);
        
            let endProjectedHeight   = Math.floor((playerHeight - nextSegment.height) * this.renderCanvas.camera_distance / (this.renderCanvas.camera_distance + currentSegmentPosition + this.arcadeParams.trackSegmentSize));
            let endScaling           = 30 / (this.renderCanvas.camera_distance + currentSegmentPosition + this.arcadeParams.trackSegmentSize);

            let currentHeight        = Math.min(lastProjectedHeight, startProjectedHeight);
            let currentScaling       = startScaling;
            
            if(currentHeight > endProjectedHeight){
                this.drawSegment(
                    this.renderCanvas.height / 2 + currentHeight, 
                    currentScaling, currentSegment.curve - baseOffset - this.lastDelta * currentScaling, 
                    this.renderCanvas.height / 2 + endProjectedHeight, 
                    endScaling, 
                    nextSegment.curve - baseOffset - this.lastDelta * endScaling, 
                    counter < this.arcadeParams.numberOfSegmentPerColor, currentSegmentIndex == 2 || currentSegmentIndex == (this.arcadeParams.trackParam.length-this.renderCanvas.depthOfField));
            }
            if(currentSegment.sprite){
                spriteBuffer.push({
                    y: this.renderCanvas.height / 2 + startProjectedHeight, 
                    x: this.renderCanvas.width / 2 - currentSegment.sprite.pos * this.renderCanvas.width * currentScaling + /* */currentSegment.curve - baseOffset - (this.controllable_vehicle.posx - baseOffset*2) * currentScaling,
                    ymax: this.renderCanvas.height / 2 + lastProjectedHeight, 
                    s: 2.5*currentScaling, 
                    i: currentSegment.sprite.type});
            }
            
            
            lastProjectedHeight    = currentHeight;
            
            probedDepth            = currentSegmentPosition;

            currentSegmentIndex    = nextSegmentIndex;
            currentSegment         = nextSegment;
            
            currentSegmentPosition += this.arcadeParams.trackSegmentSize;
            
            counter = (counter + 1) % (2 * this.arcadeParams.numberOfSegmentPerColor);
        }
        
        // --------------------------
        // --     Draw the car     --
        // --------------------------

        // ---------------------------------
        // --     Draw the lap number     --
        // ---------------------------------        
        
        // --------------------------
        // --     Draw the hud     --
        // --------------------------         
        let speed = Math.round(this.controllable_vehicle.speed / this.controllable_vehicle.maxSpeed * 200);
        return this;
    };
    

    /**
     * @function drawSegment
     * @public
     * @description DrawSegment method of the Arcade widget.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.drawSegment = function (position1, scale1, offset1, position2, scale2, offset2, alternate, finishStart){
        let grass     = (alternate) ? "#eda" : "#dc9";
        let border    = (alternate) ? "#e00" : "#fff";
        let road      = (alternate) ? "#999" : "#777";
        let lane      = (alternate) ? "#fff" : "#777";

        if(finishStart){
            road = "#fff";
            lane = "#fff";
            border = "#fff";
        }
        
        //draw grass:
        this.canvasInformations.context.fillStyle = grass;
        this.canvasInformations.context.fillRect(0,position2,this.canvasInformations.canvas.width,(position1-position2));
        
        // draw the road
        this.drawTrapez(position1, scale1, offset1, position2, scale2, offset2, -0.5, 0.5, road);
        
        //draw the road border
        this.drawTrapez(position1, scale1, offset1, position2, scale2, offset2, -0.5, -0.47, border);
        this.drawTrapez(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.5, border);
        
        // draw the lane line
        this.drawTrapez(position1, scale1, offset1, position2, scale2, offset2, -0.18, -0.15, lane);
        this.drawTrapez(position1, scale1, offset1, position2, scale2, offset2,  0.15,  0.18, lane);
        return this;
    }
    
    /**
     * @function drawTrapez
     * @public
     * @description DrawTrapez method of the Arcade widget.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.drawTrapez = function(pos1, scale1, offset1, pos2, scale2, offset2, delta1, delta2, color){
        let demiWidth = this.canvasInformations.canvas.width / 2;
        this.canvasInformations.context.fillStyle = color;
        this.canvasInformations.context.beginPath();
        this.canvasInformations.context.moveTo(demiWidth + delta1 * this.canvasInformations.canvas.width * scale1 + offset1, pos1);
        this.canvasInformations.context.lineTo(demiWidth + delta1 * this.canvasInformations.canvas.width * scale2 + offset2, pos2); 
        this.canvasInformations.context.lineTo(demiWidth + delta2 * this.canvasInformations.canvas.width * scale2 + offset2, pos2); 
        this.canvasInformations.context.lineTo(demiWidth + delta2 * this.canvasInformations.canvas.width * scale1 + offset1, pos1);
        this.canvasInformations.context.fill();
        return this;
    }

    /**
     * @function drawText
     * @private
     * @description DrawText method of the Arcade widget. This method draws text using sprite letters to simulate the arcade look.
     * That is, reading string and for each letter draw the corresponding sprite letter, using image spritesheetsImages[imageIndex].
     * @param string {String} Text to be rendered with the available text font.
     * @param pos {Object} Screen coordinates, i.e. object with x, y, width and height values.
     * @param imageIndex {Int} spritesheetsImages (array) index, which has the text font sprite image.
     * @param ratioRealisticFont {Float} The font ratio to be applied.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawText = function (string, pos, imageIndex, ratioRealisticFont) {
        if(this.realPrefix!==""){
            let font = ratioRealisticFont * 10;
            string = string.toUpperCase();
            this.canvasInformations.context.font = font+"px Arial";
            this.canvasInformations.context.fillStyle = "white";
            this.canvasInformations.context.fillText(string,pos.x,pos.y);
        }
        else{
            string = string.toUpperCase();
            let cur = pos.x;
            for(let i=0; i < string.length; i++) {
                this.canvasInformations.context.drawImage(this.spritesheetsImages[imageIndex], (string.charCodeAt(i) - 32) * 8, 0, 8, 8, cur, pos.y, ratioRealisticFont*8, ratioRealisticFont*8);
                cur += ratioRealisticFont*8;
            }
        }
        return this;
    };

    // /**
    //  * @function drawSprite
    //  * @private
    //  * @description DrawSprite method of the Arcade widget. This method draws an image of spritesheetsImages array. Usually it uses index 0, since this method is used to
    //  * draw objects and index 0 has the spritesheet image with all available objects. This method either receives only a sprite (and null as other arguments) or receives
    //  * an image, x, y and scale (sprite as a null argument). This allows to use render different images and sprites.
    //  * @param sprite {Float} Sprite to be rendered.
    //  * @param image {Float} Image to be rendered.
    //  * @param x {Float} X screen coordinate, used to place the object to be rendered.
    //  * @param y {Float} Y screen coordinate, used to place the object to be rendered.
    //  * @param scale {Float} Scaling value to render object. It is used to enlarge or to shrink the object to better fit in the screen.
    //  * @memberof module:Arcade
    //  * @returns {Arcade} The created instance of the widget Arcade.
    //  * @instance
    //  */
    // Arcade.prototype.drawSprite = function (sprite, image, x, y, scale) {
    //     if(sprite!==null){
    //         let destY = sprite.y - sprite.i.h * sprite.s;
    //         let h = null;
    //         if(sprite.ymax < sprite.y) {
    //             h = Math.min(sprite.i.h * (sprite.ymax - destY) / (sprite.i.h * sprite.s), sprite.i.h);
    //         } else {
    //             h = sprite.i.h;
    //         }
    //         if(h > 0) this.canvasInformations.context.drawImage(this.spritesheetsImages[0],  sprite.i.x, sprite.i.y, sprite.i.w, h, sprite.x, destY, sprite.s * sprite.i.w, sprite.s * h);
    //     }else{
    //         this.canvasInformations.context.drawImage(this.spritesheetsImages[0],  image.x, image.y, image.w, image.h, x, y, scale*image.w, scale*image.h);
    //     }
    //     return this;
    // };

    // /**
    //  * @function drawBackground
    //  * @private
    //  * @description DrawBackground method of the Arcade widget. This method draws the main_sprites.background image, in position 'position'.
    //  * @param position {Float} Value of posx in controllable_vehicle object, i.e. horizontal position, which is computed by adding/subtracting the turning field value every time the vehicle is turned left or right, in updateControllableCar method.
    //  * @memberof module:Arcade
    //  * @returns {Arcade} The created instance of the widget Arcade.
    //  * @instance
    //  */
    // Arcade.prototype.drawBackground = function (position) {
    //     // Scale background according to scale factor
    //     let backgroundHeight = parseFloat(this.main_sprites.background.w);
    //     let backgroundWidth = parseFloat(this.main_sprites.background.w);
    //     let widthDiff = backgroundWidth - this.renderCanvas.width;
    //     let heightDiff = backgroundHeight - this.renderCanvas.height;
    //     let ratio = (widthDiff === heightDiff || widthDiff > heightDiff) ?
    //     this.renderCanvas.width / backgroundWidth : this.renderCanvas.height / backgroundHeight;
    
    //     let first = position / 2 % (this.main_sprites.background.w);
    //     // (image, x, y, scale) args
    //     // LEFT 
    //     this.drawSprite(null, this.main_sprites.background, first-(Math.ceil(ratio)*this.main_sprites.background.w)+1, 0, Math.ceil(ratio));
    //     // CENTER (Starts in (0,0) - Variable 'first' is 0 in the beginning of the simulation, since 'position' is also 0) 
    //     this.drawSprite(null, this.main_sprites.background, first, 0, Math.ceil(ratio));
    //     // RIGHT 
    //     this.drawSprite(null, this.main_sprites.background, first+(Math.ceil(ratio)*this.main_sprites.background.w)-1, 0, Math.ceil(ratio));
        
        
    //     // // To create a backgroung with a pattern of background image
    //     // let backgroundImage = spriteToImage(this.spritesheetsImages[0], this.main_sprites.background);    
    //     // function spriteToImage(spritesheetImage, spriteImageMapping) {
    //     //     var tempCanvas=document.createElement("canvas");
    //     //     var tempCtx=tempCanvas.getContext("2d");
    //     //     tempCanvas.width=spriteImageMapping.w;
    //     //     tempCanvas.height=spriteImageMapping.h;
    //     //     tempCtx.drawImage(spritesheetImage,
    //     //         spriteImageMapping.x,
    //     //         spriteImageMapping.y,
    //     //         spriteImageMapping.w,
    //     //         spriteImageMapping.h,
    //     //         0,
    //     //         0,
    //     //         spriteImageMapping.w,
    //     //         spriteImageMapping.h);
    //     //     let res=new Image();
    //     //     res.src=tempCanvas.toDataURL();
    //     //     return res;            
    //     // }       
    //     // let pattern = this.canvasInformations.context.createPattern(backgroundImage, 'repeat');
    //     // this.canvasInformations.context.fillStyle = pattern;
    //     // this.canvasInformations.context.fillRect(0, 0, this.renderCanvas.width, this.renderCanvas.height);        
    //     return this;
    // };

    /**
     * @function detectBrowserType
     * @private
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
     * @function reveal
     * @public
     * @description Reveal method of the Arcade widget.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };


    /**
     * @function hide
     * @public
     * @description Hide method of the Arcade widget.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
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
        if(pvsState!==undefined || pvsState!==null){
            this.WIDGETSTATE = pvsState;
        }
        return this.reveal();
    };

    module.exports = Arcade;
});
