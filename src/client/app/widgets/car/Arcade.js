/**
 * @module Arcade
 * @version 1.0.0
 * @author José Carlos
 * @desc This module draws the 2D arcade driving simulator, using HTML5 Canvas.
 *
 * @date Apr 02, 2018
 *
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
 *          let Arcade = new Arcade(
 *               'example', // id of the Arcade element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'game-window', 
 *               } // append on div 'game-window'
 *           );
 *          // Render the Arcade widget
 *          Arcade.render();
 *     }
 * });
 */
/*jslint lets: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */


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
    let Sound = require("widgets/car/Sound");

    let spritesheetJSON = require("text!widgets/car/configurations/spritesheet.json");
    let trackJSON = require("text!widgets/car/configurations/track.json");
   
    let currentBrowser = { chrome: false, mozilla: false, opera: false, msie: false, safari: false};
    let spritesheet, spritesheetText;
    let readSprite=false;
    let readConfiguration=false;
    let readParams=false;
    let obstacles=[];
    let obstaclesHits = null;

    // Coordinates of first blue car in spritesheet, Coordinates of second blue car in spritesheet, Coordinates of third blue car in spritesheet, Coordinates of first red car in spritesheet, Coordinates of second red car in spritesheet, Coordinates of third red car in spritesheet, Coordinates of background in spritesheet, Coordinates of tree in spritesheet, Coordinates of boulder in spritesheet, Coordinates of logo in spritesheet
    let car_faced_front, car_faced_left, car_faced_right, car2_faced_front, car2_faced_left, car2_faced_right, background, tree, boulder, logo;

    // Information regarding the rendering process (what users will see/how the game is viewed)
    let controllable_car=null;
    let laneWidth=null;
    let numLanes=null;
    let numberOfSegmentPerColor=null;
    let render=null;
    let topSpeed=null;
    let trackParam=null;
    let trackSegmentSize=null;

    /* 
    * Start of Arcade Global Variables 
    */

    //  Information regarding the canvas
    let canvas;
    //  Information regarding the context of the above canvas (2D driving simulator)
    let context;
    //  Pressed Keys during the simulator
    let keys = [];

    //  Keep tracking controllable_car's lap time
    let chronometer;
    //  Keep tracking controllable_car's lap time
    let time;
    //  Shows controllable_car's lap time
    let currentTimeString = "";
    //  Tracking controllable_car's position
    let lastDelta = 0;

    let splashInterval;
    let simulatorInterval;
    let loadingTrackConfiguration;

    // Information regarding the tracks (auxiliary for drawTrackLoop method) loaded from the JSON file
    let track = [];

    // Information regarding the available sprites loaded from the JSON file
    let spritesReadJSON = [];

    // Information regarding the arcade simulator music
    let sounds;
    let soundOff=false;

    // Random numbers to place sprites randomly within the landscape territory
    let randomNumber = Math.random;
    /* 
    * End of Arcade Global Variables 
    */


    /* 
    * Start of Arcade Colors 
    */
    let grass="";
    let border="";
    let outborder="";
    let outborder_end="";
    let track_segment="";
    let lane="";
    let laneArrow="";

    // Read from JSON configuration file
    let grass1, border1, border2, outborder1, outborder_end1, track_segment1, lane1, lane2, laneArrow1, track_segment_end, lane_end;
    /* 
    * End of Arcade Colors 
    */
    
    /**
     * @function constructor
     * @description Constructor for the Arcade widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "game-window").</li>
     * @returns {Arcade} The created instance of the widget Arcade.
     * @memberof module:Arcade
     * @instance
     */
    function Arcade(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent || "game-window";
    
        this.id = id;
        this.top = coords.top || 100;
        this.left = coords.left || 700;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "game-window";
       
        this.div = d3.select(this.parent)
                        .attr("class","container game_view")
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px")
                        .style("width", this.width + "px")
                        .style("height", this.height + "px")
                        .style("border", "5px solid black");
        
        this.div.append("canvas").attr("id", "arcadeSimulator");

        // this.div.append("img")
        //         .attr("src", "#")
        //         .attr("id", "track_img")
        //         .style("width", "100%")
        //         .style("height", "100%")
        //         .style("object-fit", "contain")
        //         .style("visibility", "hidden");
        
        this.soundWidget = new Sound("soundWidget", {
            top: 700,
            left: 610,
            width: 750,
            height: 750
        }, {
            callback: opt.callback
        });

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        if(trackJSON){
            let aux = JSON.parse(trackJSON);
            controllable_car=aux.controllable_car;
            laneWidth=aux.laneWidth;
            numLanes=aux.numLanes;
            numberOfSegmentPerColor=aux.numberOfSegmentPerColor;
            render=aux.render;
            topSpeed=aux.topSpeed;
            trackParam=aux.trackParam;
            trackSegmentSize=aux.trackSegmentSize;
            grass1=aux.trackColors.grass1;
            border1=aux.trackColors.border1;
            border2=aux.trackColors.border2;
            outborder1=aux.trackColors.outborder1;
            outborder_end1=aux.trackColors.outborder_end1;
            track_segment1=aux.trackColors.track_segment1;
            lane1=aux.trackColors.lane1;
            lane2=aux.trackColors.lane2;
            laneArrow1=aux.trackColors.laneArrow1;
            track_segment_end=aux.trackColors.track_segment_end;
            lane_end=aux.trackColors.lane_end;
            readParams=true;
            track=aux.track;
            readConfiguration=true;
        }
        
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
                readSprite=true;
            }    
        }
        
        // console.log(JSON.parse(spritesheetJSON).frames);
        // console.log(JSON.parse(trackJSON));
        // console.log(readParams);
        // console.log(readConfiguration);
        // console.log(readSprite);
        // console.log(track);

        Widget.call(this, id, coords, opt);
        return this;
    }

    Arcade.prototype = Object.create(Widget.prototype);
    Arcade.prototype.constructor = Arcade;
    Arcade.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description Hide method of the Arcade widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @description Reveal method of the Arcade widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

    /**
     * @function loadTrackConfiguration
     * @description loadTrackConfiguration method of the Arcade widget. This method loads the track from local JSON file.
     * * JSON Structure Straight Version
     * 
     * {
     * "trackParam": {
     *   "maxHeight": 900,
     *   "maxCurve": 400,
     *   "numZones": 12,
     *   "curvy": 0.8,
     *   "mountainy": 0.8,
     *   "zoneSize": 250
     * },
     * "render": {
     *   "width": 320,
     *   "height": 240,
     *   "depthOfField": 150,
     *   "camera_distance": 30,
     *   "camera_height": 100
     * },
     * "trackSegmentSize": 5,
     * "numberOfSegmentPerColor": 4,
     * "numLanes": 3,
     * "laneWidth": 0.02,
     * "controllable_car": {
     *   "position": 10,
     *   "speed": 0,
     *   "acceleration": 0.05,
     *   "deceleration": 0.04,
     *   "breaking": 0.3,
     *   "turning": 5.0,
     *   "posx": 0,
     *   "maxSpeed": 20
     * },
     * "topSpeed": 250,
     * "track": [
     *  {"height":0,"curve":0,"sprite":{"type":{"x":535,"y":648,"w":168,"h":248},"pos":-0.14646203875343766,"obstacle":1}},
     *  {"height":0,"curve":0,"sprite":{"type":{"x":535,"y":648,"w":168,"h":248},"pos":3.5676653178824482,"obstacle":0}}
     * ]
     * }
     * 
     * In the final version, the json structure will be the same, however fields 'height' and 'curve' will have other values 
     * other than 0 and 0, respectively.
     * 
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.loadTrackConfiguration = function () {
        try {
            let numIterations = trackParam.numZones * trackParam.zoneSize;
            trackParam.numZones = numIterations;
            // clearInterval(loadingTrackConfiguration);
        } catch (error) { 
            console.log("Error Loading Track... "+error);
        }

        return this;
    };


    /**
     * @function onPageLoad
     * @description onPageLoad method of the Arcade widget. This method starts the arcade simulation.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.onPageLoad = function () {
        Arcade.prototype.detectBrowserType();
        Arcade.prototype.init();
    
        spritesheet = new Image();
        spritesheetText = new Image();
        
        // use d3.select instead of $
        // spritesheet.onload = function(){
        //     splashInterval = setInterval(renderSplashFrame, 30);
        // };
    
        // spritesheet.src = "img/spritesheet.png";
        // spritesheetText.src = "img/spritesheet.text.png";
    
        // $(".tog").click(function(){
        //     $('img',this).toggle();
        // });
    
        // $("#play").click(function(){
        //     sounds = $('audio');
        //     let s = sounds.length;
        //     soundOff=false;
        //     for(i=1; i<s; i++) //startup song is also discarded
        //         if(i!==2){
        //             sounds[i].play();
        //         }
        // });
    
        // $("#stop").click(function(){
        //     sounds = $('audio');
        //     let s = sounds.length;
        //     soundOff=true;
        //     for(i=0; i<s; i++) sounds[i].pause();
        // });

        return this;
    };


     /**
     * @function detectBrowserType
     * @description detectBrowserType method of the Arcade widget. This method detects current open Browser.
     * @memberof module:Arcade
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
     * @description init method of the Arcade widget. This method inits the canvas.
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.init = function () {
        // configure canvas
        canvas = $("#arcadeSimulator")[0];
        context = canvas.getContext('2d');
        // //register key handeling:
        // $(document).keydown(function(e){
        //     keys[e.keyCode] = true;
        // });
        // $(document).keyup(function(e){
        //     keys[e.keyCode] = false;
        // });
        return this;
    };


    /**
     * @function render
     * @description Render method of the Arcade widget. 
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.render = function () {
        let c = document.getElementById("arcadeSimulator");
        let ctx = c.getContext("2d");

        ctx.beginPath();
        ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.font = "30px Arial";
        ctx.fillText("Hello World", 10, 50);
        
        return this.reveal();
    };

    module.exports = Arcade;
});
