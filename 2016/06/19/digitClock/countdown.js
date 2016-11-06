var WINDOS_WINDTH=1224;
var WINDOW_HEIGHT=768;

var RADIUS=8;
var MARGIN_TOP=60;
var MARIGN_LEFT=30;

// 倒计时的截止时间
// var endTime=new Date(2016,3,13,14,30,0);
// var endTime=new Date();
// 设置距离目前的时间后的一个小时
// endTime.setTime(endTime.getTime()+3600*1000);


var curShowTimeSeconds=0;


// 生成彩色小球
var balls=[];
const colors=["#33B5E5","#09C","#A6C","#93C","#9C0","#690","#FB3","#F80","#F44","#C00"];




window.onload=function(){
	/*WINDOS_WINDTH=document.body.clientWidth;
	WINDOW_HEIGHT=document.body.clientHeight;*/

	WINDOS_WINDTH=document.documentElement.clientWidth;
	WINDOW_HEIGHT=document.documentElement.clientHeight;

	MARIGN_LEFT=Math.round(WINDOS_WINDTH/10);
	RADIUS=Math.round(WINDOS_WINDTH*4/5/108)-1;
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);


	var canvas=document.getElementById('canvas');
	if(canvas.getContext){
		var context=canvas.getContext("2d");
		canvas.width=WINDOS_WINDTH;
		canvas.height=WINDOW_HEIGHT;

		curShowTimeSeconds=getCurrentShowTimeSeconds();
		// 定时器，每50毫秒刷新一次，每秒20帧。
		setInterval(
			function(){
				render(context);
				update();
			}
			,
			40
		);
	}

} 
// 获取所需要的倒计时时间
function getCurrentShowTimeSeconds(){
	var curTime=new Date();
	/*var ret=endTime.getTime() - curTime.getTime();
	ret=Math.round(ret/1000);
	return ret>=0 ? ret : 0;*/

	// 显示当前时间效果
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	return ret;
}
// 更新函数
function update(){
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();
	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=nextShowTimeSeconds % 60;

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds=curShowTimeSeconds%60;

    if(nextSeconds != curSeconds){

    	if(parseInt(curHours/10)!=parseInt(nextHours/10)){
    		addBalls(MARIGN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
    	}
    	if(parseInt(curHours%10)!=parseInt(nextHours%10)){
    		addBalls(MARIGN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
    	}


    	if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
    		addBalls(MARIGN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
    	}
    	if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
    		addBalls(MARIGN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
    	}


    	if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
    		addBalls(MARIGN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
    	}
    	if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
    		addBalls(MARIGN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
    	}


    	curShowTimeSeconds=nextShowTimeSeconds;
    }
    // 更新要随机掉落的小球
    updateBalls();	
    // console.log(balls.length);

}

function updateBalls(){
	for (var i = 0; i < balls.length; i++) {
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
	// 性能优化
	var cnt=0;
	for (var i = 0; i < balls.length; i++) {
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOS_WINDTH){
			balls[cnt++]=balls[i];
		}
	}
	while(balls.length>Math.min(300,cnt)){
			balls.pop();
		}
}

// 往数字balls里添加小球
function addBalls(x,y,num){
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}



// 渲染数字时钟的各个数字以及掉落的彩色小球
function render(cxt){
	// 清除上次渲染的小球，防止重叠
	cxt.clearRect(0,0,WINDOS_WINDTH,WINDOW_HEIGHT);

	var hours=parseInt(curShowTimeSeconds/3600),
		minutes=parseInt((curShowTimeSeconds-hours*3600)/60),
		seconds=curShowTimeSeconds%60;
	renderDigit(MARIGN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARIGN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARIGN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARIGN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARIGN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARIGN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARIGN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARIGN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	// 循环遍历数字balls里的小球，并且绘制出来
	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
	
}



function renderDigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
				if(digit[num][i][j]==1){
					cxt.beginPath();
					cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
					cxt.closePath();
					cxt.fill();
				}
		}
	}
}