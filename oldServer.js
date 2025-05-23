// there is no longer need of this server.js page as express app was was installed and all the routing will be handle from there.
// This is only here for documentation of how we could have used node to create this project only. 
const fs = require('fs');
const http = require('http')
const _= require('lodash');

const server = http.createServer((req, res) =>{

    // // lodash ----
    // const num = _.random(0, 20);
    // console.log(num);

    // const greet = _.once(() =>{
    //     console.log('hello');
    // });
    // greet();
    // greet();

    // -- set header content type --
    res.setHeader('Content-Type', 'text/html')

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode =200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode =200;
            break;
        case '/about-us':
            res.statusCode =301;
            res.setHeader('Location', 'about');
            res.end()
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
// --send an html files--
    fs.readFile(path, (err, data) =>{
        if(err){
            console.log(err);
            res.end();
        }else {
           // res.write(data); //or add tata here res.end(data); 
           res.end(data);

        }
    })

});

server.listen(3000, 'localhost', () =>{
    console.log('Listening for requests on port 3000');
});



