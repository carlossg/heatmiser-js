var Fetcher = require('./lib/fetcher').Fetcher;
var cosm = require('./lib/cosm');

var devices = function(execute) {
  var fs = require('fs');
  var file = __dirname + '/devices.json';

  return fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }

    execute(JSON.parse(data));
  });
};

var fetcher = new Fetcher(devices, 60000, function(config, result){
  console.log("Updating cosm feed: " + config.feed);
  console.log(result);
  cosm.update(result, config.feed, config.api_key);
});
