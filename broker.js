var mosca = require('mosca');

var ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var settings = {
    port: 1883,
    backend: ascoltatore,
	http: {port: 3333, bundle: true, static: './'}   //mosca support mqtt over ws
};

var server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
    // console.log('Client',client);
    // console.log(packet.topic);
    if (packet.topic == 'presence') {
        console.log('Published', packet.payload.toString());
        
        // var message = {
        //     topic: 'presence',
        //     payload: 'abcde', // or a Buffer
        //     qos: 0, // 0, 1, or 2
        //     retain: false // or true
        // };

        // server.publish(message,client ,function () {
        //     console.log('done!');
        // });
    }
    //server.publish('hello');
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}
