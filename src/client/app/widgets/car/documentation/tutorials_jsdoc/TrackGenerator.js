/**
 * @module TrackGenerator
 * @version 2.0.0
 * @author José Carlos
 * @desc This module allows to either generate randomly or generate based on trackLayout optional field the track, which will be used to create the environment of the 2D driving simulator, using HTML5 Canvas.
 * The trackLayout optional field allows to specifiy the desired layout, which will be parsed and iterated to create all segments that matches that layout.
 *
 * @date Apr 02, 2018
 * last modified @date Jun 16, 2018
 *
 *
 * @example <caption>Usage of public API to create a desired track, using trackLayout, with straight lines, curves and slopes.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the TrackGenerator module
 *     require("widgets/car/TrackGenerator");
 *
 *     function main() {
 *       // After TrackGenerator module was loaded, initialize it
 *       let trackGenerator = new TrackGenerator("trackGeneratorWidget", {
 *           top: 80,
 *           left: 650,
 *           width: 780,
 *           height: 650
 *       }, {
 *           parent: "content", // defines parent div, which is div id="body" by default
 *           spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *           render: {
 *               width: 320,
 *               height: 240,
 *               depthOfField: 150,
 *               camera_distance: 30,
 *               camera_height: 100
 *           },
 *           trackSegmentSize: 5,
 *           numberOfSegmentPerColor: 4,
 *           numLanes: 3,
 *           laneWidth: 0.02,
 *           trackParam: {
 *               numZones:    12, // number of different portions of the track
 *               zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
 *           },
 *           // Information regarding current controllable_car's car
 *           controllable_car: {
 *               position: 10,
 *               speed: 0,
 *               acceleration: 0.05,
 *               deceleration: 0.04,
 *               breaking: 0.3,
 *               turning: 5.0,
 *               posx: 0,
 *               maxSpeed: 20
 *           },
 *           objects: ["tree","stump","boulder","tree2","brunetteGirlBack","bush2","hatManBack"],
 *           obstacle: ["dead_tree2","column","dearRight"],
 *           obstaclePerIteration: 20,
 *           trackColors: {
 *               grass1: "#699864",
 *               border1: "#e00",
 *               border2: "#fff",
 *               outborder1: "#496a46",
 *               outborder_end1: "#474747",
 *               track_segment1: "#777",
 *               lane1: "#fff",
 *               lane2: "#777",
 *               laneArrow1: "#00FF00",
 *               track_segment_end:"#000",
 *               lane_end: "#fff"
 *           },
 *           trackLayout: [ 
 *               // trackLayout2.json File
 *               // describing the desired track, which is curve to left, straight line, 
 *               // curve to right, straight line, curve to left and straight line each with 3 zones (blocks) and with different 
 *               // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *               // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *               // those angles to define different curvatures, instead of generating the same curvature for the same
 *               // side
 *               {
 *                   topography: {
 *                       name:"left",
 *                       curvature: -90
 *                   },
 *                   profile: "flat",
 *                   numZones: 3
 *               },
 *               {
 *                   topography: {
 *                       name:"straight",
 *                       curvature: 0
 *                   },
 *                   profile: "down",
 *                   numZones: 3
 *               },
 *               {
 *                   topography: {
 *                       name:"right",
 *                       curvature: 90
 *                   },
 *                   profile: "flat",
 *                   numZones: 3
 *               },
 *               {
 *                   topography: {
 *                       name:"straight",
 *                       curvature: 0
 *                   },
 *                   profile: "up",
 *                   numZones: 3
 *               },
 *               {
 *                   topography: {
 *                       name:"left",
 *                       curvature: -90
 *                   },
 *                   profile: "flat",
 *                   numZones: 3,
 *               },
 *               {
 *                   topography: {
 *                       name:"straight",
 *                       curvature: 0
 *                   },
 *                   profile: "flat",
 *                   numZones: 3,
 *               }
 *           ],
 *           callback: onMessageReceived
 *       });
 *
 *       // Reveals TrackGenerator Widget
 *       trackGenerator.prototype.render(); 
 *      
 *       // Creates the track based on trackLayout optional field
 *       trackGenerator.generateTrackBasedOnTrackLayoutOptField();    
 *     }
 * });
 *
 * @example <caption>To create a new track, using trackLayout, with only straight lines it is only necessary to modify the trackLayout optional field, 
 * in the previous example, as it follows,</caption>
 *
 *           trackLayout: [ 
 *               // describing the desired track, which is a 12-zone straight line, i.e. track with only straight lines with length 12. 
 *               {
 *                   topography: {
 *                       name:"straight",
 *                       curvature: 0
 *                   },
 *                   profile: "flat",
 *                   numZones: 12
 *               }
 *            ]
 *
 *
 * 
 * @example <caption>Usage of other public API's of TrackGenerator Widget.</caption>
 *
 *  Using variable TrackGenerator created in the previous example is also possible to call the following,
 *
 *       // Hides the TrackGenerator widget, i.e., the main div becomes invisible.
 *       trackGenerator.hide();
 *
 *       // Reveals the TrackGenerator widget, i.e., the main div becomes visible.
 *       trackGenerator.reveal(); 
 *
 *       // Generates randomly a track with only straight lines.
 *       trackGenerator.generateStraightTrack(); 
 *
 *       // Generates randomly a track with straight lines, curves and slopes.
 *       trackGenerator.generateTrackCurvesSlopes(); 
 *    
 */
