var Auth = require('./auth'),
    User = require('../models/user');

module.exports = (app) => {
    app.get('/', (req,res) => {
        // res.redirect('/login'); // I don't have a landing page, so just redirect to the login page!
        res.render('landingPage.html')
    });
    app.get('/search', (req,res) => {
        res.render('search.html')
    });
    app.get('/explore', (req,res) => {
        res.render('explore.html')
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

    //
    // app.get('/explore', (req,res)=>{
    //     res.sendFile()
    // })

    app.get('/login', Auth.render)  // login page
    app.get('/logout', Auth.logout) // logout route + redirect

    app.post('/login', Auth.login);         // login form submission
    app.post('/register', Auth.register)    // register form submission

    app.all('/dashboard', Auth.middlewares.session);
    app.get('/dashboard', (req, res) => {
        res.render('dashboard.html', req.session);
    })
}
