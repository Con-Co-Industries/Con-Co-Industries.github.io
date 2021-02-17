var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var trees = [];
        var mountains = [];
        
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'navy');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i = 0; i < 100; i++) {
                circle = draw.circle (1, 'white', 'LightGray', 2);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            
            var star;
            for(var i = 0; i < 100; i++) {
                star = draw.bitmap('img/star.png');
                star.x = canvasWidth*Math.random();
                star.y = groundY*Math.random() - 50;
                star.scaleX = .25;
                star.scaleY = .25;
                background.addChild(star);
            }
            
            var moon = draw.bitmap('img/majoraMoon.png');
            moon.x = canvasWidth - 143;
            moon.y = 25;
            moon.scaleX = .5;
            moon.scaleY = .5;
            background.addChild(moon);

            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<7;++i) {
                var mountain1 = draw.bitmap('img/mountatin483x224.png');
                var size = (Math.random()*.75) + 1.25;
                mountain1.x = i*400;
                mountain1.y = groundY- (224 * size);
                mountain1.scaleX = size;
                mountain1.scaleY = size;
                background.addChild(mountain1);
                mountains.push(mountain1);
            }          
                        
            
            
            
            // TODO 4: Part 1 - Add a tree
            for(var i=0;i<11;++i) {
                var tree = draw.bitmap('img/terrariaTree1180x850.png');
                tree.x = i*200;
                tree.y = groundY-190;
                tree.scaleX = .25;
                tree.scaleY = .25;
                background.addChild(tree);
                trees.push(tree);
            }
            
            
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            for (var i = 0; i < trees.length; i++) {
                var eachTree = trees[i];
                eachTree.x = eachTree.x -3;
                if (eachTree.x <-360) {
                    eachTree.x = canvasWidth;
                }
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < mountains.length; i++) {
                var eachElement = mountains[i];
                eachElement.x = eachElement.x - .5;
                if (eachElement.x < -866) {
                    eachElement.x = canvasWidth;
                }
            }
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
