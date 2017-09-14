var locale = "en-us";

var log = function(msg){
	console.log(msg);
}

if(typeof require == 'undefined')
	var require = function(msg){
		log("Required library: "+msg);
		if(msg == "d3")
			return d3;
	}

var app = angular.module('app', ['onsen']);
