/**
 * @module TrackGenerator
 * @version 3.0.0
 * @author José Carlos
 * @desc This module allows to either generate randomly or generate based on trackLayout optional field the track, which will be used to create the environment of the 2D driving simulator, using HTML5 Canvas.
 * The trackLayout optional field allows to specifiy the desired layout, which will be parsed and iterated to create all segments that matches that layout.
 *
 * @date Apr 02, 2018
 * last modified @date Sept 04, 2018
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
 *           imagePath: "track_generator_simulator_for_paper/img/",
 *           spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *           render: {
 *               depthOfField: 150,
 *               camera_distance: 30,
 *               camera_height: 320
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
 *               deceleration: 0.3,
 *               breaking: 0.6,
 *               turning: 5.0,
 *               posx: 0,
 *               maxSpeed: 15
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
 *               // describing the desired track, which is a 12-zone straight line, i.e. track with only straight lines with length 12, and it will place a 'traffic_cone'
 *               // sprite on zone 10, on horizontal position -0.5 (right side the track) at a distance of 80 in relation with the zoneSize (by default is 250). 
 *               {
 *                   topography: {
 *                       name:"straight",
 *                       curvature: 0
 *                   },
 *                   profile: "flat",
 *                   numZones: 12,
 *                   trafficSignals: [
 *                       {
 *                           filename:"traffic_cone",
 *                           scale: 3.4,
 *                           zone: 10,
 *                           posX: -0.5,
 *                           zoneDistance: 80 // (max distance is zoneSize) 
 *                       }
 *                  ]
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
     * @private
     * @description Constructor for the TrackGenerator widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     * @param [opt.parent] {String} the HTML element where the display will be appended (default is "body").
     * @param [opt.spritesFilename] {String} the spritesheet filename(json file) that will be loaded (default is "spritesheet").
     * @param [opt.render] {Object} the rendering configurations, i.e. width, height, etc. (default is {depthOfField: 150, camera_distance: 30, camera_height: 320}).
     * @param [opt.trackSegmentSize] {Int} the size of the track segment (default is 5).
     * @param [opt.numberOfSegmentPerColor] {Int} the number of segments per color, i.e. how many sequenced segments to alternate colors (default is 4).
     * @param [opt.numLanes] {Int} the number of lanes the track will be draw (default is 3).
     * @param [opt.laneWidth] {Float} the width of the lane separator (default is 0.02).
     * @param [opt.trackParam] {Object} the track configurations, i.e. number of zones(track length), etc (default is {numZones: 12, zoneSize: 250}).
     * @param [opt.controllable_vehicle] {Object} the vehicle configurations, i.e. initial position, acceleration and deceleration values, etc (default is {position: 10, speed: 0, acceleration: 0.05, deceleration: 0.3, breaking: 0.6, turning: 5.0, posx: 0, maxSpeed: 15}).
     * @param [opt.objects] {Array} the sprite names to be drawed in the landscape (default is []).
     * @param [opt.obstacle] {Array} the sprite names to be drawed within the track as obstacles (default is []).
     * @param [opt.trackLayout] {Array} the track layout that will be used to create the corresponding segments. (default is []).
     * @param [opt.trackColors] {Array} the track colors that will be used to color the segments in each stripe. (default is {grass1: "#699864", border1: "#e00", border2: "#fff", outborder1: "#496a46", outborder_end1: "#474747", track_segment1: "#777", lane1: "#fff", lane2: "#777", laneArrow1: "#00FF00", track_segment_end:"#000", lane_end: "#fff"}).
     * @param [opt.obstaclePerIteration] {Int} the number of iterations where a new obstacle will be placed within the track (default is 50).
     * @param [opt.imagePath] {String} the image path with spritsheet to load. (default is "../../client/app/widgets/car/configurations/").
     * @returns {TrackGenerator} The created instance of the widget TrackGenerator.
     * @memberof module:TrackGenerator
     * @instance
     */
    function TrackGenerator(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent;
        opt.imagePath = opt.imagePath;
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
        
        this.renderCanvas            = (opt.render) ? opt.render : { depthOfField: 150, camera_distance: 30, camera_height: 320 };
        this.trackSegmentSize        = (opt.trackSegmentSize) ? opt.trackSegmentSize : 5;
        this.numberOfSegmentPerColor = (opt.numberOfSegmentPerColor) ? opt.numberOfSegmentPerColor : 4;
        this.numLanes                = (opt.numLanes) ? opt.numLanes : 3;
        this.laneWidth               = (opt.laneWidth) ? opt.laneWidth: 0.02;
        this.trackParam              = (opt.trackParam) ? opt.trackParam : { numZones: 12, /*number of different portions of the track*/ zoneSize:  250 /*length of each numZones (the bigger this value. the longer it will take to finish)*/ };        
        this.params                  = JSON.parse(JSON.stringify(this.trackParam));
        this.controllable_vehicle        = (opt.controllable_vehicle) ? opt.controllable_vehicle : { position: 10, speed: 0, acceleration: 0.05, deceleration: 0.3, breaking: 0.6, turning: 5.0, posx: 0, maxSpeed: 15 };

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

        // let trackLayout2 = [];        
        // this.trackLayout.forEach(el => trackLayout2.unshift(el));
        // this.trackLayout = trackLayout2;

        this.imagePath = (opt.imagePath) ? (opt.imagePath) : "";
        this.parent = (opt.parent) ? ("#" + opt.parent) : "body";

        this.div = d3.select(this.parent).append("div").attr("id","trackGenerator_"+this.TRACKGENERATORID);
        
        this.div.append("h2").text("Track Generator");
        this.div.append("span")
                .attr("id","created_"+this.TRACKGENERATORID)
                .text("Success: False");

        // Load spritesheet based on spritesFilename options
        let _this = this;
        let spritesheet_file;
        if(this.imagePath!==""){
            this.spritesFilename = (opt.spritesFilename) ? ("text!../../../../demos/" + this.imagePath + opt.spritesFilename + ".json") : "text!../../../../demos/" + this.imagePath + "spritesheet.json";
            spritesheet_file = "text!../../../../demos/" + this.imagePath + opt.spritesFilename + ".json";
        }else{
            this.spritesFilename = (opt.spritesFilename) ? ("text!widgets/car/configurations/" + opt.spritesFilename + ".json") : "text!widgets/car/configurations/spritesheet.json";
            spritesheet_file = "text!widgets/car/configurations/" + opt.spritesFilename + ".json";
        }

        require([spritesheet_file], function(spritesheet) {
            _this.div.append("div").attr("id", "spritesheet_file_loaded_opt_field_"+id).style("display","none").text(spritesheet);
            return _this;
        });

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
     * @private  
     * @description GenerateTrackBasedOnTrackLayoutOptField method of the TrackGenerator widget. This method generates the track present in the trackLayout opt field.
     * Every obstaclePerIteration iterations an obstacle is placed on a part of the track, based on 'positionsX' array values (horizontal positions).
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no), and has information about the scale that Arcade widget will apply,
     * when rendering that sprite, in the scale field.
     * It also has information about the position choosen from 'positionsX' array and the type of sprite, i.e. the sprite provided as opt from the available list, in 'filename' (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), the sprites provided in 'objects' opt field will be used as the 'obstacles'. That is, a new sprite will be choosen from that 
     + array, and it will use the position values obtained from its 'positionsX' array as well as the scale to apply in the rendering process.
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in, whether those are obstacles or not and what scale must be applied during 
     * the rendering process, a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
     * within this context on the PVSio-web platform.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.generateTrackBasedOnTrackLayoutOptField = function () { 
        this.loadFile();
        setTimeout(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() { 
                    let sprite = false;
                    let spriteScale=1;
                    let chooseIndexFromObjects=null;
                    let chooseObjectFromDesiredObjects=null;
                    let chooseIndexFromObstacle=null;
                    let chooseObstacleFromDesiredObstacle=null;
                    let index=null;
                    let currentZone = {
                        height: 0,
                        curve: 0
                    };
                    let iterAux=0;
                    let topographyRead=[];

                    self.trackLayout.forEach(el => {
                        iterAux+=el.numZones;
                        for(let j=0;j<el.numZones;j++){
                            for(let l=0;l<el.trafficSignals.length;l++){
                                el.trafficSignals[l].drawed=false;
                            }
                            topographyRead.push(el);
                        }
                    });

                    if(self.trackParam.numZones!==iterAux){
                        self.trackParam.numZones=iterAux;
                    }
                    
                    let iter = self.trackParam.numZones;
                    let tmpIter=0;
                    while(tmpIter<iter){
                        // Generate current Zone
                        let intendedHeightForCurrentZone;
                        let intendedCurveForCurrentZone;

                        switch(topographyRead[tmpIter].profile){
                            case "flat":
                                intendedHeightForCurrentZone=0;
                                break; 
                            case "up": 
                                intendedHeightForCurrentZone = 900 * self.randomPos();
                                break;
                            case "down": 
                                intendedHeightForCurrentZone = - 900 * self.randomPos();
                                break;  
                        }

                        switch(topographyRead[tmpIter].topography.name){
                            case "straight":
                                intendedCurveForCurrentZone=0;
                                break; 
                            case "left": 
                                intendedCurveForCurrentZone = (parseInt(topographyRead[tmpIter].topography.curvature) * 10) * self.randomPos();
                                break;
                            case "right": 
                                intendedCurveForCurrentZone = (parseInt(topographyRead[tmpIter].topography.curvature) * 10) * self.randomPos();
                                break;  
                        }

                        if(topographyRead[tmpIter].trafficSignals.length===0){
                            for(let i=0; i < self.trackParam.zoneSize; i++){
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
                                    height: currentZone.height+intendedHeightForCurrentZone / 2 * (1 + Math.sin(i/self.trackParam.zoneSize * Math.PI-Math.PI/2)),
                                    curve: currentZone.curve+intendedCurveForCurrentZone / 2 * (1 + Math.sin(i/self.trackParam.zoneSize * Math.PI-Math.PI/2)),
                                    sprite: sprite
                                })
                        
                            }
                        }else{
                            for(let i=0; i < self.trackParam.zoneSize; i++){
                                for(let k=0;k<topographyRead[tmpIter].trafficSignals.length;k++){
                                    if(topographyRead[tmpIter].trafficSignals[k].drawed===false){
                                        if(topographyRead[tmpIter].trafficSignals[k].zone===(tmpIter+1) && topographyRead[tmpIter].trafficSignals[k].zoneDistance===i){
                                            if(topographyRead[tmpIter].trafficSignals[k].drawed){
                                                break;
                                            }
                                            index = self.spritesAvailable.findIndex(el2 => el2.name === topographyRead[tmpIter].trafficSignals[k].filename);
                                            sprite= {type: self.spritesAvailable[index].value, pos: topographyRead[tmpIter].trafficSignals[k].posX, obstacle: 0, scale: topographyRead[tmpIter].trafficSignals[k].scale};
                                            topographyRead[tmpIter].trafficSignals[k].drawed=true;
                                            break;
                                        }
                                    }else{
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

                                self.generatedTrack.push({
                                    height: currentZone.height+intendedHeightForCurrentZone / 2 * (1 + Math.sin(i/self.trackParam.zoneSize * Math.PI-Math.PI/2)),
                                    curve: currentZone.curve+intendedCurveForCurrentZone / 2 * (1 + Math.sin(i/self.trackParam.zoneSize * Math.PI-Math.PI/2)),
                                    sprite: sprite
                                })
                        
                            }
                        }
                        currentZone.height += intendedHeightForCurrentZone;
                        currentZone.curve += intendedCurveForCurrentZone;

                        tmpIter++;
                    }
                    
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
                    
                    self.trackParam.numZones = self.trackParam.numZones * self.trackParam.zoneSize;
                    
                    setTimeout(
                        (function(self2) {         
                            return function() {   
                                d3.select("#created_"+self2.TRACKGENERATORID).text("Success: True"); 
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
     * @private  
     * @description GenerateTrackCurvesSlopes method of the TrackGenerator widget. This method generates the straight line simulator version.
     * Every obstaclePerIteration iterations an obstacle is placed on a part of the track, based on 'positionsX' array values (horizontal positions).
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no), and has information about the scale that Arcade widget will apply,
     * when rendering that sprite, in the scale field.
     * It also has information about the position choosen from 'positionsX' array and the type of sprite, i.e. the sprite provided as opt from the available list, in 'filename' (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), the sprites provided in 'objects' opt field will be used as the 'obstacles'. That is, a new sprite will be choosen from that 
     + array, and it will use the position values obtained from its 'positionsX' array as well as the scale to apply in the rendering process.
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in, whether those are obstacles or not and what scale must be applied during 
     * the rendering process, a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
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
     *           imagePath: "track_generator_simulator_for_paper/img/",
     *           spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
     *           render: {
     *               depthOfField: 150,
     *               camera_distance: 30,
     *               camera_height: 320
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
     *               deceleration: 0.3,
     *               breaking: 0.6,
     *               turning: 5.0,
     *               posx: 0,
     *               maxSpeed: 15
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
                return function() { 
                    let sprite = false;
                    let spriteScale=1;
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
                    let iter     = self.trackParam.numZones;
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
                                intendedCurveForCurrentZone = - 900 * self.randomPos(); break;
                            case -1:
                                intendedCurveForCurrentZone = 900 * self.randomPos(); break;
                        }

                        for(let i=0; i < self.trackParam.zoneSize; i++){
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
                                height: currentZone.height+intendedHeightForCurrentZone / 2 * (1 + Math.sin(i/self.trackParam.zoneSize * Math.PI-Math.PI/2)),
                                curve: currentZone.curve+intendedCurveForCurrentZone / 2 * (1 + Math.sin(i/self.trackParam.zoneSize * Math.PI-Math.PI/2)),
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
                    
                    self.trackParam.numZones = self.trackParam.numZones * self.trackParam.zoneSize;
                    
                    setTimeout(
                        (function(self2) {         
                            return function() {   
                                d3.select("#created_"+self2.TRACKGENERATORID).text("Success: True"); 
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
     * @private 
     * @description GenerateStraightTrack method of the TrackGenerator widget. This method generates the straight line simulator version.
     * Every obstaclePerIteration iterations an obstacle is placed on a part of the track, based on 'positionsX' array values (horizontal positions).
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no), and has information about the scale that Arcade widget will apply,
     * when rendering that sprite, in the scale field.
     * It also has information about the position choosen from 'positionsX' array and the type of sprite, i.e. the sprite provided as opt from the available list, in 'filename' (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), the sprites provided in 'objects' opt field will be used as the 'obstacles'. That is, a new sprite will be choosen from that 
     + array, and it will use the position values obtained from its 'positionsX' array as well as the scale to apply in the rendering process.
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in, whether those are obstacles or not and what scale must be applied during 
     * the rendering process, a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
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
     *           imagePath: "track_generator_simulator_for_paper/img/",
     *           spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
     *           render: {
     *               depthOfField: 150,
     *               camera_distance: 30,
     *               camera_height: 320
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
     *               deceleration: 0.3,
     *               breaking: 0.6,
     *               turning: 5.0,
     *               posx: 0,
     *               maxSpeed: 15
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
                return function() { 
                    let sprite = false;
                    let spriteScale=1;
                    let chooseIndexFromObjects=null;
                    let chooseObjectFromDesiredObjects=null;
                    let chooseIndexFromObstacle=null;
                    let chooseObstacleFromDesiredObstacle=null;
                    let index=null;
                    let iter     = self.trackParam.numZones;
                    while(iter){
                        for(let i=0; i < self.trackParam.zoneSize; i++){
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

                        iter--;
                    }
                    
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
                    
                    self.trackParam.numZones = self.trackParam.numZones * self.trackParam.zoneSize;
                    
                    setTimeout(
                        (function(self2) {         
                            return function() {   
                                d3.select("#created_"+self2.TRACKGENERATORID).text("Success: True"); 
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
     * @public
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
     * @private 
     * @description Hide method of the TrackGenerator widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @private 
     * @description Reveal method of the TrackGenerator widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

    /**
     * @function render
     * @private
     * @description Render method of the TrackGenerator widget. This method reveals the widget.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.render = function () {
        return this.reveal();
    };

    module.exports = TrackGenerator;
});
