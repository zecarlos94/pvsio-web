Guide step-by-step to create a new track with TrackGenerator Widget and, then, render it with Arcade Widget.

### User Steps, using the Customization Widget ( easier )

1. **Open <http://localhost:8082/demos/arcade_game_simulator/>**
2. **Select the image with the desired steering wheel, which will be used during the simulation.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectSteeringWheel.png" alt="selectSteeringWheel" width="700" style="margin-left: 150px" >

3. **Use the color pickers to select the track colors.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectTrackColors.png" alt="selectTrackColors" width="700" style="margin-left: 150px" >

4. **Insert within the square brackets the topography of the lane that you intend to use in the simulation, i.e., the lane that will be constructed and rendered. Use only the keywords: 'left', 'right', 'straight', 'up', 'down' to describe this track, separated by ','.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectTrackTopography.png" alt="selectTrackTopography" width="700" style="margin-left: 150px" >

5. **Insert the spritesheet JSON filename.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectSpritesheetJSON.png" alt="selectSpritesheetJSON" width="700" style="margin-left: 150px" >

6. **Insert the spritesheet images filename, one with only letters and other with all objects/obstacles.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectSpritesheetImages.png" alt="selectSpritesheetImages" width="700" style="margin-left: 150px" >

7. **Insert within the square brackets the landscape sprites, separated by ','.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectLandscapeObjects.png" alt="selectLandscapeObjects" width="700" style="margin-left: 150px" >

8. **Insert within the square brackets the track sprites (obstacles), separated by ','.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectTrackObstacles.png" alt="selectTrackObstacles" width="700" style="margin-left: 150px" >

9. **Fill within the brackets each track parameters, after ':'.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectTrackParams.png" alt="selectTrackParams" width="700" style="margin-left: 150px" >

10. **Select other customization options for the dashboard widgets, which will be used during the simulation, and other rendering aspects using the following set of ranges.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectRanges.png" alt="selectRanges" width="700" style="margin-left: 150px" >

> Select the maximum values that the speedometer and tachometer widgets will have, in the 'Value of Speedometer' and 'Value of Tachometer' ranges. 

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectRangesSpeedometerTachometer.png" alt="selectRangesSpeedometerTachometer" width="500" style="margin-left: 150px" >

> If the values selected in these ranges are 200 and 9, respectively, and if the steering wheel selected is the porsche steering wheel ( purple steering wheel ), then the final vehicle dashboard, which will be used during the simulation, is

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/customizationResult.png" alt="customizationResult" width="500" style="margin-left: 150px" >


> Select the desired number of lanes, to draw within the track during the simulation, in the 'Value of Lanes' range.

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectRangeLanes.png" alt="selectRangeLanes" width="200" style="margin-left: 300px" >

> Select the frequency of obstacles to be placed within the track during the simulation, in the 'Frequence of Obstacles' range, i.e. choose how many iterations a new obstacle arises.

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/selectRangesObstacles.png" alt="selectRangesObstacles" width="200" style="margin-left: 300px" >

> To finish the customization, slide the last range to the right.

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/tutorials_jsdoc/img/endRange.png" alt="EndRange" width="50" style="margin-left: 400px" >

> Although it was not an objective in this dissertation, the widget 'Customization' was created to ease the simulation process. However, since this is not a priority, this widget can be improved over time, for example by adding other customization options that match the optional fields that the TrackGenerator and Arcade widgets have.


### User Steps, with only manual configurations ( harder )

> In this section we present the steps to create a new simulation, using only the Widget APIs developed, which requires a more 'conscious' user. The following steps will be the necessary steps to create a new demo within PVSio-web.

1. **Create the desired track either using methods that generate the track randomly or using methods that generate the track based on the provided layout.**

