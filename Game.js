function Game(){}

Game.prototype.init = function(canvasWidth, canvasHeight, imageManager, soundManager){
	// Framework init
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.drawables = [];
	this.imageManager = imageManager;
	this.soundManager = soundManager;
	this.createNewGame();
	
}

Game.prototype.createNewGame = function() {
	// Default Const Setting
	this.oriBrickHeight = this.canvasHeight/8;
	this.oriBrickSpeed = this.canvasHeight/120;
	this.oriNewBrickCountDown = 25;
	this.oriLevel = 1;
	this.oriScore = 0;

	// Factors
	this.brickHeightChangeFactor = 0.96;
	this.brickSpeedChangeFactor = 1.05;
	this.newBrickCountDownChangeFactor = 0.95;
	this.leveGap = 6;

	// Game variables
	this.slideBarHeight = this.canvasHeight/8;
	this.slideBar = new SlideBar(this.canvasWidth, this.canvasHeight, this.slideBarHeight);
	this.gameOverScence = new GameOverScence(this.canvasWidth, this.canvasHeight);
	this.deadLine = this.canvasHeight - this.slideBarHeight;
	this.swiping = false;
	this.accuracyCriteria = this.canvasWidth/12;
	this.brickFromLeft = true;

	// Game variables
	this.score = this.oriScore;
	this.currentLevel = this.oriLevel;
	this.setDifficulty(this.currentLevel);
	this.newBrickTimer = this.newBrickCountDown;
	this.bricks = [];
	this.gamePlaying = true;
}

Game.prototype.addScore = function(x) {
	this.score += x;
	this.setDifficulty(this.score/this.leveGap + 1);
}

Game.prototype.difficultyAddOne = function() {
	this.currentLevel += 1;
	this.setDifficulty(currentLevel);
}

Game.prototype.setDifficulty = function(level) {
	this.currentLevel = level;
	this.brickHeight = this.oriBrickHeight * Math.pow(this.brickHeightChangeFactor, level);
	this.brickSpeed = this.oriBrickSpeed * Math.pow(this.brickSpeedChangeFactor, level);
	this.newBrickCountDown = this.oriNewBrickCountDown * Math.pow(this.newBrickCountDownChangeFactor, level);
}

Game.prototype.makeNewBrick = function() {
	// if(this.bricks.length == 0 || this.bricks[0].getY() - this.brickHeight > 0){
		this.bricks.unshift(new Brick(this.canvasWidth, this.canvasHeight, this.brickFromLeft, this.brickHeight));
		this.brickFromLeft = !this.brickFromLeft;
		this.newBrickTimer = 0;
	// }
}

Game.prototype.clear = function(x) {
	var lastBrick = this.bricks[this.bricks.length-1];
	if (Math.abs(lastBrick.getX() - x) <= this.accuracyCriteria) {
		this.bricks.pop();
		this.addScore(1);
		this.slideBar.updateScore(this.score);
		return true;
	} else {
		lastBrick.presentHint(x);
	}
	if(this.bricks.length == 0) {
		this.makeNewBrick();
	}
	return false;
}

Game.prototype.update = function() {
	if (!this.gamePlaying){ return; }
	for(var i = this.bricks.length - 1; i >= 0; i--) {
		if( i == this.bricks.length - 1 && this.bricks[i].getY() >= this.deadLine) {
			this.bricks[i].setY(this.deadLine);
		} else if (i < this.bricks.length - 1 && this.bricks[i].getY() + this.bricks[i].height >= this.bricks[i+1].getY()){
			this.bricks[i].setY(this.bricks[i+1].getY() - this.bricks[i].height);
			if(this.bricks[i].getY() <= 0){
				this.gameOver();
			}
		} else {
			this.bricks[i].moveY(this.brickSpeed);
		}
	}
	this.newBrickTimer++;
	if(this.newBrickTimer >= this.newBrickCountDown) {
		this.makeNewBrick();
	}
}

Game.prototype.gameOver = function() {
	this.gamePlaying = false;
	this.gameOverScence.show(this.score);
	this.inputUpListener(0,0);
}

Game.prototype.getDrawables = function() {
	this.drawables = [];
	this.drawables.push(...this.bricks);
	this.drawables.push(this.slideBar);
	this.drawables.push(this.gameOverScence);
	return this.drawables;
}

Game.prototype.inputDownListener = function(touchX, touchY) {
	if (this.gamePlaying){
		if (this.slideBar.hitCheck(touchX, touchY)) {
			this.swiping = true;
			this.slideBar.updateX(touchX);
			this.slideBar.showHintOrNot(true);
		}
	} else { // !this.gamePlaying
		if(this.gameOverScence.restartCheck(touchX, touchY)){
			this.gameOverScence.hide()
			this.gamePlaying = true;
			this.createNewGame();
		}
	}
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
	if(this.swiping){
		this.slideBar.updateX(touchX);
	}
}

Game.prototype.inputUpListener = function(touchX, touchY) {
	if (this.swiping) {
		this.slideBar.refresh(this.clear(touchX));
	}
	this.swiping = false;
	this.slideBar.showHintOrNot(false);
}