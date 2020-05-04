
<h1 id='summary'>Summary</h1>

* [Node.js Base](#node)
  * [Installation](#install)
  * [Database - Connection](#databaseconnection)
  * [Controllers - User](#controllers)
  * [Environment - Files](#env)
  * [Middelwares - Auth](#middlewares)
  * [User Model - Schema](#model)
  * [User Routes](#routes)
  * [Server Configuration](#server)
    * [Server - app.js](#app)
    * [Server - index.js](#index)
  * [package.json](#package)

<h1 id='node'>Node.js Base</h1>

<h2 id='install'>Installation</h2>

[Go Back to Summary](#summary)

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
        npm i serve-favicon
    ```

* Files and folders
 
    ```Bash
        mkdir config controllers env middlewares models routes tests tests/fixtures
        touch config/database.js controllers/user.js env/test.env env/dev.env middlewares/auth.js models/user.js routes/users.js app.js index.js tests/fixtures/database.js tests/user.test.js .gitignore
    ```

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
        ├── node_modules
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
                    return res.status(400).send({ message: 'Invalid credentials' });
                const user = new User(req.body);
                await user.save();
                const token = await createJWT(user);
                res.status(201).json({ user, token });
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

        const loginUser = async (req, res) => {
            try {
                const user = await User.findOne({ email: req.body.email });
                if (!user) return res.status(404).json({ message: "User doesn't exist" });
                user.comparePassword(req.body.password, async (error, isMatch) => {
                    if (!isMatch || error) return res.status(400).json({ message: 'Unable to login' });
                    const token = await createJWT(user);
                    res.json({ user, token });
                });
            } catch (error) {
                res.status(500).json({ message: 'Something went wrong', error });
            }
        };

        const userProfile = async (req, res) => {
            try {
                const user = await User.findOne({ _id: req.user._id });
                if (!user) return res.status(404).json();
                res.json(user);
            } catch (error) {
                res.status(500).json({ message: 'Something went wrong', error });
            }
        };

        module.exports = {
            signupUser,
            deleteUser,
            loginUser,
            userProfile
        };
    ```

<h2 id='env'>Environment - Files</h2>

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
                token = token.replace('Bearer ', '');
                const user = await jwt.verify(token, SECRET);
                if (!user) return res.status(400).json({ error: 'Not Authorized' });
                req.user = user;
                next();
            } catch (error) {
                res.status(401).send({ error: 'Please authenticate first.' });
            }
        };

        const createJWT = (user) => jwt.sign({ _id: user._id }, SECRET, { expiresIn: '1 day' });

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
                delete ret.email;
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

        module.exports = router;
    ```

<h2 id='server'>Server Configuration</h2>

* We split the server configuration into two files.
* In the future this will help us to test the server's APIs with `jest`

<h3 id='app'>Server - app.js</h3>

[Go Back to Summary](#summary)

```JavaScript
    const express = require('express');
    const path = require('path');
    const logger = require('morgan');
    const favicon = require('serve-favicon');

    require('./config/database');
    const app = express();

    app.use(logger('dev'));
    app.use(express.json());

    app.use(express.static(path.join(__dirname, 'build')));
    app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));

    app.use('/api/users', require('./routes/users'));

    app.get('/*', (req, res) => {
        res.send({ error: "Path doesn't exist" });
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

<h2 id='package'>package.json</h2>

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