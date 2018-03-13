/**
 * @module Sound
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator using
 * a virtual keypad suitable for mobile devices.
 *
 * @date Mar 10, 2018
 *
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
 *          let Sound = new Sound(
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
 *          Sound.render();
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
    let muteDiv, unmuteDiv;
    let mainDiv;
    
    /**
     * @function constructor
     * @description Constructor for the Sound widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "tog").</li>
     *          <li>mutedImg (String): the location of the muted image (default is "img/muted.png").</li>
     *          <li>notMutedImg (String): the location of the unmuted image (default is "img/notMuted.png").</li>
     *          <li>loopSong (String): the location of the sound to be played in a loop (default is "song/loop.mp3").</li>
     *          <li>song (String): the location of the sound to be played normally (default is "song/sound.mp3").</li>
     * @returns {Sound} The created instance of the widget Sound.
     * @memberof module:Sound
     * @instance
     */
    function Sound(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent || "tog";
        opt.mutedImg = opt.mutedImg || "img/muted.png";
        opt.notMutedImg = opt.notMutedImg || "img/notMuted.png";
        opt.songs = opt.songs || {};
        this.numberSongs = (opt.songs) ? opt.songs.length : 0;
    
        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.mutedImg = (opt.mutedImg) ? opt.mutedImg : "img/muted.png";
        this.notMutedImg = (opt.notMutedImg) ? opt.notMutedImg : "img/notMuted.png";

        this.parent = (opt.parent) ? ("#" + opt.parent) : "tog";
       
        this.div = d3.select(this.parent)
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px");
        
        mainDiv = this.div;

        muteDiv = this.div.append("img").attr("id", "mute")
                            .attr("src", this.mutedImg)
                            .style("display","none");
        
        unmuteDiv = this.div.append("img").attr("id", "unmute")
                              .attr("src", this.notMutedImg)
                              .style("display","inline");

        this.body = d3.select("body");

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
                             .attr("src", "song/loop.mp3") // Default url for loop audios
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
                             .attr("loop","")
                             .attr("src", "song/sound.mp3") // Default url for non loop audios
                             .text("Your browser does not support the <code>audio</code> element.");
                }    
            }
            sounds[i] = document.getElementById('audio'+i);
        }

        // console.log(sounds);
      
        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        document.getElementById('mute').addEventListener('click', function (e) {
            Sound.prototype.unmute();
        });

        document.getElementById('unmute').addEventListener('click', function (e) {
            Sound.prototype.mute();
        });

        Sound.prototype.playAll();

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
    Sound.prototype.hide = () => {
        return mainDiv.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @description Reveal method of the Sound widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.reveal = () => {
        return mainDiv.style("visibility", "visible");
    };

    /**
     * @function show
     * @description Show method of the Sound widget. This method displays the current main div as it is.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.show = () => {
        return mainDiv;
    };

     /**
     * @function playSound
     * @description PlaySound method of the Sound widget. This method plays a specific known sound, given by index parameter.
     * @param index (Integer) This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.playSound = (index) => {
        return sounds[index].play();
    };

    /**
     * @function pauseSound
     * @description PauseSound method of the Sound widget. This method pauses a specific known sound, given by index parameter.
     * @param index (Integer) This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.pauseSound = (index) => {
        return sounds[index].pause();
    };

    /**
     * @function playAll
     * @description PlayAll method of the Sound widget. This method plays all known sounds.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.playAll = () => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].play();
        return ;
    };

    /**
     * @function pauseAll
     * @description PauseAll method of the Sound widget. This method pauses all known sounds playing.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.pauseAll = () => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].pause();
        return ;
    };

    /**
     * @function setVolumeAll
     * @description SetVolumeAll method of the Sound widget. This method changes the volume of a specific known sound, given by index parameter.
     * @param newVolume (Float) This parameter is the new volume to be set to all known sounds.
     * @param index (Integer) This parameter is the index of the intended sound to be changed.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.setVolume = (newVolume, index) => {
        return sounds[index].volume = newVolume;
    };

    /**
     * @function setVolumeAll
     * @description SetVolumeAll method of the Sound widget. This method changes the volume of all known sounds.
     * @param newVolume (Float) This parameter is the new volume to be set to all known sounds.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.setVolumeAll = (newVolume) => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].volume = newVolume;
        return ;
    };

    /**
     * @function mute
     * @description Mute method of the Sound widget. This method changes the displayed image and pauses all sounds known.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.mute = () => {
        muteDiv.style("display", "inline");
        unmuteDiv.style("display", "none");
        Sound.prototype.pauseAll();
        return ;
    };

    /**
     * @function unmute
     * @description Unmute method of the Sound widget. This method changes the displayed image and plays all sounds known.
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.unmute = () => {
        muteDiv.style("display", "none");
        unmuteDiv.style("display", "inline");
        Sound.prototype.playAll();
        return ;
    };

    /**
     * @function render
     * @description Render method of the Sound widget. 
     * @memberof module:Sound
     * @instance
     */
    Sound.prototype.render = () => {
        return Sound.prototype.reveal();
    };

    module.exports = Sound;
});
