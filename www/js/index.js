$(function() {

	Overview();

	$(".menu li").on("click", function() {
		$this = $(this);

		switch($this.data("view")) {
			case "overview": 
				Overview();
				break;
			case "price-quality": 
				PriceQuality();
				break;
			case "distance": 
				Distance();
				break;
		}
	});

	function Overview()
	{
		$.get( "https://api.eet.nu/venues", function( data ) {
			var result = data['results'];
			ClearListView();

			$.each(result, function(key, value) {
				var html = "<li><a href='"+value.url+"'>";
				if(value.images.cropped[0] != null)
				{
					html += "<img class='thumb' src='"+value.images.cropped[0]+"' alt='' title=''>";
				}
				html += "<strong class='title'>"+value.name+"</strong><span>Categorie: "+value.category+"</span></a></li>";

			    AppendToListView(html);
			});
		});
	}

	function PriceQuality()
	{
		$.get( "https://api.eet.nu/venues?sort_by=reviews", function( data ) {
			var result = data['results'];
			ClearListView();

			$.each(result, function(key, value) {
				var html = "<li><a href='"+value.url+"'>";
				if(value.images.cropped[0] != null)
				{
					html += "<img class='thumb' src='"+value.images.cropped[0]+"' alt='' title=''>";
				}
				html += "<strong class='title'>"+value.name+"</strong><span>Categorie: "+value.category+"</span></a></li>";

			    AppendToListView(html);
			});
		});
	}

	function Distance()
	{
		var lat = 0;
		var lng = 0;
		
		getLocation();
		ClearListView();

		function getLocation() {
		    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
		}
		
		function onSuccess(position) {
		    lat = position.coords.latitude;
		    lng = position.coords.longitude;
		    var html = "<li>lat: "+lat+", long: "+lng+"</li>";
		    
		    AppendToListView(html);
		}

		function onError(error) {
			var html = "<li>Code: "+error.code+", message: "+error.message+"</li>";
		    
		    AppendToListView(html);
		}


		/*$.get( "https://api.eet.nu/venues", function( data ) {
			var result = data['results'];
			ClearListView();

			$.each(result, function(key, value) {
				var html = "<li><a href='"+value.url+"'>";
				if(value.images.cropped[0] != null)
				{
					html += "<img class='thumb' src='"+value.images.cropped[0]+"' alt='' title=''>";
				}
				html += "<strong class='title'>"+value.name+"</strong><span>Categorie: "+value.category+"</span></a></li>";

			    AppendToListView(html);
			});
		});*/
	}

	function ClearListView()
	{
		$('#content .list-view').empty();
	}

	function AppendToListView(data)
	{
		$('#content .list-view').append(data);
	}

});