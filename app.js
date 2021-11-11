const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', function(req, res){
    let today = new Date();

    const greeting = today.getDay() === 6 || today.getDay === 0 ? 'Weekend' : 'Not weekend';
    res.send(greeting);
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});