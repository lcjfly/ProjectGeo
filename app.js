var restify = require('restify');
var fetchUrl = require("fetch").fetchUrl;
 
var server = restify.createServer({
  name: 'geo',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var latitude, longitude;
var reportTime;
 
server.get('/georeport/:lat/:longi', function (req, res, next) {
	console.log(req.params);
	latitude = req.params.lat;
	longitude = req.params.longi;
	reportTime = new Date();
  	res.send(req.params);

  	return next();
});

server.get('/georeport/get', function (req, res, next) {
	fetchUrl("http://restapi.amap.com/v3/direction/driving?output=json&origin=121.168105,31.303751&destination=121.264168,31.002682&output=xml&key=10d7b58e081067d38c01996686245507", function(error, meta, body){
	    var resp = JSON.parse(body.toString());
	    if(resp.status == 1 && parseInt(resp.count) > 0) {
	    	var duration = parseInt(resp.route.paths[0].duration);
	    	res.send(duration/60 + " minutes");
	    } else {
	    	res.send("lbs error");
	    }
  		return next();
	});
});
 
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});