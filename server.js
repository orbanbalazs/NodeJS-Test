const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
})

app.set('view engine','hbs');

app.use( (req, res, next) => {
    let now = new Date().toString();
    let log = now + ' ' + req.method + ' ' + req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\r\n', (err) => {
        if(err)
        {
            console.log('Unable to append to server log.');
        }
    })
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'NJ Home Page',
        welcomeMessage: 'Welcome to Express!'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>aboute route</h1>');
    res.render('about.hbs', {
        pageTitle: 'NJ About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});