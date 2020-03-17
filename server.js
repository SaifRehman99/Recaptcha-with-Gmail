const express = require("express");
const app = express();
const axios = require("axios");
const ejs = require("ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/subscribe", async(req, res) => {
    if (req.body["g-recaptcha-response"] == "") {
        return res.send("Enter Captcha");
    }

    // keys
    const secretKey = process.env.SECRET;
    const response = req.body["g-recaptcha-response"];
    const remoteip = req.connection.remoteAddress;

    const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}&remoteip=${remoteip}`;

    try {
        const response = await axios.get(verifyURL);

        if (!response.data.success) {
            return res.send("Invalid Captcha!");
        }

        res.send(Success);
    } catch (e) {
        res.send(e);
    }
});

app.listen(3000, () => console.log("Server started on port 3000"));