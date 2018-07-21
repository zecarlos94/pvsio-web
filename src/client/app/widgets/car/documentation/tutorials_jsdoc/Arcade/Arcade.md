Guide step-by-step to create a new track with TrackGenerator Widget and, then, render it with Arcade Widget.

### User Steps, using the Customization Widget ( easier )

1. **Open <http://localhost:8082/demos/arcade_game_simulator/>**
2. **Select the image with the desired steering wheel, which will be used during the simulation.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectSteeringWheel.png" alt="selectSteeringWheel" width="700" style="margin-left: 150px" >

3. **Use the color pickers to select the track colors.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectTrackColors.png" alt="selectTrackColors" width="700" style="margin-left: 150px" >

4. **Insert within the square brackets the topography of the lane that you intend to use in the simulation, i.e., the lane that will be constructed and rendered. Use only the keywords: 'left', 'right' and 'straight' to describe the topography of the track, after "name:". Use only the keywords: 'flat', 'up' and 'down' to describe the profile/height of the track after "profile:". Use angles, in degrees, to define the curvature angle after "curvature". The angle 0 represents a straight line. To represent left curvatures the angle must be between 0 and -90. To represent right curvatures the angle must be between 0 and 90. The field numZones allows to replicate as many blocks as the user desires. That is, if the user wants 4 left curves instead of declaring 4 topographies with one zone it can be done by declaring one topography with 4 zones. This is particularly useful when declaring straight lines (blocks) that allows to produce sections with different lenghts. The field trafficSignals is an array that allows to place sprites in a specific part of the topography zone. For instance, placing a speed limit traffic signal in a certain horizontal position (posX), in a section of the zone, i.e. vertical position based on the field of view (zoneDistance), with a certain scale. If the user wants to place the aforementioned signal (filename) in -0.4(left side), at a distance of 40 (out of zoneSize value-must be higher or equal than 40), with a scale of 2.3 in zone 3 of a 4-zone topography (numZones is 4, that is 4 equal consecutive blocks), he will observe that on zone 3, at approximately 3/4 of the topography, a speed limit traffic signal scaled by 2.3 at a distance of 40 out of zoneSize. If zoneSize is 250 (default length of each zone), then 40/250 means that the sprite will appear almost in the beginning of the third zone as expected and desired.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectTrackTopography1.png" alt="selectTrackTopography" width="700" style="margin-left: 150px" >

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectTrackTopography2.png" alt="selectTrackTopography" width="700" style="margin-left: 150px" >

5. **Insert the spritesheet JSON filename.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectSpritesheetJSON.png" alt="selectSpritesheetJSON" width="700" style="margin-left: 150px" >

6. **Insert the spritesheet images filename, one with only letters and other with all objects/obstacles.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectSpritesheetImages.png" alt="selectSpritesheetImages" width="700" style="margin-left: 150px" >

7. **Insert within the square brackets the landscape sprite's objects, separated by ','. Filename field has the sprite name, scale has the value to apply on the current sprite by the Arcade Widget and positionsX is an array with its horizontal positions. Usually values range between -1 and 1, however depending on the field of view it may be possible to see sprites placed between -3 and 3. Negative values represent left side placements and positive values represent right side placements.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectLandscapeObjects.png" alt="selectLandscapeObjects" width="700" style="margin-left: 150px" >

8. **Insert within the square brackets the track sprite's obstacles, separated by ','. Filename field has the sprite name, scale has the value to apply on the current sprite by the Arcade Widget and positionsX is an array with its horizontal positions. Usually values range between -1 and 1, however depending on the field of view it may be possible to see sprites placed between -3 and 3. Negative values represent left side placements and positive values represent right side placements.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectTrackObstacles.png" alt="selectTrackObstacles" width="700" style="margin-left: 150px" >

9. **Fill within the brackets each track parameters, after ':'.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectTrackParams.png" alt="selectTrackParams" width="700" style="margin-left: 150px" >

10. **Select arcade vehicle, present in both provided spritesheet JSON and png files, in steps 5 and 6. In this menu the user
can choose if the Arcade Widget will show any vehicle, if it will be a realistic image or not, what image will be used, i.e. the sprite name, and also choose the image index (suffix) if exists more than one image with the same name. That is, if spritesheet provided earlier has 2 sets of cars, car and car2, then the user can use this field to select which car sprite will be used.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectArcadeVehicle.png" alt="selectArcadeVehicle" width="700" style="margin-left: 150px" >

11. **Select other customization options for the dashboard widgets, which will be used during the simulation, and other rendering aspects using the following set of ranges.**

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectRanges.png" alt="selectRanges" width="700" style="margin-left: 150px" >

> Select the maximum values that the speedometer and tachometer widgets will have, in the 'Value of Speedometer' and 'Value of Tachometer' ranges. 

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectRangesSpeedometerTachometer.png" alt="selectRangesSpeedometerTachometer" width="500" style="margin-left: 150px" >

> If the values selected in these ranges are 200 and 9, respectively, and if the steering wheel selected is the porsche steering wheel ( purple steering wheel ), then the final vehicle dashboard, which will be used during the simulation, is

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/customizationResult.png" alt="customizationResult" width="500" style="margin-left: 150px" >


> Select the desired number of lanes, to draw within the track during the simulation, in the 'Number of Lanes' range.

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectRangeLanes.png" alt="selectRangeLanes" width="200" style="margin-left: 300px" >

