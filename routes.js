const fs = require('fs');

const routes = (req,res) => {
    let url = req.url;
    let method = req.method;

    if(url === '/'){
        res.write(`<html>
        <body>
            <form action = '/message' method = 'POST'>
                <input type = "text" name = 'message'/>
                <button type = 'submit'>Submit</button>
            </form>
        </body>
        </html>`);
        res.end();
    }
    
    if(url === '/message' && method == 'POST'){
        const body = [];
        req.on('data',(chunk) => {
            body.push(chunk);
        });

        req.on('end',() => {
            const parsedData = Buffer.concat(body).toString();
            let message = {message : parsedData.split("=")[1]};
            fs.writeFile("message.txt",message.message,() => {});
        })

        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }
}

exports.handle = routes;
exports.someText = "Test";