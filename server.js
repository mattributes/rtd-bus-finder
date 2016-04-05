var request = require('request');
var ProtoBuf = require('protobufjs');
var util = require('util');

// create a protobuf decoder
var transit = ProtoBuf.protoFromFile('gtfs-realtime.proto').build('transit_realtime');

var rtdUser = process.env.RtdUser;
var rtdPass = process.env.RtdPass;

console.log(rtdUser, rtdPass);

request(
	{
		url:util.format('http://%s:%s@www.rtd-denver.com/google_sync/VehiclePosition.pb', rtdUser, rtdPass),
		encoding: null
	}, 
	function (error, response, body) {
		if (!error && response.statusCode == 200) {
			parse(body);
		}
	}
);

// process the feed
function parse(res) {
	console.log("in parse");
    var msg = transit.FeedMessage.decode(res);
	for (var i =0; i < msg.entity.length; i++)
	{
		var a = msg.entity[i];
		//debugger;
		if(a.vehicle){
			if (a.vehicle.trip){
				if (a.vehicle.trip.route_id){
					
					var route = a.vehicle.trip.route_id;
					
					//console.log(route);
					
					
					if (route === "DASH"){
						console.log(a);
						console.log(a.vehicle.trip);
						console.log("-----------------")
					}
					
					
					//debugger;
				}
			}
		}
	}
	
	debugger;
};
