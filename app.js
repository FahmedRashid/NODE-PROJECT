const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { request } = require('http');


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

//blog routes --------------------------
app.get('/blogs', (req, res) =>{
    Blog.find().sort( {createdAt: -1})
    .then((result)=>{
        res.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch((err)=>{
        console.log(err);
    });
});

// POST
app.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body)
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err) =>{
        console.log(err);
    });
});

// get by ID -- find a single one and render
app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
         res.render('details', { blog: result, title: 'Blog Details'});
        })
        .catch(err => {
         console.log(err);
        });
});

// Delete request 
app.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result =>{
        res.json({ redirect: '/blogs' })
    })
    .catch((err) =>{
        console.log(err);
    })
})

//update request
app.get('/blogs/:id/edit', (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('edit', { blog: result, title: 'Edit Blog'});
    })
    .catch(err =>{
        console.log(err);
    })
})
app.put('/blogs/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body)
    .then(result => {
        res.json({ redirect: '/blogs' })
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/import', (req, res) => {
    //Import page
    res.render('import', {title: 'Import'});
})

app.get('/create', (req, res) =>{
    res.render('create', {title: 'Create'});
})


// 404 page the app.use() needs to be used at the last.
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})