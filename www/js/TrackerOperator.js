function TrackerOperator(url, map, interval, qUpdatedUserInterval){

	TRACKER = this;	
	MAP = map;
	this.userId;
	this.ajaxUrl = url;
	this.updateInterval = interval;
	this.timer;
	/*
	 * After all users info is got, only users whose location changed is queried every
	 * queryUpdatedUserInterval seconds
	 */
	this.queryUpdatedUserInterval = qUpdatedUserInterval;
	/*
	 * All users are gotten in initialization page by page, getUserListInterval 
	 * is the interval that ajax request sent
	 */
	this.getUserListInterval = interval;
	/**
	 * if all users are getted from the server, then this variable is set to true
	 */
	this.users = [];
	
	this.User = function(){
		var realname;
		var latitude;
		var longitude;
		var altitude;
		var accuracy;
		var altitudeaccuracy;
		var heading;
		var speed;
		var time;
		var deviceid;
		var task;
		var mapMarker;
		var infoWindowIsOpened = false;

		for (var n in arguments[0]) { 
			this[n] = arguments[0][n]; 
		}		
	}

	/**
	 * 
	 */
	this.getClientList = function(){	
		//$.getJSON("http://192.168.1.8:8124?callback=?",
		$.getJSON("http://64.180.220.216:8124?callback=?",
			{
				client:'users'
			},
			function(data) {
				processJSON(MAP, $.parseJSON(decodeURIComponent(data)));
			}
		);
	};
	
	this.closeMarkerInfoWindow = function (userId) {
		TRACKER.users[userId].gmarker.closeInfoWindow();
	};

	this.zoomPoint = function (latitude, longitude) {

		var point = new MapStruct.Location({latitude:latitude, longitude:longitude});
		MAP.zoomPoint(point);
	}

	this.zoomMaxPoint = function(latitude, longitude)
	{
		var point = new MapStruct.Location({latitude:latitude, longitude:longitude});
		MAP.zoomMaxPoint(point);
	};
}
