import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import * as Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const client = new Twilio.Twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'discounthomeworkhelper@gmail.com',
        pass: 'YOUR_EMAIL_PASSWORD', // Use an app password if 2FA is enabled
    },
});

// Endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'discounthomeworkhelper@gmail.com',
        subject: `New contact form submission from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent successfully!');
    });
});

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});