> Select the frequency of obstacles to be placed within the track during the simulation, in the 'Frequence of Obstacles' range, i.e. choose how many iterations a new obstacle arises.

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectRangesObstacles.png" alt="selectRangesObstacles" width="200" style="margin-left: 300px" >

> Select the desired number of laps, in the 'Number of Laps' range, to be rendered by Arcade widget during the simulation.

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectLaps.png" alt="selectLaps" width="200" style="margin-left: 300px" >

> Choose if Arcade widget will use the PVS instructions during the simulation. By default, i.e. value 0, this widget will use PVS instructions to update the vehicle status during the simulation. This slider allows to test the difference in the rendering processs speed, since PVS instructions turns the simulation much slower than using a self-contained widget that calculates those values.

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/selectPVS.png" alt="selectPVS" width="200" style="margin-left: 300px" >

> To finish the customization, slide the last range to the right.

<img src="/Users/zecarlos/Desktop/pvsio-web/src/client/app/widgets/car/documentation/tutorials_jsdoc/img/endRange.png" alt="EndRange" width="50" style="margin-left: 400px" >

> Although it was not an objective in this dissertation, the widget 'Customization' was created to ease the simulation process. However, since this is not a priority, this widget can be improved over time, for example by adding other customization options that match the optional fields that the TrackGenerator and Arcade widgets have.


### User Steps, with only manual configurations ( harder )

> In this section we present the steps to create a new simulation, using only the Widget APIs developed, which requires a more 'conscious' user. The following steps will be the necessary steps to create a new demo within PVSio-web.

> Currently it is possible to test the functional demo 'arcade', <http://localhost:8082/demos/arcade_game_simulator/>, i.e., to test the interactions PVS-Arcade Widget. That is, to use PVS instructions to maintain the simulation state.

