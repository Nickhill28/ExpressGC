const http = require('http');
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const route = require('./routes/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',route);


app.use((req,res)=>{
    res.status(404).send(
        `<h1>PNF: Page Not Found!</h1>
        <p>We are a Group Chat Web App. wanna checkout?</p>
        <button><a href="/login">Enter GC</a></button>`)
})

app.listen(4000);
