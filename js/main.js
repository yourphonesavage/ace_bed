window.addEventListener("DOMContentLoaded", function(){
	const video=document.getElementById("intro");

	video.addEventListener("loadeddata", function(){
		video.muted=true;
		video.play();		
	});
	video.addEventListener("ended", function(){
		video.currentTime=0;
		video.play();
	});

	//start SWiperJS Slider
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
				// console.log("init event!!");
				swiperPrevBtn.style.display="none";
				swiperNextBtn.style.display="block";
			},
			transitionEnd: function(){
				// console.log("slide transition CSS end event!!");
				activeNum=this.activeIndex;

				if(activeNum == 0){
					swiperPrevBtn.style.display="none";
					swiperNextBtn.style.display="block";
					video.play();
				}
				else{
					swiperPrevBtn.style.display="block";
					swiperNextBtn.style.display="none";
					video.pause();
				}
			}
		}
	});

	function initMap(){
		const point={lat: 37.497899, lng: 127.027664};
		const map=new google.maps.Map(document.getElementById("map"), {
			center: point,
			zoom: 16,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false
		});
		new google.maps.Marker({
			map,
			position: point,
			title: "강남역"
		});
	}

	window.initMap=initMap;

	var imageN; //page1 image-swap
	$("#page1 .inner> ul > li").hover(
		function(){
			$(this).addClass("on");
			imageN=$(this).index();
			$(".swap_bg").removeClass("active");
			$(".swap_bg").eq(imageN).addClass("active");
		},
		function(){
			$(this).removeClass("on");
			imageN=null;
			$(".swap_bg").removeClass("active");
		}
	);

	$("#desktop_menu > ul > li").hover(
		function(){
			$("#start .top_menu").addClass("active");
		},
		function(){
			$("#start .top_menu").removeClass("active");
		}
	);
	$("#desktop_menu > ul > li").hover(
		function(){
			$("#start .top_menu .logo").addClass("variant");
		},
		function(){
			$("#start .top_menu .logo").removeClass("variant");
		}
	);

	$("#desktop_menu > ul > li").focusin(function(){
		$("#start .top_menu .logo").addClass("variant");
	});
	$("#desktop_menu > ul > li").focusout(function(){
		$("#start .top_menu .logo").removeClass("variant");
	});
	$("#desktop_menu > ul > li:first-child > a").focusin(function(){
		$("#start .top_menu").addClass("active");
	});
	$("#desktop_menu li:last-child li:last-child a").focusout(function(){
		$("#start .top_menu").removeClass("active");
	});
	$("#desktop_menu > ul > li > a").focusin(function(){
		$(this).parent().addClass("active");
	});
	$("#desktop_menu li li:last-child a").focusout(function(){
		$(this).parent().parent().parent().removeClass("active");
	});

	var n=0;
	var h;
	var pos=0;
	var timer=0;
	var total=4;

	function init(){
		$("#start").addClass("active");
	}
	init();

	$(window).resize(function(){
		clearTimeout(timer);

		timer=setTimeout(function(){
			h=$(window).height();
			pos=n*h;
			$("html").stop().animate({scrollTop: pos}, 800);
		}, 100);
	});
	$(window).trigger("resize");

	$(".container").mousewheel(function(e, delta){
		if($("html").is(":animated") || menuVisible) return;

		if(delta > 0){
			if(n > 0){
				n=n-1;
			}

			if(n >= 1){
				if($("#start .top_menu").hasClass("fixed") == false){
					$("#start .top_menu").addClass("fixed");
					$("#start .top_menu").css({top:-70}).delay(300).animate({top:0}, 300);
				}
			}
		}
		else{
			if(n < total){
				n=n+1;
			}

			if($("#start .top_menu").hasClass("fixed") == true){
				$("#start .top_menu").removeClass("fixed"); 
				$("#start .top_menu").removeAttr("style");
			}
		}

		if(n != 4){
			pos=n*h;
		}
		else{
			pos=$(document).height()-$(window).height();
		}

		$("html").stop().animate({scrollTop: pos}, 800, function(){
			$(".container > *").removeClass("active");

			if(n == 0){
				// $("#start").addClass("active");
			}
			else{
				$("#sub"+n).addClass("active");
			}

			if(n == 2 || n == 3){
				$(".top_menu").addClass("dark");

				$("#desktop_menu > ul > li").hover(
					function(){
						$("#start .top_menu").removeClass("dark");
				});

				$("#desktop_menu > ul > li").mouseleave(
					function(){
						$("#start .top_menu").addClass("dark");
				});
			}
			else{
				$(".top_menu").removeClass("dark");

				$("#desktop_menu > ul > li").mouseleave(
					function(){
						$("#start .top_menu").removeClass("dark");
				});
			}
		});
	});

	var menuVisible=false;

	$("#start .top_menu .icon li .alarm_tab").click(function(e){
		e.preventDefault();
		if(menuVisible == false){
			menuVisible=true;
		}
		else{
			menuVisible=false;
		}

		$(this).toggleClass("active");
		$("#start .top_menu .icon li .private").toggleClass("active");
		$(this).parent().parent().parent().parent().toggleClass("active");
		$("#start .top_menu .logo").toggleClass("variant");
		$("#mobile_menu").toggleClass("active");
		$("#start .dim").toggleClass("active");
	});

	var winW;
	var isMobile=false;

	$(window).resize(function(){
		winW=$(window).width();

		if(winW > 1024){
			isMobile=false;
		}
		else{
			isMobile=true;
		}
	});

	$("#mobile_menu > ul > li").click(function(e){
		e.preventDefault();

		if($(this).hasClass("active") == false){
			$("#mobile_menu > ul > li").removeClass("active");
			$(this).addClass("active");
			$("#mobile_menu ul ul").slideUp(300);
			$(this).find("ul").slideDown(300);
		}
		else{
			$(this).removeClass("active");
			$(this).find("ul").slideUp(300);
		}
	});


	// prev 왼쪽            
		$(".swiper-button-prev").mouseover(function(){     
			$(".swiper-button-prev").find("path").attr("d", "M 40 10 Q 10 65 40 140");
		});
		$(".swiper-button-prev").mouseleave(function(){
			$(".swiper-button-prev").find("path").attr("d", "M 40 10 Q 40 65 40 140");
		});

		// next 오른쪽
		$(".swiper-button-next").mouseover(function(){
			$(".swiper-button-next").find("path").attr("d", "M 10 10 Q 40 65 10 140");
		});
		$(".swiper-button-next").mouseleave(function(){
			$(".swiper-button-next").find("path").attr("d", "M 10 10 Q 10 65 10 140");
		});

});