> On demo <http://localhost:8082/demos/track_generator_simulator/> is possible to create a new track using TrackGenerator widget as step 1 will demonstrate.

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
    parent: "content", // defines parent div, which is div id="body" by default
    spritesFilename: "spritesheet2", // defines spritesheet configuration filename, which is "spritesheet.json" by default
    render: {
        depthOfField: 150,
        camera_distance: 30,
        camera_height: 320
    },
    trackSegmentSize: 5,
    numberOfSegmentPerColor: 4,
    numLanes: 3,
    laneWidth: 0.02,
    trackParam: {
        numZones:    12, // number of different portions of the track
        zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
    },
    // Information regarding current controllable_vehicle's car
    controllable_vehicle: {
        position: 10,
        speed: 0,
        acceleration: 0.05,
        deceleration: 0.04,
        breaking: 0.3,
        turning: 5.0,
        posx: 0,
        maxSpeed: 20
    },
    objects: [
        {
            filename:"real_tree3",
            scale: 1,
            positionsX: [
                -0.8,
                0.6
            ]
        },
        {
            filename:"real_tree4",
            scale: 1,
            positionsX: [
                -0.6,
                0.8
            ]
        },
        {
            filename:"real_building",
            scale: 1,
            positionsX: [
                -0.7,
                0.9
            ]
        },
        {
            filename:"real_building2",
            scale: 1,
            positionsX: [
                -0.9,
                0.7
            ]
        },
        {
            filename:"real_skyscraper",
            scale: 1,
            positionsX: [
                1.9,
                -1.7
            ]
        }
    ],
    obstacle: [
        {
            filename:"30kmh_limit",
            scale: 1,
            positionsX: [
                0.1
            ]
        },
        {
            filename:"horizontal_pedrestrian_crossing_rubber_bump",
            scale: 1,
            positionsX: [
                -0.1
            ]
        },
        {
            filename:"traffic_light_red",
            scale: 1,
            positionsX: [
                0
            ]
        }
    ],
    obstaclePerIteration: 20,
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
    // trackLayout: [ 
    //   // trackLayout1.json File
    //   // describing the desired track, which is straight line, with 8 zones (8 blocks) and with 
    //   // profiles "flat".
    //   // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
    //   // those angles to define different curvatures, instead of generating the same curvature for the same
    //   // side
    //   {
    //       topography: {
    //           name:"straight",
    //           curvature: 0
    //       },
    //       profile: "flat",
    //       numZones: 8,
    //       trafficSignals: [
    //           {
    //               filename:"traffic_light_green",
    //               zone: 1,
    //               scale: 4,
    //               posX: -0.5,
    //               zoneDistance: 5 // (max distance is zoneSize) 
    //           },
    //           {
    //               filename:"50kmh_limit",
    //               zone: 2,
    //               scale: 3,
    //               posX: -0.4,
    //               zoneDistance: 90 // (max distance is zoneSize) 
    //           },
    //           {
    //               filename:"vehicle_surpass_forbidden",
    //               zone: 3,
    //               scale: 3,
    //               posX: -0.4,
    //               zoneDistance: 130 // (max distance is zoneSize) 
    //           },
    //           {
    //               filename:"30kmh_limit",
    //               zone: 4,
    //               scale: 3,
    //               posX: -0.4,
    //               zoneDistance: 90 // (max distance is zoneSize) 
    //           },
    //           {
    //               filename:"50kmh_limit",
    //               zone: 5,
    //               scale: 3,
    //               posX: -0.4,
    //               zoneDistance: 90 // (max distance is zoneSize) 
    //           },
    //           {
    //               filename:"vehicle_surpass_forbidden",
    //               zone: 6,
    //               scale: 3,
    //               posX: -0.4,
    //               zoneDistance: 130 // (max distance is zoneSize) 
    //           },
    //           {
    //               filename:"30kmh_limit",
    //               zone: 7,
    //               scale: 3,
    //               posX: -0.4,
    //               zoneDistance: 90 // (max distance is zoneSize) 
    //           },
    //           {
    //               filename:"traffic_light_red",
    //               zone: 8,
    //               scale: 4,
    //               posX: -0.5,
    //               zoneDistance: 100 // (max distance is zoneSize) 
    //           }
    //       ]
    //   }
    // ],
    // trackLayout: [ 
    // // trackLayout2.json File
    // // describing the desired track, which is curve to left, straight line, 
    // // curve to right, straight line, curve to left and straight line each with 3 zones (blocks) and with different 
    // // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
    // // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
    // // those angles to define different curvatures, instead of generating the same curvature for the same
    // // side
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 3,
    //   trafficSignals: [
    //       {
    //           filename:"traffic_light_green",
    //           zone: 1,
    //           scale: 4,
    //           posX: -0.5,
    //           zoneDistance: 5 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"50kmh_limit",
    //           zone: 2,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"vehicle_surpass_forbidden",
    //           zone: 3,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "down",
    //   numZones: 3,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 4,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"vehicle_surpass_forbidden",
    //           zone: 5,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"30kmh_limit",
    //           zone: 6,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"right",
    //       curvature: 90
    //   },
    //   profile: "flat",
    //   numZones: 3,
    //   trafficSignals: [
    //       {
    //           filename:"vehicle_surpass_forbidden",
    //           zone: 7,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"50kmh_limit",
    //           zone: 8,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"vehicle_surpass_forbidden",
    //           zone: 9,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "up",
    //   numZones: 3,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 10,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"vehicle_surpass_forbidden",
    //           zone: 11,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"30kmh_limit",
    //           zone: 12,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 3,
    //   trafficSignals: [
    //       {
    //           filename:"30kmh_limit",
    //           zone: 13,
    //           scale: 4,
    //           posX: -0.5,
    //           zoneDistance: 5 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"50kmh_limit",
    //           zone: 14,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"vehicle_surpass_forbidden",
    //           zone: 15,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "flat",
    //   numZones: 3,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 16,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"vehicle_surpass_forbidden",
    //           zone: 17,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       },
    //       {
    //           filename:"30kmh_limit",
    //           zone: 18,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    // }
    // ],
    // trackLayout: [ 
    //     // trackLayout3.json File
    //     // describing the desired track, which is straight line, followed by curve to left, straight line, 
    //     // curve to right, straight line and curve to left each with 3 zones (blocks) and with different 
    //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
    //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
    //     // those angles to define different curvatures, instead of generating the same curvature for the same
    //     // side
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 1,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_left",
    //           zone: 2,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "up",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 3,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"right",
    //       curvature: 90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_right",
    //           zone: 4,
    //           scale: 4,
    //           posX: 0.5,
    //           zoneDistance: 5 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "down",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"70kmh_limit",
    //           zone: 5,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"traffic_light_red",
    //           zone: 6,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  }
    // ],
    // trackLayout: [ 
    //     // trackLayout4.json File
    //     // describing the desired track, which is curve to right, with 4 zones (blocks) and with  
    //     // profile "flat". This layout allows to render a closed circular track (with 4 curves to right 
    //     // where a new curve starts after the previous ends) 
    //     // Curvature is the angle of curvature for that topography name. This will be used to define different 
    //     // curvatures, instead of generating the same curvature for the same
    //     // side
    //   {
    //     topography: {
    //         name:"right",
    //         curvature: 90
    //     },
    //     profile: "flat",
    //     numZones: 4,
    //     trafficSignals: [
    //         {
    //             filename:"traffic_light_green",
    //             zone: 1,
    //             scale: 4,
    //             posX: 0.5,
    //             zoneDistance: 5 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"dangerous_curve_right",
    //             zone: 1,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 20 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"50kmh_limit",
    //             zone: 1,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 90 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"vehicle_surpass_forbidden",
    //             zone: 1,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 130 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"dangerous_curve_right",
    //             zone: 2,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 20 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"30kmh_limit",
    //             zone: 2,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 90 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"dangerous_curve_right",
    //             zone: 3,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 20 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"50kmh_limit",
    //             zone: 3,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 90 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"dangerous_curve_right",
    //             zone: 4,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 20 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"30kmh_limit",
    //             zone: 4,
    //             scale: 3,
    //             posX: 0.4,
    //             zoneDistance: 90 // (max distance is zoneSize) 
    //         },
    //         {
    //             filename:"traffic_light_red",
    //             zone: 4,
    //             scale: 4,
    //             posX: 0.5,
    //             zoneDistance: 100 // (max distance is zoneSize) 
    //         }
    //     ]
    // }
    // ],
    // trackLayout: [ 
    //     // trackLayout5.json File
    //     // describing the desired track, which is curve to left, straight line, 
    //     // curve to left, straight line, curve to left, straight line, curve to left and straight line,
    //     // each with 1 zone (block) and with profile "flat".
    //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
    //     // those angles to define different curvatures, instead of generating the same curvature for the same
    //     // side
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_left",
    //           zone: 1,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 2,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_left",
    //           zone: 3,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"70kmh_limit",
    //           zone: 4,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_left",
    //           zone: 5,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"70kmh_limit",
    //           zone: 6,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_left",
    //           zone: 7,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"traffic_light_red",
    //           zone: 8,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    // ],
    // trackLayout: [ 
    //     // trackLayout6.json File
    //     // describing the desired track, which is curve to left, straight line, 
    //     // curve to right, straight line and curve to left each with 1 zone (block) and with different 
    //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
    //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
    //     // those angles to define different curvatures, instead of generating the same curvature for the same
    //     // side
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_left",
    //           zone: 1,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "down",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 2,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"right",
    //       curvature: 90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_right",
    //           zone: 3,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "up",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"30kmh_limit",
    //           zone: 4,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_left",
    //           zone: 5,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    // ],
    // trackLayout: [ 
    //     // trackLayout7.json File
    //     // describing the desired track, which is curve to left, with 4 zones (blocks) and with  
    //     // profile "flat". This layout allows to render a closed circular track (with 4 curves to left 
    //     // where a new curve starts after the previous ends) 
    //     // Curvature is the angle of curvature for that topography name. This will be used to define different 
    //     // curvatures, instead of generating the same curvature for the same
    //     // side
    //      {
    //        topography: {
    //            name:"left",
    //            curvature: -90
    //        },
    //        profile: "flat",
    //        numZones: 4,
    //        trafficSignals: [
    //            {
    //                filename:"traffic_light_green",
    //                zone: 1,
    //                scale: 4,
    //                posX: -0.5,
    //                zoneDistance: 5 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"dangerous_curve_left",
    //                zone: 1,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 20 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"50kmh_limit",
    //                zone: 1,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 90 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"vehicle_surpass_forbidden",
    //                zone: 1,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 130 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"dangerous_curve_left",
    //                zone: 2,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 20 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"30kmh_limit",
    //                zone: 2,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 90 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"dangerous_curve_left",
    //                zone: 3,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 20 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"50kmh_limit",
    //                zone: 3,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 90 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"dangerous_curve_left",
    //                zone: 4,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 20 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"30kmh_limit",
    //                zone: 4,
    //                scale: 3,
    //                posX: -0.4,
    //                zoneDistance: 90 // (max distance is zoneSize) 
    //            },
    //            {
    //                filename:"traffic_light_red",
    //                zone: 4,
    //                scale: 4,
    //                posX: -0.5,
    //                zoneDistance: 100 // (max distance is zoneSize) 
    //            }
    //        ]
    //    }
    // ],
    // trackLayout: [ 
    //     // trackLayout8.json File
    //     // describing the desired track, which is curve to right, straight line, 
    //     // curve to left, straight line and curve to right each with 1 zone (block) and with different 
    //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
    //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
    //     // those angles to define different curvatures, instead of generating the same curvature for the same
    //     // side
    //  {
    //   topography: {
    //       name:"right",
    //       curvature: 90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_right",
    //           zone: 1,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "down",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 2,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"left",
    //       curvature: -90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_left",
    //           zone: 3,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "up",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"30kmh_limit",
    //           zone: 4,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"right",
    //       curvature: 90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_right",
    //           zone: 5,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    // ],
    // trackLayout: [ 
    //     // trackLayout9.json File
    //     // describing the desired track, which is curve to right, straight line, 
    //     // curve to right, straight line, curve to right, straight line, curve to right and straight line,
    //     // each with 1 zone (block) and with profile "flat".
    //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
    //     // those angles to define different curvatures, instead of generating the same curvature for the same
    //     // side
    //  {
    //   topography: {
    //       name:"right",
    //       curvature: 90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_right",
    //           zone: 1,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"50kmh_limit",
    //           zone: 2,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"right",
    //       curvature: 90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_right",
    //           zone: 3,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"straight",
    //       curvature: 0
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"70kmh_limit",
    //           zone: 4,
    //           scale: 3,
    //           posX: -0.4,
    //           zoneDistance: 90 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //   topography: {
    //       name:"right",
    //       curvature: 90
    //   },
    //   profile: "flat",
    //   numZones: 1,
    //   trafficSignals: [
    //       {
    //           filename:"dangerous_curve_right",
    //           zone: 5,
    //           scale: 3,
    //           posX: 0.4,
    //           zoneDistance: 130 // (max distance is zoneSize) 
    //       }
    //   ]
    //  },
    //  {
    //    topography: {
    //        name:"straight",
    //        curvature: 0
    //    },
    //    profile: "flat",
    //    numZones: 1,
    //    trafficSignals: [
    //        {
    //            filename:"traffic_light_red",
    //            scale: 1,
    //            zone: 1,
    //            posX: -0.4,
    //            zoneDistance: 30 // (max distance is zoneSize) 
    //        }
    //    ]
    //  }
    // ],
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

