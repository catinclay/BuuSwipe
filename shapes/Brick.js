function Brick(canvasWidth, canvasHeight, fromLeft, brickHeight) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.fromLeft = fromLeft;
	this.headWidth = canvasWidth/10;
	this.height = brickHeight;
	this.hintHeight = this.height;
	this.color = "#FF0000";
	this.headColor = "#770000";
	this.y = -this.height;
	this.length = this.canvasWidth * 0.15 + (Math.random() * this.canvasWidth) * 0.8;
	this.x = this.fromLeft ? this.length : this.canvasWidth - this.length;
	this.showHint = false;
	this.hintX = 0;
}

Brick.prototype.getX = function() {
	return this.x;
}

Brick.prototype.getY = function() {
	return this.y;
}

Brick.prototype.moveY = function(dy) {
	this.y += dy;
}

Brick.prototype.setY = function(ny) {
	this.y = ny;
}

Brick.prototype.presentHint = function(x) {
	this.showHint = true;
	this.hintX = x;
}

Brick.prototype.drawToContext = function(theContext) {
	this.left = this.fromLeft ? 0 : this.x + this.headWidth/2;
	this.right = this.fromLeft ? this.x - this.headWidth/2 : this.canvasWidth;
	
	theContext.fillStyle = this.color;
	theContext.fillRect(this.left, this.y - this.height, this.right - this.left, this.height);
	theContext.fillStyle = this.headColor;
	theContext.fillRect(this.x - this.headWidth/2, this.y - this.height, this.headWidth, this.height);
	if(this.showHint){
		this.hintLeft = this.fromLeft ? 0 : this.hintX - this.headWidth/2;
		this.hintRight = this.fromLeft ? this.hintX + this.headWidth/2 : this.canvasWidth;
		theContext.fillStyle = "rgba(0,0,1,0.5)";
		theContext.fillRect(this.hintLeft, this.y - this.hintHeight, this.hintRight - this.hintLeft, this.hintHeight);
	}
}