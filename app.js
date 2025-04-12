const express = require('express');

//express app
const app = express();

//register view engine ejs
app.set('view engine', 'ejs'); // by default ejs knows to check the view folder

// listen for request
app.listen(3000);

app.get('/', (req, res) =>{
   // res.send('<p>home page</p>');
   res.render('index');
})
app.get('/about', (req, res) =>{
    //res.send('<p>About Page</p>');
    res.render('about');
})
app.get('/import', (req, res) => {
    //Import page
    res.render('import');
})

app.get('/blogs/create', (req, res) =>{
    res.render('create');
})

// 404 page the app.use() needs to be used at the last.
app.use((req, res) => {
    res.status(404).render('404');
})