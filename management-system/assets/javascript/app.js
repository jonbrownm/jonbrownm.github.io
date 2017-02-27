
$(document).ready(function() {

	$.ajax({
        
        url: "assets/javascript/users.json",
        async: true,
        dataType: "json",
        success: function (allAccounts) {

            $.each(allAccounts.accounts,function(i, account){

                $("div.cmp-user-list table tbody").append("<tr data-user-id='" + account.id + "'><td>" + account.name + "</td><td>" + account.surname + "</td><td>" + account.email + "</td></tr>");

                	$("tr[data-user-id='" + account.id + "']").attr('data-accounts', account.accounts).attr('data-courses', account.courses).attr('data-groups', account.groups);

	                $.each(account.users, function(index, user){

	                    //$("ul").append("<li>" + user.name + user.category + "</li>");          

	                })

            });

        }

    })

	$.ajax({
		url: "assets/javascript/accounts.json",
		async: true,
		dataType: "json",
		success: function(data) {

			$.each(data, function(i, item) {

				$("div#modalAccounts .modal-body ul").append("<li class='list-group-item'><span>" + item.name + "</span><div class='btn-group pull-right' data-toggle='buttons'><label class='btn btn-primary'><input type='checkbox'> On</label><label class='btn btn-primary'><input type='checkbox'> Off</label></div><div class='clearfix'></div></li>");

			});		

		}

	})

	$.ajax({
		url: "assets/javascript/courses.json",
		async: true,
		dataType: "json",
		success: function(data) {

			$.each(data, function(i, item) {

				$("div#modalCourses .modal-body ul").append("<li class='list-group-item'><span>" + item.name + "</span><div class='btn-group pull-right' data-toggle='buttons'><label class='btn btn-primary'><input type='checkbox'> On</label><label class='btn btn-primary'><input type='checkbox'> Off</label></div><div class='clearfix'></div></li>");

			});		

		}

	})

	$.ajax({
		url: "assets/javascript/groups.json",
		async: true,
		dataType: "json",
		success: function(data) {

			$.each(data, function(i, item) {

				$("div#modalGroups .modal-body ul").append("<li class='list-group-item'><span>" + item.name + "</span><div class='btn-group pull-right' data-toggle='buttons'><label class='btn btn-primary'><input type='checkbox'> On</label><label class='btn btn-primary'><input type='checkbox'> Off</label></div><div class='clearfix'></div></li>");

			});		

		}

	})

});

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

$(".cmp-modal-new-user button[data-new-user]").click(function() {
	newUserName = $(".cmp-modal-new-user #new-first-name").val();
	newUserLastName = $(".cmp-modal-new-user #new-last-name").val();
	newUserEmailAddress = $(".cmp-modal-new-user #new-email-address").val();

	if ((newUserName !="") && (newUserLastName !="") && (newUserEmailAddress !="")) {
		$("div.cmp-user-list table tbody").append("<tr data-user-id=''><td>" + newUserName + "</td><td>" + newUserLastName + "</td><td>" + newUserEmailAddress + "</td></tr>");
		$(".cmp-modal-new-user").modal("hide");
		$(".cmp-modal-new-user #new-first-name").val("");
		$(".cmp-modal-new-user #new-last-name").val("");
		$(".cmp-modal-new-user #new-email-address").val("");
	}
});

$(document).on("click","table[data-type='users'] tbody tr", function() {
	
	$(".cmp-user-data[data-user-data-invalid]").hide();
	$(".cmp-user-data[data-user-data-valid]").show();

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
	$("div.tab-pane[data-type='details'] input#selected-first-name").val(selectedFirstName);
	$("div.tab-pane[data-type='details'] input#selected-last-name").val(selectedLastName);
	$("div.tab-pane[data-type='details'] input#selected-email-address").val(selectedEmailAddress);
	//$("div.tab-pane[data-type='details'] input#selected-enabled").val("True");
	$("div.tab-pane[data-type='details'] input#selected-user-id").val(selectedUserId);

	// Accounts
	if (selectedAccounts != "") {
		var selectedAccount = selectedAccounts.split(',');
		$.each( selectedAccount, function( key, value ) {

			$.ajax({
			    url: "assets/javascript/accounts.json",
			    async: true,
			    dataType: "json",
			    success: function(data) {

			    	$.each(data, function(i, item) {

			    		if(item.code == value) {

				        	$("div.tab-pane[data-type='accounts'] ul").append("<li class='list-group-item'>" + item.name + "  <span class='badge'>" + value + "</span></li>");

				    	}
					
					});

				}

			})
			
		});
	}
	
	// Courses
	if (selectedCourses != "") {
		var selectedCourse = selectedCourses.split(',');
		$.each( selectedCourse, function( key, value ) {

			$.ajax({
			    url: "assets/javascript/courses.json",
			    async: true,
			    dataType: "json",
			    success: function(data) {

			    	$.each(data, function(i, item) {

			    		if(item.code == value) {

				        	$("div.tab-pane[data-type='courses'] ul").append("<li class='list-group-item'>" + item.name + " <span class='badge'>" + value + "</span></li>");

				    	}
					
					});		

				}

			})
			
		});
	}

	// Groups
	if (selectedGroups != "") {
		var selectedGroup = selectedGroups.split(',');
		$.each( selectedGroup, function( key, value ) {

			$.ajax({
			    url: "assets/javascript/groups.json",
			    async: true,
			    dataType: "json",
			    success: function(data) {

			    	$.each(data, function(i, item) {

			    		if(item.code == value) {

				        	$("div.tab-pane[data-type='groups'] ul").append("<li class='list-group-item'>" + item.name + " <span class='badge'>" + value + "</span></li>");

				    	}
					
					});		

				}

			})
			
		});
	}
		
});




