var timer;
var audio;
$(function(){
	

	$(".radioList-item").click(function(){
		$(this).find("input:radio").prop("checked",true);
	});

	// $(".mainShadow").css({"height":$(window).height()+"px"});
	

	$("#btnOK").click(function(){
		$(this).attr("disabled",true);
		$(this).text("正在提交...")
		$(".mainShadow").show();
		$(".shadow").animate({"top":0},700);
		setTimeout(function(){
			LoadingToNewUrl("list.html");
		},1000);
	});

	// $(".player-bar-two").mousemove(function(e){
	// 	if(e.which==1){
	// 		var currentWidth = e.offsetX;
	// 		$(".playTime").html(currentWidth);
	// 		console.info(currentWidth);	
	// 	}
	// });
	
	// $(".player-bar-two").mouseup(function(e){
	// 	debugger
	// 	if(e.which==1){
	// 		var currentWidth = e.offsetX;
	// 		$(".playTime").html(currentWidth);
	// 		console.info(currentWidth);	
	// 	}
	// });

	$(".player-bar-two").on("touchstart",function(event){
		debugger
		var touch = event.targetTouches[0];
		alert(touch);
	});

	$(".player-bar-two").on("touchmove",function(event){
		debugger
		var touch = event.targetTouches[0];
	});

	$(".player-bar-two").on("touchend",function(event){
		// debugger
	});
});

myAudio = {
	init:function(){
		audio = document.getElementById('player'); 
		audio.src='music/清明雨上.mp3';
		audio.load();
		this.audioAddEventListener();
	},
	audioAddEventListener:function(){
		// 加载完成事件
		audio.addEventListener("canplay",function(){
			$(".player").attr("onclick",'playOrPause(this)');
			playOrPause();
		});
		// 暂停事件
		audio.addEventListener("pause",function(){
			$(".player").find(".player-title").text("录音编号：123456789");
			$('.player-icon').css({"background-image":"url(image/player-icon.png)"});
			clearInterval(timer);
		});
		// 播放事件
		audio.addEventListener("play",function(){
			$(".player").find(".player-title").text("正在播放");
			timer = setInterval(setPlayBar,100);
			$('.player-icon').css({"background-image":"url(image/player-icon.gif)"});
		});
	}
};

function playOrPause(){
	if(audio!==null){
		if (audio.paused) {
			audio.play();
		}else{
			audio.pause();
		}
	}
}

function setPlayBar(){
	var totalLength = audio.duration;
	var currentLength = audio.currentTime;
	var rate = currentLength/totalLength*100;
	$('.player-bar').css({"width":rate+"%"});
	$('.playerBar').css({"width":rate+"%"});
}

function LoadingToNewUrl(url){
	$(".mainShadow").show();
	$(".shadow").animate({"top":0},700);
	url=url||location.href;
	location.href=url;
}