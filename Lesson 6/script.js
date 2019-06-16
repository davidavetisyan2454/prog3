let matrix = [];                    // Մատրիցի ստեղծում
let rows = 20;                     // Տողերի քանակ
let columns = 20;                  // Սյուների քանակ

for (let y = 0; y < rows; y++) {
    matrix[y] = [];                 // Մատրիցի նոր տողի ստեղծում
for (let x = 0; x < columns; x++) {
    let a = Math.floor(Math.random() * 100);

if (a >= 0 && a < 20) {
    matrix[y][x] = 0;               // Մատրիցի 20 տոկոսը կլինի 0
}
if (a >= 20 && a < 40) {
    matrix[y][x] = 1;               // Մատրիցի 20 տոկոսը կլինի 1
}
else if (a >= 40 && a < 50) {
    matrix[y][x] = 2;               // Մատրիցի 10 տոկոսը կլինի 2
}
else if (a >= 50 && a < 70) {
    matrix[y][x] = 3;               // Մատրիցի 20 տոկոսը կլինի 3
}
else if (a >= 70 && a < 90) {
    matrix[y][x] = 4;               // Մատրիցի 20 տոկոսը կլինի 4
}
else if (a >= 90 && a < 100) {
    matrix[y][x] = 5;               // Մատրիցի 10 տոկոսը կլինի 5
}
    }
}


var zeusArr = [];
var jokerArr = [];
var predatorArr = [];
var grassArr = [];
var grassEaterArr = [];
var side = 40;


function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);
                
            }
            else if(matrix[y][x] == 3){
                var st = new Predator(x,y,3);
                predatorArr.push(st);
            }
            else if (matrix[y][x] == 4){
            	var jb = new Joker(x,y,4);
            	jokerArr.push(jb);
            }
            else if (matrix[y][x] == 5){
            	var pj = new Zeus(x,y,5);
            	zeusArr.push(pj);
            }
        }
    }
 
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3){
                fill("red");
                rect(x * side,y * side,side,side);
            }
            else if (matrix[y][x] == 4){
            	fill("#AC4ACD");
            	rect(x * side, y * side,side,side);
            }
            else if(matrix[y][x] == 5){
            	fill("#5858FA");
            	rect(x * side,y *side,side,side);
            }
        }
    }

    
    for (var i in grassArr) {
        grassArr[i].mul();
    }
     for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }
     for (var i in predatorArr){
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mull();
        predatorArr[i].die();
     }
     for(var i in jokerArr){
     	jokerArr[i].move();
     	jokerArr[i].eat();
     	jokerArr[i].mull();
     	jokerArr[i].die();
     }
     for(var i in zeusArr){
        zeusArr[i].move();
        zeusArr[i].eat();
        zeusArr[i].mull();
        zeusArr[i].die();

     }
}