> The API needed to create the desired track, based on trackLayout opt field provided, is 
```
trackGenerator.trackGeneratorWidget.generateTrackBasedOnTrackLayoutOptField();
```

> The opt fields 'objects' and 'obstacles' have the following structure,

```
{
  filename:"real_tree3",
  scale: 1,
  positionsX: [
      -0.8,
      0.6
  ]
}
```

> This structure is responsible for defining the sprite name, for instance, 'real_tree3' regards to 'real_tree3.png' present in the current spritesheet provided also as opt field, as well as for defining the scale to be applied to this sprite by the Arcade Widget. It is also responsible for providing the horizontal positions, array 'positionsX', where the sprite must be placed. That is, for obstacles and objects is necessary to define them separately so it will be possible to have different scales applied to different sprites. For example, the user can have 'real_tree2' and 'real_tree3', which are 2 different trees, with different scales, i.e. rendering one tree bigger than the other. The other positive aspect of such structure regards to the sprite's placement, i.e. instead of generating the position randomly, it is easier to define exactly where the sprite must be placed, so the final result looks exactly as it is expected.

> The opt field 'trackLayout' has the following structure,

```
{
 topography: {
    name:"straight",
     curvature: 0
 },
 profile: "flat",
 numZones: 1,
 trafficSignals: [
  {
     filename:"30kmh_limit",
     scale: 1,
     zone: 1,
     posX: -0.4,
     zoneDistance: 30 // (max distance is zoneSize) 
  }
 ]
}
```

