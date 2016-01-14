var slider = new Swipe(document.getElementById('slider'), {

	callback: function(e, pos) {
		
		$("span#position em").removeClass("on");
		
		$("span#position em." + pos).addClass("on");
        
	}
    
}),

bullets = $("span#position em");
$("span#position em.0").addClass("on");
$("div.complete div div#results").hide();	

$("video").bind("ended",function(){
	$("#next").addClass("highlight");
});

$("audio").bind("ended",function(){
	$("#next").addClass("highlight");
});

$("#prev").click(function() {
	  slider.prev();
	  var videoPlayer = document.getElementsByTagName('video');
		for(var i = 0; i < videoPlayer.length; i++){
			videoPlayer[i].pause();
		}
	  return false;
});
	
$("#next").click(function() {
	  slider.next(); 
	  var videoPlayer = document.getElementsByTagName('video');
		for(var i = 0; i < videoPlayer.length; i++){
			videoPlayer[i].pause();
		}
		
	  return false;
});	

$("#add-calendar").click(function() {
	alert("This has been added to your calendar.");
	return false;
});	

/* functions on pleasurable activity tool */

function tool() {
	
	$("div#activity div input#custom").focus(function() {
		$("div#activity div label").removeClass("active");
		$("div#activity div label").removeAttr("checked");
		$("div#activity div input#custom").keyup(function() {
			$(this).addClass("active");
			customactivity = $(this).val();
			$("div.complete div p span.activity").html(customactivity); /* populates activity */
		});
		validateForm();
	});
	
	$("div#activity div input#custom").keyup(function() {
		newactivity = $("div#activity div input#custom").val();
		if (newactivity=="") {
			$("div.complete div p span.activity").html(""); /* removes activity */
			$("div#activity div input#custom").removeClass("active");
			$("#next").removeClass("highlight");
		}
		else {
			validateForm();
		}
		
	});
	
	$("div#activity div input#custom").focusout(function() {
		newactivity = $("div#activity div input#custom").val();
		if (newactivity=="") {
			$("div.complete div p span.activity").html(""); /* removes activity */
			$("div#activity div input#custom").removeClass("active");
			$("#next").removeClass("highlight");
		}
		else {
			validateForm();
		}
		
	});
	
	$("div#activity div label").click(function() {
		$("div#activity div input#custom").removeClass("active");
		$("div#activity div input#custom").val("");
		$("div#activity div label").removeClass("active");
		$(this).addClass("active");
		selectedactivity = $(this).data("activity");
		$("div.complete div p span.activity").html(selectedactivity); /* populates activity */
		validateForm();
	});
	
	$("div#day div label").click(function() {
		$("div#day div label").removeClass("active");
		$(this).addClass("active");
		selectedday = $(this).data("day");
		$("div.complete div p span.day").html(selectedday); /* populates day */
		validateForm();
	});
	
	$("div#enjoyment ul li").click(function() {
		$("div#enjoyment ul li").removeClass("active");
		$(this).addClass("active");
		selectedpercentage = $(this).data("percentage");
		$("div#enjoyment input#enjoyment-percentage").val(selectedpercentage);
		$("div.complete div p span.percentage").html(selectedpercentage); /* populates percentage */
		validateForm();
	});
	
	function validateForm() {
		
		var activityval = $("div.complete div p span.activity").html();
		var dayval = $("div.complete div p span.day").html();
		var percentageval = $("div.complete div p span.percentage").html();
		
		if(activityval!="&nbsp;" && dayval!="&nbsp;" && percentageval!="&nbsp;") {
			$("#next").addClass("highlight");
			$("div.complete div div#results").show();	
		}
		
		else {
			$("#next").removeClass("highlight");
			$("div.complete div div#results").hide();	
		}
		
	}

}


function examples() {
	
	$("div.video#example-videos video").hide();
	$("div.video#example-videos video#elaine").show();

	$("ul.character-select li a").click(function() {
		
		$("#next").removeClass("highlight");
		
		var videoPlayer = document.getElementsByTagName('video');
		for(var i = 0; i < videoPlayer.length; i++){
			videoPlayer[i].pause();
		}
		
		selectedvideo = $(this).data("video");
		$("div.video#example-videos video#" + selectedvideo)[0].play();
		$("div.video#example-videos video").hide();
		$("div.video#example-videos video#" + selectedvideo).show();
		
		$("ul.character-select li a").removeClass("active");
		$(this).addClass("active");

		return false;
		
	});
		
}

function audio() {

	$("div.audio div#pleasurable-things a").click(function() {
		
		$("div.audio div#pleasurable-things a").removeClass("active");
		
		$(this).addClass("active");
		
		selectedaudio = $(this).data("audio");
		
		document.getElementById(selectedaudio).load();
		document.getElementById(selectedaudio).play();

		return false;
		
	});
	
}
