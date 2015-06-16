
$( document ).ready(function() {
	updateTable();

	$("input[data-list]").keypress(function(e){
	    if(e.which == 13){	
	        itemText = $("input[data-list]").val();
	        itemId = "_" + Math.floor((Math.random() * 999) + 1);
	        localStorage.setItem(itemId, itemText);
	        updateTable();
	    }
	});

	$("table[data-list] tbody").on("click", "button[data-list-delete]", function(){
		itemId = $(this).parent().parent().attr("data-list-id");
		localStorage.removeItem(itemId);
		updateTable();
	});
	
});

function updateTable() {
	$("input[data-list]").val("");
	$("table[data-list] tbody").empty();
	for (var i = 0; i < localStorage.length; i++){
	    key = localStorage.key(i);
		keyInit = key.substring(0, 1)
		if (keyInit == "_") {
			itemText = localStorage.getItem(key);
			$("table[data-list] tbody").append("<tr data-list-id='" + key + "'><td>" + itemText + "</td><td><button class='btn btn-danger btn-xs pull-right' data-list-delete type='submit'>Delete</button></td></tr>")
		}
	}
}