var canvasWidth=Math.min(800,$(window).width()-20);
var canvasHeight=canvasWidth;
var isMouseDown=false;
var lastLoc={x:0,y:0};
var lastTimestamp=0;
var lastLineWidth=-1;
var strokeColor="black";
var btn=document.getElementById("clear_btn");

var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
canvas.width=canvasWidth;
canvas.height=canvasHeight;
$("#controller").css("width",canvasWidth+"px");

drawGrid();

canvas.ondblclick=function(e){
	e.preventDefault();
	context.clearRect(0,0,canvasWidth,canvasHeight);
	drawGrid();
}
btn.onclick=function(){
	context.clearRect(0,0,canvasWidth,canvasHeight);
	drawGrid();
}
$(".color_btn").click(
	function(e){
		$(".color_btn").removeClass("color_btn_selected");
		$(this).addClass("color_btn_selected");
		strokeColor=$(this).css("background-color");
	}
)


function beginStroke(point){
	isMouseDown=true;
	lastLoc.x=point.x;
	lastLoc.y=point.y;
	lastTimestamp=new Date().getTime();
}

function endStroke(){
	isMouseDown=false;
}

function moveStroke(point){
	if(isMouseDown){
		var curLoc={x:point.x,y:point.y};
		var s=calcDistance(curLoc,lastLoc);
		var curTimestamp=new Date().getTime();
		var t=curTimestamp-lastTimestamp;
		var lineWidth=clacLineWidth(t,s);
		// draw
		context.lineWidth=lineWidth;
		context.lineCap="round";
		context.lineJoin="round";
		context.strokeStyle=strokeColor;
		context.beginPath();
		context.moveTo(lastLoc.x,lastLoc.y);
		context.lineTo(curLoc.x,curLoc.y);
		context.stroke();


		lastLoc=curLoc;
		lastTimestamp=curTimestamp;
		lastLineWidth=lineWidth;
	}
}

canvas.onmousedown=function(e){
	e.preventDefault();
	beginStroke({x:e.offsetX,y:e.offsetY});
};

canvas.onmouseup=function(e){
	e.preventDefault();
	endStroke();
};

canvas.onmouseout=function(e){
	e.preventDefault();
	endStroke();
}

canvas.onmousemove=function(e){
	e.preventDefault();
	if(isMouseDown){
		moveStroke({x:e.offsetX,y:e.offsetY});	
	}
	
}

canvas.addEventListener('touchstart',function(e){
	e.preventDefault();
	touch=e.touches[0];
	beginStroke({x:touch.pageX,y:touch.pageY});
});
canvas.addEventListener('touchmove',function(e){
	e.preventDefault();
	if(isMouseDown){
		touch=e.touches[0];
		moveStroke({x:touch.pageX,y:touch.pageY});	
	}
});
canvas.addEventListener('touchend',function(e){
	e.preventDefault();
	endStroke();
});
var maxLineWidth=30;
var minLineWidth=1;
var maxStrokeV=10;
var minStrokeV=0.1;
function clacLineWidth(t,s){
	var v=s/t;
	var resultLineWidth;
	if(v<=minStrokeV){
		resultLineWidth=maxLineWidth;
	}else if(v>=maxStrokeV){
		resultLineWidth=minLineWidth;
	}else{
		resultLineWidth=maxLineWidth-(v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-1);
	}
	if(lastLineWidth==-1)
		return resultLineWidth;
		
	return resultLineWidth*3/10+lastLineWidth*7/10;

}

function calcDistance(loc1,loc2){
	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}


function drawGrid(){
	context.save();
	context.strokeStyle="rgb(230,11,9)";
	context.beginPath();
	context.moveTo(3,3);
	context.lineTo(canvasWidth-3,3);
	context.lineTo(canvasWidth-3,canvasHeight-3);
	context.lineTo(3,canvasHeight-3);
	context.closePath();

	context.lineWidth=6;
	context.stroke();

	context.beginPath();
	context.moveTo(3,3);
	context.lineTo(canvasWidth-3,canvasHeight-3);

	context.moveTo(canvasWidth/2,3);
	context.lineTo(canvasWidth/2,canvasHeight-3);


	context.moveTo(canvasWidth-3,3);
	context.lineTo(3,canvasHeight-3);

	context.moveTo(canvasWidth-3,canvasHeight/2);
	context.lineTo(3,canvasHeight/2);

	context.lineWidth=1;
	context.setLineDash([11,15]);
	context.stroke();

	context.restore();
}




