var express = require("express");
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 3000;

// Define the sumofTwoNumber function
function sumofTwoNumber(n1, n2) {
    return n1 + n2;
}

app.get("/", (req, res) => {
    res.send("Welcome to the Add Two Numbers API!");
});

app.get("/sumofTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    

    // Check if n1 and n2 are valid numbers
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ statusCode: 400, message: "Invalid numbers provided change it" });
    }

    const result = sumofTwoNumber(n1, n2);
    res.json({ statusCode: 200, data: result });
});
app.listen(port, () => {
    console.log("App listening to: " + port);
});