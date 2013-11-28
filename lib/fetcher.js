var hm   = require('./heatmiser');

function Fetcher(devices, period, onFetch){
  var self = this;
  self.devices = devices;
  self.period = period;
  self.onFetch = onFetch;
  self.start();
}

Fetcher.prototype = {
  start: function(){
    var self = this;
    // Fetch all of the devices and check for new ones
    var refresh_fn = function(){self.refresh()};
    setInterval(refresh_fn, self.period);
    refresh_fn();
  },

  refresh: function(){
    var self = this;
    self.devices(function(devices) {
      devices.forEach(function(device){
        console.log("device: %j",device);
        self.fetch(device);
      });
    });
  },

  fetch: function(config){
    var self = this;
    hm.read_device(config.host, 8068, config.pin, function(result){
      self.onFetch(config, result);
    });
  }

}

exports.Fetcher = Fetcher;
