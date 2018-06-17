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
 * @example <caption>Usage of private API.</caption>
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
 *       // Loads the JSON file received as opt field
 *       trackGenerator.prototype.loadFile();     
 *     }
 * });
 *
 *
 * @example <caption>Other Possible Values of trackLayout Optional Field.</caption>
 * 
 * The following examples were used to create the rest of predefined tracks that could be rendered at any time.
 *
 *        trackLayout: [ 
 *            // trackLayout1.json File
 *            // describing the desired track, which is straight line, with 8 zones (8 blocks) and with 
 *            // profiles "flat".
 *            // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *            // those angles to define different curvatures, instead of generating the same curvature for the same
 *            // side
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 8,
 *            }
 *        ]
 *
 *        // OR
 *
 *        trackLayout: [ 
 *            // trackLayout3.json File
 *            // describing the desired track, which is straight line, followed by curve to left, straight line, 
 *            // curve to right, straight line and curve to left each with 3 zones (blocks) and with different 
 *            // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *            // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *            // those angles to define different curvatures, instead of generating the same curvature for the same
 *            // side
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1,
 *            },
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1,
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "up",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "down",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            }
 *        ]
 *
 *        // OR
 *
 *        trackLayout: [ 
 *            // trackLayout4.json File
 *            // describing the desired track, which is curve to right, with 4 zones (blocks) and with  
 *            // profile "flat". This layout allows to render a closed circular track (with 4 curves to right 
 *            // where a new curve starts after the previous ends) 
 *            // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *            // those angles to define different curvatures, instead of generating the same curvature for the same
 *            // side
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 4
 *            }
 *        ]
 *
 *        // OR
 *
 *        trackLayout: [ 
 *            // trackLayout5.json File
 *            // describing the desired track, which is curve to left, straight line, 
 *            // curve to left, straight line, curve to left, straight line, curve to left and straight line,
 *            // each with 1 zone (block) and with profile "flat".
 *            // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *            // those angles to define different curvatures, instead of generating the same curvature for the same
 *            // side
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            }
 *        ]
 *
 *        // OR
 *
 *        trackLayout: [ 
 *            // trackLayout6.json File
 *            // describing the desired track, which is curve to left, straight line, 
 *            // curve to right, straight line and curve to left each with 1 zone (block) and with different 
 *            // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *            // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *            // those angles to define different curvatures, instead of generating the same curvature for the same
 *            // side
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "down",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "up",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            }
 *        ]
 *
 *        // OR
 *
 *        trackLayout: [ 
 *            // trackLayout7.json File
 *            // describing the desired track, which is curve to left, with 4 zones (blocks) and with  
 *            // profile "flat". This layout allows to render a closed circular track (with 4 curves to left 
 *            // where a new curve starts after the previous ends) 
 *            // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *            // those angles to define different curvatures, instead of generating the same curvature for the same
 *            // side
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 4
 *            }
 *        ]
 *
 *        // OR
 *
 *        trackLayout: [ 
 *            // trackLayout8.json File
 *            // describing the desired track, which is curve to right, straight line, 
 *            // curve to left, straight line and curve to right each with 1 zone (block) and with different 
 *            // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *            // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *            // those angles to define different curvatures, instead of generating the same curvature for the same
 *            // side
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "down",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"left",
 *                    curvature: -90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "up",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            }
 *        ]
 *
 *        // OR
 *
 *        trackLayout: [ 
 *            // trackLayout9.json File
 *            // describing the desired track, which is curve to right, straight line, 
 *            // curve to right, straight line, curve to right, straight line, curve to right and straight line,
 *            // each with 1 zone (block) and with profile "flat".
 *            // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *            // those angles to define different curvatures, instead of generating the same curvature for the same
 *            // side
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"right",
 *                    curvature: 90
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            },
 *            {
 *                topography: {
 *                    name:"straight",
 *                    curvature: 0
 *                },
 *                profile: "flat",
 *                numZones: 1
 *            }
 *        ]
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

    module.exports = TrackGenerator;
});
