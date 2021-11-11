const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    let today = new Date();
    const day = days[today.getDay()];
    res.render('list', {day: day});
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});