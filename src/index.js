import http from 'node:http';
import { config } from "dotenv";
import { validate as validateUuid, v4 as createUUID, } from 'uuid';
// import { randomUUID } from 'crypto';
import {
    createMessage,
    validateUserData,
    userExists
} from './utils/index.js';

config();

const PORT = process.env.PORT || 4000;

const users = [];
// sample of user 
// {
//         'id': 'id',
//         'name': 'someName',
//         'age ': 'number',
//         'hobbies ':'some hobbies'
// }
// console.log(randomUUID())

const server = http.createServer({}, (request, responce) => {
    const { url, method } = request;

    try {
        if (!url.includes('/api/users')) {
            responce.statusCode = 404
            responce.end('Resource that you request doesnt exists')
        }
        const urlArray = url.split('/').slice(3)

        switch (method) {
            case 'GET':
                // all users
                if (url === '/api/users' && !urlArray[0]) {
                    const result = users.length ? users : []
                    responce.statusCode = 200;
                    responce.end(JSON.stringify(result));
                } else if (urlArray[0] && validateUuid(urlArray[0])) {
                    // valid user

                    if (userExists(users, urlArray[0])) {
                        responce.statusCode = 200
                        responce.end(createMessage(urlArray[0]))
                    } else {
                        responce.statusCode = 404;
                        responce.end(createMessage('User not found'));
                    }

                } else {
                    responce.statusCode = 400;
                    responce.end(createMessage('Invalid userId'))
                }


                break;

            case 'POST':


                let data = '';

                request.on('data', body => data += body);
                request.on('end', () => {

                    const newUser = JSON.parse(data);
                    newUser.id = createUUID();

                    if (validateUserData(newUser)) {
                        users.push(newUser);
                        responce.statusCode = 200;
                        responce.end(JSON.stringify(newUser));
                    } else {
                        responce.statusCode = 400;
                        responce.end(createMessage('request body does not contain required fields'));
                    }

                })

                break;
            case 'PUT':
                responce.writeHead(200);
                responce.end('PUT method called\n');
                break;
            case 'DELETE':

                if (userExists(users, urlArray[0])) {
                    const index = users.filter((el, index) => {
                        (el.id === urlArray[0]) && index
                    })
                    users.splice(index, 1)
                    console.log(users)
                    responce.writeHead(200)
                    responce.end('USer with id: ' + urlArray[0] + ' deleted')
                } else {
                    // valid uuid 
                    if (validateUuid(urlArray[0])) {
                        responce.writeHead(404)
                        responce.end('User with this id doesnt exist')
                    } else {
                        responce.writeHead(400)
                        responce.end('Provided Id is not valid')
                    }
                }
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
