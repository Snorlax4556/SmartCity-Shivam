
regUser = [{
    name: "Barber-Shop",
    description: "A Cool Salon",
    address: "Delhi India",
    contact: "9998887776",
    rating: 5
}, {
    name: "Cake-Shop",
    description: "A Sweet Shop for cake lovers",
    address: "Mumbai India",
    contact: "9998887776",
    rating: 3
}, {
    name: "Stationary-Shop",
    description: "All types of stationary available.",
    address: "Jaipur India",
    contact: "9998887776",
    rating: 4
}]

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/myapp", function (err) {
    if (!err)
        console.log("connected to DB successfully.");
})

const userSchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    contact: String,
    rating: Number
});

const User = new mongoose.model("User", userSchema);
User.find({}, function (err, user) {
    if (err)
        console.log(err);
    else if (user.length == 0) {
        User.insertMany(regUser, function (err) {
            if (err)
                console.log(err);
            else
                console.log("Added.")
        })
    }
});

// Direct Requests to home page
app.route("/", (req, res) => {
    console.log("Request at route :/");
})
    .get(function (req, res) {
        User.find({}, (err, user) => {
            if (err)
                console.log(err);
            else {
                // console.log(user);
                res.send(user);
            }
        })

    })
    .post(function (req, res) {
        console.log(req.body);
        User.insertMany([req.body]);
        res.redirect("/");
    });


// Specific Shop Requests/Search Query
app.route("/:shopName", (req, res) => {
    console.log("Request at route :" + req.params.shopName);
})
    .get(function (req, res) {
        // console.log(req.params);
        User.find({ name: req.params.shopName }, (err, user) => {
            if (err)
                console.log(err);
            else {
                // console.log(user);
                res.send(user);
            }
        })
    })
    .put(function (req, res) {
        // console.log(req.params);
        // console.log(req.body);
        User.findOneAndReplace({ name: req.params.shopName }, req.body, null, (err, user) => {
            if (err)
                console.log(err);
            else {
                console.log(user);
                res.redirect("/" + req.params.shopName);
            }
        })
    })
    .delete(function (req, res) {
        console.log(req.params);
        console.log(req.body);
        User.findOneAndDelete({ name: req.params.shopName }, (err, user) => {
            if (err)
                console.log(err);
            else {
                res.redirect("/" + req.params.shopName);
            }
        })
    });


app.listen(3000, function (err) {
    if (err)
        console.log(err);
    else
        console.log("Listening to server at localhost:3000");
})