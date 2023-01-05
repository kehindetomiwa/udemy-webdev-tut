const express = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
require('dotenv').config();

const listID = process.env.MARKETLIST;
const apiKey = process.env.MYAPIKEY;
const serverPrefix = process.env.SERVERPREFIX

client.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
});


app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, resp) {
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;

    console.log(firstName, lastName, email);

    async function run(){
        try{
            const response = await client.lists.batchListMembers(listID, {
                members: [{
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    },
                    email_address: email,
                    status: "subscribed"
                }],
            });
            console.log(response);
            console.log(`successfully added contact as an audience member. The contact's id is ${response.id}.`);
            resp.sendFile(__dirname + "/success.html");

        } catch (e){
            console.log(e.response.status);
            resp.sendFile(__dirname + "/failure.html");
        }

    }
    run();

});


app.post("/failure", function(req, res){
    console.log("redirect failure");
    res.redirect("/");
});


app.listen(3000, function () {
    console.log("Server is running on port 300")
});

