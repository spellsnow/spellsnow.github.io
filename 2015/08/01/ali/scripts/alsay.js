$(function(){
	// 自定义函数，开合长文
	function hideShow(hide,show){
		var $hide=$(hide);
		$hide.hide();
		var $click=$(show);
		$click.click(function(){
			if($hide.is(":visible")){
				$hide.hide();
				$(this).text("阅读全文");
			}
			else{
				$hide.show();
				$(this).text("合上全文");
			}
			
			return false;
		})
	}
	hideShow(".hide1",".show1");
	hideShow(".hide2",".show2");
})
