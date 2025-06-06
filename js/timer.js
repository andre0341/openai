var duration = 1;
var digit = '';
var timeID = setInterval(countDown, 1000); //1000 = 1sec
var hours = 0;
var minutes = 0;
var seconds = 0;
var digit_zero = '0';
var duration_at_pause = 0;
var timedelay = 1;
var _delay = setInterval(delayCheck, 500);

$(document).ready(function (){

	$('#c_start').on("click", function(){

		$('#counter_n_input').css('z-index', '9');
		$(this).css('display', 'none');
		$('#c_stop').css('display', 'block');

		var digit = $( "#counter_n_input" ).val();

		while(digit[0] == 0){
			digit = digit.substr(1);
		}

		duration = fromDigitsToSecs(digit);
		timeID = setInterval(countDown, 1000); //1000 = 1sec
		$('#counter_n_input_box').css('z-index', '9');

	});

	$('#timer_1').on("click", function(){
		$('#counter_n_input_box').css('z-index', '99');
	});

	$( "#counter_n_input" ).keyup(function() {
		digit = $( "#counter_n_input" ).val();
		splitDigits(digit);
	}); //end keyup

	$('#c_stop').on("click", function(){
		stopCountdown();
		$(this).css('display', 'none');
		$('#c_start').css('display', 'block');
	}); //end stop

	$('#c_reset').on("click", function(){
		stopCountdown();
		resetAll();
		$('#counter_n_input').css('z-index', '99');

	}); //end reset

        // Fullscreen
        $("#c_fullScreen").on("click", function(){
                document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen();

                if($(this).hasClass('fullScreen')){
                        $(this).removeClass('fullScreen').addClass('normalScreen');
                        $(this).find('img').attr('src','./imgs/normalsize.png');
                } else {
                        $(this).removeClass('normalScreen').addClass('fullScreen');
                        $(this).find('img').attr('src','./imgs/fullsize.png');
                }

                //grid-template-columns: repeat(24, 3em [col-start]);
                //width: 100%;

        });//end fullscreen

        $("#c_fullScreen").on('mouseenter', function(){
                if($(this).hasClass('fullScreen')){
                        $(this).find('img').attr('src','./imgs/fullsize_hover.png');
                } else {
                        $(this).find('img').attr('src','./imgs/normalsize_hover.png');
                }
        }).on('mouseleave', function(){
                if($(this).hasClass('fullScreen')){
                        $(this).find('img').attr('src','./imgs/fullsize.png');
                } else {
                        $(this).find('img').attr('src','./imgs/normalsize.png');
                }
        });

        $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function(){
                var fsElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
                if(fsElement){
                        $("#c_fullScreen").removeClass('fullScreen').addClass('normalScreen');
                        $("#c_fullScreen img").attr('src','./imgs/normalsize.png');
                } else {
                        $("#c_fullScreen").removeClass('normalScreen').addClass('fullScreen');
                        $("#c_fullScreen img").attr('src','./imgs/fullsize.png');
                }
        });


	$('#content').on('mousemove', showAllEvent);

}); //end ready


function stopCountdown(){
	clearInterval(timeID);
	duration_at_pause = duration;
	console.log('d =', duration);
	$('#counter_n_input').val(duration_at_pause);
}

function countDown(){
	duration = duration - 1;
	hours = 0; minutes = 0; seconds = 0;
	console.log('duration (in countdown): ', duration);

	if(duration > 0){

		if(duration > 3599){
			//Mancano Anche Ore
			hours = Math.floor(duration / 3600);
			minutes = Math.floor((duration - hours*3600)/60);

		} else {
			//Mancano Solo Minuti o Solo Secondi
			hours = 0;
			makeItGray('hours');

			if(duration > 59){
				//Mancano Minuti
				minutes = Math.floor(duration / 60);

			} else {
				//Mancano Solo Secondi
				minutes = 0;
				makeItGray('minutes');
			}

		}

		seconds = duration % 60;
		//console.log('[INT]: ' + hours + ' : ' + minutes + ' : ', seconds);
		duration = duration.toString();

		var temp = '';

		var hrs = hours.toString();
		var min = minutes.toString();
		var sec = seconds.toString();

		if (hrs.length < 2){ hrs = digit_zero.concat(hrs);}
		if (min.length < 2){ min = digit_zero.concat(min);}
		if (sec.length < 2){ sec = digit_zero.concat(sec);}

		console.log('hms = ', hrs, ' : ', min, ' : ' , sec);
		updateCountDown(hrs, min, sec);

	} else {
		playSound();
		stopCountdown();
		resetAll();
	}
}

