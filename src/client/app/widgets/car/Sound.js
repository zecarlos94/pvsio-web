/**
 * @module Sound
 * @version 3.0.0
 * @author José Carlos
 * @desc This module helps build a music player, where a given song can be played, its volume be adjusted, among and other features. 
 * It was developed so that more than one song can be played in the arcade driving simulator (Arcade widget).
 *
 * @date Mar 10, 2018
 * last modified @date Jun 13, 2018
 *
 * @example <caption>Usage of Sound within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Sound module
 *     require("widgets/car/Sound");
 *
 *     function main() {
 *          // After Sound module was loaded, initialize it
 *          let sound = new Sound(
 *               'example', // id of the Sound element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'tog', // default is 'body'
 *                 mutedImg: "img/muted.png", 
 *                 notMutedImg: "img/notMuted.png",
 *                 invokePVS: true,
 *                 mute_functionNamePVS: "mute",
 *                 unmute_functionNamePVS: "unmute", 
 *                 songs: [
 *                           {
 *                               url: "song/sound.mp3",
 *                               loop: false
 *                           },
 *                           {
 *                               url: "song/loop.mp3",
 *                               loop: true
 *                           }
 *                       ],
 *               } // append on div 'tog'
 *           );
 * 
 *          // Available methods:
 *          // Render the Sound widget
 *          sound.render();
 * 
 *          // OR
 * 
 *          // Hides the Sound widget
 *          sound.hide();
 * 
 *          // OR
 * 
 *          // Reveals/Shows the Sound widget
 *          sound.reveal();
 * 
 *          // OR
 * 
 *          // Returns the Sound widget div
 *          sound.show();
 * 
 *          // OR
 * 
 *          // Silences all audio and swaps "not muted" image to "muted" image.
 *          sound.mute();
 * 
 *          // OR
 * 
 *          // Plays all audio and swaps "muted" image to "not muted" image.
 *          sound.unmute();
 * 
 *          // OR
 * 
 *          // Sets the current volume of all audio divs. Must be a number between 0.0 and 1.0.
 *          // 1.0 is highest volume (100%. This is default)
 *          // 0.5 is half volume (50%)
 *          // 0.0 is silent (same as mute)
 *          sound.setVolumeAll(newVolume);
 * 
 *          // OR
 * 
 *          // Sets the current volume of audio with div id="audio"+index. Must be a number between 0.0 and 1.0.
 *          // 1.0 is highest volume (100%. This is default)
 *          // 0.5 is half volume (50%)
 *          // 0.0 is silent (same as mute)
 *          sound.setVolume(newVolume, index);
 * 
 *          // OR
 * 
 *          // Plays the music with index "index", present in the audio div with id="audio"+index. 
 *          // For example, playing music with index 2, represents play the music present in the audio div with id="audio2"
 *          sound.playSound(index);
 * 
 *          // OR
 * 
 *          // Plays all songs
 *          sound.playAll();
 * 
 *          // OR
 * 
 *          // Pauses the music with index "index", present in the audio div with id="audio"+index. 
 *          // For example, stopping music with index 2, represents stop the music present in the audio div with id="audio2"
 *          sound.pauseSound(index);
 * 
 *          // OR
 * 
 *          // Pauses all songs
 *          sound.pauseAll();
 * 
 *          // OR
 * 
 *          // Allows to play all songs in "arrayNext" array, after the song with index indexOnEnded has finished.
 *          sound.onEndedSound(indexOnEnded, arrayNext);
 * 
 *          // OR
 * 
 *          // Allows to collect the value of the div with id="soundOff", in order to check if sounds are muted or not, in the arcade driving simulator.
 *          sound.getSoundOff();
 *
 *          // OR
 *
 *          // Sets click event listeners to toggle images
 *          sound.startSound();
 * 
 *     }
 * });
 * 
 * 
 * @example <caption>Usage of API to play all audio files and to set volume 0.8 to the second audio file playing.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Sound module
 *     require("widgets/car/Sound");
 *
 *     function main() {
 *          // After Sound module was loaded, initialize it
 *          let sound = new Sound(
 *               'example', // id of the Sound element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'tog', 
 *                 mutedImg: "img/muted.png", 
 *                 notMutedImg: "img/notMuted.png", 
 *                 invokePVS: true,
 *                 mute_functionNamePVS: "mute",
 *                 unmute_functionNamePVS: "unmute", 
 *                 songs: [
 *                           {
 *                               url: "song/sound.mp3",
 *                               loop: false
 *                           },
 *                           {
 *                               url: "song/loop.mp3",
 *                               loop: true
 *                           }
 *                       ],
 *               } // append on div 'tog'
 *           );
 *          sound.startSound();
 *          sound.playAll();
 *          sound.setVolume(0.8, 2);
 *     }
 * });
 * 
 * 
 * @example <caption>Usage of API to pause the first audio file playing.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the Sound module
 *     require("widgets/car/Sound");
 *
 *     function main() {
 *          // After Sound module was loaded, initialize it
 *          let sound = new Sound(
 *               'example', // id of the Sound element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'tog', 
 *                 mutedImg: "img/muted.png", 
 *                 notMutedImg: "img/notMuted.png", 
 *                 invokePVS: true,
 *                 mute_functionNamePVS: "mute",
 *                 unmute_functionNamePVS: "unmute",
 *                 songs: [
 *                           {
 *                               url: "song/sound.mp3",
 *                               loop: false
 *                           },
 *                           {
 *                               url: "song/loop.mp3",
 *                               loop: true
 *                           }
 *                       ],
 *               } // append on div 'tog'
 *           );
 *         
 *          sound.pauseSound(1);
 *     }
 * });
 * 
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
    let ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();
    
    /**
     * @function constructor
     * @public
     * @description Constructor for the Sound widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent {String}: the HTML element where the display will be appended (default is "body").</li>
     *          <li>mutedImg {String}: the location of the muted image (default is "widgets/car/configurations/img/muted.png").</li>
     *          <li>notMutedImg {String}: the location of the unmuted image (default is "widgets/car/configurations/img/notMuted.png").</li>
     *          <li>soundOff {Boolean}: the boolean value that indicates whether the sound state is "off", i.e. whether it is 'off' or not. It is used in the arcade driving simulator(default is null).</li>
     *          <li>mute_functionNamePVS {String}: the pvs function name for action mute (default is "mute").</li>
     *          <li>unmute_functionNamePVS {String}: the pvs function name for action unmute (default is "unmute").</li>
     * @returns {Sound} The created instance of the widget Sound.
     * @memberof module:Sound
     * @instance
     */
    function Sound(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent;
        opt.mutedImg = opt.mutedImg || "../../client/app/widgets/car/configurations/img/muted.png";
        opt.notMutedImg = opt.notMutedImg || "../../client/app/widgets/car/configurations/img/notMuted.png";
        opt.songs = opt.songs || {};
        opt.soundOff = opt.soundOff;
        this.numberSongs = (opt.songs) ? opt.songs.length : 0;
        opt.invokePVS = (opt.invokePVS) ? opt.invokePVS : false;
        opt.mute_functionNamePVS = (opt.mute_functionNamePVS) ? opt.mute_functionNamePVS : "mute",
        opt.unmute_functionNamePVS = (opt.unmute_functionNamePVS) ? opt.unmute_functionNamePVS : "unmute",

        this.id = id;
        this.SOUNDID = this.id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.soundOff = (opt.soundOff) ? opt.soundOff : null;

        this.mutedImg = (opt.mutedImg) ? opt.mutedImg : "../../client/app/widgets/car/configurations/img/muted.png";
        this.notMutedImg = (opt.notMutedImg) ? opt.notMutedImg : "../../client/app/widgets/car/configurations/img/notMuted.png";

        this.invokePVS = opt.invokePVS || false;
        this.mute_functionNamePVS = opt.mute_functionNamePVS || "mute";
        this.unmute_functionNamePVS = opt.unmute_functionNamePVS || "unmute";

        this.parent = (opt.parent) ? ("#" + opt.parent) : "body";

        this.div = d3.select(this.parent).append("div").attr("id", "tog_"+this.SOUNDID)
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px");
        
        this.div.append("img").attr("id", "mute_"+this.SOUNDID)
                            .attr("src", this.mutedImg)
                            .style("display","inline");
            
        this.div.append("img").attr("id", "unmute_"+this.SOUNDID)
                              .attr("src", this.notMutedImg)
                              .style("display","none");

        if(this.soundOff!==null){
            this.div.append("p").attr("id", "soundOff_"+this.SOUNDID)
                                .style("visibility","hidden")
                                .text(this.soundOff);
        }

        this.body = d3.select("body");
        this.sounds = [];

        if(this.numberSongs){
            for(let i=0;i<this.numberSongs;i++){
                if(opt.songs[i].loop){
                    if(opt.songs[i].url){
                        this.body.append("audio").attr("id", "audio"+i+"_"+this.SOUNDID)
                                .attr("name", " ")
                                .attr("loop","")
                                .attr("src", opt.songs[i].url)
                                .text("Your browser does not support the <code>audio</code> element.");
                    }else{
                        this.body.append("audio").attr("id", "audio"+i+"_"+this.SOUNDID)
                                .attr("name", " ")
                                .attr("loop","")
                                .attr("src", "../../client/app/widgets/car/configurations/song/loop.mp3") // Default url for loop audios
                                .text("Your browser does not support the <code>audio</code> element.");
                    }    
                }else {
                    if(opt.songs[i].url){
                        this.body.append("audio").attr("id", "audio"+i+"_"+this.SOUNDID)
                                .attr("name", " ")
                                .attr("src", opt.songs[i].url)
                                .text("Your browser does not support the <code>audio</code> element.");
                    }else{
                        this.body.append("audio").attr("id", "audio"+i+"_"+this.SOUNDID)
                                .attr("name", " ")
                                .attr("src", "../../client/app/widgets/car/configurations/song/sound.mp3") // Default url for non loop audios
                                .text("Your browser does not support the <code>audio</code> element.");
                    }    
                }
                this.sounds[i] = d3.select('#audio'+i+"_"+this.SOUNDID)[0][0];
            }
        } else { 
            this.body.append("audio").attr("id", "audio0"+"_"+this.SOUNDID)
                    .attr("name", " ")
                    .attr("loop","")
                    .attr("src", "../../client/app/widgets/car/configurations/song/loop.mp3") // Default url for loop audios
                    .text("Your browser does not support the <code>audio</code> element.");
            
            this.body.append("audio").attr("id", "audio1"+"_"+this.SOUNDID)
                    .attr("name", " ")
                    .attr("src", "../../client/app/widgets/car/configurations/song/sound.mp3") // Default url for non loop audios
                    .text("Your browser does not support the <code>audio</code> element.");
            
            this.sounds[0] = d3.select('#audio0'+"_"+this.SOUNDID)[0][0];
            this.sounds[1] = d3.select('#audio1'+"_"+this.SOUNDID)[0][0];
        }
      
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;
        Widget.call(this, id, coords, opt);

        return this;
    }

    Sound.prototype = Object.create(Widget.prototype);
    Sound.prototype.constructor = Sound;
    Sound.prototype.parentClass = Widget.prototype;

    /**
     * @function startSound
     * @public
     * @description StartSound method of the Sound widget. This method creates event listeners to allow sound image toggle.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.startSound = function () {
        // Solution derived from https://stackoverflow.com/questions/2749244/javascript-setinterval-and-this-solution
        setTimeout(
            (function(self) {         //Self-executing func which takes 'this' as self
                return function() {   //Return a function in the context of 'self'
                    d3.select('#mute_'+self.SOUNDID)[0][0].addEventListener('click', function (e) {
                        self.unmute();
                    });

                    d3.select('#unmute_'+self.SOUNDID)[0][0].addEventListener('click', function (e) {
                        self.mute();
                    });
                    self.mute(); //Thing you wanted to run as non-window 'this'
                }
            })(this),
            50     //normal interval, 'this' scope not impacted here.
        ); 
        return this;
    };



    /**
     * @function getSoundOff
     * @public
     * @description GetSoundOff method of the Sound widget. This method returns the value of div with id="soundOff".
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.getSoundOff = function () {
        if(this.soundOff!==null){
            this.soundOffDiv = d3.select("#soundOff_"+this.SOUNDID);
            return(JSON.parse(this.soundOffDiv[0][0].innerHTML));
        }
        return this;
    };

     /**
     * @function unmute
     * @public
     * @description Unmute method of the Sound widget. This method changes the displayed image and plays all sounds known.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.unmute = function () {
        if(this.invokePVS){
            ButtonActionsQueue.queueGUIAction("press_"+this.unmute_functionNamePVS, this.callback);
        }
        if(this.soundOff!==null){
            this.soundOffDiv = d3.select("#soundOff_"+this.SOUNDID);
            this.soundOffDiv.text("false");
        }
        this.muteDiv   = d3.select("#mute_"+this.SOUNDID);
        this.unmuteDiv = d3.select("#unmute_"+this.SOUNDID);
        this.muteDiv.style("display", "none");
        this.unmuteDiv.style("display", "inline");
        this.playAll();
        return this;
    };

    /**
     * @function mute
     * @public
     * @description Mute method of the Sound widget. This method changes the displayed image and pauses all sounds known.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.mute = function () {
        if(this.invokePVS){
            ButtonActionsQueue.queueGUIAction("press_"+this.mute_functionNamePVS, this.callback);
        }
        if(this.soundOff!==null){
            this.soundOffDiv = d3.select("#soundOff_"+this.SOUNDID);
            this.soundOffDiv.text("true");
        }
        this.muteDiv   = d3.select("#mute_"+this.SOUNDID);
        this.unmuteDiv = d3.select("#unmute_"+this.SOUNDID);
        this.muteDiv.style("display", "inline");
        this.unmuteDiv.style("display", "none");
        this.pauseAll();
        return this;
    };

    /**
     * @function setVolume
     * @public
     * @description SetVolume method of the Sound widget. This method changes the volume of a specific known sound, given by index parameter.
     * @param newVolume {Float} This parameter is the new volume to be set to all known sounds.
     * @param index {Int} This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.setVolume = function (newVolume, index) {
        this.sounds[index].volume = newVolume;
        return this;
    };

    /**
     * @function setVolumeAll
     * @public
     * @description SetVolumeAll method of the Sound widget. This method changes the volume of all known sounds.
     * @param newVolume {Float} This parameter is the new volume to be set to all known sounds.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.setVolumeAll = function (newVolume) {
        let s = this.sounds.length;
        for(let i=0; i<s; i++) {
            this.sounds[i].volume = newVolume;
        }
        return this;
    };

     /**
     * @function playAll
     * @public
     * @description PlayAll method of the Sound widget. This method plays all known sounds.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.playAll = function () {
        let s = this.sounds.length;
        for(let i=0; i<s; i++) {
            this.sounds[i].play();
        }
        return this;
    };

    /**
     * @function pauseAll
     * @public
     * @description PauseAll method of the Sound widget. This method pauses all known sounds playing.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.pauseAll = function () {
        let s = this.sounds.length;
        for(let i=0; i<s; i++) {
            this.sounds[i].pause();
        }
        return this;
    };

    /**
     * @function playSound
     * @public
     * @description PlaySound method of the Sound widget. This method plays a specific known sound, given by index parameter.
     * @param index {Int} This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.playSound = function (index) {
        this.sounds[index].play();
        return this;
    };

    /**
     * @function pauseSound
     * @public
     * @description PauseSound method of the Sound widget. This method pauses a specific known sound, given by index parameter.
     * @param index {Int} This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.pauseSound = function (index) {
        this.sounds[index].pause();
        return this;
    };

    /**
     * @function onEndedSound
     * @public
     * @description OnEndedSound method of the Sound widget. This method plays several known sounds, given by the index parameter.
     * @param indexOnEnded {Int} This parameter is the index of the song that will end, given by the "onended" event.
     * @param arrayNext {Array} This parameter is an array of objects, indexPlayNext and newVolume, which allows to play and set volume of several sounds after "indexOnEnded" sound ended.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.onEndedSound = function (indexOnEnded, arrayNext) {
        let a;
        this.sounds[indexOnEnded].onended = (function(self) {
                                                return function() { 
                                                   for(a=0;a<arrayNext.length;a++){
                                                        self.sounds[arrayNext[a].indexPlayNext].play();
                                                        self.sounds[arrayNext[a].indexPlayNext].volume = arrayNext[a].newVolume;
                                                    }
                                                }
                                            })(this);

        return this;
    };


    /**
     * @function hide
     * @public
     * @description Hide method of the Sound widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @public
     * @description Reveal method of the Sound widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

    /**
     * @function show
     * @public
     * @description Show method of the Sound widget. This method displays the current main div as it is.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.show = function () {
        return this.div;
    };

  
    /**
     * @function render
     * @public
     * @description Render method of the Sound widget. 
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.render = function () {
        return this.reveal();
    };

    module.exports = Sound;
});
