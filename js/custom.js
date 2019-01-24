

/*Basic jQuery*/
(function( $ ) {
	
	"use strict";

	$( document ).ready(function() {

		if( $('.range-slider').length ){
			var range_ele;
			var compare_wrap = $('.range-slider').parents(".compare-wrap");
			var compare_paypal = $(compare_wrap).find(".compare-paypal");
			var compare_stripe = $(compare_wrap).find(".compare-stripe");
			var compare_dijango = $(compare_wrap).find(".compare-dijango");
			
			var paypal_arr = [];
			paypal_arr[0] = $(compare_paypal).attr("data-percent");
			paypal_arr[1] = $(compare_paypal).attr("data-additional");
			paypal_arr[2] = $(compare_paypal).attr("data-min");
			
			var stripe_arr = [];
			stripe_arr[0] = $(compare_stripe).attr("data-percent");
			stripe_arr[1] = $(compare_stripe).attr("data-additional");
			stripe_arr[2] = $(compare_stripe).attr("data-min");
			
			var dijango_arr = [];
			dijango_arr[0] = $(compare_dijango).attr("data-percent");
			dijango_arr[1] = $(compare_dijango).attr("data-additional");
			dijango_arr[2] = $(compare_dijango).attr("data-min");
			
			var compare_json = { 'compare_paypal': compare_paypal, 'compare_stripe': compare_stripe, 'compare_dijango': compare_dijango, 'paypal_arr': paypal_arr, 'stripe_arr': stripe_arr, 'dijango_arr': dijango_arr };
			
			$('.range-slider').rangeslider({
				polyfill: false,
				onInit: function() { 
					compare_payment( compare_json, $('.range-slider').val() );
				},
				onSlide: function(position, value) {
					$( range_ele ).text(value);
					compare_payment( compare_json, value );
				},
			});
			var def_value = $('.range-slider').val();
			$( ".range-slider" ).next(".rangeslider").prepend( '<div class="rangeslider__parts"><div class="rangeslider__parts__part"></div><div class="rangeslider__parts__part"></div><div class="rangeslider__parts__part"></div></div>' );
			$( ".range-slider" ).next(".rangeslider").find(".rangeslider__handle").append( '<div class="rangeslider__tooltip__value"><span>$</span> <span class="range-value">'+ def_value +'</span><div>Transaction</div></div>');
			range_ele = $( ".range-slider" ).next(".rangeslider").find(".range-value");
		}
	  
	}); // document ready end
	
	function compare_payment( compare_json, value ){

		var stripe_trans, paypal_trans, dijango_trans, t, cheap_cal;
		
		cheap_cal = '';
		//Dijango
		t = parseFloat( ( ( ( value / 100 ) * compare_json.dijango_arr[0] ) + parseFloat( compare_json.dijango_arr[1] ) ) ).toFixed(2);
		dijango_trans = compare_json.dijango_arr[2] < t ? t : compare_json.dijango_arr[2];
		$(compare_json.compare_dijango).find(".payment-val-update").text(dijango_trans);
		
		//Stripe
		t = parseFloat( ( ( ( value / 100 ) * compare_json.stripe_arr[0] ) + parseFloat( compare_json.stripe_arr[1] ) ) ).toFixed(2);
		stripe_trans = compare_json.stripe_arr[2] < t ? t : compare_json.stripe_arr[2];
		cheap_cal = cheap_cal + '<p class="alert-success">We are '+ parseFloat( stripe_trans / dijango_trans ).toFixed(2) +'% cheaper! than stripe</p>';
		$(compare_json.compare_stripe).find(".payment-val-update").text(stripe_trans);
		
		//Paypal
		t = parseFloat( ( ( ( value / 100 ) * compare_json.paypal_arr[0] ) + parseFloat( compare_json.paypal_arr[1] ) ) ).toFixed(2);
		paypal_trans = compare_json.paypal_arr[2] < t ? t : compare_json.paypal_arr[2];
		cheap_cal = cheap_cal + '<p class="alert-success">We are '+ parseFloat( paypal_trans / dijango_trans ).toFixed(2) +'% cheaper! than paypal</p>';
		$(compare_json.compare_paypal).find(".payment-val-update").text(paypal_trans);

		$(compare_json.compare_dijango).find(".cheap-cal-wrap").empty().html( cheap_cal );
		
	}
	
	
	
})( jQuery );

