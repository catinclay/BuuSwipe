function GameOverScence(canvasWidth, canvasHeight, slideBarHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.displaying = false;
	this.gameOverMask = "rgba(0,0,0,0.2)";
}

GameOverScence.prototype.show = function() {
	this.displaying = true;
}

GameOverScence.prototype.hide = function() {
	this.displaying = false;
}

GameOverScence.prototype.restartCheck = function(x, y) {
	return this.displaying && y < this.canvasHeight*2/3;
}

GameOverScence.prototype.drawToContext = function(theContext) {
	if(this.displaying) {
		theContext.fillStyle = this.gameOverMask;
		theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
		theContext.font = "40px Comic Sans MS";
		theContext.fillStyle = "black";
		theContext.textAlign = "center";
		theContext.fillText("Restart", this.canvasWidth/2 , this.canvasHeight/3);
	}
}
