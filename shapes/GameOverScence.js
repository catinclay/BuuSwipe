function GameOverScence(canvasWidth, canvasHeight, slideBarHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.displaying = false;
	this.gameOverMask = "rgba(0,0,0,0.6)";
	this.score = 0;
}

GameOverScence.prototype.show = function(score) {
	this.score = score;
	this.displaying = true;
}

GameOverScence.prototype.hide = function() {
	this.score = 0;
	this.displaying = false;
}

GameOverScence.prototype.restartCheck = function(x, y) {
	return this.displaying && y < this.canvasHeight*2/3;
}

GameOverScence.prototype.drawToContext = function(theContext) {
	if(this.displaying) {
		theContext.fillStyle = this.gameOverMask;
		theContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
		theContext.font = "40px";
		theContext.fillStyle = "white";
		theContext.textAlign = "center";
		theContext.fillText("Score: " + this.score, this.canvasWidth/2 , this.canvasHeight/4);
		theContext.font = "30px";
		theContext.fillText("Restart?", this.canvasWidth/2 , this.canvasHeight/3);
		theContext.font = "10px";
		theContext.fillText("version 1.01", this.canvasWidth/2 , this.canvasHeight/2);
	}
}
