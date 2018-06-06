/**
 * @module TrackGenerator
 * @version 1.0.0
 * @author José Carlos
 * @desc This module generates randomly the 2D driving simulator, straight lines only version, using HTML5 Canvas.
 *
 * @date Apr 02, 2018
 * last modified @date May 23, 2018
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
 *          let trackGenerator = new TrackGenerator(
 *               'example', // id of the TrackGenerator element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { 
 *                  parent: "content", // defines parent div, which is div id="content" by default
 *                  spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                  render: {
 *                      width: 320,
 *                      height: 240,
 *                      depthOfField: 150,
 *                      camera_distance: 30,
 *                      camera_height: 100
 *                  },
 *                  trackSegmentSize: 5,
 *                  numberOfSegmentPerColor: 4,
 *                  numLanes: 3,
 *                  laneWidth: 0.02,
 *                  trackParam: {
 *                      maxHeight: 900,
 *                      maxCurve:  400,
 *                      numZones:    12, // number of different portions of the track
 *                      curvy:     0.8,
 *                      mountainy: 0.8,
 *                      zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
 *                  },
 *                  // Information regarding current controllable_car's car
 *                  controllable_car: {
 *                      position: 10,
 *                      speed: 0,
 *                      acceleration: 0.05,
 *                      deceleration: 0.04,
 *                      breaking: 0.3,
 *                      turning: 5.0,
 *                      posx: 0,
 *                      maxSpeed: 20
 *                  },
 *                  topSpeed: 250,
 *                  objects: ["tree","boulder"], // sprite names to be drawed in the landscape
 *                  obstacle: ["boulder"], // sprite names to be drawed within the track as obstacles
 *                  obstaclePerIteration: 50, // each 50 iterations a new obstacle will be placed within the track
 *                  // trackLayout: [ 
 *                  //     // trackLayout1.json File
 *                  //     // describing the desired track, which is straight line, with 8 zones (8 blocks) and with 
 *                  //     // profiles "flat".
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 8,
 *                  //     }
 *                  // ],
 *                  trackLayout: [ 
 *                     // trackLayout2.json File
 *                     // describing the desired track, which is curve to left, straight line, 
 *                     // curve to right, straight line, curve to left and straight line each with 3 zones (blocks) and with different 
 *                     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *                     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                     // side
 *                     {
 *                         topography: {
 *                             name:"left",
 *                             curvature: 90
 *                         },
 *                         profile: "flat",
 *                         numZones: 3
 *                     },
 *                     {
 *                         topography: {
 *                             name:"straight",
 *                             curvature: 0
 *                         },
 *                         profile: "down",
 *                         numZones: 3
 *                     },
 *                     {
 *                         topography: {
 *                             name:"right",
 *                             curvature: -90
 *                         },
 *                         profile: "flat",
 *                         numZones: 3
 *                     },
 *                     {
 *                         topography: {
 *                             name:"straight",
 *                             curvature: 0
 *                         },
 *                         profile: "up",
 *                         numZones: 3
 *                     },
 *                     {
 *                         topography: {
 *                             name:"left",
 *                             curvature: 90
 *                         },
 *                         profile: "flat",
 *                         numZones: 3,
 *                     },
 *                     {
 *                         topography: {
 *                             name:"straight",
 *                             curvature: 0
 *                         },
 *                         profile: "flat",
 *                         numZones: 3,
 *                     }
 *                    ],
 *                  // trackLayout: [ 
 *                  //     // trackLayout3.json File
 *                  //     // describing the desired track, which is straight line, followed by curve to left, straight line, 
 *                  //     // curve to right, straight line and curve to left each with 3 zones (blocks) and with different 
 *                  //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1,
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1,
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "up",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"right",
 *                  //             curvature: -90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "down",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     }
 *                  // ],
 *                  // trackLayout: [ 
 *                  //     // trackLayout4.json File
 *                  //     // describing the desired track, which is curve to right, with 4 zones (blocks) and with  
 *                  //     // profile "flat". This layout allows to render a closed circular track (with 4 curves to right 
 *                  //     // where a new curve starts after the previous ends) 
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"right",
 *                  //             curvature: -90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 4
 *                  //     }
 *                  // ],
 *                  // trackLayout: [ 
 *                  //     // trackLayout5.json File
 *                  //     // describing the desired track, which is curve to left, straight line, 
 *                  //     // curve to left, straight line, curve to left, straight line, curve to left and straight line,
 *                  //     // each with 1 zone (block) and with profile "flat".
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     }
 *                  // ],
 *                  // trackLayout: [ 
 *                  //     // trackLayout6.json File
 *                  //     // describing the desired track, which is curve to left, straight line, 
 *                  //     // curve to right, straight line and curve to left each with 1 zone (block) and with different 
 *                  //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "down",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"right",
 *                  //             curvature: -90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "up",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     }
 *                  // ],
 *                  // trackLayout: [ 
 *                  //      // trackLayout7.json File
 *                  //      // describing the desired track, which is curve to left, with 4 zones (blocks) and with  
 *                  //      // profile "flat". This layout allows to render a closed circular track (with 4 curves to left 
 *                  //      // where a new curve starts after the previous ends) 
 *                  //      // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //      // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //      // side
 *                  //      {
 *                  //          topography: {
 *                  //              name:"left",
 *                  //              curvature: 90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 4
 *                  //      }
 *                  //  ],
 *                  //  trackLayout: [ 
 *                  //      // trackLayout8.json File
 *                  //      // describing the desired track, which is curve to right, straight line, 
 *                  //      // curve to left, straight line and curve to right each with 1 zone (block) and with different 
 *                  //      // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *                  //      // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //      // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //      // side
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "down",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"left",
 *                  //              curvature: 90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "up",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      }
 *                  //  ],
 *                  //  trackLayout: [ 
 *                  //      // trackLayout9.json File
 *                  //      // describing the desired track, which is curve to right, straight line, 
 *                  //      // curve to right, straight line, curve to right, straight line, curve to right and straight line,
 *                  //      // each with 1 zone (block) and with profile "flat".
 *                  //      // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //      // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //      // side
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      }
 *                  //  ],
 *              } // append on div 'content'
 *           );
 * 
 *          // Available methods:
 *          // Hides the TrackGenerator widget
 *          trackGenerator.hide();
 * 
 *          // OR
 * 
 *          // Reveals the TrackGenerator widget
 *          trackGenerator.reveal();
 * 
 *          // OR
 * 
 *          // Render the TrackGenerator widget
 *          trackGenerator.render();
 * 
 *          // OR
 * 
 *          // Generates randomly the track, with only straight lines (i.e. height:0, curves:0)
 *          trackGenerator.generateStraightTrack();
 * 
 *          // OR
 * 
 *          // Generates randomly the track, with straight lines, curves and slopes
 *          trackGenerator.generateTrackCurvesSlopes();
 * 
 *          // OR
 *          trackGenerator.generateTrackBasedOnTrackLayoutOptField();
 * 
 *     }
 * });
 * 
 * @example <caption>Usage of <strong>Protected API</strong> within TrackGenerator Widget. That is, API which is only used internally by the TrackGenerator Widget to create the desired track</caption>
 *          // Loads the JSON file received as opt field
 *          trackGenerator.prototype.loadFile();
 * 
 * @example <caption>Usage of API to create a new track, using trackLayout, with only straight lines</caption>
 *  define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the TrackGenerator module
 *     require("widgets/car/TrackGenerator");
 *
 *     function main() {
 *          // After TrackGenerator module was loaded, initialize it
 *          let trackGenerator = new TrackGenerator(
 *               'example', // id of the TrackGenerator element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { 
 *                  parent: "content", // defines parent div, which is div id="content" by default
 *                  spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                  render: {
 *                      width: 320,
 *                      height: 240,
 *                      depthOfField: 150,
 *                      camera_distance: 30,
 *                      camera_height: 100
 *                  },
 *                  trackSegmentSize: 5,
 *                  numberOfSegmentPerColor: 4,
 *                  numLanes: 3,
 *                  laneWidth: 0.02,
 *                  trackParam: {
 *                      maxHeight: 900,
 *                      maxCurve:  400,
 *                      numZones:    12, // number of different portions of the track
 *                      curvy:     0.8,
 *                      mountainy: 0.8,
 *                      zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
 *                  },
 *                  // Information regarding current controllable_car's car
 *                  controllable_car: {
 *                      position: 10,
 *                      speed: 0,
 *                      acceleration: 0.05,
 *                      deceleration: 0.04,
 *                      breaking: 0.3,
 *                      turning: 5.0,
 *                      posx: 0,
 *                      maxSpeed: 20
 *                  },
 *                  topSpeed: 250,
 *                  objects: ["tree","boulder"], // sprite names to be drawed in the landscape
 *                  obstacle: ["boulder"], // sprite names to be drawed within the track as obstacles
 *                  obstaclePerIteration: 50, // each 50 iterations a new obstacle will be placed within the track
 *                  trackColors: {
 *                      grass1: "#699864",
 *                      border1: "#e00",
 *                      border2: "#fff",
 *                      outborder1: "#496a46",
 *                      outborder_end1: "#474747",
 *                      track_segment1: "#777",
 *                      lane1: "#fff",
 *                      lane2: "#777",
 *                      laneArrow1: "#00FF00",
 *                      track_segment_end:"#000",
 *                      lane_end: "#fff"
 *                  },                 
 *                  trackLayout: [ 
 *                      // describing the desired track, which is a 12-zone straight line, i.e. track with only straight lines with length 12. 
 *                      {
 *                       topography: {
 *                           name:"straight",
 *                           curvature: 0
 *                       },
 *                       profile: "flat",
 *                       numZones: 12,
 *                      }
 *                  ],
 *              } // append on div 'content'
 *           );
 * 
 *          // Generates the track, with based on trackLayout (i.e. height:0, curves:0)
 *          trackGenerator.generateTrackBasedOnTrackLayoutOptField();
 *     }
 * });
 * 
 * @example <caption>Usage of API to create a new track, randomly, with only straight lines</caption>
 *  define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the TrackGenerator module
 *     require("widgets/car/TrackGenerator");
 *
 *     function main() {
 *          // After TrackGenerator module was loaded, initialize it
 *          let trackGenerator = new TrackGenerator(
 *               'example', // id of the TrackGenerator element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { 
 *                  parent: "content", // defines parent div, which is div id="content" by default
 *                  spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                  render: {
 *                      width: 320,
 *                      height: 240,
 *                      depthOfField: 150,
 *                      camera_distance: 30,
 *                      camera_height: 100
 *                  },
 *                  trackSegmentSize: 5,
 *                  numberOfSegmentPerColor: 4,
 *                  numLanes: 3,
 *                  laneWidth: 0.02,
 *                  trackParam: {
 *                      maxHeight: 900,
 *                      maxCurve:  400,
 *                      numZones:    12, // number of different portions of the track
 *                      curvy:     0.8,
 *                      mountainy: 0.8,
 *                      zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
 *                  },
 *                  // Information regarding current controllable_car's car
 *                  controllable_car: {
 *                      position: 10,
 *                      speed: 0,
 *                      acceleration: 0.05,
 *                      deceleration: 0.04,
 *                      breaking: 0.3,
 *                      turning: 5.0,
 *                      posx: 0,
 *                      maxSpeed: 20
 *                  },
 *                  topSpeed: 250,
 *                  objects: ["tree","boulder"], // sprite names to be drawed in the landscape
 *                  obstacle: ["boulder"], // sprite names to be drawed within the track as obstacles
 *                  obstaclePerIteration: 50, // each 50 iterations a new obstacle will be placed within the track
 *                  trackColors: {
 *                      grass1: "#699864",
 *                      border1: "#e00",
 *                      border2: "#fff",
 *                      outborder1: "#496a46",
 *                      outborder_end1: "#474747",
 *                      track_segment1: "#777",
 *                      lane1: "#fff",
 *                      lane2: "#777",
 *                      laneArrow1: "#00FF00",
 *                      track_segment_end:"#000",
 *                      lane_end: "#fff"
 *                  }                 
 *              } // append on div 'content'
 *           );
 * 
 *          // Generates the track, with based on trackLayout (i.e. height:0, curves:0)
 *          trackGenerator.generateStraightTrack();
 *     }
 * });
 *  
 * @example <caption>Usage of API to create a new track, using trackLayout, with curves and slopes</caption>
 *  define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the TrackGenerator module
 *     require("widgets/car/TrackGenerator");
 *
 *     function main() {
 *          // After TrackGenerator module was loaded, initialize it
 *          let trackGenerator = new TrackGenerator(
 *               'example', // id of the TrackGenerator element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { 
 *                  parent: "content", // defines parent div, which is div id="content" by default
 *                  spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                  render: {
 *                      width: 320,
 *                      height: 240,
 *                      depthOfField: 150,
 *                      camera_distance: 30,
 *                      camera_height: 100
 *                  },
 *                  trackSegmentSize: 5,
 *                  numberOfSegmentPerColor: 4,
 *                  numLanes: 3,
 *                  laneWidth: 0.02,
 *                  trackParam: {
 *                      maxHeight: 900,
 *                      maxCurve:  400,
 *                      numZones:    12, // number of different portions of the track
 *                      curvy:     0.8,
 *                      mountainy: 0.8,
 *                      zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
 *                  },
 *                  // Information regarding current controllable_car's car
 *                  controllable_car: {
 *                      position: 10,
 *                      speed: 0,
 *                      acceleration: 0.05,
 *                      deceleration: 0.04,
 *                      breaking: 0.3,
 *                      turning: 5.0,
 *                      posx: 0,
 *                      maxSpeed: 20
 *                  },
 *                  topSpeed: 250,
 *                  objects: ["tree","boulder"], // sprite names to be drawed in the landscape
 *                  obstacle: ["boulder"], // sprite names to be drawed within the track as obstacles
 *                  obstaclePerIteration: 50, // each 50 iterations a new obstacle will be placed within the track
 *                  trackColors: {
 *                      grass1: "#699864",
 *                      border1: "#e00",
 *                      border2: "#fff",
 *                      outborder1: "#496a46",
 *                      outborder_end1: "#474747",
 *                      track_segment1: "#777",
 *                      lane1: "#fff",
 *                      lane2: "#777",
 *                      laneArrow1: "#00FF00",
 *                      track_segment_end:"#000",
 *                      lane_end: "#fff"
 *                  },
 *                  // trackLayout: [ 
 *                  //     // trackLayout1.json File
 *                  //     // describing the desired track, which is straight line, with 8 zones (8 blocks) and with 
 *                  //     // profiles "flat".
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 8,
 *                  //     }
 *                  // ],
 *                  trackLayout: [ 
 *                     // trackLayout2.json File
 *                     // describing the desired track, which is curve to left, straight line, 
 *                     // curve to right, straight line, curve to left and straight line each with 3 zones (blocks) and with different 
 *                     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *                     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                     // side
 *                     {
 *                         topography: {
 *                             name:"left",
 *                             curvature: 90
 *                         },
 *                         profile: "flat",
 *                         numZones: 3
 *                     },
 *                     {
 *                         topography: {
 *                             name:"straight",
 *                             curvature: 0
 *                         },
 *                         profile: "down",
 *                         numZones: 3
 *                     },
 *                     {
 *                         topography: {
 *                             name:"right",
 *                             curvature: -90
 *                         },
 *                         profile: "flat",
 *                         numZones: 3
 *                     },
 *                     {
 *                         topography: {
 *                             name:"straight",
 *                             curvature: 0
 *                         },
 *                         profile: "up",
 *                         numZones: 3
 *                     },
 *                     {
 *                         topography: {
 *                             name:"left",
 *                             curvature: 90
 *                         },
 *                         profile: "flat",
 *                         numZones: 3,
 *                     },
 *                     {
 *                         topography: {
 *                             name:"straight",
 *                             curvature: 0
 *                         },
 *                         profile: "flat",
 *                         numZones: 3,
 *                     }
 *                    ],
 *                  // trackLayout: [ 
 *                  //     // trackLayout3.json File
 *                  //     // describing the desired track, which is straight line, followed by curve to left, straight line, 
 *                  //     // curve to right, straight line and curve to left each with 3 zones (blocks) and with different 
 *                  //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1,
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1,
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "up",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"right",
 *                  //             curvature: -90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "down",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     }
 *                  // ],
 *                  // trackLayout: [ 
 *                  //     // trackLayout4.json File
 *                  //     // describing the desired track, which is curve to right, with 4 zones (blocks) and with  
 *                  //     // profile "flat". This layout allows to render a closed circular track (with 4 curves to right 
 *                  //     // where a new curve starts after the previous ends) 
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"right",
 *                  //             curvature: -90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 4
 *                  //     }
 *                  // ],
 *                  // trackLayout: [ 
 *                  //     // trackLayout5.json File
 *                  //     // describing the desired track, which is curve to left, straight line, 
 *                  //     // curve to left, straight line, curve to left, straight line, curve to left and straight line,
 *                  //     // each with 1 zone (block) and with profile "flat".
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     }
 *                  // ],
 *                  // trackLayout: [ 
 *                  //     // trackLayout6.json File
 *                  //     // describing the desired track, which is curve to left, straight line, 
 *                  //     // curve to right, straight line and curve to left each with 1 zone (block) and with different 
 *                  //     // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *                  //     // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //     // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //     // side
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "down",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"right",
 *                  //             curvature: -90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"straight",
 *                  //             curvature: 0
 *                  //         },
 *                  //         profile: "up",
 *                  //         numZones: 1
 *                  //     },
 *                  //     {
 *                  //         topography: {
 *                  //             name:"left",
 *                  //             curvature: 90
 *                  //         },
 *                  //         profile: "flat",
 *                  //         numZones: 1
 *                  //     }
 *                  // ],
 *                  // trackLayout: [ 
 *                  //      // trackLayout7.json File
 *                  //      // describing the desired track, which is curve to left, with 4 zones (blocks) and with  
 *                  //      // profile "flat". This layout allows to render a closed circular track (with 4 curves to left 
 *                  //      // where a new curve starts after the previous ends) 
 *                  //      // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //      // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //      // side
 *                  //      {
 *                  //          topography: {
 *                  //              name:"left",
 *                  //              curvature: 90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 4
 *                  //      }
 *                  //  ],
 *                  //  trackLayout: [ 
 *                  //      // trackLayout8.json File
 *                  //      // describing the desired track, which is curve to right, straight line, 
 *                  //      // curve to left, straight line and curve to right each with 1 zone (block) and with different 
 *                  //      // profiles, i.e. "flat" or "up" or "down" allows to define slopes within each zone (default is []).
 *                  //      // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //      // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //      // side
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "down",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"left",
 *                  //              curvature: 90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "up",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      }
 *                  //  ],
 *                  //  trackLayout: [ 
 *                  //      // trackLayout9.json File
 *                  //      // describing the desired track, which is curve to right, straight line, 
 *                  //      // curve to right, straight line, curve to right, straight line, curve to right and straight line,
 *                  //      // each with 1 zone (block) and with profile "flat".
 *                  //      // Curvature is the angle of curvature for that topography name. This will be useful to try to use 
 *                  //      // those angles to define different curvatures, instead of generating the same curvature for the same
 *                  //      // side
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"right",
 *                  //              curvature: -90
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      },
 *                  //      {
 *                  //          topography: {
 *                  //              name:"straight",
 *                  //              curvature: 0
 *                  //          },
 *                  //          profile: "flat",
 *                  //          numZones: 1
 *                  //      }
 *                  //  ],
 *              } // append on div 'content'
 *           );
 * 
 *          // Generates randomly the track, with straight lines, curves and slopes
 *          trackGenerator.generateTrackBasedOnTrackLayoutOptField();
 *     }
 * });
 * 
 * @example <caption>Usage of API to create a new track, randomly, with curves and slopes</caption>
 *  define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the TrackGenerator module
 *     require("widgets/car/TrackGenerator");
 *
 *     function main() {
 *          // After TrackGenerator module was loaded, initialize it
 *          let trackGenerator = new TrackGenerator(
 *               'example', // id of the TrackGenerator element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { 
 *                  parent: "content", // defines parent div, which is div id="content" by default
 *                  spritesFilename: "spritesheet", // defines spritesheet configuration filename, which is "spritesheet.json" by default
 *                  render: {
 *                      width: 320,
 *                      height: 240,
 *                      depthOfField: 150,
 *                      camera_distance: 30,
 *                      camera_height: 100
 *                  },
 *                  trackSegmentSize: 5,
 *                  numberOfSegmentPerColor: 4,
 *                  numLanes: 3,
 *                  laneWidth: 0.02,
 *                  trackParam: {
 *                      maxHeight: 900,
 *                      maxCurve:  400,
 *                      numZones:    12, // number of different portions of the track
 *                      curvy:     0.8,
 *                      mountainy: 0.8,
 *                      zoneSize:  250 // length of each numZones (the bigger this value. the longer it will take to finish)
 *                  },
 *                  // Information regarding current controllable_car's car
 *                  controllable_car: {
 *                      position: 10,
 *                      speed: 0,
 *                      acceleration: 0.05,
 *                      deceleration: 0.04,
 *                      breaking: 0.3,
 *                      turning: 5.0,
 *                      posx: 0,
 *                      maxSpeed: 20
 *                  },
 *                  topSpeed: 250,
 *                  objects: ["tree","boulder"], // sprite names to be drawed in the landscape
 *                  obstacle: ["boulder"], // sprite names to be drawed within the track as obstacles
 *                  obstaclePerIteration: 50, // each 50 iterations a new obstacle will be placed within the track
 *                  trackColors: {
 *                      grass1: "#699864",
 *                      border1: "#e00",
 *                      border2: "#fff",
 *                      outborder1: "#496a46",
 *                      outborder_end1: "#474747",
 *                      track_segment1: "#777",
 *                      lane1: "#fff",
 *                      lane2: "#777",
 *                      laneArrow1: "#00FF00",
 *                      track_segment_end:"#000",
 *                      lane_end: "#fff"
 *                  }
 *              } // append on div 'content'
 *           );
 * 
 *          // Generates randomly the track, with straight lines, curves and slopes
 *          trackGenerator.generateTrackCurvesSlopes();
 *     }
 * });
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

    let spritesheetJSON,spritesReadJSON;

    // Random numbers to place sprites randomly within the landscape territory
    let randomPos = Math.random;
    let generatedTrack=[];
    let generatedObstacles=[];

    // Global Variables for opt fields
    let render;
    let trackSegmentSize;
    let numberOfSegmentPerColor;
    let numLanes;
    let laneWidth;
    let params;
    let trackParam;
    let controllable_car;
    let topSpeed;
    let spritesAvailable=[];
    let objects = [];
    let obstacle = [];
    let trackLayout = [];
    let trackColors = [];
    let obstaclePerIteration;

    // Has the produced JSON.
    let generatedJSON;

    /**
     * @function constructor
     * @public
     * @description Constructor for the TrackGenerator widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent {String}: the HTML element where the display will be appended (default is "game-window").</li>
     *          <li>spritesFilename {String}: the spritesheet filename(json file) that will be loaded (default is "spritesheet").</li>
     *          <li>render {Object}: the rendering configurations, i.e. width, height, etc. (default is  {width: 320, height: 240, depthOfField: 150, camera_distance: 30, camera_height: 100}).</li>
     *          <li>trackSegmentSize {Int}: the size of the track segment (default is 5).</li>
     *          <li>numberOfSegmentPerColor {Int}: the number of segments per color, i.e. how many sequenced segments to alternate colors (default is 4).</li>
     *          <li>numLanes {Int}: the number of lanes the track will be draw (default is 3).</li>
     *          <li>laneWidth {Float}: the width of the lane separator (default is 0.02).</li>
     *          <li>trackParam {Object}: the track configurations, i.e. number of zones(track length), etc (default is {maxHeight: 900, maxCurve:  400, numZones: 12, curvy: 0.8, mountainy: 0.8, zoneSize: 250}).</li>
     *          <li>controllable_car {Object}: the vehicle configurations, i.e. initial position, acceleration and deceleration values, etc (default is {position: 10, speed: 0, acceleration: 0.05, deceleration: 0.04, breaking: 0.3, turning: 5.0, posx: 0, maxSpeed: 20}).</li>
     *          <li>topSpeed {Int}: the maximum speed value that can be reached (default is 250).</li>
     *          <li>objects {Array}: the sprite names to be drawed in the landscape (default is ["tree","rock"]).</li>
     *          <li>obstacle {Array}: the sprite names to be drawed within the track as obstacles (default is ["rock"]).</li>
     *          <li>trackLayout {Array}: the track layout that will be used to create the corresponding segments. (default is []).</li>
     *          <li>trackColors {Array}: the track colors that will be used to color the segments in each stripe. (default is {grass1: "#699864", border1: "#e00", border2: "#fff", outborder1: "#496a46", outborder_end1: "#474747", track_segment1: "#777", lane1: "#fff", lane2: "#777", laneArrow1: "#00FF00", track_segment_end:"#000", lane_end: "#fff"}).</li>
     *          <li>obstaclePerIteration {Int}: the number of iterations where a new obstacle will be placed within the track (default is 50).</li>
     * @returns {TrackGenerator} The created instance of the widget TrackGenerator.
     * @memberof module:TrackGenerator
     * @instance
     */
    function TrackGenerator(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent || "game-window";
        opt.spritesFilename = opt.spritesFilename;        
        opt.render = opt.render;
        opt.trackSegmentSize = opt.trackSegmentSize;
        opt.numberOfSegmentPerColor = opt.numberOfSegmentPerColor;
        opt.numLanes = opt.numLanes;
        opt.laneWidth = opt.laneWidth;
        opt.trackParam = opt.trackParam; 
        opt.controllable_car = opt.controllable_car;
        opt.topSpeed = opt.topSpeed;
        opt.objects = opt.objects;
        opt.obstacle = opt.obstacle;
        opt.trackLayout = opt.trackLayout;
        opt.trackColors = opt.trackColors;
        opt.obstaclePerIteration = opt.obstaclePerIteration;

        this.id = id;
        this.top = coords.top || 100;
        this.left = coords.left || 700;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        render                  = (opt.render) ? opt.render : { width: 320, height: 240, depthOfField: 150, camera_distance: 30, camera_height: 100 };
        trackSegmentSize        = (opt.trackSegmentSize) ? opt.trackSegmentSize : 5;
        numberOfSegmentPerColor = (opt.numberOfSegmentPerColor) ? opt.numberOfSegmentPerColor : 4;
        numLanes                = (opt.numLanes) ? opt.numLanes : 3;
        laneWidth               = (opt.laneWidth) ? opt.laneWidth: 0.02;
        trackParam              = (opt.trackParam) ? opt.trackParam : { maxHeight: 900, maxCurve: 400, numZones: 12, /*number of different portions of the track*/ curvy: 0.8, mountainy: 0.8, zoneSize:  250 /*length of each numZones (the bigger this value. the longer it will take to finish)*/ };        
        params                  = JSON.parse(JSON.stringify(trackParam));
        controllable_car        = (opt.controllable_car) ? opt.controllable_car : { position: 10, speed: 0, acceleration: 0.05, deceleration: 0.04, breaking: 0.3, turning: 5.0, posx: 0, maxSpeed: 20 };
        topSpeed                = (opt.topSpeed) ? opt.topSpeed : 250;

        objects  = (opt.objects) ? opt.objects : ["tree","boulder"];
        obstacle = (opt.obstacle) ? opt.obstacle : ["boulder"];
        trackLayout = (opt.trackLayout) ? opt.trackLayout : [];
        trackColors = (opt.trackColors) ? opt.trackColors : {
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
        obstaclePerIteration = (opt.obstaclePerIteration) ? opt.obstaclePerIteration : 50;

        // console.log(trackLayout);
        // console.log(trackColors);

        let trackLayout2 = [];        
        trackLayout.forEach(el => trackLayout2.unshift(el));
        // console.log(trackLayout2);
        trackLayout = trackLayout2;
        // console.log(trackLayout);

        this.parent = (opt.parent) ? ("#" + opt.parent) : "game-window";
        this.spritesFilename = (opt.spritesFilename) ? ("text!widgets/car/configurations/" + opt.spritesFilename + ".json") : "text!widgets/car/configurations/spritesheet.json";
        
        // Load spritesheet based on spritesFilename options
        let _this = this;
        let spritesheet_file = "text!widgets/car/configurations/" + opt.spritesFilename + ".json";
        require([spritesheet_file], function(spritesheet) {
            _this.div.append("div").attr("id", "spritesheet_file_loaded_opt_field").style("visibility","hidden").text(spritesheet);
            return _this;
        });

        this.div = d3.select(this.parent);
        
        this.div.append("h2").text("Track Generator");
        this.div.append("span")
                .attr("id","created")
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
     * @protected
     * @description LoadFile method of the TrackGenerator widget. This method loads the desired JSON File.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.loadFile = function () {
        setTimeout(function(){ 
            spritesheetJSON = document.getElementById("spritesheet_file_loaded_opt_field").innerHTML;
            if(spritesheetJSON){
                spritesReadJSON = JSON.parse(spritesheetJSON);
                // Reading all JSON Sprites Available
                for(let k=0;k<spritesReadJSON.frames.length;k++){
                    spritesAvailable[k]={
                        name:spritesReadJSON.frames[k].filename.split(".")[0],
                        value:spritesReadJSON.frames[k].frame
                    };
                }    
            }
    
            // console.log(spritesAvailable);
        },150);

        return this;
    };

    /**
     * @function hide
     * @public 
     * @description Hide method of the TrackGenerator widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @public 
     * @description Reveal method of the TrackGenerator widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

     /**
     * @function generateStraightTrack
     * @public 
     * @description GenerateStraightTrack method of the TrackGenerator widget. This method generates the straight line simulator version.
     * Every 50 iterations an obstacle is randomly placed on a part of the track, i.e. between the track and landscape separators.
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no).
     * It also has information about the randomly generated position and the type of sprite, i.e. the sprite provided as opt from the available list (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), a value is randomly generated to decide in which side it will be placed (spriteSidesRandom).
     * Then the position on that side is also randomly generated in spritePos (given by spritePosRightRandom or spritePosLeftRandom).
     * Before finishing, another random number is generated to know how far to put the sprite on the selected side in relation to the landscape/track separator, in order to have
     * sprites randomly scattered, but balanced (instead of being concentrated in a given area).
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in and whether those are obstacles or not,
     * a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
     * within this context on the PVSio-web platform.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.generateStraightTrack = () => {
        TrackGenerator.prototype.loadFile();
        setTimeout(function(){ 
            // Generate current Zone
            let numIterations = params.numZones * params.zoneSize;
            let sprite = false;
            let spritePos = null;
            let spritePosgeneratedObstaclesRandom = null;
            let spritePosRightRandom = null;
            let spritePosLeftRandom =  null;
            let spriteTypeRandom = null;
            let spriteSidesRandom = null;
            let spritesAvailableLength = spritesAvailable.length;
        
            for(let i=0; i < numIterations; i++){            
                // generates random integer numbers between 0 and spritesAvailable.length
                spriteTypeRandom = Math.floor(randomPos() * spritesAvailableLength);
                // generates random integer numbers between 1 and 2
                spriteSidesRandom = Math.floor((randomPos() * 2) + 1);
        
                spritePosgeneratedObstaclesRandom = randomPos() - 0.5;
                
                if(spritesAvailable[spriteTypeRandom].name.match(/car[0-9]?/)===null && spritesAvailable[spriteTypeRandom].name.match(/background[0-9]?/)===null && spritesAvailable[spriteTypeRandom].name.match(/logo[0-9]?/)===null){
                    if(i%obstaclePerIteration===0){
                        obstacle.forEach((element) => {
                            let index = spritesAvailable.findIndex(el => el.name === element);
                            // console.log(index);
                            // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                            // console.log(spritePosgeneratedObstaclesRandom);
                            generatedObstacles.push(spritePosgeneratedObstaclesRandom);
                            // spritePosgeneratedObstaclesRandom has the relative position of the obstacle
                            sprite = {type: spritesAvailable[index].value, pos: spritePosgeneratedObstaclesRandom, obstacle: 1};
                            
                            generatedTrack.push({
                                height: 0,
                                curve: 0,
                                sprite: sprite
                            });
                        });
                    }else{
                        objects.forEach((element) => {
                            // console.log(element);
                            let index = spritesAvailable.findIndex(el => el.name === element);
                            // console.log(index);
                            // generates random float numbers greater than 0.55
                            spritePosRightRandom = randomPos() + 0.90;
                            // generates random float numbers lesser than -0.55
                            spritePosLeftRandom =  (randomPos() * -0.56) - 0.56;
        
                            // choose randomly sprite size
                            if(spriteSidesRandom === 1){
                                spritePos = spritePosLeftRandom;
                            }else if(spriteSidesRandom === 2){
                                spritePos = spritePosRightRandom;
                            }
        
                            if(randomPos() < 0.25){
                                sprite = {type: spritesAvailable[index].value, pos: spritePos-0.5, obstacle: 0};
                            } if(randomPos() < 0.5){
                                sprite = {type: spritesAvailable[index].value, pos: spritePos, obstacle: 0};
                            }else{
                                sprite = {type: spritesAvailable[index].value, pos: 3*spritePos, obstacle: 0};
                            }

                            // console.log(sprite.type);
                            generatedTrack.push({
                                height: 0,
                                curve: 0,
                                sprite: sprite
                            });
                        });
                    }
                }
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
                trackColors: trackColors
            };

            setTimeout(function(){ 
                d3.select("#created").text("Success: True"); 
            
                // TODO writeFile track.json with its content with Paolo Masci new API (when it has been implemented)
                // console.log(generatedJSON);
                console.log(JSON.stringify(generatedJSON));
            }, 1000);
        }, 150);
        return this;
    };

    /**
     * @function generateTrackCurvesSlopes
     * @public  
     * @description GenerateTrackCurvesSlopes method of the TrackGenerator widget. This method generates the straight line simulator version.
     * Every 50 iterations an obstacle is randomly placed on a part of the track, i.e. between the track and landscape separators.
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no).
     * It also has information about the randomly generated position and the type of sprite, i.e. the sprite provided as opt from the available list (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), a value is randomly generated to decide in which side it will be placed (spriteSidesRandom).
     * Then the position on that side is also randomly generated in spritePos (given by spritePosRightRandom or spritePosLeftRandom).
     * Before finishing, another random number is generated to know how far to put the sprite on the selected side in relation to the landscape/track separator, in order to have
     * sprites randomly scattered, but balanced (instead of being concentrated in a given area).
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in and whether those are obstacles or not,
     * a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
     * within this context on the PVSio-web platform.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.generateTrackCurvesSlopes = () => {
        TrackGenerator.prototype.loadFile();
        setTimeout(function(){ 
            // Generate current Zone
            let sprite = false;
            let spritePos = null;
            let spritePosgeneratedObstaclesRandom = null;
            let spritePosRightRandom = null;
            let spritePosLeftRandom =  null;
            let spriteTypeRandom = null;
            let chooseIndexFromObjects=null;
            let chooseObjectFromDesiredObjects=null;
            let chooseIndexFromObstacle=null;
            let chooseObstacleFromDesiredObstacle=null;
            let spriteSidesRandom = null;
            let slopesTransitionRandom = null;
            let curvesTransitionRandom = null;
            let spritesAvailableLength = spritesAvailable.length;
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

            // console.log("trackParam.numZones: "+trackParam.numZones);

            let iter = params.numZones;
            // console.log("iter: "+iter);
            // console.log("params.numZones: "+params.numZones);

            while(iter){
                // Generate current Zone
                let intendedHeightForCurrentZone;
                switch(heightType){
                    case 0:
                        intendedHeightForCurrentZone = 0; break;
                    case 1:
                        intendedHeightForCurrentZone = 900 * randomPos(); break;
                    case -1:
                        intendedHeightForCurrentZone = - 900 * randomPos(); break;
                }
                let intendedCurveForCurrentZone;
                switch(curveType){
                    case 0:
                        intendedCurveForCurrentZone = 0; break;
                    case 1:
                        intendedCurveForCurrentZone = - 400 * randomPos(); break;
                    case -1:
                        intendedCurveForCurrentZone = 400 * randomPos(); break;
                }
                
                for(let i=0; i < params.zoneSize; i++){
                    // generates random integer numbers between 0 and objects.length(there are objects.length sprites desired to draw)
                    chooseIndexFromObjects = Math.floor((randomPos() * objects.length));
                    chooseObjectFromDesiredObjects=objects[chooseIndexFromObjects];
                    index = spritesAvailable.findIndex(el => el.name === chooseObjectFromDesiredObjects);

                    // generates random integer numbers between 1 and 2
                    spriteSidesRandom = Math.floor((randomPos() * 2) + 1);
        
                    spritePosgeneratedObstaclesRandom = randomPos() - 0.5;
                    
                    if(i%obstaclePerIteration==0){
                        // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                        // generates random integer numbers between 0 and obstacle.length(there are obstacle.length sprites desired to draw)
                        chooseIndexFromObstacle = Math.floor((randomPos() * obstacle.length));
                        chooseObstacleFromDesiredObstacle=obstacle[chooseIndexFromObstacle];
                        index = spritesAvailable.findIndex(el => el.name === chooseObstacleFromDesiredObstacle);
                        // console.log(spritePosgeneratedObstaclesRandom);
                        generatedObstacles.push(spritePosgeneratedObstaclesRandom);
                        // spritePosgeneratedObstaclesRandom has the relative position of the obstacle
                        sprite = {type: spritesAvailable[index].value, pos: spritePosgeneratedObstaclesRandom, obstacle: 1};
                    }
                    else {
                        // choose randomly sprite image
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
                            sprite = {type: spritesAvailable[index].value, pos: spritePos-0.5, obstacle: 0};
                        } if(randomPos() < 0.5){
                            sprite = {type: spritesAvailable[index].value, pos: spritePos, obstacle: 0};
                        }else{
                            sprite = {type: spritesAvailable[index].value, pos: 3*spritePos, obstacle: 0};
                        }
                    }
                   
                    // console.log(sprite);
        
                    generatedTrack.push({
                        height: currentZone.height+intendedHeightForCurrentZone / 2 * (1 + Math.sin(i/params.zoneSize * Math.PI-Math.PI/2)),
                        curve: currentZone.curve+intendedCurveForCurrentZone / 2 * (1 + Math.sin(i/params.zoneSize * Math.PI-Math.PI/2)),
                        sprite: sprite
                    })
                }
                currentZone.height += intendedHeightForCurrentZone;
                currentZone.curve += intendedCurveForCurrentZone;
        
                // Find next zone
                if(randomPos() < params.mountainy){
                    slopesTransitionRandom = 1+Math.round(randomPos());
                }else {
                    slopesTransitionRandom = 0;
                }
        
                if(randomPos() < params.curvy){
                    curvesTransitionRandom = 1+Math.round(randomPos());
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
            params.numZones = params.numZones * params.zoneSize;
            // console.log("params.numZones: "+params.numZones);
            // console.log("trackParam.numZones: "+trackParam.numZones);
        
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
                trackColors: trackColors
            };

            setTimeout(function(){ 
                d3.select("#created").text("Success: True"); 

                // TODO writeFile track.json with its content with Paolo Masci new API (when it has been implemented)
                // console.log(generatedJSON);
                console.log(JSON.stringify(generatedJSON));
            }, 1000);
        }, 150);
        return this;
    };

    /**
     * @function generateTrackBasedOnTrackLayoutOptField
     * @public  
     * @description GenerateTrackBasedOnTrackLayoutOptField method of the TrackGenerator widget. This method generates the track present in the trackLayout opt field.
     * Every 50 iterations an obstacle is randomly placed on a part of the track, i.e. between the track and landscape separators.
     * The sprite variable has the information about whether or not it is an obstacle in the obstacle field (1-yes, 0-no).
     * It also has information about the randomly generated position and the type of sprite, i.e. the sprite provided as opt from the available list (obtained in the spritesheet.json file)
     * During the remaining iterations (which will not be considered as obstacles on the road), a value is randomly generated to decide in which side it will be placed (spriteSidesRandom).
     * Then the position on that side is also randomly generated in spritePos (given by spritePosRightRandom or spritePosLeftRandom).
     * Before finishing, another random number is generated to know how far to put the sprite on the selected side in relation to the landscape/track separator, in order to have
     * sprites randomly scattered, but balanced (instead of being concentrated in a given area).
     * After creating the segments that make up the track, on generatedTrack variable, that includes information on what sprites to put in and whether those are obstacles or not,
     * a JSON object, generatedJSON, is created, which will later be saved in a track.json file in the widgets/car/configurations directory, when there is a file writing API
     * within this context on the PVSio-web platform.
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.generateTrackBasedOnTrackLayoutOptField = () => {
        TrackGenerator.prototype.loadFile();
        setTimeout(function(){ 
            let sprite = false;
            let spritePos = null;
            let spritePosgeneratedObstaclesRandom = null;
            let spritePosRightRandom = null;
            let spritePosLeftRandom =  null;
            let spriteTypeRandom = null;
            let chooseIndexFromObjects=null;
            let chooseObjectFromDesiredObjects=null;
            let chooseIndexFromObstacle=null;
            let chooseObstacleFromDesiredObstacle=null;
            let spriteSidesRandom = null;
            let spritesAvailableLength = spritesAvailable.length;
            let index=null;
            let iter = 0;
            let finalNumZones = 0;
            trackLayout.forEach(el => iter+=el.numZones);
            finalNumZones = iter;
            
            let trackLayoutProfile = 0; //0=flat 1=up -1=down
            let trackLayoutTopographyName = 0; //0=straight 1=left -1=right
            let currentZone = {
                height: 0,
                curve: 0
            };

            let tmpIter=1;
            let tmpPos=1;
            
            while(iter){
                if(tmpIter<=trackLayout[trackLayout.length-tmpPos].numZones){
                    // Generate current Zone
                    let intendedHeightForCurrentZone;
                    let intendedCurveForCurrentZone = parseInt(trackLayout[trackLayout.length-tmpPos].topography.curvature);
                    switch(trackLayout[trackLayout.length-tmpPos].profile){
                        case "flat":
                            intendedHeightForCurrentZone=0;
                            break; 
                        case "up": 
                            intendedHeightForCurrentZone = 900 * randomPos(); // Ease vertical transitions
                            break;
                        case "down": 
                            intendedHeightForCurrentZone = -900 * randomPos();
                            break;  
                    }
                   
                    for(let i=0; i < params.zoneSize; i++){
                        // generates random integer numbers between 0 and objects.length(there are objects.length sprites desired to draw)
                        chooseIndexFromObjects = Math.floor((randomPos() * objects.length));
                        chooseObjectFromDesiredObjects=objects[chooseIndexFromObjects];
                        index = spritesAvailable.findIndex(el => el.name === chooseObjectFromDesiredObjects);

                        // generates random integer numbers between 1 and 2
                        spriteSidesRandom = Math.floor((randomPos() * 2) + 1);

                        spritePosgeneratedObstaclesRandom = (randomPos() * 0.50) - 0.25;

                        if(i%obstaclePerIteration==0){
                            // each obstaclePerIteration iterations a new obstacle is placed within the generatedTrack
                            // generates random integer numbers between 0 and obstacle.length(there are obstacle.length sprites desired to draw)
                            chooseIndexFromObstacle = Math.floor((randomPos() * obstacle.length));
                            chooseObstacleFromDesiredObstacle=obstacle[chooseIndexFromObstacle];
                            index = spritesAvailable.findIndex(el => el.name === chooseObstacleFromDesiredObstacle);
                            // console.log(spritePosgeneratedObstaclesRandom);
                            // console.log(spritesAvailable[index]);
                            generatedObstacles.push(spritePosgeneratedObstaclesRandom);
                            // spritePosgeneratedObstaclesRandom has the relative position of the obstacle
                            sprite = {type: spritesAvailable[index].value, pos: spritePosgeneratedObstaclesRandom, obstacle: 1};
                        }
                        else {
                            // choose randomly sprite image
                            // generates random float numbers greater than 0.55
                            spritePosRightRandom = randomPos() + 0.90;
                            // generates random float numbers lesser than -0.55
                            spritePosLeftRandom =  (randomPos() * -0.55) - 0.55;

                            // choose randomly sprite size
                            if(spriteSidesRandom == 1){
                                spritePos = spritePosLeftRandom;
                            }else if(spriteSidesRandom == 2){
                                spritePos = spritePosRightRandom;
                            }
                            // console.log(spritePos);
                            if(randomPos() < 0.25){
                                sprite = {type: spritesAvailable[index].value, pos: spritePos-0.5, obstacle: 0};
                            } if(randomPos() < 0.5){
                                sprite = {type: spritesAvailable[index].value, pos: spritePos, obstacle: 0};
                            }else{
                                sprite = {type: spritesAvailable[index].value, pos: 3*spritePos, obstacle: 0};
                            }
                        }

                        // Draw segments next to each other with 'i/params.zoneSize'
                        // Avoid horizontal gaps with 'Math.PI-Math.PI/2'
                        // Avoid vertical gaps with '1 +' 
                        // Better perspective with '2*'
                        // 2 * (1 + Math.sin(i/params.zoneSize *))

                        generatedTrack.push({
                            height: currentZone.height+intendedHeightForCurrentZone / 2 * (1 + Math.sin(i/params.zoneSize * Math.PI-Math.PI/2)),
                            curve: currentZone.curve+intendedCurveForCurrentZone / 2 * (1 + Math.sin(i/params.zoneSize * Math.PI-Math.PI/2)),
                            sprite: sprite
                        })
                    }

                    currentZone.height += intendedHeightForCurrentZone;
                    currentZone.curve += intendedCurveForCurrentZone;

                    tmpIter++;
                    iter--;
                }else{
                    tmpIter=1;
                    if(tmpPos<=trackLayout.length) {
                        tmpPos++;
                    }
                }
            }
            params.numZones = finalNumZones * params.zoneSize;

            trackParam.numZones = finalNumZones;
        
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
                trackColors: trackColors
            };

            setTimeout(function(){ 
                d3.select("#created").text("Success: True"); 

                // TODO writeFile track.json with its content with Paolo Masci new API (when it has been implemented)
                // console.log(generatedJSON);
                console.log(JSON.stringify(generatedJSON));
            }, 1000);
        }, 150);
        return this;
    };

    /**
     * @function render
     * @public
     * @description Render method of the TrackGenerator widget. 
     * @memberof module:TrackGenerator
     * @instance
     */
    TrackGenerator.prototype.render = function () {
        return this.reveal();
    };

    module.exports = TrackGenerator;
});
