function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Pen() {
	this.points = [];
}
Pen.prototype.addPoint = function(p) {
	this.points.push(p);
}
Pen.prototype.draw = function(ctx) {
	for(var i = 0; i < this.points.length; ++i) {
		var currentPoint = this.points[i];
		if(i == 0) {
			ctx.moveTo(currentPoint.x, currentPoint.y);
		}
		else {
			ctx.lineTo(currentPoint.x, currentPoint.y);
			ctx.stroke();
		}
	}
}