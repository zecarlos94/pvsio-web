/**
 * @module Sound
 * @version 2.0.0
 * @author José Carlos
 * @desc This module helps build a music player, where a given song can be played, its volume be adjusted, among and other features. 
 * It was developed so that more than one song can be played in the arcade driving simulator (Arcade widget).
 *
 * @date Mar 10, 2018
 * last modified @date Apr 17, 2018
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
 *               { parent: 'tog', 
 *                 mutedImg: "img/muted.png", 
 *                 notMutedImg: "img/notMuted.png", 
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
 *          // Render the Sound widget
 *          sound.render();
 * 
 *          // Hides the Sound widget
 *          sound.hide();
 * 
 *          // Reveals/Shows the Sound widget
 *          sound.reveal();
 * 
 *          // Returns the Sound widget div
 *          sound.show();
 * 
 *          // Silences all audio and swaps "not muted" image to "muted" image.
 *          sound.mute();
 * 
 *          // Plays all audio and swaps "muted" image to "not muted" image.
 *          sound.unmute();
 * 
 *          // Sets the current volume of all audio divs. Must be a number between 0.0 and 1.0.
 *          // 1.0 is highest volume (100%. This is default)
 *          // 0.5 is half volume (50%)
 *          // 0.0 is silent (same as mute)
 *          sound.setVolumeAll(newVolume);
 * 
 *          // Sets the current volume of audio with div id="audio"+index. Must be a number between 0.0 and 1.0.
 *          // 1.0 is highest volume (100%. This is default)
 *          // 0.5 is half volume (50%)
 *          // 0.0 is silent (same as mute)
 *          sound.setVolume(newVolume, index);
 * 
 *          // Plays the music with index "index", present in the audio div with id="audio"+index. 
 *          // For example, playing music with index 2, represents play the music present in the audio div with id="audio2"
 *          sound.playSound(index);
 * 
 *          // Plays all songs
 *          sound.playAll();
 * 
 *          // Pauses the music with index "index", present in the audio div with id="audio"+index. 
 *          // For example, stopping music with index 2, represents stop the music present in the audio div with id="audio2"
 *          sound.pauseSound(index);
 * 
 *          // Pauses all songs
 *          sound.pauseAll();
 * 
 *          // Allows to play all songs in "arrayNext" array, after the song with index indexOnEnded has finished.
 *          sound.onEndedSound(indexOnEnded, arrayNext);
 * 
 *          // Allows to collect the value of the div with id="soundOff", in order to check if sounds are muted or not, in the arcade driving simulator.
 *          sound.getSoundOff();
 * 
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
    let sounds = [];
    
    /**
     * @function constructor
     * @description Constructor for the Sound widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent {String}: the HTML element where the display will be appended (default is "tog").</li>
     *          <li>mutedImg {String}: the location of the muted image (default is "widgets/car/configurations/img/muted.png").</li>
     *          <li>notMutedImg {String}: the location of the unmuted image (default is "widgets/car/configurations/img/notMuted.png").</li>
     *          <li>soundOff {Boolean}: the boolean value that indicates whether the sound state is "off", i.e. whether it is 'off' or not. It is used in the arcade driving simulator(default is null).</li>
     *          <li>songs {Array}: the array of objects with all the songs to use in the music player, containing information about the location of the audio file and whether it is to play in loop or not (default is [{url: "song/sound.mp3",loop: false},{url: "song/loop.mp3",loop: true}]).</li>
     * @returns {Sound} The created instance of the widget Sound.
     * @memberof module:Sound
     * @instance
     */
    function Sound(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent || "tog";
        opt.mutedImg = opt.mutedImg || "../../client/app/widgets/car/configurations/img/muted.png";
        opt.notMutedImg = opt.notMutedImg || "../../client/app/widgets/car/configurations/img/notMuted.png";
        opt.songs = opt.songs || {};
        opt.soundOff = opt.soundOff;
        this.numberSongs = (opt.songs) ? opt.songs.length : 0;
    
        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.soundOff = (opt.soundOff) ? opt.soundOff : null;

        this.mutedImg = (opt.mutedImg) ? opt.mutedImg : "../../client/app/widgets/car/configurations/img/muted.png";
        this.notMutedImg = (opt.notMutedImg) ? opt.notMutedImg : "../../client/app/widgets/car/configurations/img/notMuted.png";

        this.parent = (opt.parent) ? ("#" + opt.parent) : "tog";
       
        this.div = d3.select(this.parent)
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px");
        
        this.div.append("img").attr("id", "mute")
                            .attr("src", this.mutedImg)
                            .style("display","inline");
            
        this.div.append("img").attr("id", "unmute")
                              .attr("src", this.notMutedImg)
                              .style("display","none");

        if(this.soundOff!==null){
            this.div.append("p").attr("id", "soundOff")
                                .style("visibility","hidden")
                                .text(this.soundOff);
        }

        this.body = d3.select("body");
       
        if(this.numberSongs){
            for(let i=0;i<this.numberSongs;i++){
                if(opt.songs[i].loop){
                    if(opt.songs[i].url){
                        this.body.append("audio").attr("id", "audio"+i)
                                .attr("name", " ")
                                .attr("loop","")
                                .attr("src", opt.songs[i].url)
                                .text("Your browser does not support the <code>audio</code> element.");
                    }else{
                        this.body.append("audio").attr("id", "audio"+i)
                                .attr("name", " ")
                                .attr("loop","")
                                .attr("src", "../../client/app/widgets/car/configurations/song/loop.mp3") // Default url for loop audios
                                .text("Your browser does not support the <code>audio</code> element.");
                    }    
                }else {
                    if(opt.songs[i].url){
                        this.body.append("audio").attr("id", "audio"+i)
                                .attr("name", " ")
                                .attr("src", opt.songs[i].url)
                                .text("Your browser does not support the <code>audio</code> element.");
                    }else{
                        this.body.append("audio").attr("id", "audio"+i)
                                .attr("name", " ")
                                .attr("src", "../../client/app/widgets/car/configurations/song/sound.mp3") // Default url for non loop audios
                                .text("Your browser does not support the <code>audio</code> element.");
                    }    
                }
                sounds[i] = document.getElementById('audio'+i);
            }
        } else { 
            this.body.append("audio").attr("id", "audio0")
                    .attr("name", " ")
                    .attr("loop","")
                    .attr("src", "../../client/app/widgets/car/configurations/song/loop.mp3") // Default url for loop audios
                    .text("Your browser does not support the <code>audio</code> element.");
            
            this.body.append("audio").attr("id", "audio1")
                    .attr("name", " ")
                    .attr("src", "../../client/app/widgets/car/configurations/song/sound.mp3") // Default url for non loop audios
                    .text("Your browser does not support the <code>audio</code> element.");
            
            sounds[0] = document.getElementById('audio0');
            sounds[1] = document.getElementById('audio1');
        }
      
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        document.getElementById('mute').addEventListener('click', function (e) {
            Sound.prototype.unmute();
        });

        document.getElementById('unmute').addEventListener('click', function (e) {
            Sound.prototype.mute();
        });

        Sound.prototype.pauseAll();

        Widget.call(this, id, coords, opt);
        return this;
    }

    Sound.prototype = Object.create(Widget.prototype);
    Sound.prototype.constructor = Sound;
    Sound.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description Hide method of the Sound widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.hide = function () {
        return this.div.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @description Reveal method of the Sound widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.reveal = function () {
        return this.div.style("visibility", "visible");
    };

    /**
     * @function show
     * @description Show method of the Sound widget. This method displays the current main div as it is.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.show = function () {
        return this.div;
    };

  
    /**
     * @function onEndedSound
     * @description OnEndedSound method of the Sound widget. This method plays several known sounds, given by the index parameter.
     * @param indexOnEnded {Int} This parameter is the index of the song that will end, given by the "onended" event.
     * @param arrayNext {Array} This parameter is an array of objects, indexPlayNext and newVolume, which allows to play and set volume of several sounds after "indexOnEnded" sound ended.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.onEndedSound = function (indexOnEnded, arrayNext) {
        let a;
        sounds[indexOnEnded].onended = function() {
            for(a=0;a<arrayNext.length;a++){
                sounds[arrayNext[a].indexPlayNext].play();
                sounds[arrayNext[a].indexPlayNext].volume = arrayNext[a].newVolume;
            }
        };
      
        return this;
    };

     /**
     * @function playSound
     * @description PlaySound method of the Sound widget. This method plays a specific known sound, given by index parameter.
     * @param index {Int} This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.playSound = function (index) {
        sounds[index].play();
        return this;
    };

    /**
     * @function pauseSound
     * @description PauseSound method of the Sound widget. This method pauses a specific known sound, given by index parameter.
     * @param index {Int} This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.pauseSound = function (index) {
        sounds[index].pause();
        return this;
    };

    /**
     * @function playAll
     * @description PlayAll method of the Sound widget. This method plays all known sounds.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.playAll = function () {
        let s = sounds.length;
        for(let i=0; i<s; i++) {
            sounds[i].play();
        }
        return this;
    };

    /**
     * @function pauseAll
     * @description PauseAll method of the Sound widget. This method pauses all known sounds playing.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.pauseAll = function () {
        let s = sounds.length;
        for(let i=0; i<s; i++) {
            sounds[i].pause();
        }
        return this;
    };

    /**
     * @function setVolume
     * @description SetVolume method of the Sound widget. This method changes the volume of a specific known sound, given by index parameter.
     * @param newVolume {Float} This parameter is the new volume to be set to all known sounds.
     * @param index {Int} This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.setVolume = function (newVolume, index) {
        sounds[index].volume = newVolume;
        return this;
    };

    /**
     * @function setVolumeAll
     * @description SetVolumeAll method of the Sound widget. This method changes the volume of all known sounds.
     * @param newVolume {Float} This parameter is the new volume to be set to all known sounds.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.setVolumeAll = function (newVolume) {
        let s = sounds.length;
        for(let i=0; i<s; i++) {
            sounds[i].volume = newVolume;
        }
        return this;
    };

    /**
     * @function mute
     * @description Mute method of the Sound widget. This method changes the displayed image and pauses all sounds known.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.mute = function () {
        if(this.soundOff!==null){
            this.soundOffDiv = d3.select("#soundOff");
            this.soundOffDiv.text("true");
        }
        this.muteDiv   = d3.select("#mute");
        this.unmuteDiv = d3.select("#unmute");
        this.muteDiv.style("display", "inline");
        this.unmuteDiv.style("display", "none");
        this.pauseAll();
        return this;
    };

    /**
     * @function unmute
     * @description Unmute method of the Sound widget. This method changes the displayed image and plays all sounds known.
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.unmute = function () {
        if(this.soundOff!==null){
            this.soundOffDiv = d3.select("#soundOff");
            this.soundOffDiv.text("false");
        }
        this.muteDiv   = d3.select("#mute");
        this.unmuteDiv = d3.select("#unmute");
        this.muteDiv.style("display", "none");
        this.unmuteDiv.style("display", "inline");
        this.playAll();
        return this;
    };

    /**
     * @function getSoundOff
     * @description GetSoundOff method of the Sound widget. This method returns the value of div with id="soundOff".
     * @memberof module:Sound
     * @returns {Sound} The created instance of the widget Sound.
     * @instance
     */
    Sound.prototype.getSoundOff = function () {
        if(this.soundOff!==null){
            this.soundOffDiv = d3.select("#soundOff");
            return(JSON.parse(this.soundOffDiv[0][0].innerHTML));
        }
        return this;
    };

    /**
     * @function render
     * @description Render method of the Sound widget. 
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.render = function () {
        return this.reveal();
    };

    module.exports = Sound;
});
