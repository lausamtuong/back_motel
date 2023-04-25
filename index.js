const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mqtt = require('mqtt')
const nodemailer = require('nodemailer');
const userRoute = require('./routes/user')


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());


app.use('', userRoute)


//**********************MQTT CONNECTION********************************* */
const brokerUrl = 'ws://broker.mqttdashboard.com:8000/mqtt'
const clientId = 'thinhdang'
const topic = 'motel_data'
const client = mqtt.connect(brokerUrl, { clientId })


const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service of your choice
    auth: {
        user: 'danggiathinhgocong@gmail.com', // Your email address
        pass: 'shzkxbtoyncnkprh' // Your email password
    }
});

const mailOptions = {
    from: 'danggiathinhgocong@gmail.com', // Sender email address
    to: 'nghianguyen2112002@gmail.com', // Recipient email address
    subject: 'Cảnh báo về độ ẩm', // Subject of the email
    text: 'Chết cây chết cây!!!' // Plain text body of the email
};


let lastMessage = null

client.on('connect', () => {
    console.log('Connected to HiveMQ broker')
    client.subscribe(topic)
})
// Recieve the message from the broker
client.on('message', (topic, message) => {
    var currentdate = new Date();
    var datetime =
        currentdate.getHours() + ":"
        + currentdate.getMinutes()
    console.log(`Received message on topic ${topic}: ${message.toString()}`)
    lastMessage = message.toString().substring(0, message.toString().length - 2) + `,"date": "${datetime}" }`
    console.log(lastMessage)
    //   if(parseFloat((message.toString()).split(',')[1].split(':')[1]) > 30) {
    //     transporter.sendMail(mailOptions, (error, info) => {
    //       if (error) {
    //         console.error('Could not send email', error);
    //       } else {
    //         console.log('Email sent successfully', info);
    //       }
    //     });
    //   }
})

//Send value 
app.get('/api/value', (req, res) => {
    console.log('Sending data to frontend:', lastMessage)
    res.send(lastMessage)
    // const data = { temperature: 25, humidity: 50 }
    // console.log('Sending data to frontend:', data)
    // // Send the data to the frontend
    // res.send(data)
})


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
