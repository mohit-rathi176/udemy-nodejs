const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Landing Page</title></head>');
        res.write('<body>');
        res.write('<h1>Hello from my node.js server!</h1>');
        res.write('<form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Submit</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (error) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
    
    res.setHeader('Content-Type', 'text/html');
    
    res.write('<html>');
    res.write('<head>');
    res.write('<title>My First Page</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Hello from my node.js server!</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();
}

module.exports.handler = requestHandler;