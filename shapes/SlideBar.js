function SlideBar(canvasWidth, canvasHeight, slideBarHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.height = slideBarHeight;
	this.color = "#0000FF";
	this.fromLeft = true;
	this.headColor = "#000077";
	this.hintMask = "rgba(0,0,0,0.2)";
	this.x = 0;
	this.headWidth = canvasWidth/10;
	this.left = 0;
	this.right = 0;
	this.showHint = false;
	this.score = 0;
	this.refresh(false);
}

SlideBar.prototype.refresh = function(reverse) {
	if (reverse) { this.fromLeft = !this.fromLeft; }
	this.x = this.fromLeft ? this.canvasWidth/20 : this.canvasWidth - this.canvasWidth/20;
	
}

SlideBar.prototype.showHintOrNot = function(show) {
	this.showHint = show;
}

SlideBar.prototype.updateScore = function(score) {
	this.score = score;
}

SlideBar.prototype.updateX = function(x) {
	this.x = x;
	return true;
}

SlideBar.prototype.getX = function() {
	return this.x;
}

SlideBar.prototype.hitCheck = function(hitX,hitY) {
	return((hitX > this.x - this.headWidth/0.25)
		&&(hitX < this.x + this.headWidth/0.25)
		&&(hitY > this.canvasHeight-this.height)
		&&(hitY < this.canvasHeight));
}

SlideBar.prototype.drawToContext = function(theContext){
	this.left = this.fromLeft ? 0 : this.x + this.headWidth/2;
	this.right = this.fromLeft ? this.x - this.headWidth/2: this.canvasWidth;
	theContext.fillStyle = this.color;
	theContext.fillRect(this.left, this.canvasHeight - this.height, this.right - this.left, this.height);
	theContext.fillStyle = this.headColor;
	theContext.fillRect(this.x - this.headWidth/2, this.canvasHeight - this.height, this.headWidth, this.height);

	theContext.font = "40px Georgia";
	theContext.fillStyle = "black";
	theContext.textAlign = "center";
	theContext.fillText(this.score, this.canvasWidth/2 , this.canvasHeight - this.height/2);

	if(this.showHint){
		this.hintLeft = this.fromLeft ? 0 : this.x - this.headWidth/2;
		this.hintRight = this.fromLeft ? this.x + this.headWidth/2 : this.canvasWidth;
		theContext.fillStyle = this.hintMask;
		theContext.fillRect(this.hintLeft, 0, this.hintRight - this.hintLeft, this.canvasHeight);
	}
}