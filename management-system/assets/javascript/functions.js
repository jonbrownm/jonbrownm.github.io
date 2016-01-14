/* 1. Triggers */
/* 2. Forms */
/* 3. Data */
/* 4. Tabs */
/* 5. Dialog */
/* 6. Responsive Layout */
/* 7. Actions */


/* ################## START:1. TRIGGERS ################## */

	/* document load */
	$(document).ready(function() {
		setDialog();
		responsiveNav();
		datePicker();
		revealPanel();
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
	
/* ################## END:1. TRIGGERS ################## */


/* ################## END:2. FORMS ################## */		

	/* date-picker */
	function datePicker() {
		if (!Modernizr.inputtypes.date) {
			$("#add-user-dob").datepicker({
				showAnim: 'fadeIn',
				maxDate: "-18Y",
				changeMonth: true,
				changeYear: true,
				dateFormat: "mm/dd/yy"
			});
		}
	}

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

/* ################## END:2. FORMS ################## */

	
/* ################## START:3. DATA ################## */	

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
	
/* ################## END:3. DATA ################## */		

	
/* ################## START:4. TABS ################## */	

	/* sets panel slider */
	function revealPanel() {
		$("div.resizeable").resizable({
	        handles: "s",
	        autoHide: true,
	        minHeight: 150
	    });
		$(".ui-resizable-s").append("&#8226; &#8226; &#8226;");
		$("div.tabs div:not(.default)").hide();
	}

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

/* ################## END:4. TABS ################## */

	
/* ################## START:5. DIALOG ################## */	
	
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

/* ################## END:5. DIALOG ################## */
	

/* ################## START:6. RESPONSIVE-LAYOUT ################## */

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

/* ################## START:6. RESPONSIVE-LAYOUT ################## */


/* ################## START:7. ACTIONS ################## */
	
	/* add user */
	
	/* open dialog */
	$("#button-add-user").click(function() {
		$("#dialog-add-user form")[0].reset();
		$("#dialog-add-user").dialog("open");
	});
	
	/* ok */
	$("#dialog-add-user form fieldset.actions input[type='submit']").click(function(event) {
		event.preventDefault();
		var firstname = $("#dialog-add-user form fieldset #add-firstname").val(); 
		var lastname = $("#dialog-add-user form fieldset #add-lastname").val(); 
		var email = $("#dialog-add-user form fieldset #add-email").val(); 
	});
	
	/* cancel */
	$("#dialog-add-user form fieldset.actions input[type='reset']").click(function() {
		$("#dialog-add-user").dialog("close");
	});
	

	/* delete user*/
	
	/* open dialog */
	$("div.tabs[data-type='users'] div[data-type='self']").on("click","#button-delete-user", function(event) {
		event.preventDefault();
		$("#dialog-delete-user").dialog("open");
	});
	
	/* ok */
	$("#dialog-delete-user form fieldset.actions input[type='submit']").click(function(event) {
		event.preventDefault();
	});
	
	/* cancel */
	$("#dialog-delete-user form fieldset.actions input[type='reset']").click(function() {
		$("#dialog-delete-user").dialog("close");
	});


	/* update user */
	
	/* ok */
	$("div.tabs[data-type='users'] div[data-type='self']").on("click","#button-save-user", function(event) {	
		event.preventDefault();
		var firstname = $("#update-firstname").val(); 
		var lastname = $("#update-lastname").val(); 
		var email = $("#update-email").val(); 
	});
	
	/* get user */
	
	$(document).on("click","table[data-type='users'] tbody tr", function() {
		$("table[data-type='users'] tbody tr").removeClass("selected");
		$(this).toggleClass("selected");
		$("div.tabs[data-type='users'] div").empty()
		
		/* profile */
		$("div.tabs[data-type='users'] div[data-type='self']").append("<form></form>");
		$("div.tabs[data-type='users'] div[data-type='self'] form").append("<fieldset class='data1'><div><label>First Name:</label><input type='text' id='update-firstname' value='First Name' required /></div><div><label>Last Name:</label><input type='text' id='update-lastname' value='sadf' required /></div><div><label>Email:</label><input type='email' id='update-email' value='Email' maxlength='256' required /></div></fieldset>");
		$("div.tabs[data-type='users'] div[data-type='self'] form").append("<fieldset class='data2'><div><label>Enabled:</label><input type='text' value='True' disabled /></div><div><label>ID User:</label><input type='text' value='111010' disabled /></div></fieldset>");
		$("div.tabs[data-type='users'] div[data-type='self'] form").append("<fieldset class='actions'><button id='button-save-user' class='btn-primary'>Save Changes</button><button id='button-delete-user' class='btn-secondary'>Delete User</button></fieldset>");

		/* account */
		$("div.tabs[data-type='users'] div[data-type='account']").append("<ul><li><strong>Account Name</strong></li><li>Description</li></ul>");
		$("div.tabs[data-type='users'] div[data-type='account']").append("<fieldset class='actions'><button id='button-change-accounts' class='btn-primary'>Add or Remove Accounts</button></fieldset>")

		/* courses */
		$("div.tabs[data-type='users'] div[data-type='courses']").append("<ul><li><strong>Course Name</strong></li><li>Description</li></ul>");
		$("div.tabs[data-type='users'] div[data-type='courses']").append("<fieldset class='actions'><button id='button-change-courses' class='btn-primary'>Add or Remove Courses</button></fieldset>");

		/* groups */
		$("div.tabs[data-type='users'] div[data-type='groups']").append("<ul><li><strong>Group Name</strong></li><li>Description</li></ul>");
		$("div.tabs[data-type='users'] div[data-type='groups']").append("<fieldset class='actions'><button id='button-change-groups' class='btn-primary'>Add or Remove Groups</button></fieldset>");
		
	});