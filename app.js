const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');

const app = express();

let newItems = [];
let workItems = []

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    let today = new Date();
    let dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    let date = today.toLocaleDateString('en-US', dateOptions);

    res.render('list', {title: date, newItems: newItems});
});

app.post('/', function(req, res){
    let item = req.body.newItem;

    if(req.body.list === 'Work') {
        workItems.push(item)
        res.redirect('/work');
    } else {
        newItems.push(item);
        res.redirect('/');
    }
})

app.get('/work', function(req, res){
    res.render('list', {title: 'Work List', newItems: workItems});
});

app.get('/about', function(req, res){
    res.render('about');
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});
