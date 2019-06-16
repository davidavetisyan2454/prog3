var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Predator extends LiveForm {
	constructor(x, y){
		super(x, y);
		this.multiply = 0;
		this.index = index;
		this.energy = 8;
	}
	getNewCoordinates() {
		this.directions = [
			[this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
		];
	}
	chooseCell(characeter) {
		this.getNewCoordinates();
		return super.chooseCell(character);
	var search = [];
	for(var i in this.directions){
		var x = this.directions[i][0];
		var y = this.directions[i][1];
		if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
			if(matrix[y][x] == character || character1){
				search.push(this.directions[i]);
				}
			}
		}
		return search;
	}
	 move() {

        var newchooseCell = random(this.chooseCell(2,1));

        if (newchooseCell) {
            var forY = newchooseCell[0];
            var forX = newchooseCell[1];

            matrix[this.y][this.x] = 0;
            matrix[forY][forX] = this.index;


            this.y = forY;
            this.x = forX;
            this.energy--;

        }

    }

    eat() {
   

        var newchooseCell = random(this.chooseCell(1,4));

        if (newchooseCell) {
            var forX = newchooseCell[0];
            var forY = newchooseCell[1];

            matrix[this.y][this.x] = 0;
            matrix[forY][forX] =this.index;

            for (var i in grassEaterArr) {
                if (forX == grassEaterArr[i].x && forY == grassEaterArr[i].y) {
                   grassEaterArr.splice(i, 1);
                    break;
                }
            }

            for(var i in grassArr){
                if(forX == grassArr[i].x && forY == grassArr[i].y){
                    grassArr.splice(i,1);
                    break;
                }
            }

            this.y = forY;
            this.x = forX;
            this.energy += 2;

        }
    }

    mull() {
        
        var newchooseCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newchooseCell) {
            var newPredator = new Predator(newchooseCell[0], newchooseCell[1], this.index);
            predatorArr.push(newPredator);
            matrix[newchooseCell[1]][newchooseCell[0]] = this.index;
            this.energy = 5;
        }
    }

    die() {
        if(this.energy <= 0){
            matrix[this.y][this.x] = 0;
                for(var i in predatorArr){
                    if(this.x == predatorArr[i].x && this.y == predatorArr[i].y){
                        predatorArr.splice(i,1);
                        break;
                }
            }
        }
    }
}