function updateCountDown(hrs, min, sec){
	//console.log(' hrs: '+hrs + ' min: ' + min + ' secs :' + sec);

	$('#decina_h').text(hrs[0]);
	$('#unità_h').text(hrs[1]);
	$('#decina_m').text(min[0]);
	$('#unità_m').text(min[1]);
	$('#decina_s').text(sec[0]);
	$('#unità_s').text(sec[1]);

	$(document).prop('title', 'AV:'+hrs + ':' + min + ':' + sec);

}

function splitDigits(digit){
		/* console.log(digit.length); */

		switch(digit.length){
			case 1:
			//
			$('#decina_h, #unità_h, #decina_m, #unità_m, #decina_s').text(0);
			$('#unità_s').text(digit);
			$('#decina_h, #unità_h, #decina_m, #unità_m, #decina_s, #label_h, #label_m').css('color','#cfcfcf');
			$('#unità_s, #label_s').css('color','#000');
			break;

			case 2:
			//
			$('#decina_h, #unità_h, #decina_m, #unità_m').text(0);
			$('#decina_s').text(digit[0]);
			$('#unità_s').text(digit[1]);

			$('#decina_h, #unità_h, #decina_m, #unità_m, #label_h, #label_m').css('color','#cfcfcf');
			$('#decina_s, #unità_s, #label_s').css('color','#000');
			break;

			case 3:
			//
			$('#decina_h, #unità_h, #decina_m').text(0);
			$('#unità_m').text(digit[0]);
			$('#decina_s').text(digit[1]);
			$('#unità_s').text(digit[2]);

			$('#decina_h, #unità_h, #decina_m, #label_h').css('color','#cfcfcf');
			$('#unità_m, #decina_s, #unità_s, #label_m, #label_s').css('color','#000');

			break;

			case 4:
			//
			$('#decina_h, #unità_h').text(0);

			$('#decina_m').text(digit[0]);
			$('#unità_m').text(digit[1]);
			$('#decina_s').text(digit[2]);
			$('#unità_s').text(digit[3]);

			$('#decina_h, #unità_h, #label_h').css('color','#cfcfcf');
			$('#decina_m, #unità_m, #decina_s, #unità_s, #label_m, #label_s').css('color','#000');

			break;

			case 5:
			//
			$('#decina_h').text(0);
			$('#unità_h').text(digit[0]);
			$('#decina_m').text(digit[1]);
			$('#unità_m').text(digit[2]);
			$('#decina_s').text(digit[3]);
			$('#unità_s').text(digit[4]);

			$('#decina_h').css('color','#cfcfcf');
			$('#unità_h, #decina_m, #unità_m, #decina_s, #unità_s, #label_h, #label_m, #label_s').css('color','#000');

			break;

			case 6:
			//
			$('#decina_h').text(digit[0]);
			$('#unità_h').text(digit[1]);
			$('#decina_m').text(digit[2]);
			$('#unità_m').text(digit[3]);
			$('#decina_s').text(digit[4]);
			$('#unità_s').text(digit[5]);

			$('#decina_h, #unità_h, #decina_m, #unità_m, #decina_s, #unità_s, #label_h, #label_m, #label_s').css('color','#000');

			break;

			default:
			//
			resetAll();

			break;

		} //end switch
}

function resetAll(){

	/* Digits */
	$('#decina_h, #unità_h, #decina_m, #unità_m, #decina_s, #unità_s').text(0);
	$('#decina_h, #unità_h, #decina_m, #unità_m, #decina_s, #unità_s').css('display','block');
	$('#decina_h, #unità_h, #decina_m, #unità_m, #decina_s, #unità_s').css('color','#cfcfcf');
	$('#decina_h').css('grid-column-start','3');
	$('#unità_h').css('grid-column-start','4');
	$('#label_h').css('grid-column-start','5');
	$('#decina_m').css('grid-column-start','6');
	$('#unità_m').css('grid-column-start','7');
	$('#label_m').css('grid-column-start','8');
	$('#decina_s').css('grid-column-start','9');
	$('#unità_s').css('grid-column-start','10');
	$('#label_s').css('grid-column-start','11');


	/* Labels */
	$('#label_h, #label_m, #label_s').css('display','block');
	$('#label_h, #label_m, #label_s').css('color','#cfcfcf');
	$('#counter_n_input').val('');

	$('#c_stop').hide();
	$('#c_start').show();

	$(document).prop('title', 'Andrea Vaccarella\'s websites: Countdown');
	duration = 0;
	digit = '';
}

