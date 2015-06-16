// #####################################################################
// ========================= T011-SENTENCE TOOL  =======================
// #####################################################################

$( document ).ready(function() {

	for (var i = 0; i < localStorage.length; i++){

	    key = localStorage.key(i);
		keyInit = key.substring(0, 2)

		if (keyInit == "lm") {
			itemText = localStorage.getItem(key);
			$("table[data-list] tbody").append("<tr data-list-id='" + key + "'><td>" + itemText + "</td><td><button class='btn btn-danger btn-xs pull-right' data-list-delete type='submit'>Delete</button></td></tr>")
		}

	}

	postUpdate();

	$("input[data-list]").keypress(function(e){
	    if(e.which == 13){
	    	
	        itemText = $("input[data-list]").val();
	        itemId = "lm" + Math.floor((Math.random() * 999) + 1);
	        localStorage.setItem(itemId, itemText);
	        $("table[data-list] tbody").append("<tr data-list-id='" + itemId + "'><td>" + itemText + "</td><td><button class='btn btn-danger btn-xs pull-right' data-list-delete type='submit'>Delete</button></td></tr>")
	        $("input[data-list]").val("");
	        postUpdate();
	        
	    }
	});

	$("table[data-list] tbody").on("click", "button[data-list-delete]", function(){

		itemId = $(this).parent().parent().attr("data-list-id");

		localStorage.removeItem(itemId);
		$("table[data-list] tbody tr[data-list-id='" + itemId + "']").remove();
		postUpdate();

	});
	
});

function postUpdate() {

}