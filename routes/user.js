const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/login',(req,res)=>{
    res.send(
        `<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/message" method="GET">
        <label for="username">UserName</label>
        <input type="text" id="username" name="username">
        <button type="submit">Log In</button>
        </form>`
        );
});

router.post('/message',(req,res)=>{
    const user = req.body.username;
    const message = req.body.message;
    fs.writeFile('gc.txt', `\n ${user}: ${message}`,{ flag: 'a' }, () =>{
        res.redirect('/message');
    });
});

router.get('/message',(req,res)=>{
    fs.readFile('gc.txt', (err,data)=>{
        if (err) {
            data = 'No chat exists';
        }
        res.send(
            `<p>${data}</p>
            <form action="/message" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
            <label for="message">Message to GC</label>
            <input type="text" name="message">
            <input type="hidden" name="username" id="username"><br>
            <button type="submit">Send Message</button>
            <br>
            <button><a href="/login">GC Exit</a></button>
            </form>`
            );
    });
})

module.exports = router;