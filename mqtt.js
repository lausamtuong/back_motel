const mqtt = require('mqtt');
const brokerUrl = 'ws://broker.mqttdashboard.com:8000/mqtt'
const clientId = 'thinhdang'
const topic = 'motel_data'
// const topic_send = 'motel_cmd'
const client = mqtt.connect(brokerUrl, { clientId })