```
let trackGenerator = {};
// -----------------------------  TRACK GENERATOR COMPONENTS -----------------------------
trackGenerator.trackGeneratorWidget = new TrackGenerator("trackGeneratorWidget", {
    top: 80,
    left: 650,
    width: 780,
    height: 650
}, {
    parent: "content", // defines parent div, which is div id="content" by default
    spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
    render: {
        width: 320,
        height: 240,
        depthOfField: 150,
        camera_distance: 30,
        camera_height: 100
    },
    trackSegmentSize: 5,
    numberOfSegmentPerColor: 4,
    numLanes: 3,
    laneWidth: 0.02,
    trackParam: {
        maxHeight: 900,
        maxCurve:  400,
        numZones:    12, // number of different portions of the track
        curvy:     0.8,
        mountainy: 0.8,
        zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
    },
    // Information regarding current controllable_car's car
    controllable_car: {
        position: 10,
        speed: 0,
        acceleration: 0.05,
        deceleration: 0.04,
        breaking: 0.3,
        turning: 5.0,
        posx: 0,
        maxSpeed: 20
    },
    topSpeed: 250,
    objects: ["tree","boulder"],
    obstacle: ["boulder"],
    obstaclePerIteration: 50,
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
    },
    trackLayout: [ 
        // describing the desired track, which is 2 straight lines, followed by curve to left, straight line, 
        // curve to right, straight line, 2 up slopes, curve to left, down slope, curve to right,
        // straight line, each with 3 zones (length) (default is []).
        {
            topography: "plain",
            numZones: 3
        },
        {
            topography: "plain",
            numZones: 3
        },
        {
            topography: "left",
            numZones: 3
        },
        {
            topography: "plain",
            numZones: 3
        },
        {
            topography: "right",
            numZones: 3
        },
        {
            topography: "plain",
            numZones: 3
        },
        {
            topography: "up",
            numZones: 3
        },
        {
            topography: "up",
            numZones: 3
        },
        {
            topography: "left",
            numZones: 3
        },
        {
            topography: "down",
            numZones: 3
        },
        {
            topography: "right",
            numZones: 3
        },
        {
            topography: "plain",
            numZones: 3
        }
    ],
    callback: onMessageReceived
});
```

> The render method only makes visible the widget div
```
function render(res) {
    trackGenerator.trackGeneratorWidget.render();
}
```

> The API needed to create, randomly, a track, with only straight lines is
```
trackGenerator.trackGeneratorWidget.generateStraightTrack();
```

> The API needed to create, randomly, a track, with straight lines, curves and slopes is
```
trackGenerator.trackGeneratorWidget.generateTrackCurvesSlopes();
```

> The API needed to create the desired track is (currently in development)
```
trackGenerator.trackGeneratorWidget.generateDesiredTrack();
```

> To create the track is then only necessary, create the constructor with the optional fields that you want, if none is inserted, the widget will use the following predefined values,
```
parent: "game-window",
spritesFilename: "spritesheet",
render: {
    width: 320,
    height: 240,
    depthOfField: 150,
    camera_distance: 30,
    camera_height: 100
},
trackSegmentSize: 5,
numberOfSegmentPerColor: 4,
numLanes: 3,
laneWidth: 0.02,
trackParam: {
    maxHeight: 900,
    maxCurve:  400,
    numZones:    12,
    curvy:     0.8,
    mountainy: 0.8,
    zoneSize:  250
},
controllable_car: {
    position: 10,
    speed: 0,
    acceleration: 0.05,
    deceleration: 0.04,
    breaking: 0.3,
    turning: 5.0,
    posx: 0,
    maxSpeed: 20
},
topSpeed: 250,
objects: ["tree","boulder"],
obstacle: ["boulder"],
obstaclePerIteration: 50,
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
},
trackLayout: []
```

> The desired layout, 'trackLayout' optional field, will only be translated into canvas segments, which will be represented by the Arcade widget, by the generateDesiredTrack() method. The generateStraightTrack() and generateTrackCurvesSlopes() methods can be invoked when the user wants to render random track, with only straight lines or with straight lines, curves and slopes, respectively.

> Invoking the above APIs ( generateStraightTrack(),generateTrackCurvesSlopes(),generateDesiredTrack ) results in the creation of a JSON file with the following structure,

```
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
```

> Currently, PVSio-web does not have any file-writing APIs in the context of widgets, and as such, the TrackGenerator widget is not able to write the JSON file. Then, the user needs to perform ```console.log(JSON.stringify(generatedJSON))``` and copy/paste the result into a JSON file, that is, the user needs to perform the non-existent API process manually. Predefined file names are "track-straight.json" or "track-curves-slopes.json", however it is possible to use other file names, since the Arcade widget receives the filename as optional field. When the file-writing API exists, it should be added on lines 628 and 847 with ```console.log(JSON.stringify(generatedJSON))```, as well as the filename, as arguments, in TrackGenerator.js file.

> Once the JSON file with the desired track has been created, it will be possible to render it using the Arcade widget.


2. **Render the desired track, created previously, i.e. created in step 1.**

