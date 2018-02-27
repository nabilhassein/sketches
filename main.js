var lines = [];

/*
p5 noise applied to an imitation of vera molnar's work; cribbed from:
https://codepen.io/enxaneta/pen/7e315d161a8ee073ded48ab5d1669290
*/

var squares = [];
var noisiness = 5;
var step = 10;

function setup() {
    createCanvas(800, 800);
    for (var s = 0; s < width; s += step) {
        var square = new SquigglySquare(s);
        squares.push(square);
    }
}


function draw() {
    background(0);
    noiseDetail(2, .5);

    for (var i = 0; i < squares.length; i++) {
        squares[i].draw();
    }
}

function SquigglySquare(len) {
    function squigglyHorizontal(column, xstart, xend) {
        noFill();
        stroke(255);
        beginShape();

        for (var x = xstart; x < xend; x++) {
            var y = column + noisiness*noise(x + Math.random(), frameCount);
            curveVertex(x, y);
        }

        endShape();
    }

    function squigglyVertical(row, ystart, yend) {
        noFill();
        stroke(255);
        beginShape();

        for (var y = ystart; y < yend; y++) {
            var x = row + noisiness*noise(y + Math.random(), frameCount);
            curveVertex(x, y);
        }

        endShape();
    }

    this.draw = function() {
        var x = width/2;
        var y = height/2;

        squigglyHorizontal(y - len, x - len, x + len + step/2);
        squigglyHorizontal(y + len, x - len, x + len + step/2);
        squigglyVertical(x - len, y - len, y + len + step/2);
        squigglyVertical(x + len, y - len, y + len + step/2);
    }
}
