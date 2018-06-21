const mqtt = require('mqtt');
const mqqtUrl = 'mqtt://localhost'; //Mqtt service url
const client = mqtt.connect(mqqtUrl);

const http = require('http');
const macid = '12345678'; /*random value for testing*/


client.on('connect', function () {
  client.subscribe('service/' + macid);
  // client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic);
  console.log(message.toString());
  // client.end()
})

registerService = () => {

  var post_data = JSON.stringify({
    'macid': macid
  });

  // An object of options to indicate where to post to
  var post_options = {
    host: 'localhost',
    port: '8000',
    path: '/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  // Set up the request
  var post_req = http.request(post_options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}

registerService();