/*jslint lets: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*jshint esnext:true */

require.config({
    baseUrl: "../../client/app",
    paths: {
        jquery: '../lib/jquery.js'
    }
});

/*global define*/
define(function (require, exports, module) {
    "use strict";

    let Widget = require("widgets/Widget");

    /**
     * @function constructor
     * @public
     * @description Constructor for the TrackGenerator widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     * @param [opt.parent] {String} the HTML element where the display will be appended (default is "body").
     * @param [opt.spritesFilename] {String} the spritesheet filename(json file) that will be loaded (default is "spritesheet").
     * @param [opt.render] {Object} the rendering configurations, i.e. width, height, etc. (default is {width: 320, height: 240, depthOfField: 150, camera_distance: 30, camera_height: 100}).
     * @param [opt.trackSegmentSize] {Int} the size of the track segment (default is 5).
     * @param [opt.numberOfSegmentPerColor] {Int} the number of segments per color, i.e. how many sequenced segments to alternate colors (default is 4).
     * @param [opt.numLanes] {Int} the number of lanes the track will be draw (default is 3).
     * @param [opt.laneWidth] {Float} the width of the lane separator (default is 0.02).
     * @param [opt.trackParam] {Object} the track configurations, i.e. number of zones(track length), etc (default is {numZones: 12, zoneSize: 250}).
     * @param [opt.controllable_car] {Object} the vehicle configurations, i.e. initial position, acceleration and deceleration values, etc (default is {position: 10, speed: 0, acceleration: 0.05, deceleration: 0.04, breaking: 0.3, turning: 5.0, posx: 0, maxSpeed: 20}).
     * @param [opt.objects] {Array} the sprite names to be drawed in the landscape (default is ["tree","rock"]).
     * @param [opt.obstacle] {Array} the sprite names to be drawed within the track as obstacles (default is ["rock"]).
     * @param [opt.trackLayout] {Array} the track layout that will be used to create the corresponding segments. (default is []).
     * @param [opt.trackColors] {Array} the track colors that will be used to color the segments in each stripe. (default is {grass1: "#699864", border1: "#e00", border2: "#fff", outborder1: "#496a46", outborder_end1: "#474747", track_segment1: "#777", lane1: "#fff", lane2: "#777", laneArrow1: "#00FF00", track_segment_end:"#000", lane_end: "#fff"}).
     * @param [opt.obstaclePerIteration] {Int} the number of iterations where a new obstacle will be placed within the track (default is 50).
     * @returns {TrackGenerator} The created instance of the widget TrackGenerator.
     * @memberof module:TrackGenerator
     * @instance
     */
    function TrackGenerator(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent;
        opt.spritesFilename = opt.spritesFilename;        
        opt.render = opt.render;
        opt.trackSegmentSize = opt.trackSegmentSize;
        opt.numberOfSegmentPerColor = opt.numberOfSegmentPerColor;
        opt.numLanes = opt.numLanes;
        opt.laneWidth = opt.laneWidth;
        opt.trackParam = opt.trackParam; 
        opt.controllable_car = opt.controllable_car;
        opt.objects = opt.objects;
        opt.obstacle = opt.obstacle;
        opt.trackLayout = opt.trackLayout;
        opt.trackColors = opt.trackColors;
        opt.obstaclePerIteration = opt.obstaclePerIteration;

        this.id = id;
        this.TRACKGENERATORID = this.id;
        this.top = coords.top || 100;
        this.left = coords.left || 700;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.spritesAvailable=[];
        this.generatedTrack=[];
        this.generatedObstacles=[];

        // Random numbers to place sprites randomly within the landscape territory
        this.randomPos = Math.random;
        
        this.renderCanvas            = (opt.render) ? opt.render : { width: 320, height: 240, depthOfField: 150, camera_distance: 30, camera_height: 100 };
        this.trackSegmentSize        = (opt.trackSegmentSize) ? opt.trackSegmentSize : 5;
        this.numberOfSegmentPerColor = (opt.numberOfSegmentPerColor) ? opt.numberOfSegmentPerColor : 4;
        this.numLanes                = (opt.numLanes) ? opt.numLanes : 3;
        this.laneWidth               = (opt.laneWidth) ? opt.laneWidth: 0.02;
        this.trackParam              = (opt.trackParam) ? opt.trackParam : { numZones: 12, /*number of different portions of the track*/ zoneSize:  250 /*length of each numZones (the bigger this value. the longer it will take to finish)*/ };        
        this.params                  = JSON.parse(JSON.stringify(this.trackParam));
        this.controllable_car        = (opt.controllable_car) ? opt.controllable_car : { position: 10, speed: 0, acceleration: 0.05, deceleration: 0.04, breaking: 0.3, turning: 5.0, posx: 0, maxSpeed: 20 };

        this.objects  = (opt.objects) ? opt.objects : ["tree","boulder"];
        this.obstacle = (opt.obstacle) ? opt.obstacle : ["boulder"];
        this.trackLayout = (opt.trackLayout) ? opt.trackLayout : [];
        this.trackColors = (opt.trackColors) ? opt.trackColors : {
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
        };
        this.obstaclePerIteration = (opt.obstaclePerIteration) ? opt.obstaclePerIteration : 50;

        let trackLayout2 = [];        
        this.trackLayout.forEach(el => trackLayout2.unshift(el));
        this.trackLayout = trackLayout2;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "body";
        this.spritesFilename = (opt.spritesFilename) ? ("text!widgets/car/configurations/" + opt.spritesFilename + ".json") : "text!widgets/car/configurations/spritesheet.json";
        
        // Load spritesheet based on spritesFilename options
        let _this = this;
        let spritesheet_file = "text!widgets/car/configurations/" + opt.spritesFilename + ".json";
        require([spritesheet_file], function(spritesheet) {
            _this.div.append("div").attr("id", "spritesheet_file_loaded_opt_field_"+id).style("display","none").text(spritesheet);
            return _this;
        });

        this.div = d3.select(this.parent).append("div").attr("id","trackGenerator_"+this.TRACKGENERATORID);
        
        this.div.append("h2").text("Track Generator");
        this.div.append("span")
                .attr("id","created_"+this.TRACKGENERATORID)
                .text("Success: False");

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;
    
        Widget.call(this, id, coords, opt);
       
        return this;
    }

    TrackGenerator.prototype = Object.create(Widget.prototype);
    TrackGenerator.prototype.constructor = TrackGenerator;
    TrackGenerator.prototype.parentClass = Widget.prototype;

    /**
     * @function generateTrackBasedOnTrackLayoutOptField
     * @public  
     * @description GenerateTrackBasedOnTrackLayoutOptField method of the TrackGenerator widget. This method generates the track present in the trackLayout opt field.
     * Every obstaclePerIteration iterations an obstacle is randomly placed on a part of the track, i.e. between the track and landscape separators.
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no).
     * It also has information about the randomly generated position and the type of sprite, i.e. the sprite provided as opt from the available list (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), a value is randomly generated to decide in which side it will be placed (spriteSidesRandom).
     * Then the position on that side is also randomly generated in spritePos (given by spritePosRightRandom or spritePosLeftRandom).
     * Before finishing, another random number is generated to know how far to put the sprite on the selected side in relation to the landscape/track separator, in order to have
     * sprites randomly scattered, but balanced (instead of being concentrated in a given area).
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in and whether those are obstacles or not,
     * a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
     * within this context on the PVSio-web platform.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.generateTrackBasedOnTrackLayoutOptField = function () {
        this.loadFile();
        setTimeout(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() {   //Return a function in the context of 'self'
                   //Thing you wanted to run as non-window 'this'

                    let sprite = false;
                    let spritePos = null;
                    let spritePosgeneratedObstaclesRandom = null;
                    let spritePosRightRandom = null;
                    let spritePosLeftRandom =  null;
                    let spriteTypeRandom = null;
                    let chooseIndexFromObjects=null;
                    let chooseObjectFromDesiredObjects=null;
                    let chooseIndexFromObstacle=null;
                    let chooseObstacleFromDesiredObstacle=null;
                    let spriteSidesRandom = null;
                    let spritesAvailableLength = self.spritesAvailable.length;
                    let index=null;
                    let iter = 0;
                    let finalNumZones = 0;
                    self.trackLayout.forEach(el => iter+=el.numZones);
                    finalNumZones = iter;
                    
                    let trackLayoutProfile = 0; //0=flat 1=up -1=down
                    let trackLayoutTopographyName = 0; //0=straight 1=left -1=right
                    let currentZone = {
                        height: 0,
                        curve: 0
                    };

                    let tmpIter=1;
                    let tmpPos=1;

                    while(iter){
                        if(tmpIter<=self.trackLayout[self.trackLayout.length-tmpPos].numZones){
                            // Generate current Zone
                            let intendedHeightForCurrentZone;
                            let intendedCurveForCurrentZone = parseInt(self.trackLayout[self.trackLayout.length-tmpPos].topography.curvature);
                            switch(self.trackLayout[self.trackLayout.length-tmpPos].profile){
                                case "flat":
                                    intendedHeightForCurrentZone=0;
                                    break; 
                                case "up": 
                                    intendedHeightForCurrentZone = 900 * self.randomPos(); // Ease vertical transitions
                                    break;
                                case "down": 
                                    intendedHeightForCurrentZone = -900 * self.randomPos();
                                    break;  
                            }
                           
                            for(let i=0; i < self.params.zoneSize; i++){
                                // generates random integer numbers between 0 and objects.length(there are objects.length sprites desired to draw)
                                chooseIndexFromObjects = Math.floor((self.randomPos() * self.objects.length));
                                chooseObjectFromDesiredObjects=self.objects[chooseIndexFromObjects];
                                index = self.spritesAvailable.findIndex(el => el.name === chooseObjectFromDesiredObjects);

                                // generates random integer numbers between 1 and 2
                                spriteSidesRandom = Math.floor((self.randomPos() * 2) + 1);

                                spritePosgeneratedObstaclesRandom = (self.randomPos() * 0.50) - 0.25;

                                if(i%self.obstaclePerIteration==0){
                                    // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                                    // generates random integer numbers between 0 and obstacle.length(there are obstacle.length sprites desired to draw)
                                    chooseIndexFromObstacle = Math.floor((self.randomPos() * self.obstacle.length));
                                    chooseObstacleFromDesiredObstacle=self.obstacle[chooseIndexFromObstacle];
                                    index = self.spritesAvailable.findIndex(el => el.name === chooseObstacleFromDesiredObstacle);
                                    // console.log(self.spritePosgeneratedObstaclesRandom);
                                    // console.log(self.spritesAvailable[index]);
                                    self.generatedObstacles.push(spritePosgeneratedObstaclesRandom);
                                    // spritePosgeneratedObstaclesRandom has the relative position of the obstacle
                                    sprite = {type: self.spritesAvailable[index].value, pos: spritePosgeneratedObstaclesRandom, obstacle: 1};
                                }
                                else {
                                    // choose randomly sprite image
                                    // generates random float numbers greater than 0.55
                                    spritePosRightRandom = self.randomPos() + 0.90;
                                    // generates random float numbers lesser than -0.55
                                    spritePosLeftRandom =  (self.randomPos() * -0.55) - 0.55;

                                    // choose randomly sprite size
                                    if(spriteSidesRandom == 1){
                                        spritePos = spritePosLeftRandom;
                                    }else if(spriteSidesRandom == 2){
                                        spritePos = spritePosRightRandom;
                                    }
                                    // console.log(spritePos);
                                    if(self.randomPos() < 0.25){
                                        sprite = {type: self.spritesAvailable[index].value, pos: spritePos-0.5, obstacle: 0};
                                    } if(self.randomPos() < 0.5){
                                        sprite = {type: self.spritesAvailable[index].value, pos: spritePos, obstacle: 0};
                                    }else{
                                        sprite = {type: self.spritesAvailable[index].value, pos: 3*spritePos, obstacle: 0};
                                    }
                                }

                                // Draw segments next to each other with 'i/params.zoneSize'
                                // Avoid horizontal gaps with 'Math.PI-Math.PI/2'
                                // Avoid vertical gaps with '1 +' 
                                // Better perspective with '2*'
                                // 2 * (1 + Math.sin(i/params.zoneSize *))

                                self.generatedTrack.push({
                                    height: currentZone.height+intendedHeightForCurrentZone / 2 * (1 + Math.sin(i/self.params.zoneSize * Math.PI-Math.PI/2)),
                                    curve: currentZone.curve+intendedCurveForCurrentZone / 2 * (1 + Math.sin(i/self.params.zoneSize * Math.PI-Math.PI/2)),
                                    sprite: sprite
                                })
                            }

                            currentZone.height += intendedHeightForCurrentZone;
                            currentZone.curve += intendedCurveForCurrentZone;

                            tmpIter++;
                            iter--;
                        }else{
                            tmpIter=1;
                            if(tmpPos<=self.trackLayout.length) {
                                tmpPos++;
                            }
                        }
                    }
                    self.params.numZones = finalNumZones * self.params.zoneSize;

                    self.trackParam.numZones = finalNumZones;

                    self.generatedJSON = {
                        controllable_car: self.controllable_car,
                        laneWidth: self.laneWidth,
                        numLanes: self.numLanes,
                        numberOfSegmentPerColor: self.numberOfSegmentPerColor,
                        render: self.renderCanvas,
                        track: self.generatedTrack,
                        trackParam: self.trackParam,
                        trackSegmentSize: self.trackSegmentSize,
                        trackColors: self.trackColors
                    };

                    setTimeout(
                        (function(self2) {         //Self-executing func which takes 'this' as self
                            return function() {   //Return a function in the context of 'self'
                                d3.select("#created_"+self2.TRACKGENERATORID).text("Success: True"); 
                                // TODO writeFile track.json with its content with Paolo Masci new API (when it has been implemented)
                                // console.log(self2.generatedJSON);
                                console.log(JSON.stringify(self2.generatedJSON));
                            }
                        })(self),
                        1000     //normal interval, 'this' scope not impacted here.
                    ); 
                }
            })(this),
            50     //normal interval, 'this' scope not impacted here.
        );
        return this;
    };

    /**
     * @function generateTrackCurvesSlopes
     * @public  
     * @description GenerateTrackCurvesSlopes method of the TrackGenerator widget. This method generates the straight line simulator version.
     * Every obstaclePerIteration iterations an obstacle is randomly placed on a part of the track, i.e. between the track and landscape separators.
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no).
     * It also has information about the randomly generated position and the type of sprite, i.e. the sprite provided as opt from the available list (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), a value is randomly generated to decide in which side it will be placed (spriteSidesRandom).
     * Then the position on that side is also randomly generated in spritePos (given by spritePosRightRandom or spritePosLeftRandom).
     * Before finishing, another random number is generated to know how far to put the sprite on the selected side in relation to the landscape/track separator, in order to have
     * sprites randomly scattered, but balanced (instead of being concentrated in a given area).
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in and whether those are obstacles or not,
     * a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
     * within this context on the PVSio-web platform.
     * @example <caption>Usage of public API to create randomly track, with straight lines, curves and slopes.</caption>
     * define(function (require, exports, module) {
     *     "use strict";
     *
     *     // Require the TrackGenerator module
     *     require("widgets/car/TrackGenerator");
     *
     *     function main() {
     *       // After TrackGenerator module was loaded, initialize it
     *       let trackGenerator = new TrackGenerator("trackGeneratorWidget", {
     *           top: 80,
     *           left: 650,
     *           width: 780,
     *           height: 650
     *       }, {
     *           parent: "content", // defines parent div, which is div id="body" by default
     *           spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
     *           render: {
     *               width: 320,
     *               height: 240,
     *               depthOfField: 150,
     *               camera_distance: 30,
     *               camera_height: 100
     *           },
     *           trackSegmentSize: 5,
     *           numberOfSegmentPerColor: 4,
     *           numLanes: 3,
     *           laneWidth: 0.02,
     *           trackParam: {
     *               numZones:    12, // number of different portions of the track
     *               zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
     *           },
     *           // Information regarding current controllable_car's car
     *           controllable_car: {
     *               position: 10,
     *               speed: 0,
     *               acceleration: 0.05,
     *               deceleration: 0.04,
     *               breaking: 0.3,
     *               turning: 5.0,
     *               posx: 0,
     *               maxSpeed: 20
     *           },
     *           objects: ["tree","stump","boulder","tree2","brunetteGirlBack","bush2","hatManBack"],
     *           obstacle: ["dead_tree2","column","dearRight"],
     *           obstaclePerIteration: 20,
     *           trackColors: {
     *               grass1: "#699864",
     *               border1: "#e00",
     *               border2: "#fff",
     *               outborder1: "#496a46",
     *               outborder_end1: "#474747",
     *               track_segment1: "#777",
     *               lane1: "#fff",
     *               lane2: "#777",
     *               laneArrow1: "#00FF00",
     *               track_segment_end:"#000",
     *               lane_end: "#fff"
     *           },
     *           callback: onMessageReceived
     *       });
     *
     *       // Reveals TrackGenerator Widget
     *       trackGenerator.prototype.render(); 
     *      
     *       // Creates the track randomly
     *       trackGenerator.generateTrackCurvesSlopes();    
     *     }
     * });
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.generateTrackCurvesSlopes = function () {
        this.loadFile();
        setTimeout(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() {   //Return a function in the context of 'self'
                    //Thing you wanted to run as non-window 'this'
                    // Generate current Zone
                    let sprite = false;
                    let spritePos = null;
                    let spritePosgeneratedObstaclesRandom = null;
                    let spritePosRightRandom = null;
                    let spritePosLeftRandom =  null;
                    let spriteTypeRandom = null;
                    let chooseIndexFromObjects=null;
                    let chooseObjectFromDesiredObjects=null;
                    let chooseIndexFromObstacle=null;
                    let chooseObstacleFromDesiredObstacle=null;
                    let spriteSidesRandom = null;
                    let slopesTransitionRandom = null;
                    let curvesTransitionRandom = null;
                    let spritesAvailableLength = self.spritesAvailable.length;
                    let index=null;

                    let heightType = 0; //0=plain 1=up -1=down
                    let slopesTransitions = {
                        plainToUpToDownTransition: [0,1,-1],
                        plainToDownToDownTransition: [0,-1,-1],
                        plainToUpToUpTransition: [0,1,1]
                    };

                    let curveType = 0; //0=straight 1=left -1=right
                    let curvesTransitions = {
                        straightToLeftToRightTransition: [0,1,-1],
                        straightToRightToRightTransition: [0,-1,-1],
                        straightToLeftToLeftTransition: [0,1,1]
                    };

                    let currentZone = {
                        height: 0,
                        curve: 0
                    };

                    let iter = self.params.numZones;

                    while(iter){
                        // Generate current Zone
                        let intendedHeightForCurrentZone;
                        switch(heightType){
                            case 0:
                                intendedHeightForCurrentZone = 0; break;
                            case 1:
                                intendedHeightForCurrentZone = 900 * self.randomPos(); break;
                            case -1:
                                intendedHeightForCurrentZone = - 900 * self.randomPos(); break;
                        }
                        let intendedCurveForCurrentZone;
                        switch(curveType){
                            case 0:
                                intendedCurveForCurrentZone = 0; break;
                            case 1:
                                intendedCurveForCurrentZone = - 400 * self.randomPos(); break;
                            case -1:
                                intendedCurveForCurrentZone = 400 * self.randomPos(); break;
                        }
                        
                        for(let i=0; i < self.params.zoneSize; i++){
                            // generates random integer numbers between 0 and objects.length(there are objects.length sprites desired to draw)
                            chooseIndexFromObjects = Math.floor((self.randomPos() * self.objects.length));
                            chooseObjectFromDesiredObjects=self.objects[chooseIndexFromObjects];
                            index = self.spritesAvailable.findIndex(el => el.name === chooseObjectFromDesiredObjects);

                            // generates random integer numbers between 1 and 2
                            spriteSidesRandom = Math.floor((self.randomPos() * 2) + 1);
                
                            spritePosgeneratedObstaclesRandom = self.randomPos() - 0.5;
                            
                            if(i%self.obstaclePerIteration==0){
                                // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                                // generates random integer numbers between 0 and obstacle.length(there are obstacle.length sprites desired to draw)
                                chooseIndexFromObstacle = Math.floor((self.randomPos() * self.obstacle.length));
                                chooseObstacleFromDesiredObstacle=self.obstacle[chooseIndexFromObstacle];
                                index = self.spritesAvailable.findIndex(el => el.name === chooseObstacleFromDesiredObstacle);
                                self.generatedObstacles.push(spritePosgeneratedObstaclesRandom);
                                // spritePosgeneratedObstaclesRandom has the relative position of the obstacle
                                sprite = {type: self.spritesAvailable[index].value, pos: spritePosgeneratedObstaclesRandom, obstacle: 1};
                            }
                            else {
                                // choose randomly sprite image
                                // generates random float numbers greater than 0.55
                                spritePosRightRandom = self.randomPos() + 0.90;
                                // generates random float numbers lesser than -0.55
                                spritePosLeftRandom =  (self.randomPos() * -0.56) - 0.56;
                
                                // choose randomly sprite size
                                if(spriteSidesRandom == 1){
                                    spritePos = spritePosLeftRandom;
                                }else if(spriteSidesRandom == 2){
                                    spritePos = spritePosRightRandom;
                                }
                                if(self.randomPos() < 0.25){
                                    sprite = {type: self.spritesAvailable[index].value, pos: spritePos-0.5, obstacle: 0};
                                } if(self.randomPos() < 0.5){
                                    sprite = {type: self.spritesAvailable[index].value, pos: spritePos, obstacle: 0};
                                }else{
                                    sprite = {type: self.spritesAvailable[index].value, pos: 3*spritePos, obstacle: 0};
                                }
                            }
                           
                            self.generatedTrack.push({
                                height: currentZone.height+intendedHeightForCurrentZone / 2 * (1 + Math.sin(i/self.params.zoneSize * Math.PI-Math.PI/2)),
                                curve: currentZone.curve+intendedCurveForCurrentZone / 2 * (1 + Math.sin(i/self.params.zoneSize * Math.PI-Math.PI/2)),
                                sprite: sprite
                            })
                        }
                        currentZone.height += intendedHeightForCurrentZone;
                        currentZone.curve += intendedCurveForCurrentZone;
                
                        // Find next zone
                        if(self.randomPos() < 0.8){
                            slopesTransitionRandom = 1+Math.round(self.randomPos());
                        }else {
                            slopesTransitionRandom = 0;
                        }
                
                        if(self.randomPos() < 0.8){
                            curvesTransitionRandom = 1+Math.round(self.randomPos());
                        }else {
                            curvesTransitionRandom = 0;
                        }
                
                        switch(heightType){
                            case 0:
                                heightType = slopesTransitions.plainToUpToDownTransition[slopesTransitionRandom]; break;
                            case 1:
                                heightType = slopesTransitions.plainToDownToDownTransition[slopesTransitionRandom]; break;
                            case -1:
                                heightType = slopesTransitions.plainToUpToUpTransition[slopesTransitionRandom]; break;
                        }
                
                        switch(curveType){
                            case 0:
                                curveType = curvesTransitions.straightToLeftToRightTransition[curvesTransitionRandom]; break;
                            case 1:
                                curveType = curvesTransitions.straightToRightToRightTransition[curvesTransitionRandom]; break;
                            case -1:
                                curveType = curvesTransitions.straightToLeftToLeftTransition[curvesTransitionRandom]; break;
                        }
                
                        iter--;
                    }
                    self.params.numZones = self.params.numZones * self.params.zoneSize;

                    self.generatedJSON = {
                        controllable_car: self.controllable_car,
                        laneWidth: self.laneWidth,
                        numLanes: self.numLanes,
                        numberOfSegmentPerColor: self.numberOfSegmentPerColor,
                        render: self.renderCanvas,
                        track: self.generatedTrack,
                        trackParam: self.trackParam,
                        trackSegmentSize: self.trackSegmentSize,
                        trackColors: self.trackColors
                    };

                    setTimeout(
                        (function(self2) {         //Self-executing func which takes 'this' as self
                            return function() {   //Return a function in the context of 'self'
                                d3.select("#created_"+self2.TRACKGENERATORID).text("Success: True"); 
                                // TODO writeFile track.json with its content with Paolo Masci new API (when it has been implemented)
                                // console.log(self2.generatedJSON);
                                console.log(JSON.stringify(self2.generatedJSON));
                            }
                        })(self),
                        1000     //normal interval, 'this' scope not impacted here.
                    ); 
                }
            })(this),
            50     //normal interval, 'this' scope not impacted here.
        );
        return this;
    };

    /**
     * @function generateStraightTrack
     * @public 
     * @description GenerateStraightTrack method of the TrackGenerator widget. This method generates the straight line simulator version.
     * Every obstaclePerIteration iterations an obstacle is randomly placed on a part of the track, i.e. between the track and landscape separators.
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no).
     * It also has information about the randomly generated position and the type of sprite, i.e. the sprite provided as opt from the available list (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), a value is randomly generated to decide in which side it will be placed (spriteSidesRandom).
     * Then the position on that side is also randomly generated in spritePos (given by spritePosRightRandom or spritePosLeftRandom).
     * Before finishing, another random number is generated to know how far to put the sprite on the selected side in relation to the landscape/track separator, in order to have
     * sprites randomly scattered, but balanced (instead of being concentrated in a given area).
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in and whether those are obstacles or not,
     * a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
     * within this context on the PVSio-web platform.
     * @example <caption>Usage of public API to create randomly track, with only straight lines.</caption>
     * define(function (require, exports, module) {
     *     "use strict";
     *
     *     // Require the TrackGenerator module
     *     require("widgets/car/TrackGenerator");
     *
     *     function main() {
     *       // After TrackGenerator module was loaded, initialize it
     *       let trackGenerator = new TrackGenerator("trackGeneratorWidget", {
     *           top: 80,
     *           left: 650,
     *           width: 780,
     *           height: 650
     *       }, {
     *           parent: "content", // defines parent div, which is div id="body" by default
     *           spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
     *           render: {
     *               width: 320,
     *               height: 240,
     *               depthOfField: 150,
     *               camera_distance: 30,
     *               camera_height: 100
     *           },
     *           trackSegmentSize: 5,
     *           numberOfSegmentPerColor: 4,
     *           numLanes: 3,
     *           laneWidth: 0.02,
     *           trackParam: {
     *               numZones:    12, // number of different portions of the track
     *               zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
     *           },
     *           // Information regarding current controllable_car's car
     *           controllable_car: {
     *               position: 10,
     *               speed: 0,
     *               acceleration: 0.05,
     *               deceleration: 0.04,
     *               breaking: 0.3,
     *               turning: 5.0,
     *               posx: 0,
     *               maxSpeed: 20
     *           },
     *           objects: ["tree","stump","boulder","tree2","brunetteGirlBack","bush2","hatManBack"],
     *           obstacle: ["dead_tree2","column","dearRight"],
     *           obstaclePerIteration: 20,
     *           trackColors: {
     *               grass1: "#699864",
     *               border1: "#e00",
     *               border2: "#fff",
     *               outborder1: "#496a46",
     *               outborder_end1: "#474747",
     *               track_segment1: "#777",
     *               lane1: "#fff",
     *               lane2: "#777",
     *               laneArrow1: "#00FF00",
     *               track_segment_end:"#000",
     *               lane_end: "#fff"
     *           },
     *           callback: onMessageReceived
     *       });
     *
     *       // Reveals TrackGenerator Widget
     *       trackGenerator.prototype.render(); 
     *      
     *       // Creates the track randomly
     *       trackGenerator.generateStraightTrack();    
     *     }
     * });
     * @memberof module:TrackGenerator
     * @instance
     */ 
    TrackGenerator.prototype.generateStraightTrack = function () {
        this.loadFile();
        setTimeout(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() {   //Return a function in the context of 'self'
                    //Thing you wanted to run as non-window 'this'
                    // Generate current Zone
                    let numIterations = self.params.numZones * self.params.zoneSize;
                    let sprite = false;
                    let spritePos = null;
                    let spritePosgeneratedObstaclesRandom = null;
                    let spritePosRightRandom = null;
                    let spritePosLeftRandom =  null;
                    let spriteTypeRandom = null;
                    let spriteSidesRandom = null;
                    let spritesAvailableLength = self.spritesAvailable.length;
                
                    for(let i=0; i < numIterations; i++){            
                        // generates random integer numbers between 0 and spritesAvailable.length
                        spriteTypeRandom = Math.floor(self.randomPos() * spritesAvailableLength);
                        // generates random integer numbers between 1 and 2
                        spriteSidesRandom = Math.floor((self.randomPos() * 2) + 1);
                
                        spritePosgeneratedObstaclesRandom = self.randomPos() - 0.5;
                        
                        if(self.spritesAvailable[spriteTypeRandom].name.match(/car[0-9]?/)===null && self.spritesAvailable[spriteTypeRandom].name.match(/background[0-9]?/)===null && self.spritesAvailable[spriteTypeRandom].name.match(/logo[0-9]?/)===null){
                            if(i%self.obstaclePerIteration===0){
                                self.obstacle.forEach((element) => {
                                    let index = self.spritesAvailable.findIndex(el => el.name === element);
                                    // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                                    self.generatedObstacles.push(spritePosgeneratedObstaclesRandom);
                                    // spritePosgeneratedObstaclesRandom has the relative position of the obstacle
                                    sprite = {type: self.spritesAvailable[index].value, pos: spritePosgeneratedObstaclesRandom, obstacle: 1};
                                    
                                    self.generatedTrack.push({
                                        height: 0,
                                        curve: 0,
                                        sprite: sprite
                                    });
                                });
                            }else{
                                self.objects.forEach((element) => {
                                    // console.log(element);
                                    let index = self.spritesAvailable.findIndex(el => el.name === element);
                                    // generates random float numbers greater than 0.55
                                    spritePosRightRandom = self.randomPos() + 0.90;
                                    // generates random float numbers lesser than -0.55
                                    spritePosLeftRandom =  (self.randomPos() * -0.56) - 0.56;
                
                                    // choose randomly sprite size
                                    if(spriteSidesRandom === 1){
                                        spritePos = spritePosLeftRandom;
                                    }else if(spriteSidesRandom === 2){
                                        spritePos = spritePosRightRandom;
                                    }
                
                                    if(self.randomPos() < 0.25){
                                        sprite = {type: self.spritesAvailable[index].value, pos: spritePos-0.5, obstacle: 0};
                                    } if(self.randomPos() < 0.5){
                                        sprite = {type: self.spritesAvailable[index].value, pos: spritePos, obstacle: 0};
                                    }else{
                                        sprite = {type: self.spritesAvailable[index].value, pos: 3*spritePos, obstacle: 0};
                                    }

                                    self.generatedTrack.push({
                                        height: 0,
                                        curve: 0,
                                        sprite: sprite
                                    });
                                });
                            }
                        }
                    }

                    self.params.numZones = numIterations; 

                    self.generatedJSON = {
                        controllable_car: self.controllable_car,
                        laneWidth: self.laneWidth,
                        numLanes: self.numLanes,
                        numberOfSegmentPerColor: self.numberOfSegmentPerColor,
                        render: self.renderCanvas,
                        track: self.generatedTrack,
                        trackParam: self.trackParam,
                        trackSegmentSize: self.trackSegmentSize,
                        trackColors: self.trackColors
                    };

                    setTimeout(
                        (function(self2) {         //Self-executing func which takes 'this' as self
                            return function() {   //Return a function in the context of 'self'
                                d3.select("#created_"+self2.TRACKGENERATORID).text("Success: True"); 
                                // TODO writeFile track.json with its content with Paolo Masci new API (when it has been implemented)
                                // console.log(self2.generatedJSON);
                                console.log(JSON.stringify(self2.generatedJSON));
                            }
                        })(self),
                        1000     //normal interval, 'this' scope not impacted here.
                    ); 
                }
            })(this),
            50     //normal interval, 'this' scope not impacted here.
        );
        return this;
    };


    /**
     * @function loadFile
     * @private
     * @description LoadFile method of the TrackGenerator widget. This method loads the desired JSON File.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.loadFile = function () {
        setTimeout(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() {   //Return a function in the context of 'self'
                    self.spritesheetJSON = d3.select("#spritesheet_file_loaded_opt_field_"+self.TRACKGENERATORID)[0][0].innerHTML; //Thing you wanted to run as non-window 'this'
                    if(self.spritesheetJSON){
                       self.spritesReadJSON = JSON.parse(self.spritesheetJSON);
                       // Reading all JSON Sprites Available
                       for(let k=0;k<self.spritesReadJSON.frames.length;k++){
                           self.spritesAvailable[k]={
                               name:self.spritesReadJSON.frames[k].filename.split(".")[0],
                               value:self.spritesReadJSON.frames[k].frame
                           };
                       }    
                   }
                }
            })(this),
            50     //normal interval, 'this' scope not impacted here.
        );
        return this;
    };

    /**
     * @function hide
     * @public 
     * @description Hide method of the TrackGenerator widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @public 
     * @description Reveal method of the TrackGenerator widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

    /**
     * @function render
     * @public
     * @description Render method of the TrackGenerator widget. This method reveals the widget.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.render = function () {
        return this.reveal();
    };

    module.exports = TrackGenerator;
});
