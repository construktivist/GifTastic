$(document).ready(function(){
	var topics = ["rick and morty", "aqua teen hunger force", "the boondocks", "metalocalypse", "venture bros", "robot chicken", "tim and eric", "moral orel"];
	var $buttons = $("#buttons");
	var $gifs = $("#gifs");
	var $form = $("#topic-form")
	var playback = false;
	
	makeButtons();

	$form.submit(function(e){
		e.preventDefault();
		var inputText = $("#topic-input").val();
		topics.push(inputText);
		makeButtons();

	});

	function makeButtons(){
		$buttons.empty();
		for (var i = 0; i < topics.length; i++){
			var $button = $("<button class='btn btn-secondary'>");
			$button.text(topics[i]);
			$button.attr("value", topics[i]);
			$($buttons).append($button);
			$form.trigger("reset");
		};
	};
		
	$buttons.on("click", "button", function(){
		console.log("click works");
		var subject = $(this).text();
		console.log(subject);
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject +"&api_key=dc6zaTOxFJmzC"; 
		console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response){
			var results = response.data;
			console.log(results);
			for(var i = 0; i < results.length; i++){
				var stillGif = results[i].images.fixed_height_small_still.url;
				var animatedGif = results[i].images.fixed_height.url;
				
				$gifDiv = $("<div>");
				$img = $("<img>");
				$p = $("<p>Rating: " + results[i].rating + "</p>")	
				$img.attr("src", stillGif);
				$img.attr("data-still", stillGif);
				$img.attr("data-animated", animatedGif);
				$img.attr("data-still", "still")
				
				$gifDiv.append($img);
				$gifDiv.append($p);
				$gifs.prepend($gifDiv);
			};
			
			$("img").click(function(){
				console.log("image click works")
				var state = $(this).attr("data-state");


			});
		});
	});
});
// });