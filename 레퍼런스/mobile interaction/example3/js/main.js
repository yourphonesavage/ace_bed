window.addEventListener("DOMContentLoaded", function(){
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
				// console.log("init event!!");
				swiperPrevBtn.style.display="none";
				swiperNextBtn.style.display="none";
			},
			transitionEnd: function(){
				// console.log("slide transition CSS end event!!");
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

	// Mobile Menu
	const upper=start.getElementsByClassName("upper")[0];
	const tab=upper.getElementsByClassName("tab")[0];
	const symbol=upper.getElementsByClassName("symbol")[0];
	const mobileMenu=document.getElementsByClassName("mobile_menu")[0];
	const mobileMenuCloseBtn=mobileMenu.firstElementChild;
	const menu=this.document.getElementById("menu");
	const menuLi=menu.firstElementChild.children;
	let menuN;

	tab.addEventListener("click", function(e){
		e.preventDefault();
		document.body.classList.add("fixed");
		mobileMenu.classList.add("active");
	});
	mobileMenuCloseBtn.addEventListener("click", function(e){
		e.preventDefault();
		document.body.classList.remove("fixed");
		mobileMenu.classList.remove("active");
	});

	for(let i=0; i<menuLi.length; i++){
		menuLi[i].index=i;

		menuLi[i].addEventListener("click", function(e){
			e.preventDefault();
			menuN=e.currentTarget.index;

			if(e.currentTarget.classList.contains("active") == false){
				for(let j=0; j<menuLi.length; j++){
					if(j == menuN){
						menuLi[j].classList.add("active");
						menuLi[j].getElementsByTagName("ul")[0].style.display="block";
					}
					else{
						menuLi[j].classList.remove("active");
						menuLi[j].getElementsByTagName("ul")[0].style.display="none";
					}
				}
			}
			else{
				e.currentTarget.classList.remove("active");
				e.currentTarget.getElementsByTagName("ul")[0].style.display="none";
			}
		});
	}

	// Project Detail List
	const project=document.getElementById("project_list");
	const projectDescription=project.getElementsByClassName("description");
	const projectDetail=project.getElementsByClassName("project_detail_area")[0];
	const projectDetailCloseBtn=projectDetail.getElementsByClassName("close")[0];
	let projectSlider;

	for(let i=0; i<projectDescription.length; i++){
		projectDescription[i].addEventListener("click", function(e){
			e.preventDefault();
			document.body.classList.add("fixed");
			projectDetail.classList.add("active");

			setTimeout(function(){
				projectSlider=new Swiper(".project_detail_area .swiper-container");
			}, 100);
		});
	}
	projectDetailCloseBtn.addEventListener("click", function(e){
		e.preventDefault();
		document.body.classList.remove("fixed");
		projectDetail.classList.remove("active");
		projectSlider=null;
	});

	// Google Map
	function initMap(){
		let myLatLng={lat: 37.399623, lng: 126.920380};
		let map=new google.maps.Map(document.getElementById("map"), {
			zoom: 16,
			center: myLatLng,
			mapTypeControl: false,
			zoomControl: false
		});

		let marker=new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: "디자인발전소"
		});
	}

	window.initMap=initMap;

	// Fixed upper
	let t=0;
	let scrollTimer=0;

	window.addEventListener("scroll", function(){
		clearTimeout(scrollTimer);

		scrollTimer=setTimeout(function(){
			t=window.pageYOffset;

			if(t > window.innerHeight){
				if(upper.classList.contains("fixed") == false){
					upper.classList.add("fixed");
					gsap.to(upper, {top: 0, opacity: 1, duration: 0.3});
				}
				else{
					return;
				}
			}
			else{
				if(upper.classList.contains("fixed") == true){
					upper.classList.remove("fixed");
					upper.removeAttribute("style");
				}
				else{
					return;
				}
			}
		}, 15);
		symbol.addEventListener("click", function(e){
			e.preventDefault();
			gsap.to(window, {scrollTo: 0, duration: 0.5});
		});
	});
});