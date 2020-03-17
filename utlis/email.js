const express = require("express");
const app = express();
const axios = require("axios");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

//==================================== USING OAUTH2 =================================================//

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAUTH2",
        user: process.env.USER,
        accessToken: process.env.ACCESS_TOKEN
    },
    tls: {
        rejectUnauthorized: false
    }
});

//==================================== USING GOOGLE PASSWORD =================================================//

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "saifr7493@gmail.com",
        pass: "YOUR_GENERATED_GMAIL_PASS"
    },
    tls: {
        rejectUnauthorized: false
    }
});


//======================================SENDING HTML TEMPLATES and attachments ========================================//

ejs.renderFile(
    path.join(__dirname, "../views/pages/attachment.ejs"),
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // send mail with defined transport object
            let message = {
                from: ' "YOUR_NAME" <email@gmail.com>',
                to: 'EMAIL_OF_receiver',
                subject: "SUBJECT",
                text: "MESSAGE",
                attachments: [{
                    filename: "file.jpg",
                    path: "./file.jpg"
                }],
                html: data
            };
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    return console.log(err);
                }
                console.log(info);
            });
        }
    }
);

//==================================================================================================================//