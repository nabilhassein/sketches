function setup() {
    var size = 800;

    createCanvas(size, size);
    background(255);
    noSmooth();
    stroke(0);

    var numSquares = 20;
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
}

function draw() {
    
}
