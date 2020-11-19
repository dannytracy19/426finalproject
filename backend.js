//setting up the backend
const express = require('express');

//executing method
const app = express();

const User = require('./User.js')

const bodyparser = require('body-parser');

app.use(bodyparser.json());


//request, response
//get all books by ID
app.get('/user',(req, res) => {
    res.json(User.getAllIDs());
    return;
});


app.get('/user:id', (req, res) => {
    let u = User.findByID(req.params.id);
    if (u==null){
        res.status(404).send("User not found");
        return;
    }
    res.json(u);
})


app.post('/', (req, res) => {
    let {email} = req.body;
    //console.log(req);
    
    let u = User.create(email);
    if (u==null){
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(u);

});

app.post('/preferences', (req, res) => {
    let {preferences} = req.body;
    //console.log(req);
    let user = User.findByID(req.params.id);
    if (user==null){
        res.status(400).send("Bad Request");
        return;
    }
    user.addPreferences(preferences, req.params.id);
    return res.json(user);
});

// app.delete('/book/:id', (req, res) => {
//     let u = User.findByID(req.params.id);
//     if (u == null) {
//         res.status(404).send("Book not found");
//         return;
//     }
//     u.delete();
//     res.json(true);
// });

const port = 3030;
app.listen(port, () => {
    console.log("Tutorial1 up and running on port " + port);
});