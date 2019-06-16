//______________________GRASS_____________________________

class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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

    //yntruma shrjaka 8 vandakner
    chooseCell(character,character1) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    // bazmanuma azat vandakneri himan vra
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0,5));
        console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}



//_____________________GRASS EATER____________________________




class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    //vorpes method
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
 chooseCell(character,character1) {
            this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || character1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found ;
    }

    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }

     
    eat() {
   

        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }
    }
      mul() {
        
        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }

    die() {
        if(this.energy <= 0){
            matrix[this.y][this.x] = 0;
                for(var i in grassEaterArr){
                    if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
                        grassEaterArr.splice(i,1);
                        break;
                }
            }
        }
    }
}



//_________________________PREDATOR_____________________________



class Predator{
   constructor(x, y, index) {
        this.x = x;
        this.y = y;
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

       chooseCell(character,character1) {
            this.getNewCoordinates();
        var search = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || character1) {
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



//______________________JOKER______________________________



 class Joker{
 	constructor(x,y,index){
 		this.x = x;
 		this.y = y;
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
            [this.x + 1, this.y + 1],
           
        ];
    }

       chooseCell(character,character1) {
            this.getNewCoordinates();
        var find = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    find.push(this.directions[i]);
                }
                if(matrix[y][x] == character1){
                    find.push(this.directions[i]);
                }
            }
        }
        return find;
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


//___________________________ZEUS____________________________




class Zeus {
	constructor(x,y,index){
		this.x = x;
		this.y = y;
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

     chooseCell(character,character1) {
            this.getNewCoordinates();
        var hunt = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character ) {
                    hunt.push(this.directions[i]);
                }
                if(matrix[y][x] == character1){
                    hunt.push(this.directions[i]);
                }
            }
        }
        return hunt;
    }

    move() {

        var iCell = random(this.chooseCell(2,4));

        if (iCell) {
            var ThisY = iCell[0];
            var ThisX = iCell[1];

            matrix[this.y][this.x] = 0;
            matrix[ThisY][ThisX] = this.index;


            this.y = ThisY;
            this.x = ThisX;
            this.energy--;

        }

    }



     eat() {
   
        var iCell = random(this.chooseCell(2,3));

        if (iCell) {
            var thisX = iCell[0];
            var thisY = iCell[1];

            matrix[this.y][this.x] = 0;
            matrix[thisY][thisX] = this.index;

            for (var i in grassEaterArr) {
                if (thisX == grassEaterArr[i].x && thisY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        
            for(var i in predatorArr){
                if(thisX == predatorArr[i].x && thisY == predatorArr[i].y){
                    predatorArr.splice(i,1);
                    break;
                }
            }

            this.y = thisY;
            this.x = thisX;
            this.energy += 2;
        }

    }



     mull() {
        
        var iCell = random(this.chooseCell(0));

        if (this.energy >= 8 && iCell) {
            var nZeus = new Zeus(iCell[0], iCell[1], this.index);
                zeusArr.push(nZeus);
            matrix[iCell[1]][iCell[0]] = this.index;
            this.energy = 5;
        }
    }

     die() {
        if(this.energy <= 0){
            matrix[this.y][this.x] = 0;
                for(var i in zeusArr){
                    if(this.x == zeusArr[i].x && this.y == zeusArr[i].y){
                        zeusArr.splice(i,1);
                        break;
                }
            }
        }
    } 
}
