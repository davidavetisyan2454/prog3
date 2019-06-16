var LiveForm = require("./LiveForm");
var random = require("../random");

module.exports = class Joker extends LiveForm {
	constructor(x, y){
		super(x, y);
		this.multiply = 0;
		this.index = index;
		this.energy = 10;
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

        var forchooseCell = random(this.chooseCell(0));
       
        if (forchooseCell) {
           
            var andY = forchooseCell[0];
            var andX = forchooseCell[1];

            matrix[this.y][this.x] = 0;
            matrix[andY][andX] = this.index;


            this.y = andY;
            this.x = andX;
            this.energy--;

        }

    }


     eat() {
   

        var forchooseCell = random(this.chooseCell(1,5));

        if (forchooseCell) {
            var andX = forchooseCell[1];
            var andY = forchooseCell[0];

            matrix[this.y][this.x] = 0;
            matrix[andY][andX] = this.index;

            for (var i in predatorArr) {
                if (andX == predatorArr[i].x && andY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            for(var i in grassArr){
                if(andX == grassArr[i].x && andY == grassArr[i].y){
                    grassArr.splice(i,1);
                    break;
                }
            }

            this.y = andY;
            this.x = andX;
            this.energy += 2;

        }
    }

    
    mull() {
        
        var forchooseCell = random(this.chooseCell(0));

        if (this.energy >= 10 && forchooseCell) {
            var newJoker = new Joker(forchooseCell[0], forchooseCell[1], this.index);
            jokerArr.push(newJoker);
            matrix[forchooseCell[1]][forchooseCell[0]] = this.index;
            this.energy = 8;
        }
    }

    die() {
        if(this.energy <= 0){
            matrix[this.y][this.x] = 0;
                for(var i in jokerArr){
                    if(this.x == jokerArr[i].x && this.y == jokerArr[i].y){
                        jokerArr.splice(i,1);
                        break;
                }
            }
        }
    }

}
