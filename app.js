const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')
const mongoose = require('mongoose');
const _ = require('lodash')
const dotenv = require("dotenv")

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
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

const listSchema = {
    name: String,
    items: [itemSchema]
}

const List = mongoose.model('List', listSchema);
const day = date.getDate();


app.get('/', (req, res) => {
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

app.get('/:customListName', (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName }, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                // Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();
                res.redirect('/' + customListName);
            } else {
                // Show existing list
                res.render('list', { title: foundList.name, newItems: foundList.items });
            }
        }
    });
});

app.post('/', (req, res) => {
    let itemName = req.body.newItem;
    let listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === day) {
        item.save();
        res.redirect('/');
    } else {
        List.findOne({ name: listName }, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + listName);
        });
    }
});

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    console.log(listName);

    if (listName === day) {
        Item.findByIdAndRemove(checkedItemId, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted item.")
                res.redirect('/');
            }
        });
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, (err, foundList) => {
            if (!err) {
                res.redirect('/' + listName);
            }
        });
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

let port = process.env.PORT;
if (port == null || port == '') {
    port = 3000
}
app.listen(port, () => {
    console.log('Server has started successfully');
});