function fromDigitsToSecs(digit){
	//console.log('duration = ', duration);
	switch(digit.length){
		case 1:
			duration = parseInt(digit[0]);
			$('#decina_h, #unità_h, #decina_m, #unità_m, #decina_s, #label_h, #label_m').css('display','none');
			$('#unità_s').css('grid-column-start','6');
			$('#label_s').css('grid-column-start','7');
			return duration;
		break;

		case 2:
			duration = parseInt(digit[0])*10 +
					   parseInt(digit[1]);
			$('#decina_h, #unità_h, #decina_m, #unità_m, #label_h, #label_m').css('display','none');
			$('#decina_s').css('grid-column-start','6');
			$('#unità_s').css('grid-column-start','7');
			$('#label_s').css('grid-column-start','8');
			return duration;
		break;

		case 3:
			duration = parseInt(digit[0])*60 +
					   parseInt(digit[1])*10 +
					   parseInt(digit[2]);
			$('#decina_h, #unità_h, #label_h, #decina_m').css('display','none');
			$('#unità_m').css('grid-column-start','5');
			$('#label_m').css('grid-column-start','6');
			$('#decina_s').css('grid-column-start','7');
			$('#unità_s').css('grid-column-start','8');
			$('#label_s').css('grid-column-start','9');

			return duration;
		break;

		case 4:
			duration = (parseInt(digit[0])*10 + parseInt(digit[1]))*60 +
						parseInt(digit[2])*10 + parseInt(digit[3]);
			$('#decina_h, #unità_h, #label_h').css('display','none');
			$('#decina_m').css('grid-column-start','4');
			$('#unità_m').css('grid-column-start','5');
			$('#label_m').css('grid-column-start','6');
			$('#decina_s').css('grid-column-start','7');
			$('#unità_s').css('grid-column-start','8');
			$('#label_s').css('grid-column-start','9');

			return duration;
		break;

		case 5:
			duration = parseInt(digit[0])*60*60 +
					  (parseInt(digit[1])*10 + parseInt(digit[2]))*60 +
					   parseInt(digit[3])*10 + parseInt(digit[4]);
			$('#decina_h').css('display','none');
			$('#unità_h').css('grid-column-start','3');
			$('#label_h').css('grid-column-start','4');
			$('#decina_m').css('grid-column-start','5');
			$('#unità_m').css('grid-column-start','6');
			$('#label_m').css('grid-column-start','7');
			$('#decina_s').css('grid-column-start','8');
			$('#unità_s').css('grid-column-start','9');
			$('#label_s').css('grid-column-start','10');

			return duration;
		break;

		case 6:
			duration = (parseInt(digit[0])*10 + parseInt(digit[1]))*60*60 +
					   (parseInt(digit[2])*10 + parseInt(digit[3]))*60 +
					    parseInt(digit[4])*10 + parseInt(digit[5]);
			return duration;
		break;

		default:
			duration = 0;
			return duration;
		break;

	}
}

function makeItGray(what){
	//console.log('what?');
	switch(what){
		case "hours":
			$('#decina_h, #unità_h, #label_h').css('color','#cfcfcf');
		break;

		case "minutes":
			$('#decina_m, #unità_m, #label_m').css('color','#cfcfcf');
		break;
	}
}

function playSound(){
	const audio = new Audio('https://www.andreavaccarella.com/websites/2023/timers/audio/short_success.mp3');

	audio.addEventListener("canplaythrough", (event) => {
		/* the audio is now playable; play it if permissions allow */
		audio.play();
	});
}

function delayCheck() {
  if (timedelay == 3) {
    $('.hide').removeClass('show');
    timedelay = 1;
  }
  timedelay = timedelay + 1;
}

function showAllEvent() {
  $('.hide').addClass('show');
  timedelay = 1;
  clearInterval(_delay);
  _delay = setInterval(delayCheck, 500);
}
