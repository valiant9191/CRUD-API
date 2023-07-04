import http from 'node:http';
import { config } from "dotenv";
import { validate as validateUuid } from 'uuid';
import { randomUUID } from 'crypto';
import path from 'node:path';
import { createMessage } from './utils/index.js';

config();

const PORT = process.env.PORT || 4000;

const users = [];
console.log(randomUUID())

const server = http.createServer({}, (request, res) => {
    const { url, method } = request;

    try {
        if (!url.includes('/api/users')) {
            res.statusCode = 404
            res.end('Resource that you request doesnt exists')
        }
        const urlArray = url.split('/').slice(3)
        console.log(urlArray)

        switch (method) {
            case 'GET':
                // all users
                if (url === '/api/users') {
                    res.statusCode = 200;
                    const result = users.length ? users : []
                    res.end(JSON.stringify(result));
                } else if (urlArray[0] && validateUuid(urlArray[0])) {
                    // valid user
                    const userExists = users.find(user => user === urlArray[0])

                    if (userExists) {
                        res.statusCode = 200
                        res.end(createMessage(urlArray[0]))
                    } else {
                        res.statusCode = 404;
                        res.end(createMessage('User not found'));
                    }
                } else {
                    res.statusCode = 400;
                    res.end(createMessage('Invalid userId'))
                }
                break;

            case 'POST':
                res.writeHead(200);
                res.end('POST method called\n');
                break;
            case 'UPDATE':
                res.writeHead(200);
                res.end('UPDATE method called\n');
                break;
            case 'DELETE':
                res.writeHead(200);
                res.end('DELETE method called\n');
                break;

            default:
                res.writeHead(404);
                res.end('not found\n')
                break;
        }
    } catch (error) {
        console.error(error.message)
    }


})

server.listen(PORT, (err) => {
    if (err) {
        console.error('Something bad happened' + err.message);
    } else {
        console.log(`server is listening on ${PORT}`);
    }
})
