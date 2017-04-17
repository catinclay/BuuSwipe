function Game(){}

Game.prototype.init = function(canvasWidth, canvasHeight, imageManager, soundManager){
	// Framework init
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.drawables = [];
	this.imageManager = imageManager;
	this.soundManager = soundManager;

	// Game variables
	this.slideBar = new SlideBar(canvasWidth, canvasHeight);
	this.swiping = false;
	this.brickSpeed = 2;
	this.brickFromLeft = true;
	this.bricks = [];
	this.makeNewBrick();
}

Game.prototype.makeNewBrick = function() {
	this.bricks.unshift(new Brick(this.canvasWidth, this.canvasHeight, this.brickFromLeft));
	this.brickFromLeft = !this.brickFromLeft;
}

Game.prototype.clear = function(x) {
	if (Math.abs(this.bricks[this.bricks.length-1].getX() - x) <= 20) {
		this.bricks.pop();
		if (this.bricks.length == 0) { this.makeNewBrick(); }
		return true;
	}
	return false;
}

Game.prototype.update = function() {
	for(var i in this.bricks) {
		this.bricks[i].moveY(this.brickSpeed);
	}
	if(this.bricks.length == 0 || this.bricks[0].getY() > this.canvasHeight/20) {
		this.makeNewBrick();
	}
}

Game.prototype.getDrawables = function() {
	this.drawables = [];
	this.drawables.push(...this.bricks);
	this.drawables.push(this.slideBar);
	return this.drawables;
}

Game.prototype.inputDownListener = function(touchX, touchY) {
	if (this.slideBar.hitCheck(touchX, touchY)) {
		this.swiping = true;
		this.slideBar.updateX(touchX);
	}
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
	if(this.swiping){
		if(!this.slideBar.updateX(touchX)){
			this.inputUpListener(touchX, touchY);
		}
	}
}

Game.prototype.inputUpListener = function(touchX, touchY) {
	if (this.swiping) {
		this.slideBar.refresh(this.clear(touchX));
	}
	this.swiping = false;
}