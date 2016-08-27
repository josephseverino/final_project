var Auth = require('./auth'),
    User = require('../models/user');

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.render('landingPage.html')
    });
    app.get('/search', (req,res) => {
        res.render('search.html')
    });
    app.get('/explore', (req,res) => {
        res.render('explore.html')
    });

    app.get('/reserve/:id', (req,res) => {
        User.find({'_id' : req.params.id}, (err, user) => {
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
    });
    app.get('/user/:id', (req,res) => {
        User.findOne({'_id' : req.params.id}, (err, user) => {
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
    });

    app.get('/user',  (req, res) => {
        // Send down the logged in user
        res.send({user:req.session.user})
    });

    app.get('/users', (req, res) => {
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
    });

    app.post('/user', (req, res) => {
        User.findOne({
            email: req.body.email
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
                user.email = req.body.email;
                user.zipCode = req.body.zipCode;
                user.city = req.body.city;
                user.state = req.body.state;
                user.phone = req.body.phone;
                user.rate = req.body.rate;
                user.typeEquipment = req.body.typeEquipment;
                user.description = req.body.description;
                user.profilePic = req.body.profilePic;
                user.photo = req.body.photo;
                user.save();
                res.send(user)
            }
        });
    });

    app.get('/login', Auth.render)  // login page
    app.get('/logout', Auth.logout) // logout route + redirect

    app.post('/login', Auth.login);         // login form submission
    app.post('/register', Auth.register)    // register form submission

    app.all('/dashboard', Auth.middlewares.session);
    app.get('/dashboard', (req, res) => {
        res.render('dashboard.html', req.session);
    })
}
