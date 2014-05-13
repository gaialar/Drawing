$(function() {
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	
	var isDrawing = false;
	
	var shapes = [];
	
	var currentPen = undefined;
	
	canvas.onmousedown = function(e) {
		currentPen = new Pen();
	
		isDrawing = true;
		
		var x = e.clientX - this.offsetLeft;
		var y = e.clientY - this.offsetTop;
		
		var point = new Point(x, y);
		currentPen.addPoint(point);
		
		ctx.moveTo(e.clientX, e.clientY);
	}
	
	canvas.onmousemove = function(e) {
		if(isDrawing) {
			var x = e.clientX - this.offsetLeft;
			var y = e.clientY - this.offsetTop;
			
			var point = new Point(x, y);
			currentPen.addPoint(point);
		
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	}
	
	canvas.onmouseup = function(e) {
		isDrawing = false;
		shapes.push(currentPen);
		
		console.log(shapes);
	}
	
	function clearWindow() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
	}
	
	function drawShapes() {
		for(var i = 0; i < shapes.length; ++i) {
			shapes[i].draw(ctx);
		}
	}
	
	$("#undo").on("click", function(e) {
		shapes.pop();
		
		clearWindow();
		drawShapes();
	});
	
	$("#clearButton").on("click", function(e) {
		clearWindow();
	});
	
	$("#drawShapes").on("click", function(e) {
		drawShapes();
	});
});