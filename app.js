const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(
        'mongodb+srv://shaneoh10:uP8NciDozXjxT7Qt@myfirstcluster.vyaia.mongodb.net/myFirstDB?retryWrites=true&w=majority'
    );
}

const itemSchema = {
    name: String
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todo list!"
});

const item2 = new Item({
    name: "Hit the + button to add an item!"
});

const item3 = new Item({
    name: "<--- Hit this to delete an item!"
});

const defaultItems = [item1, item2, item3];


app.get('/', (req, res) => {
    let day = date.getDate();

    Item.find({}, (err, foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Items saved to database");
                }
            });
            res.redirect('/');
        } else {
            res.render('list', { title: day, newItems: foundItems });
        }
    });

});

app.post('/', (req, res) => {
    let itemName = req.body.newItem;

    const item = new Item({
        name: itemName
    });

    item.save();
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Successfully deleted item.")
            res.redirect('/');
        }
    });
});

app.get('/work', (req, res) => {
    res.render('list', { title: 'Work List', newItems: workItems });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
