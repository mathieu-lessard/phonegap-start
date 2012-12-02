function processJSON(MAP, json){
	$.each(json,function(id,user){
		
		var location = new MapStruct.Location({latitude:user.latitude, longitude:user.longitude});
		var visible = true;
		
		if (typeof TRACKER.users[id] == "undefined"){		
			var userMarker = MAP.putMarker(location, "css/img/person.png", visible);
			var iWindow = MAP.initializeInfoWindow();
			var markerInfoWindow = new MapStruct.MapMarker({marker:userMarker, infoWindow:iWindow});
			
			TRACKER.users[id] = new TRACKER.User( {
				realname:user.realname,
				latitude:user.latitude,
				longitude:user.longitude,
				altitude:user.altitude,
				accuracy:user.accuracy,
				altitudeaccuracy:user.altitudeaccuracy,
				heading:user.heading,
				speed:user.speed,
				time:user.locationCalculatedTime,
				task:user.task,
				deviceid:user.deviceid,
				mapMarker:markerInfoWindow,
			});
			var content = 	'<div>'
						+ 		'<br/>' + TRACKER.users[id].realname  
						+ 		'<br/>' + TRACKER.users[id].time
						+ 		'<br/>' + TRACKER.users[id].task
						+ 		'<br/>' + TRACKER.users[id].latitude + ", " + TRACKER.users[id].longitude				
						+ 	'</div>'
						+ 	'<div>'
						+ 		'<ul class="sf-menu">'
						+ 			'<li><a class="infoWinOperations" href="javascript:TRACKER.zoomPoint('+ TRACKER.users[id].latitude +','+ TRACKER.users[id].longitude +')">Zoom in</a></li>'
						+			'<li><a class="infoWinOperations" href="javascript:TRACKER.zoomMaxPoint('+ TRACKER.users[id].latitude +','+ TRACKER.users[id].longitude +')">Zoom max</a></li>'
						+		'</ul>'
						+	'</div>';
						
			TRACKER.users[id].mapMarker.infoWindow = MAP.initializeInfoWindow(content);
			
			MAP.setMarkerClickListener(TRACKER.users[id].mapMarker.marker,function(){
				console.log(id);
				MAP.openInfoWindow(TRACKER.users[id].mapMarker.infoWindow, TRACKER.users[id].mapMarker.marker);	
			});
			//MAP.setMarkerVisible(TRACKER.users[id].mapMarker.marker,true);
        
		}else{
			var time = user.time;
			var deviceid = user.deviceid;
			MAP.setMarkerPosition(TRACKER.users[id].mapMarker.marker,location);
        
			/*if (TRACKER.users[id].latitude == "" && TRACKER.users[id].longitude == ""){
				// if there is no latitude and longitude data 
				// this statement will run and we update latitude and longitude
				MAP.setMarkerVisible(TRACKER.users[id].mapMarker.marker,true);						
			}*/
        					
			TRACKER.users[id].latitude = latitude;
			TRACKER.users[id].longitude = longitude;
			TRACKER.users[id].time = time;
			TRACKER.users[id].deviceid = deviceid;
        
		}
    });

	return;
}