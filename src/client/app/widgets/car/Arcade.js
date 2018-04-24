/**
 * @module Arcade
 * @version 1.0.0
 * @author José Carlos
 * @desc This module draws the 2D arcade driving simulator, using HTML5 Canvas.
 *
 * @date Apr 02, 2018
 * last modified @date Apr 19, 2018
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
 *                 trackFilename: "track", // defines track configuration filename, which is "track.json" by default
 *                 spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                 spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
 *                 carImgIndex: 2, // defines car sprite image suffix 
 *                 // logoImgIndex: 1, // defines logo sprite image suffix 
 *                 // backgroundImgIndex: 1, // defines background sprite image suffix 
 *               }// append on div 'game-window'
 *           );
 *          // Render the Arcade widget
 *          arcade.render();
 * 
 *          // Loading all spritesheets (images)
 *          arcade.onPageLoad(this.spritesFiles);
 * 
 *          // Loading track number of iterations to be rendered
 *          arcade.getNrIterations();
 *  
 *          // Detecting current browser
 *          arcade.detectBrowserType();
 * 
 *          // Init the canvas, on div with id 'arcadeSimulator'
 *          arcade.init();
 * 
 *          // Drawing simulator home page
 *          arcade.renderSplashFrame();
 * 
 *          // Drawing simulator pause page
 *          arcade.renderSplashPauseFrame();
 * 
 *          // Drawing simulator end page
 *          arcade.renderSplashEndFrame();
 * 
 *          // Draws the string "Hello" in the screen coordinates (100,100) with font available at spritesheet image (spritesheetsImages array) at index 1 
 *          // By default index 1 has "spritesheet.text.png" image
 *          arcade.drawText("Hello",{x: 100, y: 100}, 1);
 * 
 *          // Every 30ms arcade.renderSimulatorFrame method is invoked, drawing the current simulation frame
 *          simulatorInterval = setInterval(arcade.renderSimulatorFrame, 30);
 * 
 *          // Updates car's current position (listening for actions: acceleration, etc)
 *          let carSprite = arcade.updateControllableCar();
 * 
 *          // Draws the background image based on car's current horizontal position(posx) 
 *          arcade.drawBackground(-posx);
 * 
 *          // Setting colors during simulation
 *          arcade.setColorsCanvas(counter < numberOfSegmentPerColor, "#699864", "#e00", "#fff", "#496a46", "#474747", "#777", "#fff", "#777", "#00FF00");
 * 
 *          // Drawing current segment (entire horizontal stripe)
 *          arcade.drawSegment(
 *                   render.height / 2 + currentHeight,
 *                   currentScaling, currentSegment.curve - baseOffset - lastDelta * currentScaling,
 *                   render.height / 2 + endProjectedHeight,
 *                   endScaling,
 *                   nextSegment.curve - baseOffset - lastDelta * endScaling,
 *                   currentSegmentIndex == 2 || currentSegmentIndex == (numIterations-render.depthOfField)
 *          );
 *   
 *          // Draws sprite received as first argument
 *          drawSprite(
 *           {
 *              y: render.height / 2 + startProjectedHeight,
 *              x: render.width / 2 - currentSegment.sprite.pos * render.width * currentScaling + currentSegment.curve - baseOffset - (controllable_car.posx - baseOffset*2) * currentScaling,
 *              ymax: render.height / 2 + lastProjectedHeight,
 *              s: 0.5*currentScaling,
 *              i: currentSegment.sprite.type,
 *              pos: currentSegment.sprite.pos,
 *              obstacle: currentSegment.sprite.obstacle
 *           }, 
 *           null, 
 *           null, 
 *           null, 
 *           null
 *          );
 * 
 *          // OR
 *          // Draws image carSprite, in coordinates (carSprite.x, carSprite.y) with scale 1 (original size)
 *          arcade.drawSprite(null, carSprite.car, carSprite.x, carSprite.y, 1);
 * 
 *          // Sets the color of the finishing line
 *          arcade.prototype.setColorsEndCanvas("#000", "#fff");
 * 
 *          // Draws the track current segment portion
 *          arcade.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.5, 0.5, "#fff");
 * 
 *          // Draws the lanes
 *          arcade.drawLanes(position1, scale1, offset1, position2, scale2, offset2, lane, 3, 0.02);
 * 
 *          // Draws the guiding arrow
 *          arcade.drawArrow(position1, scale1, offset1, position2, scale2, offset2, -0.02, 0.02, "#00FF00");
 * 
 *     }
 * });
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

    let spritesheetJSON;
    let trackJSON;

    let currentBrowser = { chrome: false, mozilla: false, opera: false, msie: false, safari: false};

    let spritesheetsImages = [];
    let readSprite=false;
    let readConfiguration=false;
    let readParams=false;
    let sptB = null;

    // Coordinates of first blue car in spritesheet, Coordinates of second blue car in spritesheet, Coordinates of third blue car in spritesheet, Coordinates of first red car in spritesheet, Coordinates of second red car in spritesheet, Coordinates of third red car in spritesheet, Coordinates of background in spritesheet, Coordinates of tree in spritesheet, Coordinates of boulder in spritesheet, Coordinates of logo in spritesheet
    let car_faced_front, car_faced_left, car_faced_right, background, logo;
    let spritesAvailable=[];

    // Information regarding the rendering process (what users will see/how the game is viewed)
    let controllable_car=null;
    let laneWidth=null;
    let numLanes=null;
    let numberOfSegmentPerColor=null;
    let render=null;
    let topSpeed=null;
    let trackParam=null;
    let trackSegmentSize=null;
    let numIterations=null;

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
    let loadingTrackNrIterations;

    // Information regarding the tracks (auxiliary for drawTrackLoop method) loaded from the JSON file
    let track = [];

    // Information regarding the available sprites loaded from the JSON file
    let spritesReadJSON = [];

    // Information regarding the arcade simulator music
    let soundOff=false;
    let soundWidget;

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
     *          <li>parent {String}: the HTML element where the display will be appended (default is "game-window").</li>
     *          <li>trackFilename {String}: the track configuration filename, i.e. JSON file with the track that will be drawed as well as the required sprite coordinates, etc (default is "track").</li>
     *          <li>spritesFilename {String}: the spritesheet configuration filename, i.e. JSON file with the all available sprites, whose coordinates are the same in trackFilename, i.e. the track must have been generated with this JSON as well so the coordinates will match (default is "spritesheet").</li>
     *          <li>spritesFiles {Array}: array with spritesheets(images) names (default is ["spritesheet","spritesheet.text"]).</li>
     *          <li>carImgIndex {Int}: number placed as suffix in the JSON file with the sprite of the car image (front, left side, right side) (default is null).</li>
     *          <li>logoImgIndex {Int}: number placed as suffix in the JSON file with the sprite of the logo image (default is null).</li>
     *          <li>backgroundImgIndex {Int}: number placed as suffix in the JSON file with the sprite of the background image (default is null).</li>
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
        opt.carImgIndex = opt.carImgIndex;
        opt.logoImgIndex = opt.logoImgIndex;
        opt.backgroundImgIndex = opt.backgroundImgIndex;
        
        this.id = id;
        this.top = coords.top || 100;
        this.left = coords.left || 700;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "game-window";
        this.trackFilename = (opt.trackFilename) ? ("text!widgets/car/configurations/" + opt.trackFilename + ".json") : "text!widgets/car/configurations/track.json";
        this.spritesFilename = (opt.spritesFilename) ? ("text!widgets/car/configurations/" + opt.spritesFilename + ".json") : "text!widgets/car/configurations/spritesheet.json";
        this.spritesFiles = (opt.spritesFiles) ? opt.spritesFiles : ["spritesheet","spritesheet.text"];
        this.carImgIndex = (opt.carImgIndex) ? opt.carImgIndex : null;
        this.logoImgIndex = (opt.logoImgIndex) ? opt.logoImgIndex : null;
        this.backgroundImgIndex = (opt.backgroundImgIndex) ? opt.backgroundImgIndex : null;

        trackJSON = require("text!widgets/car/configurations/track.json");
        spritesheetJSON = require("text!widgets/car/configurations/spritesheet.json");        

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

        let backgroundRegex, logoRegex, frontRegex, leftRegex, rightRegex;

        if(this.backgroundImgIndex!==null){
            backgroundRegex = new RegExp("background"+this.backgroundImgIndex);
        }else{
            backgroundRegex = new RegExp("background");
        }

        if(this.logoImgIndex!==null){
            logoRegex   = new RegExp("logo"+this.logoImgIndex);
        }else{
            logoRegex   = new RegExp("logo");
        }

        if(this.carImgIndex!==null){
            frontRegex      = new RegExp("car"+this.carImgIndex+"_faced_front");
            leftRegex       = new RegExp("car"+this.carImgIndex+"_faced_left");
            rightRegex      = new RegExp("car"+this.carImgIndex+"_faced_right");
        }else{
            frontRegex      = new RegExp("car_faced_front");
            leftRegex       = new RegExp("car_faced_left");
            rightRegex      = new RegExp("car_faced_right");
        }

        if(spritesheetJSON){
            spritesReadJSON = JSON.parse(spritesheetJSON);
            // Reading all JSON Sprites Available
            for(let k=0;k<spritesReadJSON.frames.length;k++){
                spritesAvailable[k]={
                    name:spritesReadJSON.frames[k].filename.split(".")[0],
                    value:spritesReadJSON.frames[k].frame
                };
                if(spritesAvailable[k].name.match(backgroundRegex)){
                    background = spritesAvailable[k].value;
                }
                if(spritesAvailable[k].name.match(logoRegex)){
                    logo = spritesAvailable[k].value;
                }
                if(spritesAvailable[k].name.match(frontRegex)){
                    car_faced_front = spritesAvailable[k].value;
                }
                if(spritesAvailable[k].name.match(leftRegex)){
                    car_faced_left = spritesAvailable[k].value;
                }
                if(spritesAvailable[k].name.match(rightRegex)){
                    car_faced_right = spritesAvailable[k].value;
                }
            }  
            if(background===undefined || logo===undefined || car_faced_front===undefined || car_faced_left===undefined || car_faced_right===undefined){
                for(let k=0;k<spritesReadJSON.frames.length;k++){
                    spritesAvailable[k]={
                        name:spritesReadJSON.frames[k].filename.split(".")[0],
                        value:spritesReadJSON.frames[k].frame
                    };
                    if(spritesAvailable[k].name.match(/background/)){
                        background = spritesAvailable[k].value;
                    }
                    if(spritesAvailable[k].name.match(/logo/)){
                        logo = spritesAvailable[k].value;
                    }
                    if(spritesAvailable[k].name.match(/car_faced_front/)){
                        car_faced_front = spritesAvailable[k].value;
                    }
                    if(spritesAvailable[k].name.match(/car_faced_left/)){
                        car_faced_left = spritesAvailable[k].value;
                    }
                    if(spritesAvailable[k].name.match(/car_faced_right/)){
                        car_faced_right = spritesAvailable[k].value;
                    }
                }  
            }
            readSprite=true;  
        }

        Widget.call(this, id, coords, opt);
        Arcade.prototype.onPageLoad(this.spritesFiles);
        loadingTrackNrIterations = setInterval(function(){ Arcade.prototype.getNrIterations(); }, 500);
        
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
     * @function getNrIterations
     * @description GetNrIterations method of the Arcade widget. This method computes the number of iterations required to draw the track defined in the JSON configuration file. 
     * In the final version, the JSON structure, see example 1), will be the same, however fields 'height' and 'curve' will have other values 
     * other than 0 and 0, respectively.
     * @example 
     * 1) JSON Structure Straight Version
     * 
     * {
     *     "trackParam": {
     *       "maxHeight": 900,
     *       "maxCurve": 400,
     *       "numZones": 12,
     *       "curvy": 0.8,
     *       "mountainy": 0.8,
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
     *     "topSpeed": 250,
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
            numIterations = trackParam.numZones * trackParam.zoneSize;
            clearInterval(loadingTrackNrIterations);
        } catch (error) { 
            console.log("Error Loading Track... "+error);
        }

        return this;
    };

    /**
     * @function onPageLoad
     * @description onPageLoad method of the Arcade widget. This method starts the arcade simulation and loads the required spritesheets, with all sprites defined in track object.
     * @param spritesFiles {Array} array of strings, with the names of the sprites images (spritesheets) to use. By default two are used, one for the objects and another for the font (text).
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.onPageLoad = function (spritesFiles) {
        Arcade.prototype.detectBrowserType();
        Arcade.prototype.init();

        spritesFiles.forEach(function(el,index){
            spritesheetsImages[index] = new Image();
        });
    
        spritesheetsImages[0].onload = function(){
            splashInterval = setInterval(Arcade.prototype.renderSplashFrame, 30);
        };

        spritesheetsImages.forEach(function(el,index){
            spritesheetsImages[index].src = "../../client/app/widgets/car/configurations/img/"+spritesFiles[index]+".png";
        });
        
        return this;
    };

    /**
     * @function renderSplashFrame
     * @description RenderSplashFrame method of the Arcade widget. This method draws the simulator home page, where the commands to control the simulator are displayed. 
     * It is also initialized the lap timer, using jchronometer lib, as soon as the user uses the command to start the simulation(renderSimulatorFrame).
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
     Arcade.prototype.renderSplashFrame = function () {  
        canvas.height = 240;
        canvas.width = 320;     
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        if(readParams){
            canvas = $("#arcadeSimulator")[0];
            context = canvas.getContext('2d');
            // canvas.height = render.height;
            // canvas.width = render.width;

            if(readConfiguration && readSprite){
                context.drawImage(spritesheetsImages[0],  logo.x, logo.y, logo.w, logo.h, 100, 20, 0.6*logo.w, 0.6*logo.h);
    
                Arcade.prototype.drawText("Instructions:",{x: 100, y: 95}, 1);
                Arcade.prototype.drawText("Click on space bar to start",{x: 40, y: 110}, 1);
                Arcade.prototype.drawText("Click on key s to pause",{x: 40, y: 120}, 1);
                Arcade.prototype.drawText("Click on key q to end",{x: 40, y: 130}, 1);
                Arcade.prototype.drawText("Use left and rigth arrows",{x: 40, y: 145}, 1);
                Arcade.prototype.drawText("to control the vehicle",{x: 70, y: 155}, 1);
                Arcade.prototype.drawText("You can start now",{x: 90, y: 175}, 1);
                Arcade.prototype.drawText("Credits:",{x: 125, y: 195}, 1);
                Arcade.prototype.drawText("Jose Carlos",{x: 110, y: 205}, 1);
                
                if(keys[32]){
                    clearInterval(splashInterval);
                    simulatorInterval = setInterval(Arcade.prototype.renderSimulatorFrame, 30);
                    soundWidget.reveal();
                    soundWidget.unmute();
                    soundWidget.pauseAll();
                
                    chronometer = new Chronometer(
                        { precision: 10,
                        ontimeupdate: function (t) {
                            time = Chronometer.utils.humanFormat(chronometer.getElapsedTime()).split(":");
                        } 
                    });
                    chronometer.start();
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
     * @description RenderSplashPauseFrame method of the Arcade widget. This method draws the simulator pause page, where the commands to control the simulator and to resume the simulation(renderSimulatorFrame) are displayed. 
     * It is also resumed the lap timer, using jchronometer lib, as soon as the user uses the command to resume the simulation.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderSplashPauseFrame = function () { 
        canvas.height = 240;
        canvas.width = 320; 
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        // context.fillRect(0, 0, render.width, render.height);
    
        context.drawImage(spritesheetsImages[0],  logo.x, logo.y, logo.w, logo.h, 100, 20, 0.6*logo.w, 0.6*logo.h);
    
        Arcade.prototype.drawText("Click on space bar to resume",{x: 30, y: 110}, 1);
        Arcade.prototype.drawText("Use left and rigth arrows",{x: 40, y: 125}, 1);
        Arcade.prototype.drawText("to control the car",{x: 70, y: 135}, 1);
        if(keys[32]){
            chronometer.start();
    
            clearInterval(splashInterval);
            simulatorInterval = setInterval(Arcade.prototype.renderSimulatorFrame, 30);
            
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
     * @description RenderSplashEndFrame method of the Arcade widget. This method draws the simulator end page, where the commands to control the simulator and to start another simulation(renderSimulatorFrame) are displayed. 
     * It is also initialized the new lap timer, using jchronometer lib, as soon as the user uses the command to start the new simulation. 
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderSplashEndFrame = function () { 
        canvas.height = 240;
        canvas.width = 320; 
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        // context.fillRect(0, 0, render.width, render.height);
    
        context.drawImage(spritesheetsImages[0],  logo.x, logo.y, logo.w, logo.h, 100, 20, 0.6*logo.w, 0.6*logo.h);
    
        Arcade.prototype.drawText("Thank you for playing!",{x: 70, y: 110}, 1);
        Arcade.prototype.drawText("Click on space bar to start again",{x: 40, y: 125}, 1);
        if(keys[32]){
            clearInterval(splashInterval);
            clearInterval(simulatorInterval);
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
    
            simulatorInterval = setInterval(Arcade.prototype.renderSimulatorFrame, 30);
            chronometer.start();
    
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
            context.drawImage(spritesheetsImages[imageIndex], (string.charCodeAt(i) - 32) * 8, 0, 8, 8, cur, pos.y, 8, 8);
            cur += 8;
        }
        return this;
    };

    /**
     * @function drawLanes
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
     * @function drawArrow
     * @description DrawArrow method of the Arcade widget. This method draws a guiding arrow in front of the vehicle.
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
    Arcade.prototype.drawArrow = function (pos1, scale1, offset1, pos2, scale2, offset2, delta1, delta2, color) {
        let demiWidth = render.width / 2;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(demiWidth + delta1 * render.width * scale1 + offset1, pos1);
        context.lineTo(demiWidth + delta1 * render.width * scale2 + offset2, pos2);
        context.lineTo(demiWidth + delta2 * render.width * scale2 + offset2, pos2);
        context.lineTo(demiWidth + delta2 * render.width * scale1 + offset1, pos1);
        context.fill();
        return this;
    };

    /**
     * @function drawSprite
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
            if(h > 0) context.drawImage(spritesheetsImages[0],  sprite.i.x, sprite.i.y, sprite.i.w, h, sprite.x, destY, sprite.s * sprite.i.w, sprite.s * h);
        }else{
            context.drawImage(spritesheetsImages[0],  image.x, image.y, image.w, image.h, x, y, scale*image.w, scale*image.h);
        }
        return this;
    };

    /**
     * @function drawSegmentPortion
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
    
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(demiWidth + delta1 * render.width * scale1 + offset1, pos1);
        context.lineTo(demiWidth + delta1 * render.width * scale2 + offset2, pos2);
        context.lineTo(demiWidth + delta2 * render.width * scale2 + offset2, pos2);
        context.lineTo(demiWidth + delta2 * render.width * scale1 + offset1, pos1);
        context.fill();
        return this;
    };

    /**
     * @function drawBackground
     * @description DrawBackground method of the Arcade widget. This method draws the background image, in position 'position'.
     * @param position {Float} Value of posx in controllable_car object, i.e. horizontal position, which is computed by adding/subtracting the turning field value every time the vehicle is turned left or right, in updateControllableCar method.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.drawBackground = function (position) {
        let first = position / 2 % (background.w);
        //(image, x, y, scale) args
        Arcade.prototype.drawSprite(null, background, first-background.w +1, 0, 1);
        Arcade.prototype.drawSprite(null, background, first+background.w-1, 0, 1);
        Arcade.prototype.drawSprite(null, background, first, 0, 1);
        return this;
    };

     /**
     * @function setColorsEndCanvas
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
        track_segment = track_segment;
        lane          = lane;
        return this;
    };
    
    /**
     * @function setColorsCanvas
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
        grass          = grass1;
        border         = (alternate) ? border1 : border2;
        outborder      = outborder1;
        outborder_end  = outborder_end1;
        track_segment  = track_segment1;
        lane           = (alternate) ? lane1 : lane2;
        laneArrow      = laneArrow1;
        return this;
    };

    /**
     * @function drawSegment
     * @description DrawSegment method of the Arcade widget. This method draws a segment of the simulator(which corresponds to an entire strip of the canvas). 
     * To do so, this method uses drawSegmentPortion, setColorsEndCanvas methods. The latter is used to draw the finishing line (different colors).
     * @param position1 {Float} 
     * @param scale1 {Float} 
     * @param offset1 {Float} 
     * @param position2 {Float} 
     * @param scale2 {Float} 
     * @param offset2 {Float} 
     * @param finishStart {Boolean} Value of comparison "currentSegmentIndex == 2 || currentSegmentIndex == (numIterations-render.depthOfField)", which verifies if current segment
     * is the second or the last segment, i.e. the starting segment or the final segment to be rendered.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */ 
    Arcade.prototype.drawSegment = function (position1, scale1, offset1, position2, scale2, offset2, finishStart) {
        if(finishStart){
            Arcade.prototype.setColorsEndCanvas(track_segment_end, lane_end);
            // setColorsEndCanvas("#000", "#fff");

            //draw grass:
            context.fillStyle = grass;
            context.fillRect(0,position2,render.width,(position1-position2));

            // draw the track
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.5, 0.5, "#fff");

            //draw the track border
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.55, -0.47, border);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.55, border);

            //draw the track outborder dark green
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.47, -0.45, outborder_end);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.70, -0.57, outborder);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.57, -0.55, outborder_end);

            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.55,   0.57, outborder_end);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.57,   0.70, outborder);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.45, outborder_end);

            // draw the lane line
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.40, -0.35, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.30, -0.25, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.20, -0.15, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.10, -0.05, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.05, 0, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.15, 0.10, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.25, 0.20, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.35, 0.30, "#000");
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.45, 0.40, "#000");

            //TODO Change arrow direction when car is off track
            // draw arrow guide
            // Arcade.prototype.drawArrow(position1, scale1, offset1, position2, scale2, offset2, -0.02, 0.02, laneArrow);
            context.fillStyle = laneArrow;
            context.beginPath();
            context.moveTo(160, 150);
            context.lineTo(150, 160);
            context.lineTo(170, 160);
            context.closePath();
            context.fill();

        }
        else{
            //draw grass:
            context.fillStyle = grass;
            context.fillRect(0,position2,render.width,(position1-position2));

            // draw the track
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.5, 0.5, track_segment);

            //draw the track border
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.55, -0.47, border);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.55, border);

            //draw the track outborder dark green
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.47, -0.45, outborder_end);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.70, -0.57, outborder);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.57, -0.55, outborder_end);

            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.55,   0.57, outborder_end);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.57,   0.70, outborder);
            Arcade.prototype.drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.45, outborder_end);

            // draw the lane line
            Arcade.prototype.drawLanes(position1, scale1, offset1, position2, scale2, offset2, lane, numLanes, laneWidth);

            // draw arrow guide
            // Arcade.prototype.drawArrow(position1, scale1, offset1, position2, scale2, offset2, -0.02, 0.02, laneArrow);
            context.fillStyle = laneArrow;
            context.beginPath();
            context.moveTo(160, 150);
            context.lineTo(150, 160);
            context.lineTo(170, 160);
            context.closePath();
            context.fill();
        }
        return this;
    };

    /**
     * @function updateControllableCar
     * @description UpdateControllableCar method of the Arcade widget. This method updates the controllable car position and speed.
     * @memberof module:Arcade
     * @returns {carSprite} The created object with car sprite (image) and its X,Y coordinates, to be rendered after current position and speed has been changed.
     * That is, returns the new state after the action performed by the user (acceleration, braking, change of direction).
     * @instance
     */
    Arcade.prototype.updateControllableCar = function () {
        //  Update the car state
        // TODO understand lastDelta
        if (Math.abs(lastDelta) > 130){
            if (controllable_car.speed > 3) {
                controllable_car.speed -= 0.2;
            }
        } else {
            // readSprite acceleration controls
            soundOff = soundWidget.getSoundOff();
            if (keys[38]) { // 38 up
                controllable_car.speed += controllable_car.acceleration;
                if(!soundOff){
                  soundWidget.playSound(3); //accelerating song
                }
            } else if (keys[40]) { // 40 down
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
      
        // car turning
        if (keys[37]) {
            // 37 left
            if(controllable_car.speed > 0){
                controllable_car.posx -= controllable_car.turning;
            }
            carSprite = {
                car: car_faced_left,
                x: 125,
                y: 190
            };
        } else if (keys[39]) {
            // 39 right
            if(controllable_car.speed > 0){
                controllable_car.posx += controllable_car.turning;
            }
            carSprite = {
                car: car_faced_right,
                x: 125,
                y: 190
            };
        } else {
            carSprite = {
                car: car_faced_front,
                x:125,
                y:190
            };
        }
        return carSprite;
    };
    
    /**
     * @function renderSimulatorFrame
     * @description RenderSimulatorFrame method of the Arcade widget. This method renders each frame during the simulation.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.renderSimulatorFrame = function () {

        if(keys[81]){ // Key 'q' ends current simulator
            chronometer.stop();
            soundWidget.hide();
            clearInterval(simulatorInterval);
            splashInterval = setInterval(Arcade.prototype.renderSplashEndFrame, 30);
            soundWidget.pauseAll();
        }

        if(keys[83]){ // Key 's' pauses current simulator
            chronometer.pause();
            soundWidget.hide();
            clearInterval(simulatorInterval);
            splashInterval = setInterval(Arcade.prototype.renderSplashPauseFrame, 30);
            soundWidget.pauseAll();
        }

        // Clean screen
        //context.fillStyle = "#dc9"; // rgb(221, 204, 153) matches first background color
        context.fillStyle = "#76665d"; // rgb(139, 120, 106)
        context.fillRect(0, 0, render.width, render.height);

        let carSprite = Arcade.prototype.updateControllableCar();
        Arcade.prototype.drawBackground(-controllable_car.posx);

        let spriteBuffer = [];

        
        // Render the track
        
        let absoluteIndex = Math.floor(controllable_car.position / trackSegmentSize);
       
        if(absoluteIndex >= numIterations-render.depthOfField-1){
            clearInterval(simulatorInterval);
            Arcade.prototype.drawText("Simulation Ended!", {x: 90, y: 40}, 1);
            Arcade.prototype.drawText("Wait 5 Seconds To Reload", {x: 60, y: 60}, 1);
            Arcade.prototype.drawText("The Simulator", {x: 100, y: 70}, 1);
            soundWidget.pauseAll();
            
            // Delayed function call by 5 seconds to reload simulator
            setTimeout(function() { location.reload(); }, 5000);
        }

        let currentSegmentIndex    = (absoluteIndex - 2) % track.length;
        let currentSegmentPosition = (absoluteIndex - 2) * trackSegmentSize - controllable_car.position;
        let currentSegment         = track[currentSegmentIndex];

        let lastProjectedHeight     = Number.POSITIVE_INFINITY;
        let probedDepth             = 0;
        let counter                 = absoluteIndex % (2 * numberOfSegmentPerColor); // for alternating color band

        let controllable_carPosSegmentHeight     = track[absoluteIndex % track.length].height;
        let controllable_carPosNextSegmentHeight = track[(absoluteIndex + 1) % track.length].height;
        let controllable_carPosRelative          = (controllable_car.position % trackSegmentSize) / trackSegmentSize;
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

            let endProjectedHeight   = Math.floor((controllable_carHeight - nextSegment.height) * render.camera_distance / (render.camera_distance + currentSegmentPosition + trackSegmentSize));
            let endScaling           = 30 / (render.camera_distance + currentSegmentPosition + trackSegmentSize);

            let currentHeight        = Math.min(lastProjectedHeight, startProjectedHeight);
            let currentScaling       = startScaling;

            if(currentHeight > endProjectedHeight){
                Arcade.prototype.setColorsCanvas(counter < numberOfSegmentPerColor, grass1, border1, border2, outborder1, outborder_end1, track_segment1, lane1, lane2, laneArrow1);
                Arcade.prototype.drawSegment(
                    render.height / 2 + currentHeight,
                    currentScaling, currentSegment.curve - baseOffset - lastDelta * currentScaling,
                    render.height / 2 + endProjectedHeight,
                    endScaling,
                    nextSegment.curve - baseOffset - lastDelta * endScaling,
                    currentSegmentIndex === 2 || currentSegmentIndex === (numIterations-render.depthOfField));
            }
            if(currentSegment.sprite){
                // console.log(currentSegment.sprite.type);

                // if(currentSegment.sprite.obstacle===1){
                //     console.log(currentSegment.sprite.pos);
                // }

                // if(controllable_carPosRelative==currentSegment.sprite.pos){
                //     console.log("hit");
                // }

                // TODO Fix current car position detection
                // console.log(controllable_carPosRelative)

                // console.log(currentSegment.sprite);

                spriteBuffer.push(
                    {
                        y: render.height / 2 + startProjectedHeight,
                        x: render.width / 2 - currentSegment.sprite.pos * render.width * currentScaling + currentSegment.curve - baseOffset - (controllable_car.posx - baseOffset*2) * currentScaling,
                        ymax: render.height / 2 + lastProjectedHeight,
                        s: 0.5*currentScaling,
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

            currentSegmentPosition += trackSegmentSize;

            counter = (counter + 1) % (2 * numberOfSegmentPerColor);

            // console.log(controllable_carPosRelative)

            // obstacles.forEach(function(element) {
            //     // console.log(element);
            //     console.log(controllable_carPosRelative+","+element);
            //     // if(controllable_carPosRelative)
            //   });
            
            // obstacles has the list of all obstacles positions
            // console.log(obstacles);
            // console.log("There are "+obstacles.length+" obstacles in this track");
        }

        while((sptB = spriteBuffer.pop())!==undefined) {
            // Getting the obstacles coordinates
            // if(sptB.obstacle===1){
            //     // console.log(sptB.x+","+sptB.y);
            //     // console.log(sptB.pos);
            // }
            
            // It only draws the obstacles within the track
            // if(sptB.obstacle===1){
            //     drawSprite(sptB);
            // }

            Arcade.prototype.drawSprite(sptB, null, null, null, null);
            // console.log(sptB);
        }
    
        // console.log(spritesReadJSON);
        
        // Draw the car 
        Arcade.prototype.drawSprite(null, carSprite.car, carSprite.x, carSprite.y, 1);
    
        // Draw Header 
        Arcade.prototype.drawText(""+Math.round(absoluteIndex/(numIterations-render.depthOfField)*100)+"%",{x: 10, y: 1}, 1);
        
        let speed = Math.round(controllable_car.speed / controllable_car.maxSpeed * topSpeed);
        let speed_kmh = Math.round(speed * 1.60934);
        Arcade.prototype.drawText(""+speed_kmh+" kmh", {x: 260, y: 1}, 1);
        Arcade.prototype.drawText(""+speed+" mph", {x: 260, y: 10}, 1);

        let res = time[0].split("-");
        currentTimeString = res[0] + " h:" + time[1] + " m:" + time[2] + " s:" + time[3] + " ms";
        Arcade.prototype.drawText(currentTimeString, {x: 70, y: 1}, 1);

        return this;
    };

    /**
     * @function detectBrowserType
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
     * @description Init method of the Arcade widget. This method inits the canvas and adds the events onkeydown and onkeyup to capture the desired actions, i.e. accelerate, brake, etc.
     * @memberof module:Arcade
     * @returns {Arcade} The created instance of the widget Arcade.
     * @instance
     */
    Arcade.prototype.init = function () {
        canvas = document.getElementById("arcadeSimulator");
        context = canvas.getContext('2d');         
        window.onkeydown = function(e){
            keys[e.keyCode] = true;
        };
        window.onkeyup = function(e){
            keys[e.keyCode] = false;
        };
        return this;
    };

    /**
     * @function render
     * @description Render method of the Arcade widget. 
     * @memberof module:Arcade
     * @instance
     */
    Arcade.prototype.render = function () {
        return this.reveal();
    };

    module.exports = Arcade;
});
