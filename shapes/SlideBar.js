function SlideBar(canvasWidth, canvasHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.height = canvasHeight/10;
	this.color = "#0000FF";
	this.fromLeft = true;
	this.headColor = "#000077";
	this.x = 0;
	this.headWidth = canvasWidth/10;
	this.left = 0;
	this.right = 0;
	this.refresh(false);
}

SlideBar.prototype.refresh = function(reverse) {
	if (reverse) { this.fromLeft = !this.fromLeft; }
	this.x = this.fromLeft ? this.canvasWidth/20 : this.canvasWidth - this.canvasWidth/20;
	
}

SlideBar.prototype.updateX = function(x) {
	// if((this.fromLeft && x < this.x - this.headWidth/2)
	// 	|| (!this.fromLeft && x > this.x + this.headWidth/2)){
	// 	this.x = x;
	// 	return false;
	// }
	// if((this.fromLeft && x > this.x)
	// 	|| (!this.fromLeft && x < this.x)){
	// 	this.x = x;
	// }
	this.x = x;
	return true;
}

SlideBar.prototype.getX = function() {
	return this.x;
}

SlideBar.prototype.hitCheck = function(hitX,hitY) {
	return((hitX > this.x - this.headWidth/0.75)
		&&(hitX < this.x + this.headWidth/0.75)
		&&(hitY > this.canvasHeight-this.height)
		&&(hitY < this.canvasHeight));
}

SlideBar.prototype.drawToContext = function(theContext){
	this.left = this.fromLeft ? 0 : this.x;
	this.right = this.fromLeft ? this.x : this.canvasWidth;
	theContext.fillStyle = this.color;
	theContext.fillRect(this.left, this.canvasHeight - this.height, this.right - this.left, this.height);
	theContext.fillStyle = this.headColor;
	theContext.fillRect(this.x - this.headWidth/2, this.canvasHeight - this.height, this.headWidth, this.height);
}