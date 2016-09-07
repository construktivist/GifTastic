$(document).ready(function(){
	var topics = ["rick and morty", "aqua teen hunger force", "the boondocks", "metalocalypse", "venture bros", "robot chicken", "tim and eric", "moral orel"];
	var $buttons = $("#buttons");
	var $gifs = $("#gifs");
	var $form = $("#topic-form")

	$($form).submit(function(e){
		e.preventDefault();
		var $button = $("<button class='btn btn-secondary'>");
		var inputText = $("#topic-input").val();
		($button).text(inputText);
		$button.attr("value", inputText);
		$($buttons).append($button);
	});


	for (var i = 0; i < topics.length; i++){
		var $button = $("<button class='btn btn-secondary'>");
		$button.text(topics[i]);
		$button.attr("value", topics[i]);
		$($buttons).append($button);
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
				$img = $("<img>");
				$img.attr("src", results[i].images.fixed_height.url);
				$gifs.prepend($img);



			};
		});
	});
});