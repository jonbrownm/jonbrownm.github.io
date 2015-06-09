// #####################################################################
// ========================= T011-SENTENCE TOOL  =======================
// #####################################################################

$( document ).ready(function() {

	dataObject = $("div[data-sentence-tool]").data("sentence-tool");

	$.ajax({
	    url: "data.json",
	    async: true,
	    dataType: "json",
	    success: function(data) {

	    	// -------- 1: Sets defaults for options on page load --------
	    	$.each(data, function(i, item) {
		        if (dataObject == item.area) {
		        	$("[data-label]").html(item.label);
		            for(var n = 0; n < item.roles.length; n ++) {
		                $("[data-role]").append("<option value='" + item.roles[n].value + "'>" + item.roles[n].name + "</option>");
		                for(var j = 0; j < item.roles[n].actions.length; j ++) {
		                	if (n == 0) {
		                    	$("[data-action]").append("<option value='" + item.roles[n].actions[j].value + "'>" + item.roles[n].actions[j].name + "</option>");
		                	}
		                	$("[data-cta]").html("<a href='" + item.roles[0].actions[0].url + "' class='btn btn-info' role='button' data-omtrack='Sentence Tool Link:" + item.roles[0].actions[0].omtrack + "'>" + item.button + "</a>");
		                }    
		            }
		        }
			});

			// -------- 2: Renders options based on user selection --------
	        $("[data-role]").on("change", function() {
	        	$("[data-action]").empty();
	            roleSelected = (this.value);
		        $.each(data, function(i, item) {
			        if (dataObject == item.area) {
			            for(var n = 0; n < item.roles.length; n ++) {
			                for(var j = 0; j < item.roles[n].actions.length; j ++) {
			                	if (n == roleSelected) {
			                    	$("[data-action]").append("<option value='" + item.roles[n].actions[j].value + "'>" + item.roles[n].actions[j].name + "</option>");
			                	}
			                	$("[data-cta]").html("<a href='" + item.roles[roleSelected].actions[0].url + "' class='btn btn-info' role='button' data-omtrack='Sentence Tool Link:" + item.roles[roleSelected].actions[0].omtrack + "'>" + item.button + "</a>");
			                }    
			            }
			        }
				});
	        });

	        // -------- 3: Updates button based on user change --------
        	$("[data-action]").on("change", function() {
            	$("[data-cta]").empty();
            	roleSelected = $("[data-role]").val();
            	actionSelected = (this.value);
            	$.each(data, function(i, item) {
			        if (dataObject == item.area) {
            			$("[data-cta]").html("<a href='" + item.roles[roleSelected].actions[actionSelected].url + "' class='btn btn-info' role='button' data-omtrack='Sentence Tool Link:" + item.roles[roleSelected].actions[actionSelected].omtrack + "'>" + item.button + "</a>");
            		}
            	});
        	}); 		

		}

	})
	
});