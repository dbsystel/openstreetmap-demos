const fs = require('fs');


const withStationsJsonFile = function(err, data) {
	var stations = JSON.parse(data);
	processStations(stations);
};

const processStations = function(records) {
	records.forEach(processStation);
};

const processStation = function(record) {
	var name = record.speak || record.title;
	var content = name
		.replace('\u00f6', '&#xF6;')
		.replace('\u00fc', '&#xFC;');
	speak = "<speak><prosody rate='slow'>" + content + "</prosody></speak>";
	var fileName = name
		.replace('\u00f6', 'oe')
		.replace('\u00fc', 'ue')
		.replace(' ', '_');
	console.log('aws polly synthesize-speech --output-format mp3 --voice-id Marlene --text-type ssml --text \"' +  speak + '\" ' + fileName + '.mp3');
};

fs.readFile('../data/stations.json', withStationsJsonFile);