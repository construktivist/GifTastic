$(document).ready(function(){
	var topics = ["rick and morty", "aqua teen hunger force", "the boondocks", "metalocalypse", "venture bros", "robot chicken", "tim and eric", "moral orel"];
	var $buttons = $("#buttons");
	var $gifs = $("#gifs");
	var $form = $("#topic-form")
	var playback = false;
	
	makeButtons();

	$($form).submit(function(e){
		e.preventDefault();
		var inputText = $("#topic-input").val();
		topics.push(inputText);
		makeButtons();
	});

	function makeButtons(){
		for (var i = 0; i < topics.length; i++){
			var $button = $("<button class='btn btn-secondary'>");
			$button.text(topics[i]);
			$button.attr("value", topics[i]);
			$($buttons).append($button);
		};
	};
		
	$("button").click(function(){
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
				$gifDiv = $("<div>");
				$img = $("<img>");
				$p = $("<p>Rating: " + results[i].rating + "</p>")
				$img.attr("src", results[i].images.fixed_height_small_still.url);
				$img.attr("data-animated", results[i].images.fixed_height.url);
				$gifDiv.append($img);
				$gifDiv.append($p);
				$gifs.prepend($gifDiv);
			};
			
			$("img").click(function(){
				var stillURL = $(this).attr("src");
				var animatedURL = $(this).data();
				console.log(stillURL);
				console.log(animatedURL);
				if (playback == false){
					console.log("playback");
					var playback = true;
					$(this).attr("src", animatedURL.animated);
				}
				else{
					var playback = false;
					$(this).attr("src", stillURL);	
				};
			});
		});
	});
});