import http from 'node:http';


const PORT = 4000;

const server = http.createServer({}, (req, res) => {
    switch (req.url) {
        case '/api/users':
            res.writeHead(200);
            res.end('hello world\n');
            break;

        default:
            res.writeHead(404);
            res.end('not found\n')
            break;
    }
})

server.listen(PORT || 4000, (err) => {
    if (err) {
        console.error('Something bad happened' + err.message);
    } else {
        console.log(`server is listening on ${PORT}`);
    }
})
