$(function() {
	var canvas = document.getElementById("drawCanvas");
	var context = canvas.getContext("2d");
	
	var isDrawing = false;

	var items = [];
	var removedItems = [];

	var currItem;	
	var currentShape = undefined;

	var currentToolConstructor = eval($('#pen').attr('data-constructor'));

	var colour = 'black';
	var lineWidth = 3;
	var text = " ";
	
	canvas.onmousedown = function(e) {

		isDrawing = true;
		
		var x = e.clientX - this.offsetLeft;
		var y = e.clientY - this.offsetTop;

		currentShape = new currentToolConstructor(new Point(x, y), colour, lineWidth);
		removedItems = [];

		items.push(currentShape);
	}
	
	canvas.onmousemove = function(e) {

		if (isDrawing) {
			var x = e.clientX - this.offsetLeft;
			var y = e.clientY - this.offsetTop;

			if (currentShape.type !== "text"){
				currentShape.setEndPoint(new Point(x, y));
				drawItems();
			}
			
		}
	}
	
	canvas.onmouseup = function(e) {

		isDrawing = false;
		currentShape.isFinished	= true;	

		console.log(items);
	}

	function clearWindow() {

		context.clearRect(0,0,canvas.width,canvas.height);
	}
	
	function drawItems() {

		context.clearRect(0,0,canvas.width,canvas.height);

		for (var i = 0; i < items.length; ++i) {
			
			if ((currentShape.name !== "text") || (items[i].isFinished)){
				items[i].draw(context);
			}		
		}
	}

	$(".drawingTool").on("click", function(e) {
		var button = $(this);
		currentToolConstructor = eval(button.attr('data-constructor'));
	});

	$(".colour").on("click", function(e) {
		var button = $(this);
		colour = eval(button.attr('data-constructor'));		
	});

	$(".size").on("click", function(e) {
		var button = $(this);
		value = eval(button.attr('data-constructor'));

		if(value === 5 && value < 100){
			lineWidth += 1;
		}
		else if (value === 1 && lineWidth !==1){
			lineWidth -= 1;
		}
		else if (value ===3){
			lineWidth = 3;
		}	
	});

	$("#textBox").keydown(function(e) {
		text = $("#textBox").val();

		if (e.keyCode === 13) {
			currentShape.isFinished = true;
			console.log("enter");
			currentShape.setText(text);
			currentShape.draw(context);
		}
	});

	$("#undo").on("click", function(e) {
		currItem = items.pop();
		removedItems.push(currItem);
		
		clearWindow();
		drawItems();
	});

	$("#redo").on("click", function(e) {
		currItem = removedItems.pop();

		if (currItem !== undefined){
			items.push(currItem);
		
			clearWindow();
			drawItems();
		}
	});
	
	$("#clearButton").on("click", function(e) {
		clearWindow();
	});
});