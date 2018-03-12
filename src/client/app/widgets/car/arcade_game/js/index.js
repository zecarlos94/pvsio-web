$(document).ready(()=>{
    // Uploaded local json files to http://myjson.com/ in order to overcome Cross-Origin Issues
    // Load The Track Parameters
    $.get("https://api.myjson.com/bins//15yirl", function (data, textStatus, jqXHR) {
        let aux = JSON.parse(JSON.stringify(data));
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
    });
    // Load The Track (old versions: https://api.myjson.com/bins//17sr0x ; https://api.myjson.com/bins//1fd64h ; https://api.myjson.com/bins//1738td)
    $.get("https://api.myjson.com/bins//15yirl", function (data, textStatus, jqXHR) {
        track = JSON.parse(JSON.stringify(data.track));
        // console.log(track);
        readConfiguration=true;
    });

    // Load the JSON File with Sprites
    $.get("https://api.myjson.com/bins/1f869h", function (data, textStatus, jqXHR) {
        spritesReadJSON = JSON.parse(JSON.stringify(data));
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

    });

    onPageLoad();
    loadingTrackConfiguration = setInterval(function(){ loadTrackConfiguration(); }, 500);
});

let onPageLoad = () => {
    detectBrowserType();
    init();

    spritesheet = new Image();
    spritesheetText = new Image();

    spritesheet.onload = function(){
        splashInterval = setInterval(renderSplashFrame, 30);
    };

    spritesheet.src = "img/spritesheet.png";
    spritesheetText.src = "img/spritesheet.text.png";

    $(".tog").click(function(){
        $('img',this).toggle();
    });

    $("#play").click(function(){
        sounds = $('audio');
        let s = sounds.length;
        soundOff=false;
        for(i=1; i<s; i++) //startup song is also discarded
            if(i!==2){
                sounds[i].play();
            }
    });

    $("#stop").click(function(){
        sounds = $('audio');
        let s = sounds.length;
        soundOff=true;
        for(i=0; i<s; i++) sounds[i].pause();
    });
}


let detectBrowserType = () => {
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
}

//ES6
//initialize the simulator
let init = () => {
    // configure canvas
    canvas = $("#arcadeSimulator")[0];
    context = canvas.getContext('2d');
    //register key handeling:
    $(document).keydown(function(e){
        keys[e.keyCode] = true;
    });
    $(document).keyup(function(e){
        keys[e.keyCode] = false;
    });
}

//renders Splash Frame
let renderSplashFrame = () => {
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if(readParams){
        canvas = $("#arcadeSimulator")[0];
        context = canvas.getContext('2d');
        canvas.height = render.height;
        canvas.width = render.width;
        if(readConfiguration && readSprite){
            context.drawImage(spritesheet,  logo.x, logo.y, logo.w, logo.h, 100, 20, 0.6*logo.w, 0.6*logo.h);

            drawText("Instructions:",{x: 100, y: 95});
            drawText("Click on space bar to start",{x: 40, y: 110});
            drawText("Click on key s to pause",{x: 40, y: 120});
            drawText("Click on key q to end",{x: 40, y: 130});
            drawText("Use left and rigth arrows",{x: 40, y: 145});
            drawText("to control the vehicle",{x: 70, y: 155});
            drawText("You can start now",{x: 90, y: 175});
            drawText("Credits:",{x: 125, y: 195});
            drawText("Jose Carlos",{x: 110, y: 205});
            
            if(keys[32]){
                clearInterval(splashInterval);
                simulatorInterval = setInterval(renderSimulatorFrame, 30);
                $(".tog").css("visibility", "visible");
            
                chronometer = new Chronometer(
                    { precision: 10,
                    ontimeupdate: function (t) {
                        time = Chronometer.utils.humanFormat(chronometer.getElapsedTime()).split(":");
                    } 
                });
                chronometer.start();

                sounds = $('audio');
                if(!soundOff){
                    sounds[0].play(); //startup song
                    sounds[3].play(); //background song
                    sounds[3].volume = 0.4;

                    sounds[0].onended = function() {
                        sounds[1].play(); //idle song
                        sounds[1].volume = 1.0;
                    };
                }
            }
        }else{
            drawText("Loading Configurations...",{x: 100, y: 95}); 
        }
    }else{
        drawText("Loading Parameters...",{x: 100, y: 68});  
    }

}

