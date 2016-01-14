/* 1. Triggers */
/* 2. Forms */
/* 3. Data */
/* 4. Tabs */
/* 5. Dialog */
/* 6. Responsive Layout */


/* ################## START:TRIGGERS ################## */

	/* document load */
	$(document).ready(function() {
		setDialog();
		responsiveNav();
	});
	
	/* window resize */
	$(window).resize(function() {
		setDialog();
		responsiveNav();
	});

	/* ajax loading */
	$(document).ajaxStart(function(){
		$("#ajax").show();
	}).ajaxSuccess(function(){
		$("#ajax").fadeOut(1000);
	}).ajaxError(function(){
		alert("Error with AJAX request data returned.");
	});	
	
/* ################## END:TRIGGERS ################## */


/* ################## END:FORMS ################## */		

	/* multi-select */
	$("div table[data-function='multiselect'] tbody tr").click(function() {  
		var checkbox = $(this).find("td input:checkbox"); 
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
			checkbox.prop("checked", false);
		}
		else {
	        $(this).addClass("selected");
	        checkbox.prop("checked", true);
		}
	});
	
	/* radio-button */
	$("div[data-input='radio'] input[type='radio']").click(function() {
		$(this).parent().parent().children("label").removeClass("checked");
		if ($(this).parent().hasClass("checked")) {
			$(this).parent().removeClass("checked")
		} else {
			$(this).parent().addClass("checked");
		};
	});

/* ################## END:FORMS ################## */

	
/* ################## START:DATA ################## */	

	/* search */
	$("input.search").keyup(function(){ 
		var type = $(this).data("type");
		$("table[data-type='" + type + "'] tbody tr").css("display", "");
		var searchterm = $(this).val();
		jQuery.expr[':'].contains = function(a, i, m) {
			return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};
		if(searchterm.length > 1) {
			var match = $("table[data-type='" + type + "'] tbody tr:contains('" + searchterm + "')");
			var nomatch = $("table[data-type='" + type + "'] tbody tr:not(:contains('" + searchterm + "'))");
			match.css("display", "show");
			nomatch.css("display", "none");
		} else {
			$("table[data-type='" + type + "'] tbody tr").css("display", "");
		}
	});
	
/* ################## END:DATA ################## */		

	
/* ################## START:TABS ################## */	

	/* shows/hides tabs */
	$("div.tabs ul li a").click(function(event) {
		event.preventDefault();
		var type = $(this).data("type");
		if ($("div.tabs").children("div[data-type='" + type + "']").is(":hidden")) {
			$("div.tabs").children("div").hide()
			$("div.tabs").children("div[data-type='" + type + "']").show();
			$("div.tabs ul li a").removeClass("selected")
			$(this).addClass("selected")
		}
		else {
			$("div.tabs").children("div[data-type='" + type + "']").hide();
			$(this).removeClass("selected")
		}
	});

/* ################## END:TABS ################## */

	
/* ################## START:DIALOG ################## */	
	
	function setDialog() {
		var xsize = ($(window).width())/100;
		var yposition = ($(window).height())*.25;
		if ($(window).width() > 800) {
			var width = xsize * 50;
		}
		if ($(window).width() < 799) {
			var width = xsize * 90;
		}
		$(".dialog").dialog({
			autoOpen: false,
			modal: true,
			draggable: false,
			resizable: false,
			width: width,
			position: ['top', yposition],
			show: {
				effect: "fade"
			},
			hide: {
				effect: "fade"
			}
		});	
	}

/* ################## END:DIALOG ################## */
	

/* ################## START:RESPONSIVE-LAYOUT ################## */

	/* shows/hides navigation - screen size */
	function responsiveNav() {
		if ($(window).width() > 550) {
			$("nav#navigation ul.primary").css("opacity",1).show();
			navHeight = ($("nav#navigation").height()) + 20;
			$("#content").css( "padding-top", navHeight );
		}
		else {
			$("nav#navigation ul.primary").css("opacity",0).hide();
			navHeight = ($("nav#navigation").height()) + 20;
			$("#content").css( "padding-top", navHeight );
		}
	}
	
	/* shows/hides navigation - button */
	$("li#responsive-navigation a").click(function(event) {
		event.preventDefault();	
		if ($("nav#navigation ul.primary").is(":hidden")) {
			$("nav#navigation ul.primary").css("opacity",0).show().animate({opacity:1},100);
		}
		else {
			$("nav#navigation ul.primary").css("opacity",1).animate({opacity:0},100).delay(300).slideUp(0);
		}
	});

/* ################## START:RESPONSIVE-LAYOUT ################## */