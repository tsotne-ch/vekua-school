# N42 Ilia Vekua Public school webpage (Official)
### https://vekua42.edu.ge

This project was bootstrapped with create-react-app
Read more at [Create React App](https://create-react-app.dev/)

![Vekua page pic](https://github.com/user-attachments/assets/27b6f4ba-6b65-49aa-89fb-fa778c7a4486)

Made with MongoDB, ExpressJS, React, NodeJS and Firebase

## Installation

First make sure to rename .env.example to .env in both Client and Server directories.

**If you are planning to test/startup the node server make sure to enter your own MongoDB URI Auth Information in .env file (Username and password)**

**MongoDB URI Example**
```
mongodb+srv://USERNAME:PASSWORD@vekuacluster.suzebxd.mongodb.net/?retryWrites=true&w=majority&appName=vekuacluster
```

**./server/.env**
```
KEY="USERNAME:PASSWORD"
```

### Installing dependencies

You need to install all npm packages with both projects
```
  cd client
  npm install
```
```
  cd server
  npm install
```

## Running the app

### Client app

In order to run the webpage in development mode, run these commands

In the client directory
```
  npm start
```

In order to build the application for production
```
  npm run build
```

### Server

```
  cd server
  node api/index
```

The server will be running on http://localhost:3000 unless you change the port.
