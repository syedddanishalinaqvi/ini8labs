# Steps For Working of Project

Go through all these steps to start with the project in you local system.

## Prerequisite

sql, nodejs should be installed in your system

### Step 1

Download this project and open it in your editor.
Run
```bash
npm install
```

### Step 2

Run your sql server (You can use Xampp for that) and create a database.

Make a file with name ```.env ``` in the project folder.

Add all these variables according to your sql server. 
```bash
HOST='' //default localhost
DATABASE='' 
PASSWORD=''
USER='' //default root
DIALECT='' //default mysql
```
### Step 3

Open terminal and write this command
```bash
npm start //Start script is written in package.json
```

If that doen't work, then write
```bash
nodemon index.js
```
### Step 4

To run all the apis you can use postman.