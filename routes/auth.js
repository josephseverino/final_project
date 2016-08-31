var User = require('../models/user'),
    bcrypt = require('bcryptjs'),
    errors = {
        general: {
            status: 500,
            message: 'Backend Error'
        },
        login: {
            status: 403,
            message: 'Invalid username or password.'
        }
    };

module.exports = {
    render: (req, res) => { // render the login page
        res.render('auth.html');
    },
    logout: (req, res) => {
        req.session.reset();
        res.redirect('/login');
    },
    login: (req, res) => { // form post submission

        User.findOne({
            email: req.body.email
        }, (err, user) => {

            if( err ) {
                console.error('MongoDB error:'.red, err);
                res.status(500).json(errors.general);
            }
            if( !user ) {
                // forbidden
                console.warn('No user found!'.yellow);
                res.status(403).json(errors.login);
            } else {
                console.info('auth.login.user', user);

                // at this point, user.password is hashed!
                bcrypt.compare(req.body.password, user.password, (bcryptErr, matched) => {
                    // matched will be === true || false
                    if( bcryptErr ) {
                        console.error('MongoDB error:'.red, err);
                        res.status(500).json(errors.general);
                    } else if ( !matched ) {
                        // forbidden, bad password
                        console.warn('Password did not match!'.yellow);
                        res.status(403).json(errors.login);
                    } else {
                        req.session.userId = user._id;
                        console.log('user'.red,req.session.userId)                        //res.send(user);
                        //res.send(user);
                        res.status(200);
                        res.end();
                    }
                });
            }
        });
    },
    register: (req, res) => {
        console.info('Register payload:'.cyan, req.body);

        var newUser = new User(req.body);

        newUser.save((err, user) => {
            if( err ) {
                console.log('#ERROR#'.red, 'Could not save new user :(', err);
                res.status(500).send(errors.general);
            } else {
                console.log('New user created in MongoDB:', user);
                req.session.userId = user._id;
                res.end();
            }
        });
    },
    selectUser: (req,res) => {
        console.log('req.body'.red,req.session)
        User.find({
            '_id' : req.params.id || req.session.userId
        }, (err, user) => {
            if( err ) {
                console.error('MongoDB error:'.red, err);
                res.status(500).json(errors.general);
            }
            if( !user ) {
                // forbidden
                console.warn('No user found!'.yellow);
                res.status(404).json(errors.login);
            } else {
                console.info('auth.login.user', user);
                res.render('reserve.html')
            }
        });
    },
    createUserApi: (req, res) => {
        User.find({}, (err, users) => {
            if( err ) {
                console.error('MongoDB error:'.red, err);
                res.status(500).json(errors.general);
            }
            if( !users ) {
                // forbidden
                console.warn('No users found!'.yellow);
                res.status(404).json(errors.login);
            } else {
                console.info('auth.login.user', users);
                res.json(users);
            }
        });
    },
    updateProfile: (req, res) => {
        console.log('req.body is heree!!!'.cyan,req.body)
        User.findOne({
            email : req.body.email
        },
            (err, user) => {
            if( err ) {
                console.error('MongoDB error:'.red, err);
                res.status(500).json(errors.general);
            }
            if( !user ) {
                // forbidden
                console.warn('No user found!'.yellow);
                res.status(403).json(errors.login);
            } else {
                console.log("hello".red, user)
                user.email = req.body.email;
                user.zipCode = req.body.zipCode;
                user.city = req.body.city;
                user.state = req.body.state;
                user.phone = req.body.phone;
                user.rate = req.body.rate;
                user.typeEquipment = req.body.typeEquipment;
                user.description = req.body.description;
                user.titleDescription = req.body.titleDescription;
                user.profilePic = req.body.profilePic;
                user.photo = req.body.photo;
                user.save();
                res.send(user)
            }
        });
    },
    deleteProfile: (req, res) => {
        console.log('req.body is heree!!!', req.params)
        User.remove({
            '_id' : req.params.id
        },
            (err, user) => {
            if( err ) {
                console.error('MongoDB error:'.red, err);
                res.status(500).json(errors.general);
            }
            if( !user ) {
                // forbidden
                console.warn('No user found!'.yellow);
                res.status(403).json(errors.login);
            } else {
                res.send({message: 'success'})
            }
        });
    },
    grabLender: (req,res) => {
        console.log("req.session".cyan,req.session.userId)
        User.findOne({ '_id' : req.session.userId }, (err, user) => {
            if( err ) {
                console.error('MongoDB error:'.red, err);
                res.status(500).json(errors.general);
            }
            if( !user ) {
                // forbidden
                console.warn('No user found!'.yellow);
                res.status(404).json(errors.login);
            } else {
                console.info('auth.login.user', user);
                res.send(user)
            }
        });
    },
    // Auth middleware functions, grouped
    middlewares: {
        session: (req, res, next) => {
            console.log('sessions user'.red,req.session.userId)
            if( req.session.userId ) {
                console.info('User is logged in, proceeding to dashboard...'.green);
                next();

            } else {
                console.warn('User is not logged in!'.yellow)
                res.redirect('/');
            }
        }
    }
}
