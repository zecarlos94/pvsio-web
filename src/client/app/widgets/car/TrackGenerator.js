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
 *           // Information regarding current controllable_vehicle's car
 *           controllable_vehicle: {
 *               position: 10,
 *               speed: 0,
 *               acceleration: 0.05,
 *               deceleration: 0.04,
 *               breaking: 0.3,
 *               turning: 5.0,
 *               posx: 0,
 *               maxSpeed: 20
 *           },
 *           objects: [
 *            {
 *                filename:"real_tree3",
 *                scale: 1,
 *                positionsX: [
 *                     -0.8,
 *                     0.6
 *                ]
 *             },
 *             {
 *                 filename:"real_tree4",
 *                 scale: 1,
 *                 positionsX: [
 *                     -0.6,
 *                     0.8
 *                 ]
 *             },
 *             {
 *                 filename:"real_building",
 *                 scale: 1,
 *                 positionsX: [
 *                     -0.7,
 *                    0.9
 *                 ]
 *             },
 *            {
 *                filename:"real_building2",
 *                scale: 1,
 *                positionsX: [
 *                     -0.9,
 *                     0.7
 *                 ]
 *            },
 *             {
 *                 filename:"real_skyscraper",
 *                 scale: 1,
 *                 positionsX: [
 *                     1.9,
 *                     -1.7
 *                 ]
 *             }
 *           ],
 *           obstacle: [
 *             {
 *                 filename:"30kmh_limit",
 *                 scale: 1,
 *                 positionsX: [
 *                     0.1
 *                 ]
 *            },
 *             {
 *                filename:"horizontal_pedrestrian_crossing_rubber_bump",
 *                scale: 1,
 *                positionsX: [
 *                     -0.1
 *                 ]
 *             },
 *             {
 *                 filename:"under_construction_barrier",
 *                 scale: 1,
 *                 positionsX: [
 *                    0.4
 *                 ]
 *             },
 *             {
 *                filename:"traffic_cone",
 *                scale: 1,
 *                positionsX: [
 *                     -0.4
 *                 ]
 *             },
 *             {
 *                filename:"traffic_light_red",
 *                scale: 1,
 *                positionsX: [
 *                     0
 *                 ]
 *             }
 *           ],
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
 *                   numZones: 3,
 *                   trafficSignals: [
 *                       {
 *                           filename:"traffic_cone",
 *                           scale: 1,
 *                           zone: 1,
 *                           posX: -0.4,
 *                           zoneDistance: 30 // (max distance is zoneSize) 
 *                       },
 *                       {
 *                           filename:"under_construction_barrier", 
 *                           scale: 1,
 *                           zone: 3,
 *                           posX: 0.4,
 *                           zoneDistance: 100
 *                       }
 *                  ]
 *                },
 *               {
 *                   topography: {
 *                       name:"straight",
 *                       curvature: 0
 *                   },
 *                   profile: "down",
 *                   numZones: 3,
 *                   trafficSignals: [
 *                       {
 *                           filename:"traffic_cone",
 *                           scale: 1,
 *                           zone: 1,
 *                           posX: -0.4,
 *                           zoneDistance: 30 // (max distance is zoneSize) 
 *                       },
 *                       {
 *                           filename:"under_construction_barrier",
 *                           scale: 1,
 *                           zone: 3,
 *                           posX: 0.4,
 *                           zoneDistance: 100
 *                       }
 *                  ]
 *               },
 *               {
 *                   topography: {
 *                       name:"right",
 *                       curvature: 90
 *                   },
 *                   profile: "flat",
 *                   numZones: 3,
 *                   trafficSignals: [
 *                       {
 *                           filename:"traffic_cone",
 *                           scale: 1,
 *                           zone: 1,
 *                           posX: -0.4,
 *                           zoneDistance: 30 // (max distance is zoneSize) 
 *                       },
 *                       {
 *                           filename:"under_construction_barrier", 
 *                           scale: 1,
 *                           zone: 3,
 *                           posX: 0.4,
 *                           zoneDistance: 100
 *                       }
 *                  ]
 *               },
 *               {
 *                   topography: {
 *                       name:"straight",
 *                       curvature: 0
 *                   },
 *                   profile: "up",
 *                   numZones: 3,
 *                   trafficSignals: [
 *                       {
 *                           filename:"traffic_cone",
 *                           scale: 1,
 *                           zone: 1,
 *                           posX: -0.4,
 *                           zoneDistance: 30 // (max distance is zoneSize) 
 *                       },
 *                       {
 *                           filename:"under_construction_barrier", 
 *                           scale: 1,
 *                           zone: 3,
 *                           posX: 0.4,
 *                           zoneDistance: 100
 *                       }
 *                  ]
 *               },
 *               {
 *                   topography: {
 *                       name:"left",
 *                       curvature: -90
 *                   },
 *                   profile: "flat",
 *                   numZones: 3,
 *                   trafficSignals: [
 *                       {
 *                           filename:"traffic_cone",
 *                           scale: 1,
 *                           zone: 1,
 *                           posX: -0.4,
 *                           zoneDistance: 30 // (max distance is zoneSize) 
 *                       },
 *                       {
 *                           filename:"under_construction_barrier", 
 *                           scale: 1,
 *                           zone: 3,
 *                           posX: 0.4,
 *                           zoneDistance: 100
 *                       }
 *                  ]
 *               },
 *               {
 *                   topography: {
 *                       name:"straight",
 *                       curvature: 0
 *                   },
 *                   profile: "flat",
 *                   numZones: 3,
 *                   trafficSignals: [
 *                       {
 *                           filename:"traffic_cone",
 *                           scale: 1,
 *                           zone: 1,
 *                           posX: -0.4,
 *                           zoneDistance: 30 // (max distance is zoneSize) 
 *                       },
 *                       {
 *                           filename:"under_construction_barrier",
 *                           scale: 1,
 *                           zone: 3,
 *                           posX: 0.4,
 *                           zoneDistance: 100
 *                       }
 *                  ]
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
     * @param [opt.controllable_vehicle] {Object} the vehicle configurations, i.e. initial position, acceleration and deceleration values, etc (default is {position: 10, speed: 0, acceleration: 0.05, deceleration: 0.04, breaking: 0.3, turning: 5.0, posx: 0, maxSpeed: 20}).
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
        opt.controllable_vehicle = opt.controllable_vehicle;
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
        this.controllable_vehicle        = (opt.controllable_vehicle) ? opt.controllable_vehicle : { position: 10, speed: 0, acceleration: 0.05, deceleration: 0.04, breaking: 0.3, turning: 5.0, posx: 0, maxSpeed: 20 };

        this.objects  = (opt.objects) ? opt.objects : [];
        this.obstacle = (opt.obstacle) ? opt.obstacle : [];
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
                    let chooseIndexFromObjects=null;
                    let chooseObjectFromDesiredObjects=null;
                    let chooseIndexFromObstacle=null;
                    let chooseObstacleFromDesiredObstacle=null;
                    let index=null;
                    let iter = 0;
                    let finalNumZones = 0;
                    self.trackLayout.forEach(el => iter+=el.numZones);
                    finalNumZones = iter;
                    
                    let currentZone = {
                        height: 0,
                        curve: 0
                    };

                    let tmpIter=1;
                    let tmpPos=1;
                    let zoneDistanceSprite=[];
                    let scaleSprite=[];
                    let trafficSignalSprite=[];
                    let numtrafficSignalPlacement=[];
                    let zoneNumbertrafficSignalSprite=[];
                    let spriteScale=1;
                    let currentZoneNumber=0;

                    while(iter){
                        if(tmpIter<=self.trackLayout[self.trackLayout.length-tmpPos].numZones){
                            self.trackLayout[self.trackLayout.length-tmpPos].trafficSignals.forEach(el => {
                                    if(el.zone===tmpIter){
                                        index = self.spritesAvailable.findIndex(el2 => el2.name === el.filename);
                                        zoneDistanceSprite.push(el.zoneDistance);
                                        zoneNumbertrafficSignalSprite.push(el.zone);
                                        scaleSprite.push(el.scale);
                                        trafficSignalSprite.push({type: self.spritesAvailable[index].value, pos: el.posX, obstacle: 0, scale: el.scale});
                                        numtrafficSignalPlacement.push(0);
                                    }
                                }
                            );

                            tmpIter++;
                            iter--;
                            currentZoneNumber++;
                        }else{
                            tmpIter=1;
                            if(tmpPos<=self.trackLayout.length) {
                                tmpPos++;
                            }
                        }
                    }

                    let aux=0;
                    let auxTemp=0;
                    let positionsSprites=[];
                    currentZoneNumber=0;
                    index=null;
                    iter = finalNumZones;
                    tmpIter=1;
                    tmpPos=1;
                    positionsSprites.push(0);

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

                            while(zoneNumbertrafficSignalSprite[aux]===zoneNumbertrafficSignalSprite[aux+1]){
                                aux++;
                            }
                            aux++;
                            positionsSprites.push(aux);
                           
                            for(let i=0; i < self.params.zoneSize; i++){
                                sprite=false;
                                for(let k=positionsSprites[auxTemp];k<positionsSprites[auxTemp+1];k++){
                                    if(zoneNumbertrafficSignalSprite[k]===tmpIter){
                                        if(i===zoneDistanceSprite[k]){
                                            if(numtrafficSignalPlacement[k]===0){
                                                sprite=trafficSignalSprite[k];
                                                numtrafficSignalPlacement[k]=1;
                                            }else{
                                                sprite=false;                                      
                                            }
                                        }
                                    }
                                }

                                if(sprite===false){
                                    if(i%self.obstaclePerIteration==0){
                                        if(self.obstacle.length!==0){
                                            // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                                            // generates random integer numbers between 0 and obstacle.length(there are obstacle.length sprites desired to draw)
                                            chooseIndexFromObstacle = Math.floor((self.randomPos() * self.obstacle.length));
                                            chooseObstacleFromDesiredObstacle=self.obstacle[chooseIndexFromObstacle];
                                            spriteScale = chooseObstacleFromDesiredObstacle.scale;
                                            index = self.spritesAvailable.findIndex(el => el.name === chooseObstacleFromDesiredObstacle.filename);
                                            sprite = {type: self.spritesAvailable[index].value, pos: chooseObstacleFromDesiredObstacle.positionsX[Math.floor((self.randomPos() * (chooseObstacleFromDesiredObstacle.positionsX.length)))], obstacle: 1, scale: spriteScale};
                                        }
                                    }
                                    else {
                                        if(self.objects.length!==0){
                                            // generates random integer numbers between 0 and objects.length(there are objects.length sprites desired to draw)
                                            chooseIndexFromObjects = Math.floor(self.randomPos() * (self.objects.length));
                                            chooseObjectFromDesiredObjects=self.objects[chooseIndexFromObjects];
                                            spriteScale = chooseObjectFromDesiredObjects.scale;
                                            index = self.spritesAvailable.findIndex(el => el.name === chooseObjectFromDesiredObjects.filename);
                                            sprite = {type: self.spritesAvailable[index].value, pos: chooseObjectFromDesiredObjects.positionsX[Math.floor((self.randomPos() * (chooseObjectFromDesiredObjects.positionsX.length)))], obstacle: 0, scale: spriteScale};
                                        }
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
                            currentZoneNumber++;

                            auxTemp++;

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
                        controllable_vehicle: self.controllable_vehicle,
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
     *           // Information regarding current controllable_vehicle's car
     *           controllable_vehicle: {
     *               position: 10,
     *               speed: 0,
     *               acceleration: 0.05,
     *               deceleration: 0.04,
     *               breaking: 0.3,
     *               turning: 5.0,
     *               posx: 0,
     *               maxSpeed: 20
     *           },
     *           objects: [
     *            {
     *                filename:"real_tree3",
     *                scale: 1,
     *                positionsX: [
     *                     -0.8,
     *                     0.6
     *                ]
     *             },
     *             {
     *                 filename:"real_tree4",
     *                 scale: 1,
     *                 positionsX: [
     *                     -0.6,
     *                     0.8
     *                 ]
     *             },
     *             {
     *                 filename:"real_building",
     *                 scale: 1,
     *                 positionsX: [
     *                     -0.7,
     *                    0.9
     *                 ]
     *             },
     *            {
     *                filename:"real_building2",
     *                scale: 1,
     *                positionsX: [
     *                     -0.9,
     *                     0.7
     *                 ]
     *            },
     *             {
     *                 filename:"real_skyscraper",
     *                 scale: 1,
     *                 positionsX: [
     *                     1.9,
     *                     -1.7
     *                 ]
     *             }
     *           ],
     *           obstacle: [
     *             {
     *                 filename:"30kmh_limit",
     *                 scale: 1,
     *                 positionsX: [
     *                     0.1
     *                 ]
     *            },
     *             {
     *                filename:"horizontal_pedrestrian_crossing_rubber_bump",
     *                scale: 1,
     *                positionsX: [
     *                     -0.1
     *                 ]
     *             },
     *             {
     *                 filename:"under_construction_barrier",
     *                 scale: 1,
     *                 positionsX: [
     *                    0.4
     *                 ]
     *             },
     *             {
     *                filename:"traffic_cone",
     *                scale: 1,
     *                positionsX: [
     *                     -0.4
     *                 ]
     *             },
     *             {
     *                filename:"traffic_light_red",
     *                scale: 1,
     *                positionsX: [
     *                     0
     *                 ]
     *             }
     *           ],
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
                    let chooseIndexFromObjects=null;
                    let chooseObjectFromDesiredObjects=null;
                    let chooseIndexFromObstacle=null;
                    let chooseObstacleFromDesiredObstacle=null;
                    let slopesTransitionRandom = null;
                    let curvesTransitionRandom = null;
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
                    let spriteScale=1;

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
                            if(i%self.obstaclePerIteration==0){
                                if(self.obstacle.length!==0){
                                    // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                                    // generates random integer numbers between 0 and obstacle.length(there are obstacle.length sprites desired to draw)
                                    chooseIndexFromObstacle = Math.floor((self.randomPos() * self.obstacle.length));
                                    chooseObstacleFromDesiredObstacle=self.obstacle[chooseIndexFromObstacle];
                                    index = self.spritesAvailable.findIndex(el => el.name === chooseObstacleFromDesiredObstacle.filename);
                                    spriteScale = chooseObstacleFromDesiredObstacle.scale;
                                    sprite = {type: self.spritesAvailable[index].value, pos: chooseObstacleFromDesiredObstacle.positionsX[Math.floor((self.randomPos() * (chooseObstacleFromDesiredObstacle.positionsX.length)))], obstacle: 1, scale: spriteScale};
                                }
                            }
                            else {
                                if(self.objects.length!==0){
                                    // generates random integer numbers between 0 and objects.length(there are objects.length sprites desired to draw)
                                    chooseIndexFromObjects = Math.floor((self.randomPos() * self.objects.length));
                                    chooseObjectFromDesiredObjects=self.objects[chooseIndexFromObjects];
                                    index = self.spritesAvailable.findIndex(el => el.name === chooseObjectFromDesiredObjects.filename);
                                    spriteScale = chooseObjectFromDesiredObjects.scale;
                                    sprite = {type: self.spritesAvailable[index].value, pos: chooseObjectFromDesiredObjects.positionsX[Math.floor((self.randomPos() * (chooseObjectFromDesiredObjects.positionsX.length)))], obstacle: 0, scale: spriteScale};
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
                        controllable_vehicle: self.controllable_vehicle,
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
     *           // Information regarding current controllable_vehicle's car
     *           controllable_vehicle: {
     *               position: 10,
     *               speed: 0,
     *               acceleration: 0.05,
     *               deceleration: 0.04,
     *               breaking: 0.3,
     *               turning: 5.0,
     *               posx: 0,
     *               maxSpeed: 20
     *           },
         *           objects: [
     *            {
     *                filename:"real_tree3",
     *                scale: 1,
     *                positionsX: [
     *                     -0.8,
     *                     0.6
     *                ]
     *             },
     *             {
     *                 filename:"real_tree4",
     *                 scale: 1,
     *                 positionsX: [
     *                     -0.6,
     *                     0.8
     *                 ]
     *             },
     *             {
     *                 filename:"real_building",
     *                 scale: 1,
     *                 positionsX: [
     *                     -0.7,
     *                    0.9
     *                 ]
     *             },
     *            {
     *                filename:"real_building2",
     *                scale: 1,
     *                positionsX: [
     *                     -0.9,
     *                     0.7
     *                 ]
     *            },
     *             {
     *                 filename:"real_skyscraper",
     *                 scale: 1,
     *                 positionsX: [
     *                     1.9,
     *                     -1.7
     *                 ]
     *             }
     *           ],
     *           obstacle: [
     *             {
     *                 filename:"30kmh_limit",
     *                 scale: 1,
     *                 positionsX: [
     *                     0.1
     *                 ]
     *            },
     *             {
     *                filename:"horizontal_pedrestrian_crossing_rubber_bump",
     *                scale: 1,
     *                positionsX: [
     *                     -0.1
     *                 ]
     *             },
     *             {
     *                 filename:"under_construction_barrier",
     *                 scale: 1,
     *                 positionsX: [
     *                    0.4
     *                 ]
     *             },
     *             {
     *                filename:"traffic_cone",
     *                scale: 1,
     *                positionsX: [
     *                     -0.4
     *                 ]
     *             },
     *             {
     *                filename:"traffic_light_red",
     *                scale: 1,
     *                positionsX: [
     *                     0
     *                 ]
     *             }
     *           ],
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
                    let spriteScale=1;
                    let chooseIndexFromObjects=null;
                    let chooseObjectFromDesiredObjects=null;
                    let chooseIndexFromObstacle=null;
                    let chooseObstacleFromDesiredObstacle=null;
                    let index=null;
                
                    for(let i=0; i < numIterations; i++){            
                        if(i%self.obstaclePerIteration==0){
                            if(self.obstacle.length!==0){
                                // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                                // generates random integer numbers between 0 and obstacle.length(there are obstacle.length sprites desired to draw)
                                chooseIndexFromObstacle = Math.floor((self.randomPos() * self.obstacle.length));
                                chooseObstacleFromDesiredObstacle=self.obstacle[chooseIndexFromObstacle];
                                index = self.spritesAvailable.findIndex(el => el.name === chooseObstacleFromDesiredObstacle.filename);
                                spriteScale = chooseObstacleFromDesiredObstacle.scale;
                                sprite = {type: self.spritesAvailable[index].value, pos: chooseObstacleFromDesiredObstacle.positionsX[Math.floor((self.randomPos() * (chooseObstacleFromDesiredObstacle.positionsX.length)))], obstacle: 1, scale: spriteScale};
                            }
                        }
                        else {
                            if(self.objects.length!==0){
                                // generates random integer numbers between 0 and objects.length(there are objects.length sprites desired to draw)
                                chooseIndexFromObjects = Math.floor((self.randomPos() * self.objects.length));
                                chooseObjectFromDesiredObjects=self.objects[chooseIndexFromObjects];
                                index = self.spritesAvailable.findIndex(el => el.name === chooseObjectFromDesiredObjects.filename);
                                spriteScale = chooseObjectFromDesiredObjects.scale;
                                sprite = {type: self.spritesAvailable[index].value, pos: chooseObjectFromDesiredObjects.positionsX[Math.floor((self.randomPos() * (chooseObjectFromDesiredObjects.positionsX.length)))], obstacle: 0, scale: spriteScale};
                            }
                        }

                        self.generatedTrack.push({
                            height: 0,
                            curve: 0,
                            sprite: sprite
                        })
                    }

                    self.params.numZones = numIterations; 

                    self.generatedJSON = {
                        controllable_vehicle: self.controllable_vehicle,
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
     * @function generateRoad
     * @public
     * @description GenerateRoad method of the Arcade widget.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.generateRoad = function () { 
        this.lap = 1;
        this.numLaps = 3;
        this.r = Math.random;
        
        this.canvas;
        this.context;
        this.lastDelta = 0;
        this.currentTimeString = "";
        
        this.roadParam = {
            maxHeight: 900,
            maxCurve:  900,
            length:    10,
            curvy:     0.8,
            mountainy: 0.8,
            zoneSize:  250
        }
            
        this.road = [];
        this.roadSegmentSize = 5;
        this.numberOfSegmentPerColor = 4;
        
        this.renderCanvas = {
            width: 1440,
            height: 650,
            depthOfField: 150,
            camera_distance: 30,
            camera_height: 320
        };
        
        this.player = {
            position: 10,
            speed: 0,
            acceleration: 0.05,
            deceleration: 0.3,
            breaking: 0.6,
            turning: 5.0,
            posx: 0,
            maxSpeed: 15
        };
        
        this.splashInterval;
        this.gameInterval;
        
        this.car = { 
            x: 0,
            y: 130,
            w: 69,
            h: 38
        };
        this.car_4 = { 
            x: 70,
            y: 130,
            w: 77,
            h: 38
        };
        this.car_8 = { 
            x: 148,
            y: 130,
            w: 77,
            h: 38
        };
        
        this.background = {
            x: 0,
            y: 9,
            w: 320,
            h: 120
        };
        
        this.tree = {
            x: 321,
            y: 9,
            w: 23,
            h: 50
        };
        this.rock = {
            x: 345,
            y: 9,
            w: 11,
            h: 14
        };
        
        this.logo = {
            x: 161,
            y: 39,
            w: 115,
            h: 20
        };

        let currentStateH = 0; //0=flat 1=up 2= down
        let transitionH = [[0,1,2],[0,2,2],[0,1,1]];
        
        let currentStateC = 0; //0=straight 1=left 2= right
        let transitionC = [[0,1,2],[0,2,2],[0,1,1]];

        let currentHeight = 0;
        let currentCurve  = 0;

        let zones     = this.roadParam.length;
        while(zones--){
            // Generate current Zone
            let finalHeight;
            switch(currentStateH){
                case 0:
                    finalHeight = 0; break;
                case 1:
                    finalHeight = this.roadParam.maxHeight * this.r(); break;
                case 2:
                    finalHeight = - this.roadParam.maxHeight * this.r(); break;
            }
            let finalCurve;
            switch(currentStateC){
                case 0:
                    finalCurve = 0; break;
                case 1:
                    finalCurve = - this.roadParam.maxCurve * this.r(); break;
                case 2:
                    finalCurve = this.roadParam.maxCurve * this.r(); break;
            }
            let sprite;
            for(let i=0; i < this.roadParam.zoneSize; i++){
                // add a tree
                if(i % this.roadParam.zoneSize / 4 == 0){
                    sprite = {type: this.rock, pos: -0.55};
                } else {
                    if(this.r() < 0.05) {
                        let spriteType = this.tree;
                        sprite = {type: spriteType, pos: 0.6 + 4*this.r()};
                        if(this.r() < 0.5){
                            sprite.pos = -sprite.pos;
                        }
                    } else {
                        sprite = false;
                    }
                }

                this.road.push({
                    height: currentHeight+finalHeight / 2 * (1 + Math.sin(i/this.roadParam.zoneSize * Math.PI-Math.PI/2)),
                    curve: currentCurve+finalCurve / 2 * (1 + Math.sin(i/this.roadParam.zoneSize * Math.PI-Math.PI/2)),
                    sprite: sprite
                })

            }
            currentHeight += finalHeight;
            currentCurve += finalCurve;

            if(zones===1){
                // Find next zone
                currentStateH = transitionH[currentStateH][0];
                
                currentStateC = transitionC[currentStateC][2];
               
            }else{
                // Find next zone
                if(this.r() < this.roadParam.mountainy){
                    currentStateH = transitionH[currentStateH][1+Math.round(this.r())];
                } else {
                    currentStateH = transitionH[currentStateH][0];
                }
                if(this.r() < this.roadParam.curvy){
                    currentStateC = transitionC[currentStateC][1+Math.round(this.r())];
                } else {
                    currentStateC = transitionC[currentStateC][0];
                }
            }

        }

        this.generatedJSON = {
            controllable_vehicle: this.player,
            laneWidth: 0.02,
            numLanes: 2,
            numberOfSegmentPerColor: this.numberOfSegmentPerColor,
            render: this.renderCanvas,
            track: this.road,
            trackParam: this.roadParam,
            trackSegmentSize: this.roadSegmentSize,
            trackColors: {"grass1":"#344C32","border1":"#ffa500","border2":"#ffffff","outborder1":"#7F967D","outborder_end1":"#474747","track_segment1":"#777777","lane1":"#ffffff","lane2":"#777777","laneArrow1":"#ffff00","track_segment_end":"#000000","lane_end":"#ffffff"}
        };

        this.roadParam.length = this.roadParam.length * this.roadParam.zoneSize;


        setTimeout(
            (function(self) {         
                return function() {   
                    d3.select("#created_"+self.TRACKGENERATORID).text("Success: True"); 
                    console.log(JSON.stringify(self.generatedJSON));
                }
            })(this),
            1000     //normal interval, 'this' scope not impacted here.
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
