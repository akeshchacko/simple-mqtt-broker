# simple-mqtt-broker-

1. A Simple working sample for Mqtt protocol with Rest API.
2. Extract the folder and install the npm dependencies, by `npm install` command.
3. Run the MQTT broker by `node broker.js`. By default the MQQT protocol will run on port 1883

   MQTT Broker created using https://www.npmjs.com/package/mosca .

4. Run the Rest API server using the command `node restServer.js`, http server will
   start listen on port 8000 by default.
    Express Node module is used for creating the  rest API
     
       1. Register API----
          URL : http://localhost:8000/register
          Method: POST
          Body: {"macid":"<mac_id>"}
          A simple http post request , which accept a macid from the client.
          eg: ` curl -i -X POST \
               -H "Content-Type:application/x-www-form-urlencoded" \
               -d "macid=1231" \
               'http://localhost:8000/register' `

       2. Send Message to a specific client/macid

          URL : http://localhost:8000/send-message/<macid>?message=<message_to_send>        
          Method : GET

5. Run the  command `node client.js` to register an macid , say -- 12345678
   To send a message to this client from our rest api,
   Call the below url

   http://localhost:8000/send-message/12345678?message=hello

6. An example index.html is added to access these data on html page. Mac ID is hard coded for this page for testing. Need to be make it as dynamic by applying some logic.
	Currently this page will always publish to the topic /publish/606405B915C4 with data as {"check":"test","qwq":"1236"}
	And it will always listen to topic /listen/606405B915C4 and give the data as an alert
	To add Webpack, use the following steps
	
		npm install -g webpack // install webpack
		cd node_modules/mqtt
		npm install . // install dev dependencies
		webpack mqtt.js ./browserMqtt.js --output-library mqtt

7. Reference
   PHP Mqqt Publish- https://www.cloudmqtt.com/docs-php.html
   MQTT over Websocket- https://github.com/mcollina/mosca/wiki/MQTT-over-Websockets
