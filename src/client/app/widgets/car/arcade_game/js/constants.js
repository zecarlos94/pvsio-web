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