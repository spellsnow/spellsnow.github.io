window.onload=function(){
	var box=document.getElementById('container');
	var cards=box.getElementsByClassName('card');
	var cardWidth=cards[0].offsetWidth;
	var exposeWidth=100;	
	var boxWidth=cardWidth+(cards.length-1)*exposeWidth;
	box.style.width=boxWidth+'px';
	//设置每道门的初始位置
	function setcardsPos(){
		for(var i=1,len=cards.length;i<len;i++){
			cards[i].style.marginLeft=cardWidth+exposeWidth*(i-1)+'px';
		}
	}
	setcardsPos();

	// 计算每道门打开时应移动的距离
	var translate=cardWidth-exposeWidth;
	var timer=null;
	 // 为每道门绑定事件
	 for(var i=0,len=cards.length;i<len;i++){
	 	(function(i){
	 		cards[i].onmouseover=function(){
	 			setcardsPos();
	 			for(var j=1;j<=i;j++){
	 				cards[j].style.marginLeft=parseInt(cards[j].style.marginLeft,10)-translate+'px';
	 			}
	 		}
	 	})(i);
	 }

}