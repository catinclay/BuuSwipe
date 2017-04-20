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
	// Game variables
	this.slideBarHeight = this.canvasHeight/8;
	this.slideBar = new SlideBar(this.canvasWidth, this.canvasHeight, this.slideBarHeight);
	this.gameOverScence = new GameOverScence(this.canvasWidth, this.canvasHeight);
	this.deadLine = this.canvasHeight - this.slideBarHeight;
	this.swiping = false;
	this.brickHeight = this.canvasHeight/8;
	this.brickSpeed = this.canvasHeight/100;
	this.accuracyCriteria = this.canvasWidth/12;
	this.brickFromLeft = true;
	this.bricks = [];
	this.newBrickCountDown = 30;
	this.newBrickTimer = this.newBrickCountDown;
	this.gamePlaying = true;
}

Game.prototype.makeNewBrick = function() {
	this.bricks.unshift(new Brick(this.canvasWidth, this.canvasHeight, this.brickFromLeft, this.brickHeight));
	this.brickFromLeft = !this.brickFromLeft;
}

Game.prototype.clear = function(x) {
	var lastBrick = this.bricks[this.bricks.length-1];
	if (Math.abs(lastBrick.getX() - x) <= this.accuracyCriteria) {
		this.bricks.pop();
		return true;
	} else {
		lastBrick.presentHint(x);
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
		this.newBrickTimer = 0;
		this.makeNewBrick();
	}
}

Game.prototype.gameOver = function() {
	this.gamePlaying = false;
	this.gameOverScence.show();
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