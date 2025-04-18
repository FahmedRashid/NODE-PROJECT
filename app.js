const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { request } = require('http');
const blogRoutes = require('./routes/blogRoutes')


//express app
const app = express();

//connect to Mongodb
const dbURI = 'mongodb+srv://fahmed:fahmed123@false-blogs.da5wy9v.mongodb.net/blogDb?retryWrites=true&w=majority&appName=False-Blogs';
mongoose.connect(dbURI) //, { useNewUrlParser: true, useUnifiedTopology: true} // console texts shows deprecation warnings
    .then((result)=> app.listen(3000)) // listen for request
    .catch((err) => console.log(err));
//register view engine ejs
app.set('view engine', 'ejs'); // by default ejs knows to check  the view folder

// middleware static files like css templates.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//routes
app.get('/', (req, res) =>{
    res.redirect('/blogs');
})

app.get('/about', (req, res) =>{
    //res.send('<p>About Page</p>');
    res.render('about', {title: 'About'});
})
app.get('/import', (req, res) => {
    //Import page
    res.render('import', {title: 'Import'});
})

//blog routes
app.use('/blogs',blogRoutes);


// 404 page the app.use() needs to be used at the last.
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})