// #####################################################################
// ========================= T011-SENTENCE TOOL  =======================
// #####################################################################

$( document ).ready(function() {

	for (var i = 0; i < localStorage.length; i++){
	    key = localStorage.key(i);
		keyInit = key.substring(0, 2)

		if (keyInit == "lm") {
			itemText = localStorage.getItem(key);
			$("ul[data-list]").append("<li data-list-id='" + key + "' class='list-group-item'>" + itemText + "<button class='btn btn-danger btn-xs pull-right' data-list-delete type='submit'>Delete</button></li>")
		}
	}

	$("input[data-list]").keypress(function(e){
	    if(e.which == 13){
	    	
	        itemText = $("input[data-list]").val();
	        itemId = "lm" + Math.floor((Math.random() * 999) + 1);
	        localStorage.setItem(itemId, itemText);

	        $("ul[data-list]").append("<li data-list-id='" + itemId + "' class='list-group-item'>" + itemText + "<button class='btn btn-danger btn-xs pull-right' data-list-delete type='submit'>Delete</button></li>")
	        $("input[data-list]").val("");
	        
	    }
	});

	$("button[data-list-delete]").click(function() {
		itemId = $(this).parent().attr("data-list-id");

		localStorage.removeItem(itemId);

		$("ul[data-list] li[data-list-id='" + itemId + "']").remove(); 



	});
	
});