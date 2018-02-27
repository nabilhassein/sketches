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
var squares = [];

var len = 10;


function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + (n - a) * u;
}


function setup() {

    for (var x = 64; x < cw; x += 16) {
        for (var y = 64; y < ch; y += 16) {
            var square = new SquigglySquare(x, y, len);
            squares.push(square);
            len += 10;
        }
    }
}


function draw() {
    ctx.fillRect(0, 0, cw, ch);

    noiseDetail(2, .5);

    for (var i = 0; i < squares.length; i++) {
        squares[i].phi += 1 / 30;
        squares[i].draw(i);
    }
}

function SquigglySquare(x, y, len) {
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

        if (x > cw / 3 && x < 2 * cw / 3) {
            var k = map(x, cw / 3, 2 * cw / 3, 0, 180);
        } else {
            k = 0;
        }

        var y = -Math.abs(Math.sin((x + noise(this.xoff) * 100) * frequency + this.phi) * (amplitude + Math.sin(k * rad) * 50)) + this.y;

        ctx.lineTo(x, y);

        this.xoff += increment;

        ctx.lineTo(x + len, y + len);
        ctx.lineTo(cw + 2, ch + 2);
        // ctx.lineTo(-2, ch + 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

