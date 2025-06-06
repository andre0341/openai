var duration = 1;
var digit = '';
var timeID = setInterval(countDown, 1000); //1000 = 1sec
var hours = 0;
var minutes = 0;
var seconds = 0;
var digit_zero = '0';

$(document).ready(function (){

	$('#c_start').on("click", function(){
		console.log('countdown started');
		$('#counter_n_input').css('z-index', '9');
		$(this).css('display', 'none');
		$('#c_stop').css('display', 'block');

		var digit = $( "#counter_n_input" ).val();

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

}); //end ready


function stopCountdown(){
	clearInterval(timeID);
}

function countDown(){
	duration = duration - 1;
	hours = 0; minutes = 0; seconds = 0;
	console.log('duration (in countdown): ', duration);

	if(duration >= 0){

		if(duration > 3600){
			hours = Math.floor(duration / 3600);

			minutes = Math.floor((duration%60)%60);

			if(minutes > 60){
				minutes = Math.floor(duration / 60);

			} else {
				minutes = 0;
			}

		} else {
			hours = 0;

			if(duration > 60){
				minutes = Math.floor(duration / 60);
			} else {
				minutes = 0;
			}

		}

		seconds = duration % 60;



		console.log('hrs remaining = ', hours);
		/* minutes = Math.floor((duration - hours * 3600) % 60); */
		console.log('min remaining = ', minutes);

		/* seconds = Math.floor(duration - hours * 3600 - minutes * 60); */
		console.log('sec remaining = ', seconds);


		duration = duration.toString();
		console.log('duration PRE = ', duration);
		//duration = fromDigitsToSecs(duration);
		var temp = '';

		var hrs = hours.toString();
		var min = minutes.toString();
		var sec = seconds.toString();

		if (hrs.length < 2){ hrs = digit_zero.concat(hrs);}
		if (min.length < 2){ min = digit_zero.concat(min);}
		if (sec.length < 2){ sec = digit_zero.concat(sec);}


		//duration = temp.concat(hrs,min,sec);

		console.log('hms = ', hrs, ' : ', min, ' : ' , sec);
		//console.log('dur conc =', duration);

		//duration = fromDigitsToSecs(duration);
		splitDigits(duration);
		console.log('duration HERE ', duration);
		//duration = parseInt(duration);

	} else {
		stopCountdown();
	}
}

function splitDigits(digit){
		/* console.log(digit.length); */

		switch(digit.length){
			case 1:
			//
			$('#decina_h').text(0);
			$('#unità_h').text(0);

			$('#decina_m').text(0);
			$('#unità_m').text(0);

			$('#decina_s').text(0);
			$('#unità_s').text(digit);


			$('#decina_h').css('color','#cfcfcf');
			$('#unità_h').css('color','#cfcfcf');

			$('#decina_m').css('color','#cfcfcf');
			$('#unità_m').css('color','#cfcfcf');

			$('#decina_s').css('color','#cfcfcf');
			$('#unità_s').css('color','#000');

			/* Labels */
			$('#label_h').css('color','#cfcfcf');
			$('#label_m').css('color','#cfcfcf');
			$('#label_s').css('color','#000');

			break;

			case 2:
			//
			$('#decina_h').text(0);
			$('#unità_h').text(0);

			$('#decina_m').text(0);
			$('#unità_m').text(0);

			$('#decina_s').text(digit[0]);
			$('#unità_s').text(digit[1]);


			$('#decina_h').css('color','#cfcfcf');
			$('#unità_h').css('color','#cfcfcf');

			$('#decina_m').css('color','#cfcfcf');
			$('#unità_m').css('color','#cfcfcf');

			$('#decina_s').css('color','#000');
			$('#unità_s').css('color','#000');

			/* Labels */
			$('#label_h').css('color','#cfcfcf');
			$('#label_m').css('color','#cfcfcf');
			$('#label_s').css('color','#000');


			break;

			case 3:
			//
			$('#decina_h').text(0);
			$('#unità_h').text(0);

			$('#decina_m').text(0);
			$('#unità_m').text(digit[0]);

			$('#decina_s').text(digit[1]);
			$('#unità_s').text(digit[2]);

			$('#decina_h').css('color','#cfcfcf');
			$('#unità_h').css('color','#cfcfcf');

			$('#decina_m').css('color','#cfcfcf');
			$('#unità_m').css('color','#000');

			$('#decina_s').css('color','#000');
			$('#unità_s').css('color','#000');

			/* Labels */
			$('#label_h').css('color','#cfcfcf');
			$('#label_m').css('color','#000');
			$('#label_s').css('color','#000');

			break;

			case 4:
			//
			$('#decina_h').text(0);
			$('#unità_h').text(0);

			$('#decina_m').text(digit[0]);
			$('#unità_m').text(digit[1]);

			$('#decina_s').text(digit[2]);
			$('#unità_s').text(digit[3]);


			$('#decina_h').css('color','#cfcfcf');
			$('#unità_h').css('color','#cfcfcf');

			$('#decina_m').css('color','#000');
			$('#unità_m').css('color','#000');

			$('#decina_s').css('color','#000');
			$('#unità_s').css('color','#000');

			/* Labels */
			$('#label_h').css('color','#cfcfcf');
			$('#label_m').css('color','#000');
			$('#label_s').css('color','#000');

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
			$('#unità_h').css('color','#000');

			$('#decina_m').css('color','#000');
			$('#unità_m').css('color','#000');

			$('#decina_s').css('color','#000');
			$('#unità_s').css('color','#000');

			/* Labels */
			$('#label_h').css('color','#000');
			$('#label_m').css('color','#000');
			$('#label_s').css('color','#000');

			break;

			case 6:
			//
			$('#decina_h').text(digit[0]);
			$('#unità_h').text(digit[1]);

			$('#decina_m').text(digit[2]);
			$('#unità_m').text(digit[3]);

			$('#decina_s').text(digit[4]);
			$('#unità_s').text(digit[5]);

			$('#decina_h').css('color','#000');
			$('#unità_h').css('color','#000');

			$('#decina_m').css('color','#000');
			$('#unità_m').css('color','#000');

			$('#decina_s').css('color','#000');
			$('#unità_s').css('color','#000');

			/* Labels */
			$('#label_h').css('color','#000');
			$('#label_m').css('color','#000');
			$('#label_s').css('color','#000');

			break;

			default:
			//
			resetAll();

			break;

		} //end switch
}

function resetAll(){

	/* Digits */
	$('#decina_h').text(0);
	$('#unità_h').text(0);

	$('#decina_m').text(0);
	$('#unità_m').text(0);

	$('#decina_s').text(0);
	$('#unità_s').text(0);

	$('#decina_h').css('color','#cfcfcf');
	$('#unità_h').css('color','#cfcfcf');

	$('#decina_m').css('color','#cfcfcf');
	$('#unità_m').css('color','#cfcfcf');

	$('#decina_s').css('color','#cfcfcf');
	$('#unità_s').css('color','#cfcfcf');

	/* Labels */
	$('#label_h').css('color','#cfcfcf');
	$('#label_m').css('color','#cfcfcf');
	$('#label_s').css('color','#cfcfcf');

	$('#counter_n_input').val('');

	duration = 0;
	digit = '';
}

function fromDigitsToSecs(digit){
	console.log('duration = ', duration);
	switch(digit.length){
		case 1:
			duration = parseInt(digit[0]);
			return duration;
		break;

		case 2:
			duration = parseInt(digit[0])*10 + parseInt(digit[1]);
			return duration;
		break;

		case 3:
			duration = parseInt(digit[0])*60 + parseInt(digit[1])*10 + parseInt(digit[2]);
			return duration;
		break;

		case 4:
			duration = (parseInt(digit[0])*10 + parseInt(digit[1]))*60+ parseInt(digit[2])*10 + parseInt(digit[3]);
			return duration;
		break;

		case 5:
			duration = parseInt(digit[0])*60*60+(parseInt(digit[1])*10 + parseInt(digit[2]))*60+ parseInt(digit[3])*10 + parseInt(digit[4]);
			return duration;
		break;

		case 6:
			duration = (parseInt(digit[0])*10 + parseInt(digit[1]))*60*60+(parseInt(digit[2])*10 + parseInt(digit[3]))*60+ parseInt(digit[4])*10 + parseInt(digit[5]);
			return duration;
		break;

		default:
			duration = 0;
			return duration;
		break;

	}
}
