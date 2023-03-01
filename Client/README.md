## Quiz Application 
MongoDB, Expressjs, React, Nodejs


#### _**IMPORTANT NOTE**_ - 
This project does not have a mongoDB connection setup. Setup the connection based on the environments below.
- local development: create a config file (make sure to name it config.env) in the backend folder, which exports your db.uri connection.

## clone or download
```terminal
$ git clone https://github.com/rakshithasreenivas/Quiz-Application-G4.git
$ yarn # or npm i
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

NOTE : You need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ yarn # or npm i    // npm install packages
$ npm start        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 5000)

### Start

```terminal
$ cd backend   // go to server folder
$ npm i       // npm install packages
$ npm run dev // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file

```


## File structure

-  `public` - This holds all of our static files
- `src`
    - `assets` - This folder holds assets such as images, docs, and fonts
    - `components` - This folder holds all of the different components that will make up our views
    - `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - `App.js` - This is what renders all of our browser routes and different views
    - `index.js` - This is what renders the react app by rendering App.js, should not change
- `package.json` - Defines npm behaviors and packages for the React-App
- `backend` - Holds the node application
    - `helper` - This holds our configuration files, like mongoDB uri
    - `controllers` - These hold all of the callback functions that each route will call
    - `models` - This holds all of our data models
    - `routes` - This holds all of our HTTP to URL path associations for each unique url
    - `app.js` - Defines the application behaviour of our server application
     `index.js`
    - `package.json` - Defines npm behaviors and packages for the Node project `.gitignore` - Tells git which files to ignore `README` - This file!


## Available Scripts

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn how to setup a local MongoDB instance for testing, check out how to [Connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/).

To learn how to deploy a full-stack web app to heroku, check out [this great guide](https://daveceddia.com/deploy-react-express-app-heroku/).

To learn React, check out the [React documentation](https://reactjs.org/).

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