```
let arcade = {};
// ----------------------------- DASHBOARD INTERACTION -----------------------------
arcade.up = new ButtonExternalController("accelerate", { width: 0, height: 0 }, {
    callback: onMessageReceived,
    evts: ['press/release'],
    keyCode: 38 // key up
});
arcade.down = new ButtonExternalController("brake", { width: 0, height: 0 }, {
    callback: onMessageReceived,
    evts: ['press/release'],
    keyCode: 40 // key down
});

// ----------------------------- DASHBOARD COMPONENTS -----------------------------
// ---------------- SPEEDOMETER ----------------
arcade.speedometerGauge = new Speedometer('speedometer-gauge', {
    label: "kmh",
    max: 260,
    min: 0
});
// ---------------- TACHOMETER ----------------
arcade.tachometerGauge = new Tachometer('tachometer-gauge', {
    max: 9,
    min: 0,
    label: "x1000/min"
});

// ---------------- STEERING WHEEL ----------------
arcade.steeringWheel = new SteeringWheel("steering_wheel", {
    top: 140,
    left: 30,
    width: 600,
    height: 600
}, {
    style: "ferrari",
    callback: onMessageReceived
});

// ----------------------------- ARCADE GAME COMPONENTS -----------------------------
arcade.arcadeWidget = new Arcade("arcadeWidget", {
    top: 80,
    left: 650,
    width: 780,
    height: 650
}, {
    parent: "game-window", // defines parent div, which is div id="game-window" by default
    trackFilename: "track-curves-slopes", // "track-straight", // defines track configuration filename, which is "track-curves-slopes.json" by default
    spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
    spritesFiles: ["spritesheet","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
    trackTopography: "curves-slopes", // "straight", // defines initial position after ending 1 lap (restart position in another lap).
    realisticImgs: false,
    vehicle: "car", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
    vehicleImgIndex: 2, // defines vehicle sprite image suffix 
    // logoImgIndex: 1, // defines logo sprite image suffix 
    // backgroundImgIndex: 1, // defines background sprite image suffix 
    stripePositions: {
        trackP1: -0.50,
        trackP2: 0.50,
        borderWidth: 0.08,
        inOutBorderWidth: 0.02,
        landscapeOutBorderWidth: 0.13,
        diffTrackBorder: 0.05,
        finishLineP1: -0.40,
        finishLineP2: 0.40,
        diffLanesFinishLine: 0.05
    },
    lapNumber: 2,
    // showOfficialLogo: true,
    // loadPVSSpeedPositions: false,
    callback: onMessageReceived
});

// ----------------------------- ARCADE GAME INTERACTION -----------------------------
arcade.resume = new ButtonExternalController("resume", { width: 0, height: 0 }, {
    callback: onMessageReceived,
    evts: ['press/release'],
    keyCode: 32 // key space
});
arcade.pause = new ButtonExternalController("pause", { width: 0, height: 0 }, {
    callback: onMessageReceived,
    evts: ['press/release'],
    keyCode: 83 // key 's'
});
arcade.quit = new ButtonExternalController("quit", { width: 0, height: 0 }, {
    callback: onMessageReceived,
    evts: ['press/release'],
    keyCode: 81 // key 'q'
});
arcade.mute = new ButtonExternalController("mute", { width: 0, height: 0 }, {
    callback: onMessageReceived,
    evts: ['press/release'],
    keyCode: 77 // key 'm'
});
arcade.unmute = new ButtonExternalController("unmute", { width: 0, height: 0 }, {
    callback: onMessageReceived,
    evts: ['press/release'],
    keyCode: 85 // key 'u'
});
```

> For a new simulation it is necessary to add not only the Arcade widget, which renders the track, but also the widgets whose designs will be 'tested', as is the case of the steering wheel, speedometer, tachometer, among others. It is also necessary to add all the buttons that will allow to invoke the formal specifications, defined in the main.pvs file inside the demo folder that is being created, e.g. resume, pause, quit, mute, unmute, accelerate and brake actions.

> It should be noted that if the JSON file, with the desired track, created in step 1, used the spritesheet 'spritesheet.json', whose sprites are present in the 'spritesheet.png' and 'spritesheet.text.png' images, then the Arcade widget, to correctly represent the track, must receive the same files, in 'spritesFilename' and 'spritesFiles' optional fields. All spritesheets must have the .png extension, since it is the extension that is being added by default, to simplify the values received in the optional fields. 

> To create the spritesheet JSON file and spritesheet image it is recommended to use the tool <https://www.codeandweb.com/texturepacker>, which allows to add and group the different images. Using 'publish' functionality the JSON file, with the coordinates of each image, and the spritesheet image, with .png extension, will be created.

