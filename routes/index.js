var express = require('express');
var fs = require('fs');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public' });
});

router.get('/getCity',function(req,res,next) {
	var myRe = new RegExp("^" + req.query.q);
	fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
		if(err) throw err;
		var cities = data.toString().split("\n");
		var jsonresult = [];
		for (var i = 0; i < cities.length; i++) {
			var result = cities[i].search(myRe);
			if (result != -1) {
				jsonresult.push({city:cities[i]});
			}
		}
		res.status(200).json(jsonresult);
	});
});

router.get('/getElevation', function(req,res,next) {
	var myurl = "https://maps.googleapis.com/maps/api/elevation/json?key=AIzaSyBirgg0e0ZZLE9ztPgz6DGWT-PpcyqV8YA&locations=";
	console.log("Elevation request: " + req.query.q);
	var locationUrl = myurl + req.query.q;
	request(locationUrl).pipe(res);
});

module.exports = router;
