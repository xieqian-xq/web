$(function(){
	
	var type = queryString("type");
	if(type==="review"){
		$("[data-type=noReview]").removeClass('active');
		$("[data-type=review]").addClass('active');
	}else{
		$("[data-type=review]").removeClass('active');
		$("[data-type=noReview]").addClass('active');
	}

	$(".nav").find("div").click(function(){
		if(!$(this).hasClass('active')){
			$(this).siblings().removeClass("active");
			$(this).addClass("active");

			LoadingToNewUrl("list.html?type="+$(this).data('type'));
		}
	});

	$(".recording-player").find(".player").click(function(){
		LoadingToNewUrl("detail.html");
	});

});

function LoadingToNewUrl(url){
	$(".mainShadow").show();
	url=url||location.href;
	location.href=url;
}

function queryString(name){
	var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
	if(result == null || result.length < 1){
		return "";
	}
	return result[1];

}