# My Full-stack Base

### Last time updated: 05/08/2020


<h1 id='summary'>Summary</h1>

* [Front-end](#frontend)
  * [Installation](#frontendinstall)
  * [Assets Folder](#assets)
  * [Components Folder](#components)
    * [ErrorMessage Component](#errormessage)
    * [Footer Component](#footer)
    * [Form Log In Component](#formlogin)
    * [Form Profile Component](#formprofile)
    * [Form Sign Up Component](#formsignup)
    * [Header Component](#header)
    * [Navbar Component](#navbar)
    * [Modal Message Component](#modalmessage)
  * [Style Css](#css)
  * [Pages](#pages)
  * [Redux](#redux)
  * [Utilities Folder](#utils)
    * [apiService](#apiservice)
    * [tokenService](#tokenservice)
    * [userService](#userservice)
  * [App.js](#app)
  * [Index.js](#index)
  * [Store.js](#store)
* [Back-end](#backend)
  * [Installation](#backendinstall)
  * [package.json](#packagebackend)
  * [Environment - Files](#backendenv)
  * [Database - Connection](#databaseconnection)
  * [Controllers - User](#controllers)
  * [Middelwares - Auth](#middlewares)
  * [User Model - Schema](#model)
  * [User Routes](#routes)
  * [Server Configuration](#server)
    * [Server - app.js](#app)
    * [Server - index.js](#index)
  * [User's API Test Cases - Jest](#tests)
  
<h1 id='frontend'>Front-end</h1>

<h2 id='frontendinstall'>Installation</h2>

[Go Back to Summary](#summary)

* First create a new react app

    ```Bash
        npx create-react-app my-full-stack-app
    ```

* The react boiler plate will generate the following structure

    ```Bash
        .
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── logo192.png     <- Delete
        │   ├── logo512.png     <- Delete
        │   ├── manifest.json
        │   └── robots.txt
        ├── src
        │   ├── App.css         <- Delete
        │   ├── App.js
        │   ├── App.test.js     <- Delete
        │   ├── index.css       <- Delete
        │   ├── index.js
        │   ├── logo.svg        <- Delete
        │   ├── serviceWorker.js
        │   └── setupTests.js   <- Delete
        ├── .gitignore
        ├── package-lock.json
        ├── package.json
        └── README.md
    ```

* Create the following folders and files
  * Move all the react boiler plate into a new folder called `Front-end`, and then create the following structure.

    ```Bash
        mkdir Front-end/assets Front-end/icons Front-end/images Front-end/components Front-end/components/ErrorMessage Front-end/components/Footer Front-end/components/FormLogin Front-end/components/FormProfile Front-end/components/FormSignup Front-end/components/Header Front-end/components/ModalMessage Front-end/components/Navbar Front-end/css Front-end/pages Front-end/pages/AboutPage Front-end/pages/HomePage Front-end/pages/LoginPage Front-end/pages/ProfilePage Front-end/pages/SingupPage Front-end/redux Front-end/utils

        touch Front-end/assets/iconsSocialMedia.js Front-end/assets/iconsSvg.js Front-end/components/ErrorMessage/ErrorMessage.jsx Front-end/components/Footer/Footer.jsx Front-end/components/FormLogin/FormLogin.jsx Front-end/components/FormProfile/FormProfile.jsx Front-end/components/FormSignup/FormSignup.jsx Front-end/components/Header/Header.jsx Front-end/components/ModalMessage/ModalMessage.jsx Front-end/components/Navbar/Navbar.jsx Front-end/css/index.css Front-end/css/index.scss Front-end/pages/AboutPage/AboutPage.js Front-end/pages/HomePage/HomePage.js Front-end/pages/LoginPage/LoginPage.js Front-end/pages/ProfilePage/ProfilePage.js Front-end/pages/SingupPage/SingupPage.js Front-end/redux/user.js Front-end/utils/apiService.js Front-end/utils/tokenService.js Front-end/utils/userService.js Front-end/store.js
    ```

* Final front-end structure

    ```Bash
        .
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── manifest.json
        │   └── robots.txt
        ├── src
        │   ├── assets
        │   │   ├── icons
        │   │   │   ├── github_footer.svg
        │   │   │   ├── github.svg
        │   │   │   ├── jest.svg
        │   │   │   ├── linkedin.svg
        │   │   │   ├── redux.svg
        │   │   │   └── replit.svg
        │   │   ├── images
        │   │   │   └── RogerTakeshita.jpeg
        │   │   ├── iconsSocialMedia.js
        │   │   └── iconsSvg.js
        │   ├── components
        │   │   ├── ErrorMessage
        │   │   │   └── ErrorMessage.jsx
        │   │   ├── Footer
        │   │   │   └── Footer.jsx
        │   │   ├── FormLogin
        │   │   │   └── FormLogin.jsx
        │   │   ├── FormProfile
        │   │   │   └── FormProfile.jsx
        │   │   ├── FormSignup
        │   │   │   └── FormSignup.jsx
        │   │   ├── Header
        │   │   │   └── Header.jsx
        │   │   ├── ModalMessage
        │   │   │   └── ModalMessage.jsx
        │   │   └── Navbar
        │   │       └── Navbar.jsx
        │   ├── css
        │   │   ├── index.css
        │   │   └── index.scss
        │   ├── pages
        │   │   ├── AboutPage
        │   │   │   └── AboutPage.jsx
        │   │   ├── HomePage
        │   │   │   └── HomePage.js
        │   │   ├── LoginPage
        │   │   │   └── LoginPage.js
        │   │   ├── ProfilePage
        │   │   │   └── ProfilePage.js
        │   │   └── SignupPage
        │   │       └── SignupPage.js
        │   ├── redux
        │   │   └── user.js
        │   ├── utils
        │   │   ├── apiService.js
        │   │   ├── tokenService.js
        │   │   └── userService.js
        │   ├── App.js
        │   ├── index.js
        │   ├── serviceWorker.js
        │   └── store.js
        ├── package-lock.json
        └── package.json
    ```

<h2 id='assets'>Assets Folder</h2>

[Go Back to Summary](#summary)

* In `assets/icons`
  * Add the SVG icons

* In `assets/images`
  * Add your images and logos

* In `assets/iconsSocialMedia.js`
* In `assets/iconsSvg.js`
  * This is a helper file to easily order and display your social media links e icons
  * Inside the about page we have an `.map()` method to loop though this document and mount all the images/icons.

<h2 id='components'>Components Folder</h2>

<h3 id='errormessage'>ErrorMessage Component</h3>

[Go Back to Summary](#summary)

* We create a modular component to only display the error message from the server
* We basically need to send two properties to this component, `message` (string) and `doneErrorMessage` (method).
  * the `doneErrorMessage` sends back to the parent component to the `ErrorMessage` component after `5 secs`

    ```JavaScript
        import React, { useEffect } from 'react';

        function ErrorMessage({ message, doneErrorMessage }) {
            useEffect(() => {
                const timer = setTimeout(() => {
                    doneErrorMessage();
                }, 5000);
                return () => {
                    clearTimeout(timer);
                };
            }, [message, doneErrorMessage]);

            return <div className="error-message">{message}</div>;
        }

        export default ErrorMessage;
    ```

<h3 id='footer'>Footer Component</h3>

[Go Back to Summary](#summary)

* Basic footer component

    ```JavaScript
        import React from 'react';
        import githubLogo from '../../assets/icons/github_footer.svg';

        function Footer() {
            return (
                <footer>
                    <div className="my-footer">
                        <a
                            className="my-footer__link"
                            href="https://github.com/Roger-Takeshita/My-Full-Stack-Base"
                            target="blank"
                        >
                            <span>Developed by</span>&nbsp;Roger Takeshita&nbsp; <img src={githubLogo} alt="logo" />
                        </a>
                    </div>
                </footer>
            );
        }

        export default Footer;
    ```

<h3 id='formlogin'>Form Log In Component</h3>

[Go Back to Summary](#summary)

* Inside this component we have a `form` variable that holds the form object with `email`, `password` and `message`
* After a successful log in:
  * We receive a token from the server, and then we execute a callback to store this token in the `localStorage`.
  * Then we get the user information from the `localStorage` to set a user to our redux with `loginUser()` action.

<h3 id='formprofile'>Form Profile Component</h3>

[Go Back to Summary](#summary)

* Similar to `FormLogin` component
* Inside this component we have a `form` variable that hold the form object with `firstName`, `lastName`, `email`, `password`, `newPassword`, `confirmNewPassword`, and `message`;
* After a successful update:
  * We receive an `updateed` token from the server, and then we execute a callback to `update` the new token in the `localStorage`.
  * Then we get the `updated` user information from the `localStorage` to `update` our redux with `updateUser()` action.
* IMPORTANT: Before updating the user information, we first check if the password is correct.

<h3 id='formsignup'>Form Sign Up Component</h3>

[Go Back to Summary](#summary)

* Similar to `FormLogin` component
* Inside this component we have a `form` variable that hold the form object with `firstName`, `lastName`, `email`, `password`, `confirmPassword`
* After a successful log in:
  * We receive a token from the server, and then we execute a callback to store this token in the `localStorage`.
  * Then we get the user information from the `localStorage` to set a user to our redux with `signupUser()` action.

<h3 id='header'>Header Component</h3>

[Go Back to Summary](#summary)

* Basic `<header>` component (parent component)
* We import the `Navbar` component (child component)

    ```JavaScript
        import React from 'react';
        import Navbar from '../Navbar/Navbar';

        function Head({ history }) {
            return (
                <header>
                    <Navbar history={history} />
                </header>
            );
        }

        export default Head;
    ```

<h3 id='navbar'>Navbar Component</h3>

[Go Back to Summary](#summary)

* This is a child component from the `Header` component
* In this file we have a `logoutUserFromApp` to clean the redux store once the user logs out.
* The logout is very simple, we don't user anything on the server side. It basically deletes the `token` from `localStore`.
* We also have a `Modal` component to double check if user wants to delete his account.

<h3 id='modalmessage'>Modal Message Component</h3>

[Go Back to Summary](#summary)

* A modular component to display messages to the user.
* This component receives: 
  * `title` 
  * `messsage`, html message
  * `cancelLabel`, custom cancel label
  * `okLabel`, custom ok/submit/confirm label
  * `handleCancelModal` method, to listen the cancel button
  * `handelOkModal` method, to listen the ok/confirm/submit button
  * `show modal` method, to display the component


<h2 id='css'>Style Css</h2>

[Go Back to Summary](#summary)

* We are using `SASS` compiler to create our `index.css`
* We follow the `BEM` structure ([BEM Link](http://getbem.com/introduction/))

<h2 id='pages'>Pages</h2>

[Go Back to Summary](#summary)

* All the pages components are very simple, since we created modular components.
* The only page that is not modular is the `AboutPage` since it's only to display the developer's information, and technologies used.

<h2 id='redux'>Redux</h2>

[Go Back to Summary](#summary)

* We have a basic user redux, to manage the user information across the app.
* There are 4 actions `LOGIN_USER`, `LOGOUT_USER`, `UPDATE_USER`, and `SIGNUP_USER`

    ```JavaScript
        import userService from '../utils/userService';

        const LOGIN_USER = 'LOGIN_USER';
        const LOGOUT_USER = 'LOGOUT_USER';
        const UPDATE_USER = 'UPDATE_USER';
        const SIGNUP_USER = 'SIGNUP_USER';

        export const loginUser = () => ({
            type: LOGIN_USER,
            payload: userService.getUser()
        });

        export const logoutUser = () => {
            userService.logoutUser();
            return {
                type: LOGOUT_USER
            };
        };

        export const signupUser = () => ({
            type: SIGNUP_USER,
            payload: userService.getUser()
        });

        export const updateUser = () => ({
            type: UPDATE_USER,
            payload: userService.getUser()
        });

        function userReducer(state = userService.getUser(), action) {
            switch (action.type) {
                case LOGIN_USER:
                    return action.payload;
                case LOGOUT_USER:
                    return null;
                case SIGNUP_USER:
                    return action.payload;
                case UPDATE_USER:
                    return action.payload;
                default:
                    return state;
            }
        }

        export default userReducer;
    ```

<h2 id='utils'>Utilities Folder</h2>

<h3 id='apiservice'>apiService</h3>

[Go Back to Summary](#summary)

* A helper file to handle API request to the server

    ```JavaScript
        import tokenService from './tokenService';

        function apiRequestHelper(type, url, auth = false, data) {
            const option = {
                method: type,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + tokenService.getToken()
                })
            };
            if (data && type !== 'GET') option.body = JSON.stringify(data);
            return fetch(url, option).then(async (res) => {
                const response = await res.json();
                if (res.ok) return response;
                throw new Error(response.message);
            });
        }

        export default apiRequestHelper;
    ```

<h3 id='tokenservice'>tokenService</h3>

[Go Back to Summary](#summary)

* A helper file to handle the Token that we receives from our back-end.

    ```JavaScript
        function setToken(token) {
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        }

        function updateToken(token) {
            if (token) {
                localStorage.setItem('token', token);
            }
        }

        function getToken() {
            let token = localStorage.getItem('token');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                //? atob() - decoding a base-64 encoded string. It is used to decode a string of data which has been encoded using the btoa() method.
                //? JSON.parse - Converting back a json object(
                if (payload.exp < Date.now() / 1000) {
                    localStorage.removeItem('token');
                    token = null;
                }
            }
            return token;
        }

        function getUserFromToken() {
            const token = getToken();
            return token ? JSON.parse(atob(token.split('.')[1])) : null;
        }

        function removeToken() {
            localStorage.removeItem('token');
        }

        export default {
            setToken,
            getToken,
            getUserFromToken,
            removeToken,
            updateToken
        };
    ```
<h3 id='userservice'>userService</h3>

[Go Back to Summary](#summary)

* A helper file to handle client side request related to the user

    ```JavaScript
        import apiRequestHelper from './apiService';
        import tokenService from './tokenService';
        const URL = '/api/users';

        function loginUser(data = { email: undefined, password: undefined }) {
            const url = `${URL}/login`;
            return apiRequestHelper('POST', url, false, data).then(({ token }) => {
                tokenService.setToken(token);
            });
        }

        function getUser() {
            return tokenService.getUserFromToken();
        }

        function getUserProfile() {
            const url = `${URL}/me`;
            return apiRequestHelper('GET', url, true);
        }

        function signupUser(
            data = { firstName: undefined, lastName: undefined, email: undefined, password: undefined }
        ) {
            const url = `${URL}/signup`;
            return apiRequestHelper('POST', url, false, data).then(({ token }) => {
                tokenService.setToken(token);
            });
        }

        function updateUser(
            data = { firstName: undefined, lastName: undefined, email: undefined, password: undefined }
        ) {
            const url = `${URL}/me`;
            return apiRequestHelper('PUT', url, true, data).then(({ token }) => {
                tokenService.updateToken(token);
            });
        }

        function deleteUser() {
            const url = `${URL}/me`;
            return apiRequestHelper('DELETE', url, true);
        }

        function logoutUser() {
            tokenService.removeToken();
        }

        export default {
            getUser,
            getUserProfile,
            loginUser,
            signupUser,
            updateUser,
            deleteUser,
            logoutUser
        };
    ```

<h2 id='app'>App.js</h2>

[Go Back to Summary](#summary)

* Here we have all the rules to display each route
* We have private routes and public routes
  * private can only be seen by logged users
* If the route doesn't exist, the user will be redirect to home page or login page.
* We use the user redux to determine which path is available to the guest

    ```JavaScript
        import React from 'react';
        import { Redirect, Route, Switch } from 'react-router-dom';
        import { connect } from 'react-redux';

        import Header from './components/Header/Header';
        import Footer from './components/Footer/Footer';
        import HomePage from './pages/HomePage/HomePage';
        import AboutPage from './pages/AboutPage/AboutPage';
        import LoginPage from './pages/LoginPage/LoginPage';
        import SignupPage from './pages/SignupPage/SignupPage';
        import ProfilePage from './pages/ProfilePage/ProfilePage';

        function App({ history, firstName }) {
            let pages = firstName ? (
                <Switch>
                    <Route exact path="/about" render={({ history }) => <AboutPage history={history} />} />
                    <Route exact path="/profile" render={({ history }) => <ProfilePage history={history} />} />
                    <Route exact path="/" render={({ history }) => <HomePage history={history} />} />
                    <Route render={() => <Redirect to={{ pathname: '/' }} />} />
                </Switch>
            ) : (
                <Switch>
                    <Route exact path="/about" render={({ history }) => <AboutPage history={history} />} />
                    <Route exact path="/login" render={({ history }) => <LoginPage history={history} />} />
                    <Route exact path="/signup" render={({ history }) => <SignupPage history={history} />} />
                    <Route exact path="/" render={({ history }) => <HomePage history={history} />} />
                    <Route render={() => <Redirect to={{ pathname: '/login' }} />} />
                </Switch>
            );

            return (
                <div className="App">
                    <Header history={history} />
                    <main>{pages}</main>
                    <Footer />
                </div>
            );
        }

        const mapStateToProps = (state) => ({
            firstName: state.user ? state.user.firstName : undefined
        });

        export default connect(mapStateToProps)(App);
    ```

<h2 id='index'>Index.js</h2>

[Go Back to Summary](#summary)

* We have to import all the tools necessary to make it work redux (`react-redux`) and  react routes (`react-router-dom`)
* Here we connect our app to the store

    ```JavaScript
        import React from 'react';
        import ReactDOM from 'react-dom';
        import './css/index.css';
        import App from './App';
        import * as serviceWorker from './serviceWorker';
        import { BrowserRouter as Router, Route } from 'react-router-dom';
        import { Provider } from 'react-redux';
        import store from './store';

        ReactDOM.render(
            <React.StrictMode>
                <Provider store={store}>
                    <Router>
                        <Route component={App} />
                    </Router>
                </Provider>
            </React.StrictMode>,
            document.getElementById('root')
        );

        serviceWorker.unregister();
    ```

<h2 id='store'>Store.js</h2>

[Go Back to Summary](#summary)

* We create a redux store to combine all reducers into one place.
* We can also user middlewares to help us manage the store, such as `redux-logger`

    ```JavaScript
        import { createStore, combineReducers, applyMiddleware } from 'redux';
        import userReducer from './redux/user';
        import logger from 'redux-logger';

        const reducers = combineReducers({
            user: userReducer
        });

        const store = createStore(reducers, applyMiddleware(logger));

        export default store;
    ```

<h1 id='backend'>Back-end</h1>

<h2 id='backendinstall'>Installation</h2>

[Go Back to Summary](#summary)

* Create the following folders and files
 
    ```Bash
        mkdir Back-end Back-end/config Back-end/controllers Back-end/env Back-end/middlewares Back-end/models Back-end/routes Back-end/tests Back-end/tests/fixtures
        touch Back-end/config/database.js Back-end/controllers/user.js Back-end/env/test.env Back-end/env/dev.env Back-end/middlewares/auth.js Back-end/models/user.js Back-end/routes/users.js Back-end/app.js Back-end/index.js Back-end/tests/fixtures/database.js Back-end/tests/user.test.js Back-end/app.js Back-end/index.js
    ```

* Final back-end structure

    ```Bash
        .
        ├── config
        │   └── database.js
        ├── controllers
        │   └── user.js
        ├── env
        │   ├── dev.env
        │   └── test.env
        ├── middlewares
        │   └── auth.js
        ├── models
        │   └── user.js
        ├── routes
        │   └── users.js
        ├── tests
        │   ├── fixtures
        │   │   └── database.js
        │   └── user.test.js
        ├── app.js
        ├── index.js
        ├── package-lock.json
        └── package.json
    ```

* Packages

    ```Bash
        npm i express
        npm i env-cmd
        npm i jest --save-dev
        npm i supertest --save-dev
        npm i validator
        npm i mongoose
        npm i bcrypt
        npm i jsonwebtoken
        npm i morgan
    ```

<h2 id='packagebackend'>package.json</h2>

[Go Back to Summary](#summary)

* Add the test and dev environments

    ```JavaScript
        "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "server-dev": "env-cmd -f ./env/dev.env nodemon index.js",
        "server-test": "env-cmd -f ./env/test.env jest --watch --runInBand --detectOpenHandles"
        },
        "jest": {
            "bail": 1,
            "verbose": true,
            "testEnvironment": "node"
        },
    ```

* In the end of the file add a proxy, this will handle the server port vs react port

    ```JavaScript
        "proxy": "http://localhost:3001"
    ```

<h2 id='backendenv'>Environment - Files</h2>

[Go Back to Summary](#summary)

* in `./env`

  * Development environment `dev.env`

    ```Bash
        MONGODB_URL=mongodb://127.0.0.1:27017/newprojectDB
        JWT_SECRET_KEY=mysupersecretkey
        PORT=3001
    ```

  * Test environment `test.env`

    ```Bash
        MONGODB_URL=mongodb://127.0.0.1:27017/newprojectDB-test
        JWT_SECRET_KEY=mysupersecretkey
        PORT=3001
    ```

<h2 id='databaseconnection'>Database - Connection</h2>

[Go Back to Summary](#summary)

* in `config/database.js`

    ```JavaScript
        const mongoose = require('mongoose');
        const db = mongoose.connection;

        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        db.once('connected', () => {
            console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
        });
    ```

<h2 id='controllers'>Controllers - User</h2>

[Go Back to Summary](#summary)

* in `controllers/user.js`

    ```JavaScript
        const User = require('../models/user');
        const { createJWT } = require('../middlewares/auth');
        const { isEmail } = require('validator');

        const signupUser = async (req, res) => {
            try {
                if (
                    !req.body.firstName ||
                    !req.body.lastName ||
                    !isEmail(req.body.email) ||
                    req.body.password.length < 7
                )
                    return res.status(400).json({ message: 'Invalid credentials' });
                const user = await User.findOne({ email: req.body.email });
                if (user) return res.status(400).json({ message: 'Email already taken' });
                const newUser = new User(req.body);
                await newUser.save();
                const token = await createJWT(newUser);
                res.status(201).json({ token });
            } catch (error) {
                res.status(500).json({ message: 'Something went wrong', error });
            }
        };

        const deleteUser = async (req, res) => {
            try {
                const user = await User.findOneAndDelete({ _id: req.user._id });
                if (!user) return res.status(404).json({ error: 'User not found' });
                res.json(user);
            } catch (error) {
                res.status(500).json({ message: 'Something went wrong', error });
            }
        };

        const updateUser = async (req, res) => {
            try {
                //! the findIdAndUpdate method bypasses mongoose
                //! It performs a direct operation on the database
                //+ this means that our middleware won't be executed
                const user = await User.findOne({ _id: req.user._id });
                if (!user) return res.status(404).json({ message: 'User not found' });
                user.comparePassword(req.body.password, async (err, isMatch) => {
                    if (isMatch) {
                        user.firstName = req.body.firstName;
                        user.lastName = req.body.lastName;
                        if (req.body.newPassword !== '') user.password = req.body.newPassword;
                        await user.save();
                        const token = createJWT(user);
                        return res.json({ token });
                    }
                    res.status(400).json({ message: 'Wrong password!' });
                });
            } catch (error) {
                res.status(500).send({ message: 'Something went wrong', error });
            }
        };

        const loginUser = async (req, res) => {
            try {
                const user = await User.findOne({ email: req.body.email });
                if (!user) return res.status(404).json({ message: "User doesn't exist" });
                user.comparePassword(req.body.password, async (error, isMatch) => {
                    if (!isMatch || error)
                        return res.status(400).json({ message: 'Unable to login, bad credentials' });
                    const token = await createJWT(user);
                    res.json({ token });
                });
            } catch (error) {
                res.status(500).json({ message: 'Something went wrong', error });
            }
        };

        const userProfile = async (req, res) => {
            try {
                const user = await User.findOne({ _id: req.user._id });
                if (!user) return res.status(404).json({ message: 'User not found' });
                res.json(user);
            } catch (error) {
                res.status(500).json({ message: 'Something went wrong', error });
            }
        };

        module.exports = {
            signupUser,
            deleteUser,
            updateUser,
            loginUser,
            userProfile
        };
    ```

<h2 id='middlewares'>Middelwares - Auth</h2>

[Go Back to Summary](#summary)

* in `middlewares/auth`
  * Let's create a middleware to help us with the authentication. This file will:
    * Check if the request token is valid before executing any private route
    * Create a new token when necessary

    ```JavaScript
        const jwt = require('jsonwebtoken');
        const SECRET = process.env.JWT_SECRET_KEY;

        const authJWT = async (req, res, next) => {
            try {
                let token = req.get('Authorization') || req.query.token || req.body.token;
                if (token) {
                    token = token.replace('Bearer ', '');
                    const user = await jwt.verify(token, SECRET);
                    if (!user) return res.status(400).json({ message: 'Not Authorized' });
                    req.user = user;
                    return next();
                }
                res.status(401).json({ message: 'Please authenticate first.' });
            } catch (error) {
                res.status(500).json({ message: 'Something went wrong.' });
            }
        };

        const createJWT = (user) =>
            jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, SECRET, {
                expiresIn: '1 day'
            });

        module.exports = {
            authJWT,
            createJWT
        };
    ```

<h2 id='model'>User Model - Schema</h2>

[Go Back to Summary](#summary)

* in `models/user.js`

    ```JavaScript
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;
        const validator = require('validator');
        const bcrypt = require('bcrypt');
        const SALT_ROUNDS = 6;

        const userSchema = new Schema(
            {
                firstName: {
                    type: String,
                    required: true,
                    trim: true
                },
                lastName: {
                    type: String,
                    required: true,
                    trim: true
                },
                email: {
                    type: String,
                    required: true,
                    trim: true,
                    unique: true,
                    lowercase: true,
                    validate: async (value) => {
                        if (!(await validator.isEmail(value))) {
                            throw new Error('Email is invalid');
                        }
                    }
                },
                password: {
                    type: String,
                    required: true,
                    minlength: 7,
                    trim: true,
                    validate(value) {
                        if (value.toLowerCase().includes('password')) {
                            throw new Error('Password cannot contain "password"');
                        }
                    }
                }
            },
            {
                timestamps: true
            }
        );

        //! Just before saving
        userSchema.pre('save', async function (next) {
            const user = this;
            if (user.isModified('password')) user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
            next();
        });

        //! Create a custom mongoose method
        userSchema.methods.comparePassword = function (tryPassword, callback) {
            bcrypt.compare(tryPassword, this.password, callback);
        };

        //! Remove fields before sending back
        userSchema.set('toJSON', {
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.__v;
                return ret;
            }
        });

        module.exports = mongoose.model('User', userSchema);
    ```

<h2 id='routes'>User Routes</h2>

[Go Back to Summary](#summary)

* in `routes/users.js`

    ```JavaScript
        const express = require('express');
        const router = express.Router();
        const userCtrl = require('../controllers/user');
        const { authJWT } = require('../middlewares/auth');

        //! Public route
        router.post('/signup', userCtrl.signupUser);
        router.post('/login', userCtrl.loginUser);

        //! Private Route
        router.get('/me', authJWT, userCtrl.userProfile);
        router.delete('/me', authJWT, userCtrl.deleteUser);
        router.put('/me', authJWT, userCtrl.updateUser);

        module.exports = router;
    ```

<h2 id='server'>Server Configuration</h2>

* We split the server configuration into two files.
* In the future this will help us to test the server's APIs with `jest`

<h3 id='app'>Server - app.js</h3>

[Go Back to Summary](#summary)

```JavaScript
    const express = require('express');
    const logger = require('morgan');

    require('./config/database');
    const app = express();

    app.use(logger('dev'));
    app.use(express.json());

    app.use('/api/users', require('./routes/users'));

    app.get('/*', (req, res) => {
        res.status(404).json({ message: "Path doesn't exist" });
    });

    module.exports = app;
```

<h3 id='index'>Server - index.js</h3>

[Go Back to Summary](#summary)

```JavaScript
    const app = require('./app');
    const port = process.env.PORT || 3001;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
```

<h2 id='tests'>User's API Test Cases - Jest</h2>

[Go Back to Summary](#summary)

* in `tests/fixtures/database.js`
  * Database access, delete users, create 4 users

    ```JavaScript
        const jwt = require('jsonwebtoken');
        const mongoose = require('mongoose');
        const User = require('../../models/user');

        class NewUser {
            constructor(firstName, lastName, email, password) {
                this._id = mongoose.Types.ObjectId();
                this.firstName = firstName;
                this.lastName = lastName;
                this.email = email;
                this.password = password;
                this.token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
            }
        }

        const userOne = new NewUser('Roger', 'T', 'roger@gmail.com', 'bananinha');
        const userTwo = new NewUser('Thaisa', 'S', 'thaisa@gmail.com', 'bananinha');
        const userThree = new NewUser('Yumi', 'S', 'yumi@gmail.com', 'bananinha');
        const userFour = new NewUser('Mike', 'T', 'mike@gmail.com', 'bananinha');

        const setupDatabase = async () => {
            await User.deleteMany();
            await new User(userOne).save();
            await new User(userTwo).save();
            await new User(userThree).save();
            await new User(userFour).save();
        };

        module.exports = {
            userOne,
            userTwo,
            userThree,
            userFour,
            setupDatabase
        };
    ```

* in `tests/user.test.js`
  * User's test cases

    ```JavaScript
        const app = require('../app');
        const User = require('../models/user');
        const request = require('supertest');
        const jwt = require('jsonwebtoken');
        const { userOne, userTwo, userThree, userFour, setupDatabase } = require('./fixtures/database');
        const URL = '/api/users';

        beforeEach(setupDatabase);

        test('Should signup new user', async () => {
            const newUser = {
                firstName: 'Joy',
                lastName: 'A',
                email: 'joy@gmail.com',
                password: 'bananinha'
            };
            const response = await request(app).post(`${URL}/signup`).send(newUser).expect(201);
            const data = await jwt.verify(response.body.token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(data._id);
            expect(user).not.toBeNull();
            expect(data).toMatchObject({
                firstName: 'Joy',
                lastName: 'A'
            });
        });

        test('Should login existing user', async () => {
            const response = await request(app)
                .post(`${URL}/login`)
                .send({ email: userOne.email, password: userOne.password })
                .expect(200);
            const data = await jwt.verify(response.body.token, process.env.JWT_SECRET_KEY);
            expect(data).toMatchObject({
                firstName: userOne.firstName,
                lastName: userOne.lastName
            });
        });

        test('Should not login user, bad credentials', async () => {
            await request(app)
                .post(`${URL}/login`)
                .send({
                    email: userTwo.email,
                    password: userTwo.password + 'bad password'
                })
                .expect(400);
        });

        test('Should get user profile authenticated user', async () => {
            const response = await request(app)
                .get(`${URL}/me`)
                .set('Authorization', `Bearer ${userThree.token}`)
                .expect(200);
            expect(response.body).toMatchObject({
                firstName: userThree.firstName,
                lastName: userThree.lastName
            });
        });

        test('Should not get user profile unauthenticated user', async () => {
            await request(app).get(`${URL}/me`).expect(401);
        });

        test('Should delete authenticated user', async () => {
            const response = await request(app)
                .delete(`${URL}/me`)
                .set('Authorization', `Bearer ${userThree.token}`)
                .expect(200);
            const user = await User.findById(response.body._id);
            expect(user).toBeNull();
        });

        test('Should not delete unauthenticated user', async () => {
            await request(app).delete(`${URL}/me`).expect(401);
        });

        test('Should update profile authenticated user', async () => {
            const response = await request(app)
                .put(`${URL}/me`)
                .set('Authorization', `Bearer ${userFour.token}`)
                .send({
                    firstName: 'Mike',
                    lastName: 'Cabecinha',
                    newPassword: '',
                    confirmNewPassword: '',
                    password: 'bananinha'
                })
                .expect(200);
            const data = await jwt.verify(response.body.token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(data._id);
            expect(user).not.toBeNull();
            expect(user).toMatchObject({
                firstName: 'Mike',
                lastName: 'Cabecinha'
            });
        });

        test('Should not update profile unauthenticated user', async () => {
            await request(app)
                .put(`${URL}/me`)
                .send({
                    firstName: 'Mike',
                    lastName: 'Cabecinha'
                })
                .expect(401);
        });

        test('Should not update profile authenticated user, invalid fields', async () => {
            await request(app)
                .put(`${URL}/me`)
                .set('Authorization', `Bearer ${userFour.token}`)
                .send({
                    name: 'Mike',
                    last: 'Cabecinha'
                })
                .expect(400);
            const user = await User.findById(userFour._id);
            expect(user).not.toBeNull();
            expect(user).toMatchObject({
                firstName: 'Mike',
                lastName: 'T'
            });
        });
    ```