window.addEventListener("DOMContentLoaded"/*구글맵*/, function(){
	// Start Video Control
	const video=document.getElementById("intro");

	video.addEventListener("loadeddata", function(){
		video.muted=true;
		video.play();
	});
	video.addEventListener("ended", function(){
		video.currentTime=0;
		video.play();
	});
	// Start SwiperJS Slider
	const start=document.getElementById("start");
	const swiperContainer=start.getElementsByClassName("swiper-container")[0];
	const swiperPrevBtn=swiperContainer.getElementsByClassName("swiper-button-prev")[0];
	const swiperNextBtn=swiperContainer.getElementsByClassName("swiper-button-next")[0];
	let activeNum=0;

	const mainSwiper=new Swiper(swiperContainer, {
		navigation: {
			prevEl: swiperPrevBtn,
			nextEl: swiperNextBtn
		},
		on: {
			init: function(){
				console.log("init event!!");
				swiperPrevBtn.style.display="none";
				swiperNextBtn.style.display="none";
			},
			slideChange: function(){
				//console.log("slide Change!!");
			},
			transitionEnd: function(){
				//console.log("slide transition CSS end event!!");
				activeNum=this.activeIndex;

				if(activeNum == 0){
					swiperPrevBtn.style.display="none";
					swiperNextBtn.style.display="none";
					video.play();
				}
				else{
					swiperPrevBtn.style.display="block";
					swiperNextBtn.style.display="block";
					video.pause();
				}
			}
		}
	});
});