> This structure is responsible for defining a part of the final track to be rendered by the Arcade Widget. This defines the topography, either it is a straight block, or a left curved block or a right curved block, with an elevation profile of either flat, or up or down. It also defines the number of blocks to replicate, in numZones field. That is, if this field has the number 3, then the API will create 3 blocks with this topography sequentially. This is useful to define straight line blocks sequentially, that will allow to have parts of the track with different lengths (straight lines case). It also defines the sprites that must be placed within this part of the track in 'trafficSignals' field. This field was created to allow the placement of traffic signals on a specific part of the track. For instance, '30kmh_limit.png' sprite will be placed in the horizontal axis at -0.4 and in the vertical axis (within field of view of current zoneSize) at 30, that is, if the current zoneSize is defined as 250, then this sprite will be placed at 30, i.e. (30/250 means that this sprite will appear in the beginning of the topograohy). If zoneDistance has 220 as its value, then this sprite will appear almost in the end of the topography. 'trafficSignals' field is an array so it will be possible to place more than one sprite per topography, i.e., since zoneSize varies, is important to have the possibility to define more than one sprite in that zoneSize, otherwise, it would be strange to only have one sprite in a vast section of the track (imagine if the zoneSize was 2500) and zoneDistance was 30, then in the rendering process, the sprite would appear in the beginning and then the user would drive (in the track) for a while until a new sprite would appear (that is, until the next topography begins).


> To create the track is then only necessary, create the constructor with the optional fields that you want, if none is inserted, the widget will use the following predefined values,
```
parent: "body",
spritesFilename: "spritesheet",
render: {
    depthOfField: 150,
    camera_distance: 30,
    camera_height: 320
},
trackSegmentSize: 5,
numberOfSegmentPerColor: 4,
numLanes: 3,
laneWidth: 0.02,
trackParam: {
    numZones:  12,
    zoneSize:  250
},
controllable_vehicle: {
    position: 10,
    speed: 0,
    acceleration: 0.05,
    deceleration: 0.04,
    breaking: 0.3,
    turning: 5.0,
    posx: 0,
    maxSpeed: 20
},
objects: [],
obstacle: [],
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

> The desired layout, 'trackLayout' optional field, will only be translated into canvas segments, which will be represented by the Arcade widget, by the generateTrackBasedOnTrackLayoutOptField() method. The generateStraightTrack() and generateTrackCurvesSlopes() methods can be invoked when the user wants to render random track, with only straight lines or with straight lines, curves and slopes, respectively.

> Invoking the above APIs ( generateStraightTrack(),generateTrackCurvesSlopes(),generateTrackBasedOnTrackLayoutOptField() ) results in the creation of a JSON file with the following structure,

```
generatedJSON = {
    controllable_vehicle: controllable_vehicle,
    laneWidth: laneWidth,
    numLanes: numLanes,
    numberOfSegmentPerColor: numberOfSegmentPerColor,
    render: render,
    track: generatedTrack,
    trackParam: trackParam, // after updating trackParam.numZones with total sum of numZones 
    // in trackLayout opt field
    trackSegmentSize: trackSegmentSize,
    trackColors: trackColors
};
```

> Currently, PVSio-web does not have any file-writing APIs in the context of widgets, and as such, the TrackGenerator widget is not able to write the JSON file. Then, the user needs to perform ```console.log(JSON.stringify(self2.generatedJSON));``` and copy/paste the result into a JSON file, that is, the user needs to perform the non-existent API process manually. Predefined file names are "track-straight-random.json" or "track-curves-slopes-random.json", however it is possible to use other file names, since the Arcade widget receives the filename as optional field. 

> When the file-writing API exists, it should be added on lines 471, 739 and 931 with ```console.log(JSON.stringify(self2.generatedJSON));``` in <https://github.com/zecarlos94/pvsio-web/tree/gamingDev/src/client/app/widgets/car/TrackGenerator.js> file, as well as the filename, as arguments. This file-writing API, must return the filename just created, so it can be used in the pipeline Customization Widget -> TrackGenerator Widget -> Arcade Widget automatically, for more detailed information see <https://github.com/zecarlos94/pvsio-web/tree/gamingDev/src/client/app/widgets/car/Customization.js> (line 1673 should have the value obtained in line 1659, i.e. the value returned by the file-writing API).

> Once the JSON file with the desired track has been created, it will be possible to render it using the Arcade widget.


2. **Render the desired track, created previously, i.e. created in step 1.**

```
let arcade = {};

