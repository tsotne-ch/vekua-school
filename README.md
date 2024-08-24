# N42 Ilia Vekua Public school webpage (Official)
### https://vekua42.edu.ge

## Vite + React

This project was bootstrapped with Vite
Read more at [vitejs.dev](https://vitejs.dev/)

![Vekua page pic](https://github.com/user-attachments/assets/27b6f4ba-6b65-49aa-89fb-fa778c7a4486)

Made with MongoDB, ExpressJS, React, NodeJS and Firebase

## Installation

First make sure to rename .env.example to .env in both main and firebase functions directories.

**If you are planning to test/startup the node server make sure to enter your own MongoDB URI Auth Information in .env file (Username and password)**

**MongoDB URI Example**
```
mongodb+srv://USERNAME:PASSWORD@appcool.niceapp.mongodb.net/?retryWrites=true&w=majority&appName=myApp
```

**./your_firebase_cloud_function/.env**
```
KEY="USERNAME:PASSWORD"
```

### Installing dependencies

You need to install all npm packages
```
  npm install
```

To run the app run
```
  npm run dev
```

To build the app for production
```
  npm run build
```
