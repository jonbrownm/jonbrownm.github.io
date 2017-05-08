(function() {

  rewriteYear = function(element) {
  	var currentTime = new Date();
    currentYear = currentTime.getFullYear();
    
    element.replaceWith(currentYear);
  },
  
	init = function() {		
    elements = document.querySelectorAll("[data-rewrite-year]");
		
    for (var i = 0; i < elements.length; i++) {
    	rewriteYear(elements[i]);
		}
	},
  
  init()

})();