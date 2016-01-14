
	//
	// Triggers
	//

	// Document load
	$(document).ready(function() {
		setDialog();
		responsiveNav();
		revealPanel();
	});
	
	// Window resize
	$(window).resize(function() {
		setDialog();
		responsiveNav();
	});
	

	//
	// Function - search users
	//

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
	

	//
	// Function - create reveal panel
	//

	function revealPanel() {
		$("div.resizeable").resizable({
	        handles: "s",
	        autoHide: true,
	        minHeight: 150
	    });
		$(".ui-resizable-s").append("&#8226; &#8226; &#8226;");
		$("div.tabs div:not(.default)").hide();
	}


	//
	// Function - reveal tabs
	//

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


	//
	// Function - create dialog
	//
	
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


	//
	// Function - hides responsive nav
	//

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
	

	//
	// Function - shows responsive button
	//

	$("li#responsive-navigation a").click(function(event) {
		event.preventDefault();	
		if ($("nav#navigation ul.primary").is(":hidden")) {
			$("nav#navigation ul.primary").css("opacity",0).show().animate({opacity:1},100);
		}
		else {
			$("nav#navigation ul.primary").css("opacity",1).animate({opacity:0},100).delay(300).slideUp(0);
		}
	});

	
	//
	// Function - add user
	//

	// Open dialog
	$("#button-add-user").click(function() {
		$("#dialog-add-user form")[0].reset();
		$("#dialog-add-user").dialog("open");
	});
	
	// Submit
	$("#dialog-add-user form fieldset.actions input[type='submit']").click(function(event) {
		event.preventDefault();
	});
	
	// Cancel
	$("#dialog-add-user form fieldset.actions input[type='reset']").click(function() {
		$("#dialog-add-user").dialog("close");
	});
	

	//
	// Function - delete user
	//
	
	// Open dialog
	$("div.tabs[data-type='users'] div[data-type='self']").on("click","#button-delete-user", function(event) {
		event.preventDefault();
		$("#dialog-delete-user").dialog("open");
	});
	
	// Submit
	$("#dialog-delete-user form fieldset.actions input[type='submit']").click(function(event) {
		event.preventDefault();
	});
	
	// Cancel
	$("#dialog-delete-user form fieldset.actions input[type='reset']").click(function() {
		$("#dialog-delete-user").dialog("close");
	});


	//
	// Function - save user
	//
	
	// Submit
	$("div.tabs[data-type='users'] div[data-type='self']").on("click","#button-save-user", function(event) {	
		event.preventDefault();
	});
	
	
	//
	// Function - get user
	//
	
	$(document).on("click","table[data-type='users'] tbody tr", function() {
		$("table[data-type='users'] tbody tr").removeClass("selected");
		$(this).toggleClass("selected");

		selectedUserId = $(this).attr('data-user-id')
		selectedFirstName = $("tr[data-user-id='" + selectedUserId + "'] td:first").text();
		selectedLastName = $("tr[data-user-id='" + selectedUserId + "'] td:nth-child(2)").text();
		selectedEmail = $("tr[data-user-id='" + selectedUserId + "'] td:nth-child(3)").text();

		$("div.tabs[data-type='users'] div").empty()
		
		// Profile
		$("div.tabs[data-type='users'] div[data-type='self']").append("<form></form>");
		$("div.tabs[data-type='users'] div[data-type='self'] form").append("<fieldset class='data1'><div><label>First Name:</label><input type='text' id='update-firstname' value='" + selectedFirstName + "' required /></div><div><label>Last Name:</label><input type='text' id='update-lastname' value='" + selectedLastName + "' required /></div><div><label>Email:</label><input type='email' id='update-email' value='" + selectedEmail + "' maxlength='256' required /></div></fieldset>");
		$("div.tabs[data-type='users'] div[data-type='self'] form").append("<fieldset class='data2'><div><label>Enabled:</label><input type='text' value='True' disabled /></div><div><label>ID User:</label><input type='text' value='" + selectedUserId + "' disabled /></div></fieldset>");
		$("div.tabs[data-type='users'] div[data-type='self'] form").append("<fieldset class='actions'><button id='button-save-user' class='btn-primary'>Save Changes</button><button id='button-delete-user' class='btn-secondary'>Delete User</button></fieldset>");

		// Account
		$("div.tabs[data-type='users'] div[data-type='account']").append("<ul><li><strong>Account Name</strong></li><li>This is a short description of this account</li></ul>");
		$("div.tabs[data-type='users'] div[data-type='account']").append("<fieldset class='actions'><button id='button-change-accounts' class='btn-primary'>Add or Remove Accounts</button></fieldset>")

		// Courses
		$("div.tabs[data-type='users'] div[data-type='courses']").append("<ul><li><strong>Course Name</strong></li><li>This is a short description of this course</li></ul>");
		$("div.tabs[data-type='users'] div[data-type='courses']").append("<fieldset class='actions'><button id='button-change-courses' class='btn-primary'>Add or Remove Courses</button></fieldset>");

		// Groups
		$("div.tabs[data-type='users'] div[data-type='groups']").append("<ul><li><strong>Group Name</strong></li><li>This is a short description of this group</li></ul>");
		$("div.tabs[data-type='users'] div[data-type='groups']").append("<fieldset class='actions'><button id='button-change-groups' class='btn-primary'>Add or Remove Groups</button></fieldset>");
		
	});