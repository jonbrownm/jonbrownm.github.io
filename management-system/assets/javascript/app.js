
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

	            defaultDisplay = 0;
	            returnUserDisplay(defaultDisplay);

            })
        }

    });

	// generates accounts modal
	$.ajax({
		url: "assets/javascript/accounts.json",
		async: true,
		dataType: "json",
		success: function(data) {
			$.each(data, function(i, item) {
				$("cmp-modal-accounts .modal-body ul").append("<li class='list-group-item'><span>" + item.name + "</span><div class='btn-group pull-right' data-toggle='buttons'><label class='btn btn-default'><input type='checkbox'> On</label><label class='btn btn-default'><input type='checkbox'> Off</label></div><div class='clearfix'></div></li>");
			})
		}
	});

	// generates courses modal
	$.ajax({
		url: "assets/javascript/courses.json",
		async: true,
		dataType: "json",
		success: function(data) {
			$.each(data, function(i, item) {
				$("cmp-modal-courses .modal-body ul").append("<li class='list-group-item'><span>" + item.name + "</span><div class='btn-group pull-right' data-toggle='buttons'><label class='btn btn-default'><input type='checkbox'> On</label><label class='btn btn-default'><input type='checkbox'> Off</label></div><div class='clearfix'></div></li>");
			})	
		}
	});

	// generates groups modal
	$.ajax({
		url: "assets/javascript/groups.json",
		async: true,
		dataType: "json",
		success: function(data) {
			$.each(data, function(i, item) {
				$("cmp-modal-groups .modal-body ul").append("<li class='list-group-item'><span>" + item.name + "</span><div class='btn-group pull-right' data-toggle='buttons'><label class='btn btn-default'><input type='checkbox'> On</label><label class='btn btn-default'><input type='checkbox'> Off</label></div><div class='clearfix'></div></li>");
			})	
		}
	});

});


/****************  add user ****************/


$(".cmp-modal-new-user button[data-new-user]").click(function() {

	selectedFirstName = $(".cmp-modal-new-user #new-first-name").val();
	selectedLastName = $(".cmp-modal-new-user #new-last-name").val();
	selectedEmailAddress = $(".cmp-modal-new-user #new-email-address").val();

	addUserDisplay(selectedFirstName, selectedLastName, selectedEmailAddress);

	$(".cmp-modal-new-user").modal("hide");

});


/****************  select user ****************/


$(document).on("click","table[data-type='users'] tbody tr", function() {

	$("table[data-type='users'] tbody tr").removeClass("active");
	$(this).toggleClass("active");

	selectedUserId = $(this).attr('data-user-id');
	selectedFirstName = $("tr[data-user-id='" + selectedUserId + "'] td:first").text();
	selectedLastName = $("tr[data-user-id='" + selectedUserId + "'] td:nth-child(2)").text();
	selectedEmailAddress = $("tr[data-user-id='" + selectedUserId + "'] td:nth-child(3)").text();
	selectedAccounts = $(this).attr('data-accounts');
	selectedCourses = $(this).attr('data-courses');
	selectedGroups = $(this).attr('data-groups');

	renderUserDisplay(selectedFirstName, selectedLastName, selectedEmailAddress, selectedUserId);
	renderAccountsDisplay(selectedAccounts);
	renderCoursesDisplay(selectedCourses);
	renderGroupsDisplay(selectedGroups);
		
});


/****************  functions ****************/


function returnUserDisplay() {
	$.ajax({
        url: "assets/javascript/users.json",
        async: true,
        dataType: "json",
        success: function (allAccounts) {
            $.each(allAccounts.accounts,function(i, account){

				if (i == defaultDisplay) {

					selectedUserId = account.id;
					selectedFirstName = account.name;
					selectedLastName = account.surname;
					selectedEmailAddress = account.email;
					selectedAccounts = account.accounts;
					selectedCourses = account.courses;
					selectedGroups = account.groups;

					renderUserDisplay(selectedFirstName, selectedLastName, selectedEmailAddress, selectedUserId);
					renderAccountsDisplay(selectedAccounts);
					renderCoursesDisplay(selectedCourses);
					renderGroupsDisplay(selectedGroups);

				}

            });
        }

    })

}

function addUserDisplay() {
	if ((selectedFirstName !="") && (selectedLastName !="") && (selectedEmailAddress !="")) {
		$("div.cmp-user-list table tbody").append("<tr data-user-id=''><td>" + selectedFirstName + "</td><td>" + selectedLastName + "</td><td>" + selectedEmailAddress + "</td></tr>");
		
	}
}

function renderUserDisplay() {
	$("a[href='#details']").tab("show");
	$("div.tab-pane[data-type='details'] input#selected-first-name").empty().val(selectedFirstName);
	$("div.tab-pane[data-type='details'] input#selected-last-name").empty().val(selectedLastName);
	$("div.tab-pane[data-type='details'] input#selected-email-address").empty().val(selectedEmailAddress);
	//$("div.tab-pane[data-type='details'] input#selected-enabled").empty().val("True");
	$("div.tab-pane[data-type='details'] input#selected-user-id").empty().val(selectedUserId);
}

function renderAccountsDisplay() {
	if (selectedAccounts != "") {
		var selectedAccount = selectedAccounts.toString().split(',');
		$.each( selectedAccount, function( key, value ) {
			$.ajax({
			    url: "assets/javascript/accounts.json",
			    async: true,
			    dataType: "json",
			    success: function(data) {
			    	$.each(data, function(i, item) {
			    		if(item.code == value) {
				        	$("div.tab-pane[data-type='accounts'] ul").empty().append("<li class='list-group-item'>" + item.name + "  <span class='badge'>" + value + "</span></li>");
				    	}
					});
				}
			})
		});
	}
}

function renderCoursesDisplay() {
	$("div.tab-pane[data-type='courses'] ul").empty();
	if (selectedCourses != "") {
		var selectedCourse = selectedCourses.toString().split(',');
		$.each( selectedCourse, function( key, value ) {
			$.ajax({
			    url: "assets/javascript/courses.json",
			    async: true,
			    dataType: "json",
			    success: function(data) {
			    	$.each(data, function(i, item) {
			    		if(item.code == value) {
				        	$("div.tab-pane[data-type='courses'] ul").empty().append("<li class='list-group-item'>" + item.name + " <span class='badge'>" + value + "</span></li>");
				    	}
					});		
				}
			})
		});
	}
}

function renderGroupsDisplay() {
	$("div.tab-pane[data-type='groups'] ul").empty();
	if (selectedGroups != "") {
		var selectedGroup = selectedGroups.toString().split(',');
		$.each( selectedGroup, function( key, value ) {
			$.ajax({
			    url: "assets/javascript/groups.json",
			    async: true,
			    dataType: "json",
			    success: function(data) {
			    	$.each(data, function(i, item) {
			    		if(item.code == value) {
				        	$("div.tab-pane[data-type='groups'] ul").empty().append("<li class='list-group-item'>" + item.name + " <span class='badge'>" + value + "</span></li>");
				    	}
					});		
				}
			})
		});
	}
}