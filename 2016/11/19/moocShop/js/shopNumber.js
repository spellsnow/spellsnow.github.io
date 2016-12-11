window.onload=function(){
	var cart = document.getElementsByClassName("cart")[0];
	var minus = document.getElementsByClassName("minus")[0];
	var plus = document.getElementsByClassName("plus")[0];
	var txt = document.getElementsByClassName("num")[0];
	var num = parseInt(txt.value);
	plus.onclick = function(){
		num++;
		txt.value=num;
	}
	minus.onclick=function(){
		if(num>1){
			num--;
		}
		txt.value=num;
	}
	cart.onclick=function(){
		shopNum.textContent = num+'件';
	}
}