> The API needed to start the new simulation is
```
arcade.arcadeWidget.startSimulation();
```

> The render method renders the speedometer, tachometer, steering wheel and arcade widgets
```
function render(res) {
    arcade.speedometerGauge.render(evaluate(res.speed.val));
    arcade.tachometerGauge.render(evaluate(res.rpm));
    arcade.steeringWheel.render(evaluate(res.steering));
    arcade.arcadeWidget.render(res);
}
```

> To render the track is then only necessary, create the constructor with the optional fields that you want, if none is inserted, the widget will use the following predefined values,
```
parent: "game-window", 
trackFilename: "track-curves-slopes", 
spritesFilename: "spritesheet", 
spritesFiles: ["spritesheet","spritesheet.text"], 
trackTopography: "curves-slopes",
realisticImgs: false,
vehicle: "car", 
vehicleImgIndex: null, 
logoImgIndex: null,
backgroundImgIndex: null,
stripePositions: {
    trackP1: -0.50,
    trackP2: 0.50,
    borderWidth: 0.08,
    inOutBorderWidth: 0.02,
    landscapeOutBorderWidth: 0.13,
    diffTrackBorder: 0.05,
    finishLineP1: -0.40,
    finishLineP2: 0.40,
    diffLanesFinishLine: 0.05
},
lapNumber: 2,
showOfficialLogo: false,
loadPVSSpeedPositions: true
```

> Predefined file name is "track-curves-slopes.json", which has the arcade simulation with all different topographies.


3. **Necessary PVS Code**

> In order to the Arcade widget work it will be necessary to use formal specifications, in pvs/main.pvs file, written with the formal language PVS as it follows,

