$("input[type='search']").keyup(function(){ 
		
	var type = $(this).data("type");
	$("table[data-type='" + type + "'] tbody tr").css("display", "");
	var searchterm = $(this).val();

	jQuery.expr[':'].contains = function(a, i, m) {
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};

	if (searchterm.length > 1) {
		var match = $("table[data-type='" + type + "'] tbody tr:contains('" + searchterm + "')");
		var nomatch = $("table[data-type='" + type + "'] tbody tr:not(:contains('" + searchterm + "'))");
		match.css("display", "show");
		nomatch.css("display", "none");
	}

	else {
		$("table[data-type='" + type + "'] tbody tr").css("display", "");
	}

});

$(document).on("click","table[data-type='users'] tbody tr", function() {
	
	$("table[data-type='users'] tbody tr").removeClass("active");
	$(this).toggleClass("active");

	$("div.tab-pane[data-type='accounts'] ul").empty();
	$("div.tab-pane[data-type='courses'] ul").empty();
	$("div.tab-pane[data-type='groups'] ul").empty();

	$("a[href='#details']").tab("show");

	selectedUserId = $(this).attr('data-user-id');
	selectedAccounts = $(this).attr('data-accounts');
	selectedCourses = $(this).attr('data-courses');
	selectedGroups = $(this).attr('data-groups');

	selectedFirstName = $("tr[data-user-id='" + selectedUserId + "'] td:first").text();
	selectedLastName = $("tr[data-user-id='" + selectedUserId + "'] td:nth-child(2)").text();
	selectedEmailAddress = $("tr[data-user-id='" + selectedUserId + "'] td:nth-child(3)").text();

	// Profile
	$("div.tab-pane[data-type='details'] input#first-name").val(selectedFirstName);
	$("div.tab-pane[data-type='details'] input#last-name").val(selectedLastName);
	$("div.tab-pane[data-type='details'] input#email-address").val(selectedEmailAddress);
	$("div.tab-pane[data-type='details'] input#enabled").val("True");
	$("div.tab-pane[data-type='details'] input#user-id").val(selectedUserId);

	// Accounts
	if (selectedAccounts != "") {
		var selectedAccount = selectedAccounts.split(',');
		$.each( selectedAccount, function( key, value ) {
			$("div.tab-pane[data-type='accounts'] ul").append("<li>Generic account " + value + "</li>");
		});
	}
	
	// Courses
	if (selectedCourses != "") {
		var selectedCourse = selectedCourses.split(',');
		$.each( selectedCourse, function( key, value ) {
			$("div.tab-pane[data-type='courses'] ul").append("<li>Generic course " + value + "</li>");
		});
	}

	// Groups
	if (selectedGroups != "") {
		var selectedGroup = selectedGroups.split(',');
		$.each( selectedGroup, function( key, value ) {
			$("div.tab-pane[data-type='groups'] ul").append("<li>Generic group " + value + "</li>");
		});
	}
		
});