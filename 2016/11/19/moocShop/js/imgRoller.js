window.onload=function(){
	var container=document.getElementById('container');
	var list=document.getElementById('list');
	var buttons=document.getElementById('buttons').getElementsByTagName('span');
	var prev=document.getElementById('prev');
	var next=document.getElementById('next');
	var index=1;
	var timer;
	// var animated=false;
	var picwidth=810;//picture width;
	// 绑定箭头点击事件
	function arrow(num){
		var newleft=parseInt(list.style.left)+num;
		list.style.left=newleft+'px';
		if(newleft<=-picwidth*5){
			list.style.left=0+'px';
		}
		if(newleft>=picwidth){
			list.style.left=-picwidth*4+'px';
		}
	}
	next.onclick=function(){
		index++;
		if(index>5){
			index=1;
		}
		showCircle(index);
		arrow(-picwidth);
	}
	prev.onclick=function(){
		index--;
		if(index<1){
			index=5;
		}
		showCircle(index);
		arrow(picwidth);
	}
	// 小圆圈滚动
	function showCircle(index){
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].className='';
		}
		buttons[index-1].className='on';
	}
	// 小圆圈点击切换
	function replay(){
		for (var i = 0; i < buttons.length; i++) {
			(function(){
				var ii=i;
				buttons[ii].onclick=function(){
					list.style.left=ii*(-picwidth)+'px';
					
					var index=buttons[ii].getAttribute('index');
					console.log(index);
					showCircle(index);
				}

			})();
		}
	}
	// 图片自动轮播
	function autoplay(){
		timer=setInterval(function(){
			next.onclick();
		},3000);
	}
	// 清除定时器
	function stopplay(){
		clearInterval(timer);
	}
	// container容器添加鼠标移入，自动轮播停止
	container.onmouseover=stopplay;
	container.onmouseout=autoplay;
	replay();
	autoplay();
}