```
% ---------------------------------------------------------------
%  Theory: car_demo
%  Author: Paolo Masci, José Carlos
%          INESC TEC and Universidade do Minho
% ---------------------------------------------------------------

main: THEORY
 BEGIN

  Gear: TYPE = { P, N, R, GEAR_1, GEAR_2, GEAR_3, GEAR_4, GEAR_5, GEAR_6 }
  gear2real(g: Gear): real =
    COND
     g = P OR g = N -> 0,
     g = R -> 3.67,
     g = GEAR_1 -> 3.78,
     g = GEAR_2 -> 2.06,
     g = GEAR_3 -> 1.23,
     g = GEAR_4 -> 0.83,
     g = GEAR_5 -> 0.7,
     g = GEAR_6 -> 0.6
    ENDCOND
  CONVERSION gear2real

  MAX_SPEED: real = 300
  Speed_Unit: TYPE = { kpm, mph }
  Speed_Val: TYPE = { x: real | x <= MAX_SPEED }
  Speed: TYPE = [#
    val: Speed_Val,
    units: Speed_Unit
  #]

  MAX_RPM: real = 14
  Rpm: TYPE = { x: nonneg_real | x <= MAX_RPM }

  MAX_ODO: real = 999999
  Odo: TYPE = { x: nonneg_real | x <= MAX_ODO }

  TEMP_AMB: real = 16.1
  Temp_Units: TYPE = { C, F }
  Temp: TYPE = [#
    val: real,
    units: Temp_Units
  #]

  POSITION_INIT: real = 10.0
  Position: TYPE = [#
    val: real
  #]

  POSX_INIT: real = 0.0
  PosX: TYPE = [#
    val: real
  #]

  Action: TYPE = { idle, acc, brake, left, right, straight, pause, resume, quit }
  Sound: TYPE = { unmute, mute }
  Time: TYPE = [# hour: int, min: int #]

  state: TYPE = [#
    speed: Speed, % Km/h
    gear: Gear,
    rpm: Rpm, % x1000/min
    odo: Odo, % Km
    temp: Temp,
    time: Time,
    steering: real,
    position: Position,
    posx: PosX,
    action: Action,
    sound: Sound
  #]

  get_current_time: Time = (# hour := get_time`hour, min := get_time`minute #)

  %-- initial state
  init(x: real): state = (#
    speed := (# val:= IF x < MAX_SPEED THEN x ELSE MAX_SPEED ENDIF, units := kpm #),
    gear := N,
    rpm := 0,
    odo := 0,
    temp := (# val := TEMP_AMB, units := C #),
    time := get_current_time,
    steering := 0,
    position := (# val := POSITION_INIT  #),
    posx := (# val := POSX_INIT #),
    action := idle,
    sound := unmute
  #)

  %-- utility functions
  tyre: real = 7.30 %-- tyre circumference, in feet
  % this function converts speed into rpms based on the gear and tyre size
  getRPM(st: state): Rpm =
    LET new_rpm = (speed(st)`val * gear(st) * 440) / tyre / 1000
     IN COND
          new_rpm < 0 -> 0,
	  new_rpm > MAX_RPM -> MAX_RPM,
	  ELSE -> new_rpm
	ENDCOND

  getAcc(g: Gear): Speed_Val =
   COND
     g = P OR g = N -> 0,
     g = R -> -0.6,
     g = GEAR_1 -> 0.6,
     g = GEAR_2 -> 1.2,
     g = GEAR_3 -> 1,
     g = GEAR_4 -> 0.8,
     g = GEAR_5 -> 0.6,
     g = GEAR_6 -> 0.3
   ENDCOND
  getBrk(g: Gear): [# speed: real, rpm: real #] = (# speed := -2, rpm := -1 #)

  gearUP(st: state): state =
    LET g = gear(st) IN
    COND
     g = P OR g = N OR g = R -> st,
     g = GEAR_1 -> st WITH [ gear := GEAR_2 ],
     g = GEAR_2 -> st WITH [ gear := GEAR_3 ],
     g = GEAR_3 -> st WITH [ gear := GEAR_4 ],
     g = GEAR_4 -> st WITH [ gear := GEAR_5 ],
     g = GEAR_5 -> st WITH [ gear := GEAR_6 ],
     g = GEAR_6 -> st
    ENDCOND
  gearDOWN(st: state): state =
    LET g = gear(st) IN
    COND
     g = P OR g = N OR g = R -> st,
     g = GEAR_1 -> st,
     g = GEAR_2 -> st WITH [ gear := GEAR_1 ],
     g = GEAR_3 -> st WITH [ gear := GEAR_2 ],
     g = GEAR_4 -> st WITH [ gear := GEAR_3 ],
     g = GEAR_5 -> st WITH [ gear := GEAR_4 ],
     g = GEAR_6 -> st WITH [ gear := GEAR_5 ]
    ENDCOND

  accelerate(st: state): state =
    LET st = st WITH [ gear := IF gear(st) = N THEN GEAR_1 ELSE gear(st) ENDIF ],
        step = getAcc(gear(st)),
        st = IF speed(st)`val + step < MAX_SPEED
             THEN st WITH [ speed := speed(st) WITH [ val:= speed(st)`val + step ]]
	     ELSE st WITH [ speed := speed(st) WITH [ val:= MAX_SPEED ]] ENDIF,
	new_rpm = getRPM(st),
	st = st WITH [ rpm := new_rpm, position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
     IN IF rpm(st) > 6 THEN gearUP(st) ELSE st ENDIF

  brake(st: state): state =
    LET step = getBrk(gear(st)),
        st = IF speed(st)`val >= 0
	     THEN st WITH [ speed := speed(st) WITH
	   	   	  [ val := IF speed(st)`val + step`speed > 0
				   THEN speed(st)`val + step`speed
				   ELSE 0 ENDIF ]]
	     ELSE %-- the car was driving in reverse, so the speed was negative
                  st WITH [ speed := speed(st) WITH
		          [ val:= IF speed(st)`val - step`speed < 0
				  THEN speed(st)`val - step`speed
				  ELSE 0 ENDIF ]] ENDIF,
	new_rpm = getRPM(st),
        st = st WITH [ rpm := new_rpm, position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
     IN IF rpm(st) < 4 THEN gearDOWN(st) ELSE st ENDIF

  FRICTION: Speed_Val = 0.6
  inc(odo: Odo, speed: Speed): Odo =
    LET step = speed`val / 60 * 1
     IN IF step >= 0
        THEN IF odo + step <= MAX_ODO THEN odo + step ELSE odo + step - MAX_ODO ENDIF
	ELSE IF odo + step <= 0 THEN 0 ELSE odo + step ENDIF ENDIF

  tick(st: state): state =
   LET st = st WITH [ time := get_current_time ] IN
    IF action(st) = idle
    THEN IF speed(st)`val > 0
         THEN LET new_speed = IF speed(st)`val - FRICTION > 0 THEN speed(st)`val - FRICTION ELSE 0 ENDIF,
	          st = st WITH [ speed := speed(st) WITH [ val := new_speed ]]
	       IN st WITH [ rpm := getRPM(st),
	       	            odo := inc(odo(st), speed(st)) ]
         ELSE st ENDIF
    ELSE st ENDIF


  %-- APIs
  press_accelerate(st: state): state = accelerate(st) WITH [ action := acc ]
  release_accelerate(st: state): state = st WITH [ action := idle ]

  press_brake(st: state): state = brake(st) WITH [ action := brake ]
  release_brake(st: state): state = st WITH [ action := idle ]

  POSX_STEP: real = 5.0 
  STEERING_STEP: real = 20 %deg
  steering_wheel_right(st: state): state = st WITH [ steering := steering(st) + STEERING_STEP, posx := posx(st) WITH [ val:= posx(st)`val + POSX_STEP ], action := right]
  steering_wheel_left(st: state): state = st WITH [ steering := steering(st) - STEERING_STEP, posx := posx(st) WITH [ val:= posx(st)`val - POSX_STEP ], action := left ]
  steering_wheel_straight(st: state): state = st WITH [ steering := 0, action := straight ]
  steering_wheel_rotate(x: real)(st: state): state = st WITH [ steering := x, action := IF x > 0 THEN right ELSE left ENDIF]

  %-- API for sound controls 
  press_mute(st: state): state = st WITH [ sound := mute ]
  release_mute(st: state): state = st WITH [ sound := mute ]
  
  press_unmute(st: state): state = st WITH [ sound := unmute ]
  release_unmute(st: state): state = st WITH [ sound := unmute ]
  
  %-- API for virtual Keypad controller 
  %-- TODO create the interactions with Arcade Driving Simulator
  press_quit(st: state): state = st WITH [ action := quit ]
  release_quit(st: state): state = st WITH [ action := idle ]
  press_pause(st: state): state = st WITH [ action := pause ]
  release_pause(st: state): state = st WITH [ action := idle ]
  press_resume(st: state): state = st WITH [ action := resume ]
  release_resume(st: state): state = st WITH [ action := idle ]

  %-- API for external controllers such as PS4 gamepad
  click_accelerate(st: state): state = accelerate(st) WITH [ action := acc ]

  click_brake(st: state): state = brake(st) WITH [ action := brake ]

  %-- API for external controller interactive image
  %-- PS4
  press_cross(st: state): state = accelerate(st) WITH [ action := acc ]
  release_cross(st: state): state = st WITH [ action := idle ]

  press_circle(st: state): state = brake(st) WITH [ action := brake ]
  release_circle(st: state): state = st WITH [ action := idle ]
  
  %-- XBOX1
  press_a(st: state): state = accelerate(st) WITH [ action := acc ]
  release_a(st: state): state = st WITH [ action := idle ]

  press_b(st: state): state = brake(st) WITH [ action := brake ]
  release_b(st: state): state = st WITH [ action := idle ]

  press_rightArrow(st: state): state = st WITH [ steering := steering(st) + STEERING_STEP ]
  release_rightArrow(st: state): state = st WITH [ action := idle ]

  press_leftArrow(st: state): state = st WITH [ steering := steering(st) - STEERING_STEP ]
  release_leftArrow(st: state): state = st WITH [ action := idle ]

END main
```

> This set of specifications was leveraged from the demo 'car', <http://localhost:8082/demos/car/>, and developed in order to add the necessary parameters, to maintain the state of the simulation. The modifications that were added were,

```
POSITION_INIT: real = 10.0
Position: TYPE = [#
    val: real
#]

POSX_INIT: real = 0.0
PosX: TYPE = [#
    val: real
#]

Action: TYPE = { idle, acc, brake, left, right, straight, pause, resume, quit }

Sound: TYPE = { unmute, mute }

state: TYPE = [#
    speed: Speed, % Km/h
    gear: Gear,
    rpm: Rpm, % x1000/min
    odo: Odo, % Km
    temp: Temp,
    time: Time,
    steering: real,
    position: Position,
    posx: PosX,
    action: Action,
    sound: Sound
#]
```

> Position, PosX and Speed allows to set the vehicle's position and speed during the simulation. Sound allows the Arcade widget to know when to mute/unmute the audio files, using the Sound widget API. PosX value changes based on the steering wheel rotation. Position value changes based on actions 'accelerate'/'brake' and the current speed value. Actions 'pause','resume' and 'quit' allows the Arcade widget to reveal the 'pause','resume' and 'quit' menus, respetively. 

> Currently it is possible to test the functional demo 'arcade', <http://localhost:8082/demos/arcade_game_simulator/>, i.e., to test the interactions PVS-Arcade Widget. That is, to use PVS instructions to maintain the simulation state.