/**
 * @module TrackGenerator
 * @version 1.0.0
 * @author José Carlos
 * @desc This module draws the 2D TrackGenerator driving simulator, using HTML5 Canvas.
 *
 * @date Apr 02, 2018
 *
 *
 * @example <caption>Usage of TrackGenerator within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the TrackGenerator module
 *     require("widgets/car/TrackGenerator");
 *
 *     function main() {
 *          // After TrackGenerator module was loaded, initialize it
 *          let TrackGenerator = new TrackGenerator(
 *               'example', // id of the TrackGenerator element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'game-window', 
 *               } // append on div 'game-window'
 *           );
 *          // Render the TrackGenerator widget
 *          TrackGenerator.render();
 *     }
 * });
 */
/*jslint lets: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */


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

    let spritesheetJSON,spritesReadJSON;
    // Random numbers to place sprites randomly within the landscape territory
    let randomPos = Math.random;
    let sprites;
    let urlUploadedGeneratedTrack;
    let generatedTrack=[];
    let generatedObstacles=[];
    let car_faced_front, car_faced_left, car_faced_right, car2_faced_front, car2_faced_left, car2_faced_right, background, tree, boulder, logo;

    const render = {
        width: 320,
        height: 240,
        depthOfField: 150,
        camera_distance: 30,
        camera_height: 100
    };
    const trackSegmentSize = 5;
    const numberOfSegmentPerColor = 4;
    const numLanes = 3;
    const laneWidth = 0.02;
    const trackParam = {
        maxHeight: 900,
        maxCurve:  400,
        numZones:    12, // number of different portions of the track
        curvy:     0.8,
        mountainy: 0.8,
        zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
    }
    let params = {
        maxHeight: 900,
        maxCurve:  400,
        numZones:    12, // number of different portions of the track
        curvy:     0.8,
        mountainy: 0.8,
        zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
    }
    // Information regarding current controllable_car's car
    let controllable_car = {
        position: 10,
        speed: 0,
        acceleration: 0.05,
        deceleration: 0.04,
        breaking: 0.3,
        turning: 5.0,
        posx: 0,
        maxSpeed: 20
    };
    const topSpeed = 250;

    let generatedJSON;
    
    /**
     * @function constructor
     * @description Constructor for the TrackGenerator widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "game-window").</li>
     * @returns {TrackGenerator} The created instance of the widget TrackGenerator.
     * @memberof module:TrackGenerator
     * @instance
     */
    function TrackGenerator(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent || "game-window";
        opt.spritesFilename = opt.spritesFilename;
    
        this.id = id;
        this.top = coords.top || 100;
        this.left = coords.left || 700;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "game-window";
        this.spritesFilename = (opt.spritesFilename) ? ("text!widgets/car/configurations/" + opt.spritesFilename + ".json") : "text!widgets/car/configurations/spritesheet.json";
        
        spritesheetJSON = require("text!widgets/car/configurations/spritesheet.json");        

        this.div = d3.select(this.parent);
        
        this.div.append("h2").text("Track Generator");
        this.div.append("span")
                .attr("id","created")
                .text("Success: False");

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        if(spritesheetJSON){
            spritesReadJSON = JSON.parse(spritesheetJSON);
            // Reading The JSON Sprites Available
            for(let k=0;k<spritesReadJSON.frames.length;k++){
                // check if the required sprites, by name, exists
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="car_faced_front"){
                    car_faced_front = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="car_faced_left"){
                    car_faced_left = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="car_faced_right"){
                    car_faced_right = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="car2_faced_front"){
                    car2_faced_front = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="car2_faced_left"){
                    car2_faced_left = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="car2_faced_right"){
                    car2_faced_right = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="background"){
                    background = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="tree"){
                    tree = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="rock"){
                    boulder = spritesReadJSON.frames[k].frame;
                }
                if(spritesReadJSON.frames[k].filename.split(".")[0]==="logo"){
                    logo = spritesReadJSON.frames[k].frame;
                }
            }    
        }
        Widget.call(this, id, coords, opt);
        TrackGenerator.prototype.generateStraightTrack();
        // console.log(JSON.stringify(generatedJSON));
        
        return this;
    }

    TrackGenerator.prototype = Object.create(Widget.prototype);
    TrackGenerator.prototype.constructor = TrackGenerator;
    TrackGenerator.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description Hide method of the TrackGenerator widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @description Reveal method of the TrackGenerator widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

    /**
     * @function generateStraightTrack
     * @description GenerateStraightTrack method of the TrackGenerator widget. This method generates the straight line simulator version.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.generateStraightTrack = () => {
        // Generate current Zone
        let numIterations = params.numZones * params.zoneSize;
        let sprite = null;
        let spritePos = null;
        let spritePosgeneratedObstaclesRandom = null;
        let spritePosRightRandom = null;
        let spritePosLeftRandom =  null;
        let spriteTypeRandom = null;
        let spriteSidesRandom = null;
    
        for(let i=0; i < numIterations; i++){
            // generates random integer numbers between 1 and 3
            spriteTypeRandom = Math.floor((randomPos() * 3) + 1);
            // generates random integer numbers between 1 and 2
            spriteSidesRandom = Math.floor((randomPos() * 2) + 1);
    
            spritePosgeneratedObstaclesRandom = randomPos() - 0.5;
    
            // choose randomly sprite image
            if(spriteTypeRandom == 1){
                // draw Boulders
    
                // generates random float numbers greater than 0.55
                spritePosRightRandom = randomPos() + 0.90;
                // generates random float numbers lesser than -0.55
                spritePosLeftRandom =  (randomPos() * -0.56) - 0.56;
    
                // choose randomly sprite size
                if(spriteSidesRandom == 1){
                    spritePos = spritePosLeftRandom;
                }else if(spriteSidesRandom == 2){
                    spritePos = spritePosRightRandom;
                }
                // console.log(spritePos);
    
                if(randomPos() < 0.25){
                    sprite = {type: boulder, pos: spritePos-0.5, obstacle: 0};
                } if(randomPos() < 0.5){
                    sprite = {type: boulder, pos: spritePos, obstacle: 0};
                }else{
                    sprite = {type: boulder, pos: 3*spritePos, obstacle: 0};
                }
            }else if(spriteTypeRandom == 2){
                // draw Trees
    
                // generates random float numbers greater than 0.55
                spritePosRightRandom = randomPos() + 0.90;
                // generates random float numbers lesser than -0.55
                spritePosLeftRandom =  (randomPos() * -0.56) - 0.56;
    
                // choose randomly sprite size
                if(spriteSidesRandom == 1){
                    spritePos = spritePosLeftRandom;
                }else if(spriteSidesRandom == 2){
                    spritePos = spritePosRightRandom;
                }
                // console.log(spritePos);
                
                if(randomPos() < 0.25){
                    sprite = {type: tree, pos: spritePos-0.5, obstacle: 0};
                } if(randomPos() < 0.5){
                    sprite = {type: tree, pos: spritePos, obstacle: 0};
                }else{
                    sprite = {type: tree, pos: 3*spritePos, obstacle: 0};
                }
            }
            else if(i%50==0){
                // each 50 iterations a new obstacle is placed within the generatedTrack
                // console.log(spritePosgeneratedObstaclesRandom);
                generatedObstacles.push(spritePosgeneratedObstaclesRandom);
                // spritePosgeneratedObstaclesRandom has the relative position of the obstacle
                sprite = {type: boulder, pos: spritePosgeneratedObstaclesRandom, obstacle: 1};
            }
            else {
                sprite = false;
            }
    
            // console.log(sprite);
    
            generatedTrack.push({
                height: 0,
                curve: 0,
                sprite: sprite
            });
            
        }
    
        params.numZones = numIterations; 

        generatedJSON = {
            controllable_car: controllable_car,
            laneWidth: laneWidth,
            numLanes: numLanes,
            numberOfSegmentPerColor: numberOfSegmentPerColor,
            render: render,
            topSpeed: topSpeed,
            track: generatedTrack,
            trackParam: trackParam,
            trackSegmentSize: trackSegmentSize,
            trackColors: {
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
            }
        };

        setTimeout(function(){ d3.select("#created").text("Success: True"); }, 1500);
        
        return this;
    };
    

    /**
     * @function render
     * @description Render method of the TrackGenerator widget. 
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.render = function () {
        return this.reveal();
    };

    module.exports = TrackGenerator;
});
