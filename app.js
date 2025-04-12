const express = require('express');

//express app
const app = express();

// listen for request
app.listen(3000);

app.get('/', (req, res) =>{
   // res.send('<p>home page</p>');
   res.sendFile('./views/index.html', { root: __dirname});
})
app.get('/about', (req, res) =>{
    //res.send('<p>About Page</p>');
    res.sendFile('./views/about.html', { root: __dirname});
})
app.get('/import', (req, res) => {
    //Import page
    res.sendFile('./views/import.html', {root: __dirname})
})



// redirects
app.get('/about-us', (req, res) =>{
    res.redirect('/about');
})

// 404 page the app.use() needs to be used at the last.
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
})