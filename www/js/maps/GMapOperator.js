//Map class
function MapOperator() {
	MAP_OPERATOR = this;
	/*
	 * GMap Object
	 */
	map = null;
	/*
	 * this loads the gmap js file and css file
	 */
	document.write("<script type='text/javascript' src='http://maps.google.com/maps/api/js?sensor=false'></script>");
	document.write("<link href='http://code.google.com/apis/maps/documentation/javascript/examples/default.css' rel='stylesheet' type='text/css' />");

	/*
	 * initalizes map, location is, the type in MapStructs.js file, the center of the map
	 */
	MAP_OPERATOR.initialize = function(e, location) {
		var mapOptions = {
			center: new google.maps.LatLng(location.latitude, location.longitude),
			zoom: location.altitude,
			mapTypeId: google.maps.MapTypeId.TERRAIN
		};
		MAP_OPERATOR.map = new google.maps.Map(e, mapOptions);
	};


	/*
	 * puts a marker at that coordinate,
	 * location is mandatory and defined in MapStructs.js,
	 * other params are optional.
	 */
	MAP_OPERATOR.putMarker = function(location, image, visible) {
		var markerImage = null;
		if (typeof(image) != "undefined") {
			markerImage = new google.maps.MarkerImage(image);
		}  
		if (typeof(visible) == "undefined") {
			visible = true;
		}
		var location = new google.maps.LatLng(location.latitude, location.longitude);
		var marker = new google.maps.Marker({
			position: location, 
			map: MAP_OPERATOR.map,
			visible:visible
		});
		if (markerImage != null) {
			marker.setIcon(markerImage);
		}
		return marker;
	}

	/*
	 * marker is the type that returns from putMarker,
	 * visible boolean value
	 */
	MAP_OPERATOR.setMarkerVisible = function(marker, visible) {
		marker.setVisible(visible);
	}

	/*
	 * marker is the type that returns from putMarker,
	 * location is defined in MapStructs.js,
	 */
	MAP_OPERATOR.setMarkerPosition = function(marker,location) {
		var position = new google.maps.LatLng(location.latitude, location.longitude);
		marker.setPosition(position);
	}

	/*
	 * contentString is the string that is shown in infowindow
	 */
	MAP_OPERATOR.initializeInfoWindow = function(contentString) {
		if (typeof(contentString) == "undefined") {
			contentString = "<div>" 				
				+ "</div>"
				;
		} 
		var infowindow = new google.maps.InfoWindow({content: contentString});
		return infowindow;
	}

	/*
	 * infowindow is the type that returns from initializeInfoWindow
	 * marker is the type where open the infowindow
	 * there is no close function for infowindow
	 */
	MAP_OPERATOR.openInfoWindow = function(infowindow,marker) {
		infowindow.open(MAP_OPERATOR.map,marker);		
	}

	/*
	 *
	 */
	MAP_OPERATOR.closeInfoWindow = function(infowindow) {
		infowindow.close();		
	}

	/*
	 * infoWindow is the type that returns from initializeInfoWindow
	 * functionName is the function that is called when closed infoWindow
	 */
	MAP_OPERATOR.setInfoWindowCloseListener = function(infoWindow,functionName) {
		google.maps.event.addListener(infoWindow, 'closeclick', functionName);
	}

	/*
	 * marker is the type that returns from putMarker
	 * functionName is the function that is called when clicked marker
	 */
	MAP_OPERATOR.setMarkerClickListener = function(marker,functionName) {
		google.maps.event.addListener(marker, 'click', functionName);
	}

	/*
	 * infowindow is the type that returns from initializeInfoWindow
	 * contentString is the string that updates the content of infowindow
	 */
	MAP_OPERATOR.setContentOfInfoWindow = function(infowindow,contentString) {
		infowindow.setContent(contentString);		
	}


	/*
	 * clickFunction
	 * functionName is the type that is called when clicked
	 */
	MAP_OPERATOR.clickFunction = function(functionName) {
		google.maps.event.addListener(MAP_OPERATOR.map, 'click', function(event) {			
			functionName(event);			
		});
	}
	/*
	 * This function provides maximum zoom at given point
	 */
	MAP_OPERATOR.zoomMaxPoint = function(point) {
		var zoomService = new google.maps.MaxZoomService();
		var position = new google.maps.LatLng(point.latitude, point.longitude);

		zoomService.getMaxZoomAtLatLng(position,function(maxResult){

			MAP_OPERATOR.map.setCenter(position);
			MAP_OPERATOR.map.setZoom(maxResult.zoom);
		});
	}

	/*
	 * This function provides zooming at given point
	 */
	MAP_OPERATOR.zoomPoint = function(point) {
		var zoomlevel = MAP_OPERATOR.map.getZoom();
		var incZoomlevel;
		if (zoomlevel < 6) {
			incZoomlevel = 5;
		}else if(zoomlevel < 10){
			incZoomlevel = 4;
		}else if(zoomlevel < 13){
			incZoomlevel = 3;
		}else if(zoomlevel < 15){
			incZoomlevel = 2;
		}else{
			incZoomlevel = 1;
		}

		zoomlevel += incZoomlevel;

		var position = new google.maps.LatLng(point.latitude, point.longitude);
		MAP_OPERATOR.map.setCenter(position);
		MAP_OPERATOR.map.setZoom(zoomlevel);
	}
}

