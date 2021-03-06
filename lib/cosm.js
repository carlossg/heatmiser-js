var request = require('request');

var update = function(data, feed, api_key){
  var body = {
    version: "1.0.0",
    title: "Heatmiser WiFi Thermostat",
    private: true,
    tags: ["heatmiser", 'device:type=' + data.dcb.model, 'device:version=' + data.dcb.version],
    datastreams: [
      {
        id: 'temperature',
        current_value: "" + data.dcb.built_in_air_temp,
        tags: ["temperature"],
        unit: {type: "basicSI", label: (data.dcb.temp_format === 'C' ? 'Celsius' : 'Fahrenheit'), symbol: '°' + data.dcb.temp_format}
      },
      {
        id: 'floor_temperature',
        current_value: "" + data.dcb.floor_temp,
        tags: ["temperature","floor"],
        unit: {type: "basicSI", label: (data.dcb.temp_format === 'C' ? 'Celsius' : 'Fahrenheit'), symbol: '°' + data.dcb.temp_format}
      },
      {
        id: 'target_temperature',
        current_value: String(data.dcb.set_room_temp),
        tags: ["temperature"],
        unit: {type: "basicSI", label: (data.dcb.temp_format === 'C' ? 'Celsius' : 'Fahrenheit'), symbol: '°' + data.dcb.temp_format}
      },
      {
        id: 'heating_state',
        current_value: String(Number(data.dcb.heating_on)),
        tags: ['heating', 'value:type=boolean']
      },
      {
        id: 'hot_water_state',
        current_value: String(Number(data.dcb.hot_water_on)),
        tags: ['hot water', 'value:type=boolean']
      }
    ]
  }

  request.put('https://api.xively.com/v2/feeds/' + feed + '.json', {headers: {"X-ApiKey": api_key}, body: JSON.stringify(body)}, function(e, r){
    if(e) console.log(e);
    if(r && r.statusCode !== 200) console.log("Error uploading to Xively");
  });
}

exports.update = update
