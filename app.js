const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


//express app
const app = express();

//connect to Mongodb
const dbURI = 'mongodb+srv://fahmed:fahmed123@false-blogs.da5wy9v.mongodb.net/blogDb?retryWrites=true&w=majority&appName=False-Blogs';
mongoose.connect(dbURI) //, { useNewUrlParser: true, useUnifiedTopology: true} // console texts shows warnings
    .then((result)=> app.listen(3000)) // listen for request
    .catch((err) => console.log(err));
//register view engine ejs
app.set('view engine', 'ejs'); // by default ejs knows to check the view folder



// middleware static files like css templates.
app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/', (req, res) =>{
    const blogs = [
        {title: 'The first test blog', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'The second test blog', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'The third  test blog', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ];
   res.render('index', {title: 'Home', blogs: blogs});
})
app.get('/about', (req, res) =>{
    //res.send('<p>About Page</p>');
    res.render('about', {title: 'About'});
})
app.get('/import', (req, res) => {
    //Import page
    res.render('import', {title: 'Import'});
})

app.get('/blogs/create', (req, res) =>{
    res.render('create', {title: 'Create'});
})

// 404 page the app.use() needs to be used at the last.
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})