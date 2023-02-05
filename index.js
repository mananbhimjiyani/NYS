const express = require("express");
const path = require("path");
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('*/text', express.static('public/text'));
app.use('*/css', express.static('public/css'));
app.use('*/images', express.static('public/images'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/auth", function (req, res) {
    let username = req.body.username;
    let password = req.body.psw;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                // Redirect to home page
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password');
        res.end();
    }
})
app.post('/authUser', function (req, res) {
    let username = req.body.username;
    let password = req.body.psw;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.userLoggedin = true;
                req.session.username = username;
                // Redirect to home page
                res.redirect('/userHome')
            } else {
                res.send('Incorrect Username and/or Password');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password');
        res.end();
    }
})
app.post('/compReg', function (req, res) {
    let compName = req.body.compName;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.psw;
    let repeatPassword = req.body.pswRepeat;
    if (password === repeatPassword) {
        if (email && password) {
            connection.query('select email from accounts where email=?', [email], function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    res.send('Email Already Exsists.')
                } else {
                    connection.query('INSERT INTO accounts(compName, username, password, email) values(?,?,?,?)', [compName, username, password, email], function (error, results, fields) {
                        if (error) throw error;
                        req.session.loggedin = true;
                        req.session.username = username;
                        // Redirect to home page
                        res.redirect('/userHome');
                    });
                }
            });
        } else {
            res.send('Please enter Username and Password');
            res.end();
        }
    } else if (password !== repeatPassword) {
        return res.render("register", {
            msg: "Password do not match",
            msg_type: "error",
        });
    }
});
app.post('/userReg', function (req, res) {
    let userRole = req.body.userRoles;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.psw;
    let repeatPassword = req.body.pswRepeat;
    if (password === repeatPassword) {
        if (email && password) {
            connection.query('select email from user where email=?', [email], function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    res.send('Email Already Exsists.');
                }
                else {
                    connection.query('INSERT INTO user(userRole, username, password, email) values(?,?,?,?)', [userRole, username, password, email], function (error, results, fields) {
                        if (error) throw error;
                        req.session.loggedin = true;
                        req.session.username = username;
                        // Redirect to home page
                        res.redirect('/userHome');
                    });
                }
            });
    } else {
        res.send('Please enter Username and Password');
        res.end();
    }
}
else
if (password !== repeatPassword) {
    return res.render("register", {
        msg: "Password do not match",
        msg_type: "error",
    });
}
}
)
;

app.get('/home', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
        // Output username
        res.redirect('/public/text/userLogin.html');
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
    res.end();
});
app.get('/userHome', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
        // Output username
        res.send("Logged in");
    } else {
        // Not logged in
        res.send('Please login to view this page!');
    }
    res.end();
});

app.listen(3000, function (req, res) {
    console.log("Server started on port")
})