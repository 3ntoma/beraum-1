/*const selectElement = (element) => document.querySelector(element);

selectElement('.button-toggle').addEventListener('click', () => {
	selectElement('header').classList.toggle('active');
});*/

$(document).ready(function(){
	$('.sliderban_1').slick({
	  dots: true,
	  arrows: true,
	  infinite: true,
	  autoplay : true,
	  autoplaySpeed: 4000,
	  speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  edgeFriction: 0,
	  centerMode: true,
	  variableWidth: false,
	  draggable: false,
	  adaptiveHeight: true,
	  pauseOnHover: false,
	  pauseOnFocus: false
	});
	initCaptcha('#captcha');
  });
/*---- КАПЧА ----*/
function refresh_ca(captcha_reID){
	initCaptcha(captcha_reID);
	$(captcha_reID)
		.val('')
		.addClass("invalid")
		.removeClass("correct")
		.addClass('not-valid')
		.removeClass('is-valid');
};
function initCaptcha(captchaID) {
	let captcha = generateCaptcha(),
	captchaAns = eval(captcha);
	$(captchaID)
		.attr("placeholder", captcha+" = ")
		.addClass('invalid')
		.on("keyup", function() {
		if ($(this).val() !== "" && $(this).val() == captchaAns){
			$(this).removeClass("invalid");
			$(this).addClass("correct");
		}
		else{
			$(this).removeClass("correct");
			$(this).addClass("invalid");
		}
		});
	return captchaAns;
};
function generateCaptcha() {
	let randomNo = function(n) {
	  return Math.floor(Math.random()*n + 1);
	}

	let randomOp = function() {
	  return "+-*"[randomNo(3)-1];
	}
	return randomNo(10)+" "+randomOp()+" "+randomNo(10);
}
/*--- STYLE ---*/
function gray(){
	if (document.getElementsByTagName ('html')[0].className=='grayscale') {document.getElementsByTagName ('html')[0].className='';}
	else {document.getElementsByTagName ('html')[0].className='grayscale';}
	return false;
}

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
                isMobile.Android()
                || isMobile.BlackBerry()
                || isMobile.iOS()
                || isMobile.Opera()
                || isMobile.Windows()
                );
    }
};

function mobileCheck(){
	if(isMobile.any()){
	document.body.classList.add('_touch');
	document.body.classList.remove('_pc');
	let menuArrows = document.querySelectorAll('.menu__arrow');
	if(menuArrows.length>0){
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function(e){
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}
	let menuDown = document.querySelectorAll('.drop__link');
		if(menuDown.length>0){
			for (let index = 0; index < menuDown.length; index++) {
				const menuArrow = menuDown[index];
				menuArrow.addEventListener("click", function(e){
					menuArrow.parentElement.classList.toggle('_active');
				});
			}
		}
	}else{
		document.body.classList.remove('_touch');
		document.body.classList.add('_pc');
	}
}
window.onload = mobileCheck();
window.addEventListener(`resize`, event => {
	mobileCheck();
  }, false);

const iconMenu = document.querySelector('.menu__icon');
if(iconMenu){
	const menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener("click", function(e){
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

$(window).on('scroll', function() {
    var $nav = $('header'),
        scroll = $(this).scrollTop();

    if (scroll > 10) {
		$nav.addClass('header-line');
		$nav.removeClass('header-shadow'); 
    } else {
		$nav.removeClass('header-line');
		$nav.addClass('header-shadow');
    }
});

$(".prod_item").hover(function (event){
	event.preventDefault();
	if(event.type == "mouseenter"){
		var h = event.delegateTarget.offsetHeight;
		event.delegateTarget.style.height = h + 'px';
		event.delegateTarget.children[0].classList.toggle("_hover");
		event.delegateTarget.children[0].children[1].children[1].style.display = "block";	
	}
	if(event.type == "mouseleave"){
		event.delegateTarget.style.height = '';
		event.delegateTarget.children[0].classList.toggle("_hover");
		event.delegateTarget.children[0].children[1].children[1].style.display = "none";	
	}   
});

$('#phone-number')
	.keydown(function (e){
		var key = e.which || e.charCode || e.keyCode || 0;
		$phone = $(this);
		if ($phone.val().length === 1 && (key === 8 || key === 46)){
			$phone.val('('); 
			return false;
		} 
		else if ($phone.val().charAt(0) !== '(') {
			$phone.val('('+String.fromCharCode(e.keyCode)+''); 
		}
		if (key !== 8 && key !== 9) {
			if ($phone.val().length === 4) {
				$phone.val($phone.val() + ')');
			}
			if ($phone.val().length === 5) {
				$phone.val($phone.val() + ' ');
			}			
			if ($phone.val().length === 9) {
				$phone.val($phone.val() + '-');
			}
		}
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));	
	})
	.bind('focus click', function (){
		$phone = $(this);
		if ($phone.val().length === 0){
			$phone.val('(');
		}
		else {
			var val = $phone.val();
			$phone.val('').val(val);
		}
	})
	.blur(function () {
		$phone = $(this);
		if ($phone.val() === '(') {
			$phone.val('');
		}
	});