var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("/.modules/Predator.js");
var Joker = require("/.modules/Joker.js");
var Zeus = require("/.modules/Zeus.js");
let random = require("./modules/random.js");

var zeusArr = [];
var jokerArr = [];
var predatorArr = [];
var grassArr = [];
var grassEaterArr = [];
matrix = [];

grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
jokerHashiv = 0;
zeusHashiv = 0;


function matrixGenerator(matrixSize, grass, grassEater, predator, joker, zeus) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < joker; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < zeus; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 1, 1);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3){
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            } else if(matrix[y][x] == 4){
                var joker = new Joker(x, y);
                jokerArr.push(joker);
                jokerHashiv++;
            } else if(matirx[y][x] == 5){
                var zeus = new Zeus(x, y);
                zeusArr.push(zeus);
                zeusHashiv++;
            }
        }
    }
}
    creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].die();
        }
    }
    if(predatorArr[0] !== undefined){
        for (var i in predatorArr){
            predatorArr[i].move();
            predatorArr[i].eat();
            predatorArr[i].mul();
            predatorArr[i].die();
        }
    }
    if(jokerArr[0] !== undefined){
        for(var i in jokerArr){
            jokerArr[i].move();
            jokerArr[i].eat();
            jokerArr[i].mul();
            jokerArr[i].die();
        }
    }
    if(zeusArr[0] !== undefined){
        for(var i in zeusArr){
            zeusArr[i].move();
            zeusArr[i].eat();
            zeusArr[i].mul();
            zeusArr[i].die();
        }
    }
    
    //! Object to send
        let sendData = {
            matrix: matrix,
            grassCounter: grassHashiv,
            grassEaterCounter: grassEaterHashiv,
            predatorCounter: predatorHashiv,
            jokerCounter: jokerHashiv,
            zeusCounter: zeusHashiv
        }
    
        //! Send data over the socket to clients who listens "data"
        io.sockets.emit("data", sendData);
    }
    
    
    