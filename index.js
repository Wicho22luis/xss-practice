const express = require("express");
const fs = require("fs")
const app = express();
//const xss = require("xss-clean")

const products = ["Apple"]
app.use(express.json());

//app.use(xss())

app.get("/search", (req, res) => {
    let ind = fs.readFileSync(__dirname + "/index.html")
    
    const s = "Could not find product " + req.query.q;
    ind = ind.toString().replace("<!-- SEARCH -->", s);
    //res.setHeader("Content-Security-Policy", "script-src http://localhost:8080")
    res.send(ind);
})

app.get ("/js", (req, res )=> {
    res.sendFile(__dirname + "/src.js")
});

app.get("/", (req, res) => {
    let ind = fs.readFileSync(__dirname + "/index.html")
    
    const s = products.reduce((a, c) => {
        return `${a}<li class="list-group-item">${c}</li>`
    }, "")
    ind = ind.toString().replace("<!-- LIST -->", s);
    //res.setHeader("Content-Security-Policy", "script-src http://localhost:8080")
    res.send(ind);
})

app.get("/products", (req, res) => {

   res.send(products)
})

 
app.post("/products", (req, res) => {

    products.push(req.body.name);
    res.send({"success":true})
})

app.listen(8080);

console.log("Listen to 8080")

//https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css

//res.setHeader("Content-Security-Policy", "script-src http://localhost:8080")
