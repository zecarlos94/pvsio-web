/**
 * @module FileSystemArcade
 * @version 1.0.0
 * @author José Carlos
 * @desc This module helps you to create and read local files with all configurations required for the arcade simulator. 
 *
 * @date Apr 04, 2018
 *
 * @example <caption>Usage of FileSystemArcade within a PVSio-web demo.</caption>
 * define(function (require, exports, module) {
 *     "use strict";
 *
 *     // Require the FileSystemArcade module
 *     require("widgets/car/FileSystemArcade");
 *
 *     function main() {
 *          // After FileSystemArcade module was loaded, initialize it
 *          let fs = new FileSystemArcade(
 *               'example', // id of the gauge element that will be created
 *               { top: 100, left: 100, width: 300, height: 300 }, // coordinates object
 *               { parent: 'FS' } // options
 *           );
 *
 *          // Render the FileSystemArcade widget
 *          fs.render();
 *     }
 * });
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/

define(function (require, exports, module) {
    "use strict";

    let Widget = require("widgets/Widget"),
        ButtonActionsQueue = require("widgets/ButtonActionsQueue").getInstance();/*,
        FileSystem = require("filesystem/FileSystem").getInstance();*/
    
    // let projectManager = require("project/ProjectManager").getInstance();

    let streamSaver = require('widgets/car/configurations/StreamSaver');

    /**
     * @function constructor
     * @description Constructor for the FileSystemArcade widget.
     * @param id {String} The id of the widget instance.
     * @param coords {Object} The four coordinates (top, left, width, height) of the display, specifying
     *        the left, top corner, and the width and height of the (rectangular) display.
     *        Default is { top: 0, left: 0, width: 250, height: 250 }.
     * @param opt {Object} Options:
     *          <li>parent (String): the HTML element where the display will be appended (default is "FS").</li>
     * An example of usage of this configuration is with an hour pointer in a clock - The minimum value is 0,
     * the maximum value is 24, but the pointer completes 2 laps between min and max values.</li>
     * @returns {FileSystemArcade} The created instance of the widget FileSystemArcade.
     * @memberof module:FileSystemArcade
     * @instance
     */
    function FileSystemArcade(id, coords, opt) {
        opt = opt || {};
        opt.opacity = opt.opacity || 1;
        coords = coords || {};

        this.id = id;
        this.top = coords.top || 0;
        this.left = coords.left || 0;
        this.width = coords.width || 250;
        this.height = coords.height || 250;

        this.parent = (opt.parent) ? ("#" + opt.parent) : "FS";
        this.div = d3.select(this.parent)
                        .append("div").attr("id", id)
                        .style("position", "absolute")
                        .style("top", this.top + "px").style("left", this.left + "px")
                        .style("opacity", opt.opacity)
                        .style("display", "none");

        /*fs.readFile("configurations/track.json").then(function (res) {
            var data = res.content;
            if (data) { 
                console.log(data);
            }
        });*/

        // // Perform operations on the current project
        // projectManager.project() // this is the current project
        //   .addFile("trackFile.json", "file content...", { overWrite: true }).then(function (res) {
        //     //file added successfully, res is the file descriptor
        //     console.log(res);
        // }).catch(function (err) {
        //     //operation failed, err shows the error details
        //     console.log(JSON.stringify(err));
        // });  

        // console.log(projectManager.project());
        // console.log(projectManager.project().getWidgetDefinitionFile().content);

        // https://www.javascripture.com/File
        // var file = new File(['foo', 'bar'], 'foobar.txt');

        // console.log('size=' + file.size);
        // console.log('type=' + file.type);
        // console.log('name=' + file.name);

        // var testEndings = function(string, endings) {
        // var file = new File([string], { type: 'plain/text',
        //                                 endings: endings });
        // var reader = new FileReader();
        // reader.onload = function(event){
        //     console.log(endings + ' of ' + JSON.stringify(string) + 
        //                 ' => ' + JSON.stringify(reader.result));
        // };
        // reader.readAsText(file);
        // };

        // testEndings('foo\nbar',   'native');
        // testEndings('foo\r\nbar', 'native');
        // testEndings('foo\nbar',   'transparent');
        // testEndings('foo\r\nbar', 'transparent');

        // https://github.com/jimmywarting/StreamSaver.js 
        // WORKS!!!
        // const fileStream = streamSaver.createWriteStream('trackFile.json');
        // const writer = fileStream.getWriter();
        // const encoder = new TextEncoder();
        // let data = JSON.stringify({ "name":"John", "age":30, "car":null });
        // let uint8array = encoder.encode(data + "\n\n");

        // writer.write(uint8array);
        // writer.close();

        opt.callback = opt.callback || function () {};
        this.callback = opt.callback;

        Widget.call(this, id, coords, opt);
        return this;
    }

    FileSystemArcade.prototype = Object.create(Widget.prototype);
    FileSystemArcade.prototype.constructor = FileSystemArcade;
    FileSystemArcade.prototype.parentClass = Widget.prototype;

    /**
     * @function hide
     * @description hide method of the FileSystemArcade widget. This method changes parent div display to none.
     * @memberof module:FileSystemArcade
     * @instance
     */
    FileSystemArcade.prototype.hide = function () {
        return this.div.style("display", "none");
    };

    /**
     * @function reveal
     * @description reveal method of the FileSystemArcade widget. This method changes parent div display to block.
     * @memberof module:FileSystemArcade
     * @instance
     */
    FileSystemArcade.prototype.reveal = function () {
        return this.div.style("display", "block");
    };

    /**
     * @function render
     * @description Render method of the FileSystemArcade widget.
     * @memberof module:FileSystemArcade
     * @instance
     */
    FileSystemArcade.prototype.render = function() {
        return this.reveal();
    };

    module.exports = FileSystemArcade;
});
