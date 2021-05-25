$(document).ready(function(){
	/*- слайдер -*/
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
	if ($(window).width() < 768) {
		let full_height = $(window).height();
		$('.menu__body')[0].style.height = full_height + 'px';
	}
  });

/*------------- MOBILE CHECK -----------------*/
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

/*------------------------------- CATALOG HOVER ---------------------------*/
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

/*--------------------------- МАСКА ТЕЛЕФОНА -------------------------*/
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

/*-------------------------- КАПЧА ---------------------*/
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

/*---------------------------- Отправка на почту --------------------------*/
function reqCheck(){
	let name_row = document.getElementById('name').value;
	let tel_row = document.getElementById('phone-number').value;
	let email_row = document.getElementById('email').value;
	let message_row = document.getElementById('msg').value;
	$.ajax({
		type: 'POST', 
		url: 'mail.php', 
		data: {"name": name_row, "email": email_row, "message": message_row, "tel": tel_row}
	}).done(function(){
		$("#supportForm").find("input").val("");
		$("#supportForm").find("input").removeClass('is-valid');
		$("#supportForm").find("textarea").val("");
		$("#supportForm").find("textarea").removeClass('is-valid');
		document.getElementById("supportForm").reset();
		document.getElementById("success_send").style.display = "block";
		return false;
	});
}

/*------------------------ Валидатор ------------------------------------*/
let simpleValidation = function(formID, captchaID){
	let index = 0;
	initCaptcha(captchaID); /*- инициализация капчи -*/
    let validateForm = $(formID);
    validateForm.each(function(){
      let validateForm = $(this);
      let validate = {};
      let validatingLength = $(this).find('.validate').length;
      for(let i = 1; i <= validatingLength; i++){
        validate['input'+i] = false;
      }
      $('.validate').blur(function(){
        let validateThisVal = $(this).val();
        let validateThisType = $(this).attr('name');
		
        if(validateThisType === "email"){
          index = 1;
          let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(!validateThisVal.match(re)){
            $(this).addClass('not-valid');
            $(this).removeClass('is-valid');
            return validate['input'+index] = false;
          } else{
            $(this).addClass('is-valid');
            $(this).removeClass('not-valid');
            return validate['input'+index] = true;
          }
        } 
        if(validateThisType === "msg"){
          index = 2;
          let mes_reg = /.{10,100}$/;
          if(!validateThisVal.match(mes_reg)){
            $(this).addClass('not-valid');
            $(this).removeClass('is-valid');
            return validate['input'+index] = false;
          } else{
            $(this).addClass('is-valid');
            $(this).removeClass('not-valid');
            return validate['input'+index] = true;
          }
        }
        if(validateThisType === "name"){
          index = 3;
          let name_re = /[a-zA-Z\а-яА-Я].{1,20}$/;
          if(!validateThisVal.match(name_re)){
            $(this).addClass('not-valid');
            $(this).removeClass('is-valid');
            return validate['input'+index] = false;
          } else{
            $(this).addClass('is-valid');
            $(this).removeClass('not-valid');
            return validate['input'+index] = true;
          }
        }
        if(validateThisType === "captcha"){
          index = 4;
          if($(captchaID).hasClass('correct')){
            return validate['input'+index] = true;
          } else if($(captchaID).hasClass('invalid')){
            return validate['input'+index] = false;
          }
        }
      });
      validateForm.submit(function(event){
        event.preventDefault();
        let falseCtn = 0;
        for(let i = 1; i <= validatingLength; i++){
          if(validate['input'+i] == false){
            falseCtn++;
          }
        }
		console.log(falseCtn);
        if(falseCtn === 0){
            reqCheck();
        }
      });
    });
  };

/*------------------ Прокрутка категории ---------------*/
$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop() > 100) {
			$('#scroll_top').show();
		} else {
			$('#scroll_top').hide();
		}
	});
	$('#scroll_top').click(function(){
		$('html, body').animate({scrollTop: 0}, 600);
		return false;
	});
});
$('[href^="#catalog_"]').on('click', function(){
	let href = $(this).attr('href'), elem = $(document).find(href);
	if(elem.length > 0) {
	  let posY = elem.eq(0).offset().top;
	  $('html, body').animate({
		scrollTop: posY
	  }, 1000);
	}
	return false;
  });