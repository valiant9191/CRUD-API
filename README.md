# node-simple-crud-api


clone repository with command:
    git clone: https://github.com/valiant9191/CRUD-API.git;

 add dependencies with command:
    npm install

add .env file to project with variable name PORT where you can provide your port, by default it 4000

run server with command: npm run start:dev

users objects in database looks following way: 
{
'name': 'yourNAME',
'age': yourAGE,
'hobbies' : ['hobby','hobby','hobby']
}


You can use postman application.

###to get all users:
    method "GET"
    http://localhost:8080/api/users

###to get current user with provided id:
    method "GET"
    http://localhost:8080/api/users/{currentID}

###to put into database user:
    method "POST"
    http://localhost:8080/api/users

    with provided data in body of similar way:
    {
    "name":"your_name",
    "hobbies":["your_hobbie"],
    "age":your_age
    }

###to delete user:
    method "POST"
    http://localhost:8080/api/users/{currentID}

###to Update user:
    method "PUT"
    http://localhost:8080/api/users/{currentID}

    with provided data in body of similar way:
    {
    "name":"your_name",
    "hobbies":["your_hobbie"],
    "age":your_age
    }