// ----------------------------- LINCOLN MKC DASHBOARD DESIGN -----------------------------
arcade.lincolnMKCDashboard = new LincolnMKCDashboard('lincolnMKCDashboard',
    {
        top: 5, left: 0, width: 450, height: 140 
    },{ 
        parent: "content", // defines parent div, which is div id="body" by default 
        dashIndex: 1,
        design: "before", // "after",
        buttonsPVS: [ "startAndStop", "activateSportMode"],
        callback: onMessageReceived
        } 
    );

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
    top: 220,
    left: 20,
    width: 600,
    height: 600
}, {
    style: "ferrari",
    callback: onMessageReceived
});

// ----------------------------- ARCADE GAME COMPONENTS -----------------------------
arcade.arcadeWidget = new Arcade("arcadeWidget", {
    top: 300,
    left: 860,
    width: 320,
    height: 240
}, {
    parent: "content", // defines parent div, which is div id="body" by default
    scaleWindow: 1, // scales canvas div
    trackFilename: "trackLayout2",// "track-curves-slopes-random", // "track-straight-random", // defines track configuration filename, which is "track-curves-slopes-random.json" by default
    spritesFilename: "spritesheet2", // defines spritesheet configuration filename, which is "spritesheet.json" by default
    spritesFiles: ["spritesheet2","spritesheet.text"], // defines all spritesheets(images). Default are "spritesheet.png" and "spritesheet.text.png"
    realisticImgs: false,
    useVehicle: true,
    vehicle: "car", // available vehicles: ["airplane","bicycle","car","helicopter","motorbike"]
    vehicleImgIndex: 2, // defines vehicle sprite image suffix
    // logoImgIndex: 1, // defines logo sprite image suffix
    // backgroundImgIndex: 1, // defines background sprite image suffix
    stripePositions: {
        trackP1: -0.55,
        trackP2: 0.55,
        borderWidth: 0.08,
        inOutBorderWidth: 0.02,
        landscapeOutBorderWidth: 0.13,
        diffTrackBorder: 0.05,
        finishLineP1: -0.40,
        finishLineP2: 0.40,
        diffLanesFinishLine: 0.05
    },
    lapNumber: 3,
    // showOfficialLogo: true,
    loadPVSSpeedPositions: false,
    // predefinedTracks: 4,
    // newLap_functionNamePVS: "set_positions_init",
    // action_attribute: "action",
    // direction_attribute: "direction",
    // sound_attribute: "sound",
    // speed_attribute: "speed",
    // posx_attribute: "posx",
    // position_attribute: "position",
    // speed_value: "val",
    // posx_value: "val",
    // position_value: "val",
    // left_attribute: "left",
    // right_attribute: "right",
    // straight_attribute: "straight",
    // accelerate_attribute: "acc",
    // brake_attribute: "brake",
    // idle_attribute: "idle",
    // quit_attribute: "quit",
    // pause_attribute: "pause",
    // resume_attribute: "resume",
    // mute_attribute: "mute",
    // unmute_attribute: "unmute",
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
    arcade.lincolnMKCDashboard(); // Renders the Full Dashboard Image
}
```

> To render the track is then only necessary, create the constructor with the optional fields that you want, if none is inserted, the widget will use the following predefined values,
```
parent: "body", 
trackFilename: "track-curves-slopes-random", 
spritesFilename: "spritesheet", 
spritesFiles: ["spritesheet","spritesheet.text"], 
realisticImgs: false,
useVehicle: true,
vehicle: "car", 
vehicleImgIndex: null, 
logoImgIndex: null,
backgroundImgIndex: null,
stripePositions: {
    trackP1: -0.55,
    trackP2: 0.55,
    borderWidth: 0.08,
    inOutBorderWidth: 0.02,
    landscapeOutBorderWidth: 0.13,
    diffTrackBorder: 0.05,
    finishLineP1: -0.40,
    finishLineP2: 0.40,
    diffLanesFinishLine: 0.05
},
lapNumber: 0, // infinite simulation (multiple laps, i.e. always begins a new lap and only stops when user wants to)
showOfficialLogo: false,
loadPVSSpeedPositions: true,
predefinedTracks: null,
newLap_functionNamePVS: "set_positions_init",
action_attribute: "action",
direction_attribute: "direction",
sound_attribute: "sound",
speed_attribute: "speed",
posx_attribute: "posx",
position_attribute: "position",
speed_value: "val",
posx_value: "val",
position_value: "val",
left_attribute: "left",
right_attribute: "right",
straight_attribute: "straight",
accelerate_attribute: "acc",
brake_attribute: "brake",
idle_attribute: "idle",
quit_attribute: "quit",
pause_attribute: "pause",
resume_attribute: "resume",
mute_attribute: "mute",
unmute_attribute: "unmute",
```

> Predefined file name is "track-curves-slopes-random.json", which has the arcade simulation with all different topographies. If user wants to use predefined tracks, it is only necessary to add the integer suffix of the corresponding file in predefinedTracks opt field. That is, to use trackLayout6.json, the user must set 'predefinedTracks: 6' and the Arcade widget will render the track present in trackLayout6.json file.


3. **Necessary PVS Code**

> In order to the Arcade widget work it will be necessary to use formal specifications, in pvs/main.pvs file, written with the formal language PVS as it follows,

```
% ---------------------------------------------------------------
%  Theory: car_demo
%  Author: Paolo Masci and Jose Carlos
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

  Action: TYPE = { idle, acc, brake, pause, resume, quit }
  Direction: TYPE = { left, right, straight }
  Sound: TYPE = { unmute, mute }
  Startstopbutton: TYPE = { off, on }
  Sportmodebutton: TYPE = { off, on }
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
    direction: Direction,
    sound: Sound,
    startstopbutton: Startstopbutton,
    sportmodebutton: Sportmodebutton
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
    direction := straight,
    sound := unmute,
    startstopbutton := off,
    sportmodebutton := off
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

  getAccSportMode(g: Gear): Speed_Val =
   COND
      g = P OR g = N -> 0,
      g = R -> -5,
      g = GEAR_1 -> 1.3,
      g = GEAR_2 -> 1.5,
      g = GEAR_3 -> 1.8,
      g = GEAR_4 -> 2,
      g = GEAR_5 -> 2.2,
      g = GEAR_6 -> 2.5
   ENDCOND

  getBrk(g: Gear): [# speed: real, rpm: real #] = (# speed := -2, rpm := -1 #)

  getBrkSportMode(g: Gear): [# speed: real, rpm: real #] = (# speed := -8, rpm := -2 #)

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
  st = st WITH [ rpm := new_rpm ]%, position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
     IN IF rpm(st) > 6 THEN gearUP(st) ELSE st ENDIF

  accelerateSportMode(st: state): state =
    LET st = st WITH [ gear := IF gear(st) = N THEN GEAR_1 ELSE gear(st) ENDIF ],
        step = getAccSportMode(gear(st)),
        st = IF speed(st)`val + step < MAX_SPEED
             THEN st WITH [ speed := speed(st) WITH [ val:= speed(st)`val + step ]]
       ELSE st WITH [ speed := speed(st) WITH [ val:= MAX_SPEED ]] ENDIF,
  new_rpm = getRPM(st),
  st = st WITH [ rpm := new_rpm ]%, position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
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
        st = st WITH [ rpm := new_rpm ]%, position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
     IN IF rpm(st) < 4 THEN gearDOWN(st) ELSE st ENDIF

  brakeSportMode(st: state): state =
    LET step = getBrkSportMode(gear(st)),
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
        st = st WITH [ rpm := new_rpm ]%, position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
     IN IF rpm(st) < 4 THEN gearDOWN(st) ELSE st ENDIF

  FRICTION: Speed_Val = 0.6
  inc(odo: Odo, speed: Speed): Odo =
    LET step = speed`val / 60 * 1
     IN IF step >= 0
        THEN IF odo + step <= MAX_ODO THEN odo + step ELSE odo + step - MAX_ODO ENDIF
  ELSE IF odo + step <= 0 THEN 0 ELSE odo + step ENDIF ENDIF

  POSX_STEP: real = 25 
  tick(st: state): state =
   LET st = st WITH [ time := get_current_time,
                      position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
    IN IF speed(st)`val > 0
       THEN LET new_speed: Speed_Val = COND action(st) = idle -> IF speed(st)`val - FRICTION > 0 THEN speed(st)`val - FRICTION ELSE 0 ENDIF,
                                            ELSE -> speed(st)`val ENDCOND,
          st = st WITH [ speed := speed(st) WITH [ val := new_speed ]]
       IN st WITH [ rpm := getRPM(st),
                    odo := inc(odo(st), speed(st)),
        posx := posx(st) WITH [ val := COND steering(st) >= 20 -> posx(st)`val + POSX_STEP,
                                        steering(st) <= -20 -> posx(st)`val - POSX_STEP,
                    ELSE -> posx(st)`val ENDCOND ],
            direction := COND steering(st) >= 20 -> right,
              steering(st) <= -20 -> left,
              ELSE -> straight ENDCOND ]
        ELSE st ENDIF


  %-- APIs
  press_accelerate(st: state): state = IF sportmodebutton(st) = off
                                        THEN accelerate(st) WITH [ action := acc ]
                                        ELSE accelerateSportMode(st) WITH [ action := acc ]
                                      ENDIF
  release_accelerate(st: state): state = st WITH [ action := idle ]

  press_brake(st: state): state = IF sportmodebutton(st) = off
                                    THEN brake(st) WITH [ action := brake ]
                                    ELSE brakeSportMode(st) WITH [ action := brake ]
                                  ENDIF
  release_brake(st: state): state = st WITH [ action := idle ]

  STEERING_STEP: real = 20 %deg
  steering_wheel_right(st: state): state = st WITH [ steering := IF steering(st) < 90 THEN steering(st) + STEERING_STEP ELSE 90 ENDIF ]
  steering_wheel_left(st: state): state = st WITH [ steering := IF steering(st) > -90 THEN steering(st) - STEERING_STEP ELSE -90 ENDIF ]
  steering_wheel_straight(st: state): state = st WITH [ steering := 0, posx := posx(st) WITH [ val:= posx(st)`val ], direction := straight ]
  steering_wheel_rotate(x: real)(st: state): state = st WITH [ steering := x ]

  %-- API for new laps
  set_positions_init(st: state): state = st WITH [ position := (# val := POSITION_INIT  #), posx := (# val := POSX_INIT #) ]

  %-- API for sound controls 
  press_mute(st: state): state = st WITH [ sound := mute ]
  release_mute(st: state): state = st WITH [ sound := mute ]
  
  press_unmute(st: state): state = st WITH [ sound := unmute ]
  release_unmute(st: state): state = st WITH [ sound := unmute ]
  
  %-- API for virtual Keypad controller 
  %-- TODO create the interactions with Arcade Driving Simulator
  press_quit(st: state): state = st WITH [ action := quit, startstopbutton := off ]
  release_quit(st: state): state = st WITH [ action := idle ]
  press_pause(st: state): state = st WITH [ action := pause, startstopbutton := off ]
  release_pause(st: state): state = st WITH [ action := idle ]
  press_resume(st: state): state = st WITH [ action := resume, startstopbutton := on ]
  release_resume(st: state): state = st WITH [ action := idle ]

  %-- API for external controllers such as PS4 gamepad
  click_accelerate(st: state): state = IF sportmodebutton(st) = off
                                        THEN accelerate(st) WITH [ action := acc ]
                                        ELSE accelerateSportMode(st) WITH [ action := acc ]
                                      ENDIF
  click_brake(st: state): state = IF sportmodebutton(st) = off
                                    THEN brake(st) WITH [ action := brake ]
                                    ELSE brakeSportMode(st) WITH [ action := brake ]
                                  ENDIF

  %-- API for external controller interactive image
  press_rightArrow(st: state): state = steering_wheel_right(st)
  release_rightArrow(st: state): state = st

  press_leftArrow(st: state): state = steering_wheel_left(st)
  release_leftArrow(st: state): state = st

  %-- API for case study 2015 Lincoln MCK interactive dashboard image
  startAndStop(st: state): state = 
    LET st = IF startstopbutton(st) = off
              THEN st WITH [ action := resume, startstopbutton := on ]
              ELSE st WITH [ action := quit, startstopbutton := off ] 
             ENDIF
    IN st 

  activateSportMode(st: state): state = 
    LET st = IF sportmodebutton(st) = off
              THEN st WITH [ sportmodebutton := on ]
              ELSE st WITH [ sportmodebutton := off ] 
             ENDIF
    IN st 
   
  press_startAndStop(st: state): state = startAndStop(st)
  release_startAndStop(st: state): state = st WITH [ action := idle ]

  press_activateSportMode(st: state): state = activateSportMode(st)
  release_activateSportMode(st: state): state = st WITH [ action := idle ]

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

Action: TYPE = { idle, acc, brake, pause, resume, quit }
Direction: TYPE = { left, right, straight }
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
  direction: Direction,
	sound: Sound,
#]

getAccSportMode(g: Gear): Speed_Val =
    COND
      g = P OR g = N -> 0,
      g = R -> -5,
      g = GEAR_1 -> 1.3,
      g = GEAR_2 -> 1.5,
      g = GEAR_3 -> 1.8,
      g = GEAR_4 -> 2,
      g = GEAR_5 -> 2.2,
      g = GEAR_6 -> 2.5
    ENDCOND

getBrk(g: Gear): [# speed: real, rpm: real #] = (# speed := -2, rpm := -1 #)

getBrkSportMode(g: Gear): [# speed: real, rpm: real #] = (# speed := -8, rpm := -2 #)

accelerateSportMode(st: state): state =
    LET st = st WITH [ gear := IF gear(st) = N THEN GEAR_1 ELSE gear(st) ENDIF ],
        step = getAccSportMode(gear(st)),
        st = IF speed(st)`val + step < MAX_SPEED
             THEN st WITH [ speed := speed(st) WITH [ val:= speed(st)`val + step ]]
         ELSE st WITH [ speed := speed(st) WITH [ val:= MAX_SPEED ]] ENDIF,
    new_rpm = getRPM(st),
    st = st WITH [ rpm := new_rpm ]%, position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
     IN IF rpm(st) > 6 THEN gearUP(st) ELSE st ENDIF
 
brakeSportMode(st: state): state =
    LET step = getBrkSportMode(gear(st)),
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
        st = st WITH [ rpm := new_rpm ]%, position := position(st) WITH [ val:= position(st)`val + speed(st)`val ]]
     IN IF rpm(st) < 4 THEN gearDOWN(st) ELSE st ENDIF

set_positions_init(st: state): state = st WITH [ position := (# val := POSITION_INIT  #), posx := (# val := POSX_INIT #) ]

press_startAndStop(st: state): state = startAndStop(st)
release_startAndStop(st: state): state = st WITH [ action := idle ]

press_activateSportMode(st: state): state = activateSportMode(st)
release_activateSportMode(st: state): state = st WITH [ action := idle ]
```

> Position, PosX and Speed allows to set the vehicle's position and speed during the simulation. Sound allows the Arcade widget to know when to mute/unmute the audio files, using the Sound widget API. PosX value changes based on the steering wheel rotation. Position value changes based on actions 'accelerate'/'brake' and the current speed value. Actions 'pause','resume' and 'quit' allows the Arcade widget to reveal the 'pause','resume' and 'quit' menus, respetively. The set_positions_init function is invoked when a new lap begins in the Arcade Widget. This function resets the position and posx values in PVS. This is necessary to allow the vehicle to be placed at the beginning of the track and to restart the new rendering sequentially, with the least impact to the user.

> Specifications 'startAndStop' and 'activateSportMode' are defining the behaviour, in the realistic demo done for the conference ICGI 2018 paper. That is, is the specification that allows to simulate the activation of the sport mode when the proper button is clicked and observe the design issue/flaw reported by many drivers, which led its manufacturer to recall the vehicles and replace that design. 
