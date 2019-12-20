//require or import? 
const http = require('http');
//file system
const fs = require('fs');

function rqListener(req, res) {

};

// //using functiion
// http.createServer(rqListener);

// //inline anonymous func
// http.createServer(function(req,res) {

// });

//function keyword
const server = http.createServer((req,res) => {
    // console.log(req);

    //quits node process
    //process.exit();
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>MY html</title></head>');

        //i needed this structure for input (no closing tag and name) so that when parsing url i got /message instead of /message? 
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    console.log(url);
    console.log(method);

    if(url === '/message' && method === 'POST') {
        const body = [];
        //listener
        req.on('data', (chunk) => {
            console.log(chunk);
            //we push chunks of data of larger file
            body.push(chunk);
        });
        req.on('end', () => {
            //because body will be text and we assume this
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message123.txt', message);
        });
        fs.writeFileSync('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    //set response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>MY html</title></head>');
    res.write('<body><h1>hello node.js serv</h1></body>');
    res.write('</html>');
    res.end();
    //after end we can't change response
});

//listen for server
server.listen(4321);