(function() {

  // calculate current date
  var currentTime = new Date();
  currentYear = currentTime.getFullYear();

  var config = {
    att: "data-rewrite-year",
    string: currentYear
  },

  rewriteDomContent = function(element) {
    element.replaceWith(config.string);
  },
  
	init = function() {		
    elements = document.querySelectorAll("[" + config.att + "]");
		
    for (var i = 0; i < elements.length; i++) {
    	rewriteDomContent(elements[i]);
		}
	};
  
  init()

})();