
$( document ).ready(function() {
	updateTable("initialise");

	$("input[data-list]").keypress(function(e){
		itemText = $("input[data-list]").val();
	    if(e.which == 13 && itemText != 0){	
	        itemId = "_" + Math.floor((Math.random() * 999) + 1);
	        localStorage.setItem(itemId, itemText);
	        updateTable("added", itemId, itemText);
	    }
	});

	$("table[data-list] tbody").on("click", "button[data-list-delete]", function(){
		itemText = $(this).parent().parent().find("[data-list-text]").html();
		itemId = $(this).parent().parent().attr("data-list-id");
		localStorage.removeItem(itemId);
		updateTable("deleted", itemId, itemText);
	});
	
});

function updateTable(itemAction, itemId, itemText) {
	if (itemAction && itemId && itemText) {
		alert("'" + itemText + "' has been " + itemAction + ".")
	}
	$("input[data-list]").val("");
	$("table[data-list] tbody").empty();
	for (var i = 0; i < localStorage.length; i++){
	    key = localStorage.key(i);
		keyInit = key.substring(0, 1)
		if (keyInit == "_") {
			itemText = localStorage.getItem(key);
			$("table[data-list] tbody").append("<tr data-list-id='" + key + "'><td data-list-text>" + itemText + "</td><td><button class='btn btn-danger btn-xs pull-right' data-list-delete type='submit'>Delete</button></td></tr>")
		}
	}
}