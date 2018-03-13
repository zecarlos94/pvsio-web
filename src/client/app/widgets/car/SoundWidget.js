/**
 * @module SoundWidget
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you playing the 2D, HTML5, arcade driving simulator using
 * a virtual keypad suitable for mobile devices.
 *
 * @date Mar 10, 2018
 *
 *
 * @example <caption>Usage of SoundWidget within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the SoundWidget module
 *     require("widgets/car/SoundWidget");
 *
 *     function main() {
 *          // After SoundWidget module was loaded, initialize it
 *          let SoundWidget = new SoundWidget(
 *               'example', // id of the SoundWidget element that will be created
 *               { top: 100, left: 700, width: 500, height: 500 }, // coordinates object
 *               { parent: 'tog', 
 *                 mutedImg: "img/muted.png", 
 *                 notMutedImg: "img/notMuted.png", 
 *                 loopSong: "song/loop.mp3", 
 *                 song: "song/sound.mp3" 
 *               } // append on div 'tog'
 *           );
 *          // Render the SoundWidget widget
 *          SoundWidget.render();
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
     * @description Constructor for the SoundWidget widget.
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
     * @returns {SoundWidget} The created instance of the widget SoundWidget.
     * @memberof module:SoundWidget
     * @instance
     */
    function SoundWidget(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent || "tog";
        opt.mutedImg = opt.mutedImg || "img/muted.png";
        opt.notMutedImg = opt.notMutedImg || "img/notMuted.png";

        opt.loopSong = opt.loopSong || "song/loop.mp3";
        opt.song = opt.song || "song/sound.mp3";

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.mutedImg = (opt.mutedImg) ? opt.mutedImg : "img/muted.png";
        this.notMutedImg = (opt.notMutedImg) ? opt.notMutedImg : "img/notMuted.png";

        this.loopSong = this.loopSong || "song/loop.mp3";
        this.song = this.song || "song/sound.mp3";

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
        this.body.append("audio").attr("id", "audio0")
                                 .attr("name", " ")
                                 .attr("loop","")
                                 .attr("src", this.loopSong)
                                 .text("Your browser does not support the <code>audio</code> element.");

        this.body.append("audio").attr("id", "audio1")
                                 .attr("name", " ")
                                 .attr("src", this.song)
                                 .text("Your browser does not support the <code>audio</code> element.");

        sounds[0] = document.getElementById('audio0');
        sounds[1] = document.getElementById('audio1');

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        document.getElementById('mute').addEventListener('click', function (e) {
            SoundWidget.prototype.unmute();
        });

        document.getElementById('unmute').addEventListener('click', function (e) {
            SoundWidget.prototype.mute();
        });

        SoundWidget.prototype.playAll();

        Widget.call(this, id, coords, opt);
        return this;
    }

    SoundWidget.prototype = Object.create(Widget.prototype);
    SoundWidget.prototype.constructor = SoundWidget;
    SoundWidget.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description Hide method of the SoundWidget widget. This method changes the current main div visibility to 'hidden'.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.hide = () => {
        return mainDiv.style("visibility", "hidden");
    };

    /**
     * @function reveal
     * @description Reveal method of the SoundWidget widget. This method changes the current main div visibility to 'visible'.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.reveal = () => {
        return mainDiv.style("visibility", "visible");
    };

    /**
     * @function show
     * @description Show method of the SoundWidget widget. This method displays the current main div as it is.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.show = () => {
        return mainDiv;
    };

     /**
     * @function playSound
     * @description PlaySound method of the SoundWidget widget. This method plays a specific known sound, given by index parameter.
     * @param index (Integer) This parameter is the index of the intended sound to be changed.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.playSound = (index) => {
        return sounds[index].play();
    };

    /**
     * @function pauseSound
     * @description PauseSound method of the SoundWidget widget. This method pauses a specific known sound, given by index parameter.
     * @param index (Integer) This parameter is the index of the intended sound to be changed.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.pauseSound = (index) => {
        return sounds[index].pause();
    };

    /**
     * @function playAll
     * @description PlayAll method of the SoundWidget widget. This method plays all known sounds.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.playAll = () => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].play();
        return ;
    };

    /**
     * @function pauseAll
     * @description PauseAll method of the SoundWidget widget. This method pauses all known sounds playing.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.pauseAll = () => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].pause();
        return ;
    };

    /**
     * @function setVolumeAll
     * @description SetVolumeAll method of the SoundWidget widget. This method changes the volume of a specific known sound, given by index parameter.
     * @param newVolume (Float) This parameter is the new volume to be set to all known sounds.
     * @param index (Integer) This parameter is the index of the intended sound to be changed.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.setVolume = (newVolume, index) => {
        return sounds[index].volume = newVolume;
    };

    /**
     * @function setVolumeAll
     * @description SetVolumeAll method of the SoundWidget widget. This method changes the volume of all known sounds.
     * @param newVolume (Float) This parameter is the new volume to be set to all known sounds.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.setVolumeAll = (newVolume) => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].volume = newVolume;
        return ;
    };

    /**
     * @function mute
     * @description Mute method of the SoundWidget widget. This method changes the displayed image and pauses all sounds known.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.mute = () => {
        muteDiv.style("display", "inline");
        unmuteDiv.style("display", "none");
        SoundWidget.prototype.pauseAll();
        return ;
    };

    /**
     * @function unmute
     * @description Unmute method of the SoundWidget widget. This method changes the displayed image and plays all sounds known.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.unmute = () => {
        muteDiv.style("display", "none");
        unmuteDiv.style("display", "inline");
        SoundWidget.prototype.playAll();
        return ;
    };

    /**
     * @function render
     * @description Render method of the SoundWidget widget. 
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.render = () => {
        return SoundWidget.prototype.reveal();
    };

    module.exports = SoundWidget;
});
