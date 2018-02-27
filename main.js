var lines = [];

/*
p5 noise applied to an imitation of vera molnar's work; cribbed from:
https://codepen.io/enxaneta/pen/7e315d161a8ee073ded48ab5d1669290
*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 600;
var ch = canvas.height = 600;
ctx.lineJoin = "round";
ctx.strokeStyle = "#fff";
ctx.fillStyle = "rgba(0,0,0,1)";

var increment = 0.05;
var lines = [];


function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + (n - a) * u;
}


function setup() {
    for (var x = 60; x < cw; x += 16) {
        for (var y = 60; y < ch; y += 16) {
            var line = new SquigglyLine(x, y);
            lines.push(line);
        }
    }
}


function draw() {
    var size = 800;
    var numSquares = 30;
    var center = size/2;
    var step = size / (numSquares*4);

    for (var i = 1; i <= numSquares; i++) {
        var p1 = center + i*step;
        var p2 = center - i*step;

        line(p2, p2, p1, p2);
        line(p1, p2, p1, p1);
        line(p1, p1, p2, p1);
        line(p2, p1, p2, p2);
    }
    
    ctx.fillRect(0, 0, cw, ch);

    noiseDetail(2, .5);

    for (var i = 0; i < lines.length; i++) {
        lines[i].phi += 1 / 30;
        lines[i].draw(i);
    }
}

function SquigglyLine(x, y) {
    var amplitude = 5;
    var frequency = .02;
    var rad = Math.PI / 180;

    this.x = x;
    this.y = y;
    this.xoff = Math.random() * 10000;
    this.Xoff = this.xoff;
    this.phi = Math.random() * 10000;
    this.draw = function(i) {
        ctx.beginPath();

        this.xoff = this.Xoff; // reset xoff;

//        for (var x = -2; x < cw + 2; x++) {
            if (x > cw / 3 && x < 2 * cw / 3) {
                var k = map(x, cw / 3, 2 * cw / 3, 0, 180);
            } else {
                k = 0;
            }

            var y = -Math.abs(Math.sin((x + noise(this.xoff) * 100) * frequency + this.phi) * (amplitude + Math.sin(k * rad) * 50)) + this.y;

            ctx.lineTo(x, y);

            this.xoff += increment;

//        }
        ctx.lineTo(cw + 2, ch + 2);
        ctx.lineTo(-2, ch + 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

