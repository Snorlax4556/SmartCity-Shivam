const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

regUser = [{
    name: "Barber-Shop",
    address: "Delhi India",
    contact: "9998887776",
    rating: 5
}, {
    name: "Cake-Shop",
    address: "Mumbai India",
    contact: "9998887776",
    rating: 3
}, {
    name: "Stationary-Shop",
    address: "Jaipur India",
    contact: "9998887776",
    rating: 4
}]

// Direct Requests to home page

app.get("/", function (req, res) {
    res.send(regUser)
})
app.post("/", function (req, res) {
    console.log(req.body);
    regUser.push(req.body);
    res.redirect("/");
})


// Specific Shop Requests
app.get("/:shopName", function (req, res) {
    console.log(req.params);
    let QueryRes = regUser.filter((elem) => (elem.name === req.params.shopName))
    res.send(QueryRes);
});

app.listen(3000, function (err) {
    if (err)
        console.log(err);
    else
        console.log("Listening to server at locaalhost:3000");
})