//file system
const fs = require('fs');


const requestHnadler = (req, res) => {
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

    //they run sometime in the future but not if it doesn't happen
    if(url === '/message' && method === 'POST') {
        const body = [];
        //listener
        req.on('data', (chunk) => {
            console.log(chunk);
            //we push chunks of data of larger file
            body.push(chunk);
        });
        return req.on('end', () => {
            //because body will be text and we assume this
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            //sync would block code for larger files
            // fs.writeFileSync('message123.txt', message);
            fs.writeFile('message123.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    //set response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>MY html</title></head>');
    res.write('<body><h1>hello node.js serv</h1></body>');
    res.write('</html>');
    res.end();
    //after end we can't change response

}

module.exports = requestHnadler;