//renders Splash Frame
let renderSplashPauseFrame = () => {
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, render.width, render.height);

    context.drawImage(spritesheet,  logo.x, logo.y, logo.w, logo.h, 100, 20, 0.6*logo.w, 0.6*logo.h);

    drawText("Click on space bar to resume",{x: 30, y: 110});
    drawText("Use left and rigth arrows",{x: 40, y: 125});
    drawText("to control the car",{x: 70, y: 135});
    if(keys[32]){
        chronometer.start();

        clearInterval(splashInterval);
        simulatorInterval = setInterval(renderSimulatorFrame, 30);
        
        $(".tog").css("visibility", "visible");
  
        if(!soundOff){
            sounds = $('audio');
            sounds[0].play(); //startup song
            sounds[3].play(); //background song
            sounds[3].volume = 0.4;

            sounds[0].onended = function() {
                sounds[1].play(); //idle song
                sounds[1].volume = 1.0;
            };
        }
    }
}

//renders Splash Frame
let renderSplashEndFrame = () => {
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, render.width, render.height);

    context.drawImage(spritesheet,  logo.x, logo.y, logo.w, logo.h, 100, 20, 0.6*logo.w, 0.6*logo.h);

    drawText("Thank you for playing!",{x: 70, y: 110});
    drawText("Click on space bar to start again",{x: 40, y: 125});
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

        simulatorInterval = setInterval(renderSimulatorFrame, 30);
        chronometer.start();

        $(".tog").css("visibility", "visible");

        if(!soundOff){
            sounds = $('audio');
            sounds[0].play(); //startup song
            sounds[3].play(); //background song
            sounds[3].volume = 0.4;

            sounds[0].onended = function() {
                sounds[1].play(); //idle song
                sounds[1].volume = 1.0;
            };
        }
    }
}


// Draws lanes according to numLanes defined by user (UI slider)
let drawLanes = (pos1, scale1, offset1, pos2, scale2, offset2, color, numLanes, laneWidth) => {
  let alpha = 1.10/numLanes;
  if(numLanes>3){
    for(let i=0;i<numLanes;i++){
      drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2, -0.55+(i*alpha), -0.55+(i*alpha)+laneWidth, color);
      drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2,  0.55-(i*alpha)-laneWidth, 0.55-(i*alpha), color);
    }
  }else{
    drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2, -0.55+alpha, -0.55+alpha+laneWidth, color);
    drawSegmentPortion(pos1, scale1, offset1, pos2, scale2, offset2,  0.55-alpha-laneWidth, 0.55-alpha, color);
  }
}

// Draws a guiding arrow/line
let drawArrow = (pos1, scale1, offset1, pos2, scale2, offset2, delta1, delta2, color) => {
    let demiWidth = render.width / 2;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(demiWidth + delta1 * render.width * scale1 + offset1, pos1);
    context.lineTo(demiWidth + delta1 * render.width * scale2 + offset2, pos2);
    context.lineTo(demiWidth + delta2 * render.width * scale2 + offset2, pos2);
    context.lineTo(demiWidth + delta2 * render.width * scale1 + offset1, pos1);
    context.fill();
}

// Reading string and for each letter draw the corresponding sprite letter
let drawText = (string, pos) => {
    string = string.toUpperCase();
    let cur = pos.x;
    for(let i=0; i < string.length; i++) {
        context.drawImage(spritesheetText, (string.charCodeAt(i) - 32) * 8, 0, 8, 8, cur, pos.y, 8, 8);
        cur += 8;
    }
}

// Drawing primitive
let drawImage = (image, x, y, scale) => {
    context.drawImage(spritesheet,  image.x, image.y, image.w, image.h, x, y, scale*image.w, scale*image.h);
};

let drawSprite = (sprite) => {
    let destY = sprite.y - sprite.i.h * sprite.s;
    let h = null
    if(sprite.ymax < sprite.y) {
        h = Math.min(sprite.i.h * (sprite.ymax - destY) / (sprite.i.h * sprite.s), sprite.i.h);
    } else {
        h = sprite.i.h;
    }
    if(h > 0) context.drawImage(spritesheet,  sprite.i.x, sprite.i.y, sprite.i.w, h, sprite.x, destY, sprite.s * sprite.i.w, sprite.s * h);
};

let drawSegmentPortion = (pos1, scale1, offset1, pos2, scale2, offset2, delta1, delta2, color) => {
    let demiWidth = render.width / 2;

    context.fillStyle = color;
    context.beginPath();
    context.moveTo(demiWidth + delta1 * render.width * scale1 + offset1, pos1);
    context.lineTo(demiWidth + delta1 * render.width * scale2 + offset2, pos2);
    context.lineTo(demiWidth + delta2 * render.width * scale2 + offset2, pos2);
    context.lineTo(demiWidth + delta2 * render.width * scale1 + offset1, pos1);
    context.fill();
}

