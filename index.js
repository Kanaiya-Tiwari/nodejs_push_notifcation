require('dotenv').config({ path: 'variables.env' });
//require('dotenv').config();
const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const cors=require('cors');
const app = express();
app.use(cors())
app.use(bodyParser.json());
const nodemailer = require('nodemailer');
app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails("mailto: <kanaiyatiwari892@gmail.com>", publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8000');
  const subscription = req.body
console.log(subscription);
  res.status(201).json({"created":"done"});
  
  const payload = JSON.stringify({
    title: 'Push notifications with Service Workers',
    body: "Your request has been accepted"
  });

  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

app.get('/get', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8000');
    const payload = JSON.stringify({
        title: 'Push notifications with Service Workers',
        body: "Your request has been accepted"
      });
    res.send(payload);
  });
app.post('/send-email', (req, res) => {
    const { recipient, subject, content } = req.body;
  
    // Configure nodemailer with your email service details
    const transporter = nodemailer.createTransport({
      
        service: 'gmail',
      auth: {
        user: 'kanaiyatiwari892@gmail.com',
        pass: 'mkiwqmxazoviioso',
      },
    });
    const mailOptions = {
        from: 'kanaiyatiwari892@gmail.com',
        to: recipient,
        subject: subject,
        text: content,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent:', info.response);
          res.send('Email sent successfully');
        }
      });
    });
app.options("/",(req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.set('Access-Control-Allow-Headers', "content-type");
    res.send("okay");

})
const PORT = 5001;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});

 

