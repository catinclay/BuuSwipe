function Brick(canvasWidth, canvasHeight, fromLeft) {
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.fromLeft = fromLeft;
	this.headWidth = canvasWidth/10;
	this.height = canvasHeight/15;
	this.color = "#FF0000";
	this.headColor = "#770000";
	this.y = -this.height;
	this.x = this.canvasWidth * 0.1 + (Math.random() * this.canvasWidth) * 0.8;
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

Brick.prototype.drawToContext = function(theContext){
	this.left = this.fromLeft ? 0 : this.x;
	this.right = this.fromLeft ? this.x : this.canvasWidth;
	theContext.fillStyle = this.color;
	theContext.fillRect(this.left, this.y - this.height, this.right - this.left, this.height);
	theContext.fillStyle = this.headColor;
	theContext.fillRect(this.x - this.headWidth/2, this.y - this.height, this.headWidth, this.height);
}