// Drawing background
let drawBackground = (position) => {
    let first = position / 2 % (background.w);
    //(image, x, y, scale) args
    drawImage(background, first-background.w +1, 0, 1);
    drawImage(background, first+background.w-1, 0, 1);
    drawImage(background, first, 0, 1);
}

let setColorsEndCanvas = (track_segment, lane) => {
    track_segment = track_segment;
    lane          = lane;
}

let setColorsCanvas = (alternate, grass1, border1, border2, outborder1, outborder_end1, track_segment1, lane1, lane2, laneArrow1) => {
    grass          = grass1;
    border         = (alternate) ? border1 : border2;
    outborder      = outborder1;
    outborder_end  = outborder_end1;
    track_segment  = track_segment1;
    lane           = (alternate) ? lane1 : lane2;
    laneArrow      = laneArrow1;
}

// Drawing segment of the simulator(which corresponds to an entire strip of the canvas)
let drawSegment = (position1, scale1, offset1, position2, scale2, offset2, finishStart) => {
    if(finishStart){
        setColorsEndCanvas(track_segment_end, lane_end);
        // setColorsEndCanvas("#000", "#fff");

        //draw grass:
        context.fillStyle = grass;
        context.fillRect(0,position2,render.width,(position1-position2));

        // draw the track
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.5, 0.5, "#fff");

        //draw the track border
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.55, -0.47, border);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.55, border);

        //draw the track outborder dark green
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.47, -0.45, outborder_end);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.70, -0.57, outborder);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.57, -0.55, outborder_end);

        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.55,   0.57, outborder_end);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.57,   0.70, outborder);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.45, outborder_end);

        // draw the lane line
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.40, -0.35, "#000");
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.30, -0.25, "#000");
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.20, -0.15, "#000");
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.10, -0.05, "#000");
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.05, 0, "#000");
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.15, 0.10, "#000");
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.25, 0.20, "#000");
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.35, 0.30, "#000");
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.45, 0.40, "#000");


        //TODO Change arrow direction when car is off track
        // draw arrow guide
        //drawArrow(position1, scale1, offset1, position2, scale2, offset2, -0.02, 0.02, laneArrow);
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
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.5, 0.5, track_segment);

        //draw the track border
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.55, -0.47, border);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.55, border);

        //draw the track outborder dark green
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.47, -0.45, outborder_end);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.70, -0.57, outborder);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, -0.57, -0.55, outborder_end);

        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.55,   0.57, outborder_end);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.57,   0.70, outborder);
        drawSegmentPortion(position1, scale1, offset1, position2, scale2, offset2, 0.47,   0.45, outborder_end);

        // draw the lane line
        drawLanes(position1, scale1, offset1, position2, scale2, offset2, lane, numLanes, laneWidth);

        // draw arrow guide
        //drawArrow(position1, scale1, offset1, position2, scale2, offset2, -0.02, 0.02, laneArrow);
        context.fillStyle = laneArrow;
        context.beginPath();
        context.moveTo(160, 150);
        context.lineTo(150, 160);
        context.lineTo(170, 160);
        context.closePath();
        context.fill();

    }
}

/** 
 * 
 * JSON Structure Straight Version
 * 
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
*/
let loadTrackConfiguration = () => {
    try {
        let numIterations = trackParam.numZones * trackParam.zoneSize;
        trackParam.numZones = numIterations;
        clearInterval(loadingTrackConfiguration);
    } catch (error) {
    }
   
};

