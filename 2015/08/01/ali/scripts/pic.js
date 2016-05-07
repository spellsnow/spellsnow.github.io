window.onload=function(){
    var wrap=document.getElementById('wrap'),
        pic=document.getElementById('pic'),
        list=document.getElementById('list').getElementsByTagName('li'),
        index=0,
        timer=null;

      // 定义并调用自动播放函数
      timer=setInterval(autoPlay,6000);
      function autoPlay(){
      	index++;
      	if(index>=3){
      		index=0;
      		
      	}
      	changeImg(index);
      }
      // 定义图片切换函数
     function changeImg(curIndex){
       	for (var i = 0; i < list.length; i++) {
       		list[i].className='';
       	};
       	list[curIndex].className='on';
       	index=curIndex;
       	pic.style.marginLeft=-curIndex*1349+'px';
       }
      
       for (var i = 0; i < list.length; i++) {
       	list[i].id=i;
       	list[i].onmouseover=function(){
       		changeImg(this.id);
       	}
     };



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
       for(var i=0,len=cards.length;i<len;i++){(function(i){
            var l=i;
            cards[i].onmouseover=function(){
            setcardsPos();
            cards[i].style.fontSize="20px";
            for (var m = 0; m < cards.length; m++) {
              if(m!=l){
                cards[m].style.fontSize="0px";
              }
            }
            for(var j=1;j<=i;j++){
              cards[j].style.marginLeft=parseInt(cards[j].style.marginLeft,10)-translate+'px';
            }
          }

        })(i);
       }



}
