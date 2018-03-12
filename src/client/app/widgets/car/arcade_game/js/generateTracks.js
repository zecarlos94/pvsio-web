// Random numbers to place sprites randomly within the landscape territory
let randomPos = Math.random;
let sprites;
let urlUploadedGeneratedTrack;
let generatedTrack=[];
let generatedObstacles=[];
let car_faced_front, car_faced_left, car_faced_right, car2_faced_front, car2_faced_left, car2_faced_right, background, tree, boulder;

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

$(document).ready(function() {
    // Load the JSON File with Sprites
    $.get("https://api.myjson.com/bins/1f869h", function (data, textStatus, jqXHR) {
        sprites = JSON.parse(JSON.stringify(data));
        // Reading The JSON Sprites Available
        for(let k=0;k<sprites.frames.length;k++){
            // check if the required sprites, by name, exists
            if(sprites.frames[k].filename.split(".")[0]==="car_faced_front"){
                // console.log(true);
                car_faced_front = sprites.frames[k].frame;
            }
            if(sprites.frames[k].filename.split(".")[0]==="car_faced_left"){
                // console.log(true);
                car_faced_left = sprites.frames[k].frame;
            }
            if(sprites.frames[k].filename.split(".")[0]==="car_faced_right"){
                // console.log(true);
                car_faced_right = sprites.frames[k].frame;
            }
            if(sprites.frames[k].filename.split(".")[0]==="car2_faced_front"){
                // console.log(true);
                car2_faced_front = sprites.frames[k].frame;
            }
            if(sprites.frames[k].filename.split(".")[0]==="car2_faced_left"){
                // console.log(true);
                car2_faced_left = sprites.frames[k].frame;
            }
            if(sprites.frames[k].filename.split(".")[0]==="car2_faced_right"){
                // console.log(true);
                car2_faced_right = sprites.frames[k].frame;
            }
            if(sprites.frames[k].filename.split(".")[0]==="background"){
                // console.log(true);
                background = sprites.frames[k].frame;
            }
            if(sprites.frames[k].filename.split(".")[0]==="tree"){
                // console.log(true);
                tree = sprites.frames[k].frame;
            }
            if(sprites.frames[k].filename.split(".")[0]==="rock"){
                // console.log(true);
                boulder = sprites.frames[k].frame;
            }
            
            // console.log(sprites.frames[k].filename.split(".")[0])
            // console.log(sprites.frames[k].frame);
        }    
    });

    setTimeout(function(){ 
        // console.log(sprites); 
        generateTrack();
        // console.log(generatedTrack);

        // Use http://myjson.com/api to store and load JSON file with generatedTrack configuration
        // Create JSON File with the previous generated generatedTrack configuration parameters

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

        // console.log(JSON.stringify(generatedJSON), null, 2);
        // console.dir(JSON.stringify(generatedJSON), {depth: null, colors: true});
        // console.log(JSON.stringify(generatedJSON, undefined, 4));
        // console.log(JSON.stringify(generatedJSON));
        
        $.ajax({
            url:"https://api.myjson.com/bins/",
            type:"POST",
            data:JSON.stringify(generatedJSON),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data, textStatus, jqXHR){
                urlUploadedGeneratedTrack = JSON.stringify(data);
                // url.uri is the url address which will have the uploaded JSON in order to allow "GET" requests afterwards.
                // console.log(urlUploadedGeneratedTrack);
                $("#uploaded").css("visibility", "visible");
                $("#jsonURI").text(urlUploadedGeneratedTrack);
            }
        });
    }, 3000);

});

let generateTrack = () => {
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
};
