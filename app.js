const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let newItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    let today = new Date();
    let dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    let date = today.toLocaleDateString('en-US', dateOptions);

    res.render('list', {date: date, newItems: newItems});
});

app.post('/', function(req, res) {
    let item = req.body.newItem;
    newItems.push(item);
    res.redirect('/');
})

app.listen(3000, function(){
    console.log('Server running on port 3000');
});
