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

var squares = [];

function map(n, a, b, _a, _b) {
  var d = b - a;
  var _d = _b - _a;
  var u = _d / d;
  return _a + (n - a) * u;
}


function setup() {
    for (var s = 0; s < cw; s += 10) {
        var square = new SquigglySquare(s);
        squares.push(square);
    }
}


function draw() {
    requestId = window.requestAnimationFrame(draw);

    ctx.fillRect(0, 0, cw, ch);
    noiseDetail(2, .5);

    for (var i = 0; i < squares.length; i++) {
        squares[i].phi += 1 / 30;
        squares[i].draw();
    }
}

function SquigglySquare(len) {
    var amplitude = 5;
    var frequency = .02;
    var rad = Math.PI / 180;

    this.x = (cw - len)/2;
    this.y = (ch - len)/2;

    this.xoff = Math.random() * 10000;
    this.Xoff = this.xoff;
    this.phi = Math.random() * 10000;

    function squigglyHorizontal(height, xstart, xend) {
        ctx.beginPath();
        this.xoff = this.Xoff;

        ctx.moveTo(xstart, height);

        for (var x = xstart; x < xend; x++) {
            if (x > cw / 3 && x < 2 * cw / 3) {
                var k = map(x, cw / 3, 2 * cw / 3, 0, 180);
            } else {
                k = 0;
            }

            var y = -Math.abs(Math.sin((x + noise(this.xoff) * 100) * frequency + this.phi) * (amplitude + Math.sin(k * rad) * 50)) + this.y;

            ctx.lineTo(x, y);

            this.xoff += 0.05;
        }

        ctx.lineTo(xend, height);

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    this.draw = function() {
        var x = this.x;
        var y = this.y;
        squigglyHorizontal(y, x - len, x + len);
        // squigglyHorizontal(y + len, x - len, x + len);
        // ctx.beginPath();

        // this.xoff = this.Xoff; // reset xoff;

        // var x = this.x;
        // var y = -Math.abs(Math.sin((x + noise(this.xoff) * 100) * frequency + this.phi) * amplitude) + this.y;

        // ctx.moveTo(x, y);
        // ctx.lineTo(x, y+len);
        // ctx.stroke();

        // ctx.moveTo(x, y);
        // ctx.lineTo(x+len, y);
        // ctx.stroke();

        // ctx.moveTo(x+len, y);
        // ctx.lineTo(x+len, y+len);
        // ctx.stroke();
        
        // ctx.moveTo(x, y+len);
        // ctx.lineTo(x+len, y+len);
        // ctx.stroke();
    }
}

requestId = window.requestAnimationFrame(draw);
