/****
 * A simple Rest API
 * 
 */


const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.port || 8000;
const mqtt = require('mqtt');
const mqqtUrl = 'mqtt://localhost'; //Mqtt service url
const client = mqtt.connect(mqqtUrl);

var app = express();
var macIds = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

client.on('connect', function () {
})

/**
* Registration Process
*/
app.route('/register')
    .post((req, res) => {

        /**
         * Registration logic
         */
        let body = req.body;
		console.log(body);

        if (req.body.macid) {
            
            if (!macIds[req.body.macid])
                macIds[req.body.macid] = req.body.macid;

            res.json({ 'status': 'ok', 'message': 'registration_success' });
			client.subscribe('/listen/'+req.body.macid);
			console.log('/listen/'+req.body.macid);
            return;
        } {
            res.json({ 'status': 'error', 'message': 'macid_not_found' });
            return;
        }



    });

app.get('/send-message/:client', (req, res) => {
    let clientid = req.params.client;
    let msg = req.query.message || 'Hello mqtt';
    console.log(macIds);
    console.log(msg);
    
    if (!macIds[clientid]) {
        res.json({ status: 'error', message: 'no_client_id' })
    }
    else {
        console.log(clientid);
        client.publish('/publish/' + clientid, msg, { qos: 2 }, (err, s) => {
           
        });
        
		res.json({ status: 'ok', message: 'push_send' });
	}

});
client.on('message', function(topic, payload) {
		console.log(payload.toString())
		});


//.delete()
app.listen(port, (er, su) => {
    if (er) {
        throw er;
    }
    else {
        console.log(`Server on-${port}`);
    }
});