let updateControllableCar = () => {
   
  //  Update the car state
   
  // TODO understand lastDelta
  if (Math.abs(lastDelta) > 130){
      if (controllable_car.speed > 3) {
          controllable_car.speed -= 0.2;
      }

  } else {
      // readSprite acceleration controls
      if (keys[38]) { // 38 up
          controllable_car.speed += controllable_car.acceleration;
          if(!soundOff){
            sounds[2].play(); //accelerating song
          }
      } else if (keys[40]) { // 40 down
          controllable_car.speed -= controllable_car.breaking;
          if(!soundOff){
            sounds[2].pause(); //accelerating song
          }
      } else {
          controllable_car.speed -= controllable_car.deceleration;
          if(!soundOff){
            sounds[2].pause(); //accelerating song
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
          car: car2_faced_left,
          x: 125,
          y: 190
      };
  } else if (keys[39]) {
      // 39 right
      if(controllable_car.speed > 0){
          controllable_car.posx += controllable_car.turning;
      }
      carSprite = {
          car: car2_faced_right,
          x: 125,
          y: 190
      };
  } else {
      carSprite = {
          car: car2_faced_front,
          x:125,
          y:190
      };
  }

  return carSprite;
}

// renders one frame
let renderSimulatorFrame = () => {

    if(keys[81]){ // Key 'q' ends current simulator
        chronometer.stop();
        $(".tog").css("visibility", "hidden");
        clearInterval(simulatorInterval);
        splashInterval = setInterval(renderSplashEndFrame, 30);
      
        sounds = $('audio');
        sounds[0].pause(); 
        sounds[1].pause(); 
        sounds[2].pause(); 
        sounds[3].pause();
    }

    if(keys[83]){ // Key 's' pauses current simulator
        chronometer.pause();
        $(".tog").css("visibility", "hidden");
        clearInterval(simulatorInterval);
        splashInterval = setInterval(renderSplashPauseFrame, 30);
        
        sounds = $('audio');
        sounds[0].pause(); 
        sounds[1].pause(); 
        sounds[2].pause(); 
        sounds[3].pause();
    }

    // Clean screen
    //context.fillStyle = "#dc9"; // rgb(221, 204, 153) matches first background color
    context.fillStyle = "#76665d"; // rgb(139, 120, 106)
    context.fillRect(0, 0, render.width, render.height);

    let carSprite = updateControllableCar();
    drawBackground(-controllable_car.posx);

    let spriteBuffer = [];

     
    // Render the track
     
    let absoluteIndex = Math.floor(controllable_car.position / trackSegmentSize);

    if(absoluteIndex >= trackParam.numZones-render.depthOfField-1){
        clearInterval(simulatorInterval);
        drawText("Simulation Ended!", {x: 90, y: 40});
        drawText("Wait 5 Seconds To Reload", {x: 60, y: 60});
        drawText("The Simulator", {x: 100, y: 70});
        sounds = $('audio');
        sounds[0].pause(); 
        sounds[1].pause(); 
        sounds[2].pause(); 
        sounds[3].pause();
        // Delayed function call by 5 seconds to reload simulatior
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
            // Setting the colors within the simulator for each segment 
            // (alternate, grass1, border1, border2, outborder1, outborder_end1, track_segment1, lane1, lane2, laneArrow1)
            // setColorsCanvas(counter < numberOfSegmentPerColor, "#699864", "#e00", "#fff", "#496a46", "#474747", "#777", "#fff", "#777", "#00FF00");
            setColorsCanvas(counter < numberOfSegmentPerColor, grass1, border1, border2, outborder1, outborder_end1, track_segment1, lane1, lane2, laneArrow1);
            drawSegment(
                render.height / 2 + currentHeight,
                currentScaling, currentSegment.curve - baseOffset - lastDelta * currentScaling,
                render.height / 2 + endProjectedHeight,
                endScaling,
                nextSegment.curve - baseOffset - lastDelta * endScaling,
                currentSegmentIndex == 2 || currentSegmentIndex == (trackParam.numZones-render.depthOfField));
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

    while(sptB = spriteBuffer.pop()) {
        // Getting the obstacles coordinates
        // if(sptB.obstacle===1){
        //     // console.log(sptB.x+","+sptB.y);
        //     // console.log(sptB.pos);
        // }
        
        // It only draws the obstacles within the track
        // if(sptB.obstacle===1){
        //     drawSprite(sptB);
        // }

        drawSprite(sptB);
        // console.log(sptB);
    }
   
    // console.log(spritesReadJSON);
     
    // Draw the car 
     
    drawImage(carSprite.car, carSprite.x, carSprite.y, 1);

     
    // Draw Header 
    drawText(""+Math.round(absoluteIndex/(trackParam.numZones-render.depthOfField)*100)+"%",{x: 10, y: 1});
    
    let speed = Math.round(controllable_car.speed / controllable_car.maxSpeed * topSpeed);
    let speed_kmh = Math.round(speed * 1.60934);
    drawText(""+speed_kmh+" kmh", {x: 260, y: 1});
    drawText(""+speed+" mph", {x: 260, y: 10});

    let res = time[0].split("-");
    currentTimeString = res[0] + " h:" + time[1] + " m:" + time[2] + " s:" + time[3] + " ms";
    drawText(currentTimeString, {x: 70, y: 1});
};
