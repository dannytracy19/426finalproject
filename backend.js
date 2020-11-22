//setting up the backend
const express = require('express');

//executing method
const app = express();

const User = require('./User.js');

const Meetup = require('./Meetup.js');

const bodyparser = require('body-parser');

app.use(bodyparser.json());

const expressSession = require('express-session');

app.use(expressSession({
    name: "SessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false
}));



//request, response
//get all books by ID
app.get('/user',(req, res) => {
    res.json(User.getAllIDs());
    return;
});


// app.get('/user:id', (req, res) => {
//     let u = User.findByID(req.params.id);
//     if (u==null){
//         res.status(404).send("User not found");
//         return;
//     }
//     res.json(u);
// })



const user_data = require('data-store')({ path: process.cwd() + '/user_data/users.json' });

app.post('/', (req, res) => {
    let authenticated = false;
    console.log("checking")

    let {email, password} = req.body;

    //getting the users object, users_db is the users database
    let users_db = user_data.data


    //checking the credentials
    for (const user in users_db){
        const user_email = users_db[user].email;
        const user_password = users_db[user].password;

        if ((email == user_email) && (password == user_password)){
            console.log("auth!")
            res.send("authenticated!")
            return;
        }
        
    }

    res.status(404).send("Not found");

    

    




})


app.post('/signuppage', (req, res) => {
    let {email, password, preferences} = req.body;
    console.log(req.body);
    
    let u = User.create(email, password, preferences);
    if (u==null){
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(u);

});

//meetups
app.post('/meetups', (req, res) => {
    let {address1, address2, meettype, stars, price} = req.body;
    console.log(req.body);
    
    let m = Meetup.create(address1, address2, meettype, stars, price);
    if (m==null){
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(m);

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