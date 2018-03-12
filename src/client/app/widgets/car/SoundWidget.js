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
 *          var SoundWidget = new SoundWidget(
 *               'example', // id of the SoundWidget element that will be created
 *               { top: 800, left: 800, width: 500, height: 500 }, // coordinates object
 *               { parent: 'tog', 
 *                 mutedImg: "img/song/muted.png", 
 *                 notMutedImg: "img/song/notMuted.png", 
 *                 loopSong: "song/ferrari_idle.mp3", 
 *                 song: "song/other/racer.mp3" 
 *               } // append on div 'tog'
 *           );
 *          // Render the SoundWidget widget
 *          SoundWidget.render();
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    let Widget = require("widgets/Widget");
    let sounds = [];

    /**
     * @function constructor
     * @description Constructor for the SoundWidget widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 1000, left: 100, width: 500, height: 500 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "virtualKeyPad").</li>
     * @returns {SoundWidget} The created instance of the widget SoundWidget.
     * @memberof module:SoundWidget
     * @instance
     */
    function SoundWidget(id, coords, opt) {
        opt = opt || {};
        coords = coords || {};
        opt.parent = opt.parent || "tog";
        opt.mutedImg = opt.mutedImg || "img/song/muted.png";
        opt.notMutedImg = opt.notMutedImg || "img/song/notMuted.png";

        opt.loopSong = opt.loopSong || "song/ferrari_idle.mp3";
        opt.song = opt.song || "song/other/racer.mp3";

        this.id = id;
        this.top = coords.top || 1000;
        this.left = coords.left || 100;
        this.width = coords.width || 750;
        this.height = coords.height || 750;

        this.mutedImg = (opt.mutedImg) ? opt.mutedImg : "img/song/muted.png";
        this.notMutedImg = (opt.notMutedImg) ? opt.notMutedImg : "img/song/notMuted.png";

        this.loopSong = this.loopSong || "song/ferrari_idle.mp3";
        this.song = this.song || "song/other/racer.mp3";

        this.parent = (opt.parent) ? ("#" + opt.parent) : "tog";
       
        this.div = d3.select(this.parent)
                        .style("position", "absolute")
                        .style("top", this.top + "px")
                        .style("left", this.left + "px");
         
        this.div.append("img").attr("src", this.mutedImg)
                .style("display","none");
        
        this.div.append("img").attr("src", this.notMutedImg);

        this.body = d3.select("body");
        this.body.append("audio").attr("class", "audioIdle")
                                 .attr("name", " ")
                                 .attr("loop","")
                                 .attr("src", this.loopSong)
                                 .text("Your browser does not support the <code>audio</code> element.");

        this.body.append("audio").attr("class", "audio")
                                 .attr("name", " ")
                                 .attr("src", this.song)
                                 .text("Your browser does not support the <code>audio</code> element.");

        sounds.push = this.loopSong;
        sounds.push = this.song;

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    }

    SoundWidget.prototype = Object.create(Widget.prototype);
    SoundWidget.prototype.constructor = SoundWidget;
    SoundWidget.prototype.parentClass = Widget.prototype;

    SoundWidget.prototype.hide = () => {
        return this.div.style("visibility", "hidden");
    };

    SoundWidget.prototype.reveal = () => {
        return this.div.style("visibility", "visible");
    };

    SoundWidget.prototype.show = () => {
        return this.div;
    };

    SoundWidget.prototype.play = (index) => {
        return sounds[index].play();
    };

    SoundWidget.prototype.pause = (index) => {
        return sounds[index].pause();
    };

    SoundWidget.prototype.playAll = () => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].play();
        return ;
    };

    SoundWidget.prototype.pauseAll = () => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].pause();
        return ;
    };

    SoundWidget.prototype.setVolume = (newVolume, index) => {
        return sounds[index].volume = newVolume;
    };

    SoundWidget.prototype.setVolumeAll = (newVolume) => {
        let s = sounds.length;
        for(let i=0; i<s; i++)
            sounds[i].volume = newVolume;
        return ;
    };

    // implement toggle imgs if you want (each click switches imgs)
    // perhaps you may need to add event listeners here like
    // imgToggle = window.addEventListener("onclick", ( event ) => {
    //     console.log(event);
    // });
    SoundWidget.prototype.toggleImgs = () => {
        return ;
    };

    /**
     * @function render
     * @description Render method of the SoundWidget widget.
     * @memberof module:SoundWidget
     * @instance
     */
    SoundWidget.prototype.render = () => {
        return SoundWidget.prototype.pauseAll();
    };

    module.exports = SoundWidget;
});
