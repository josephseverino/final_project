var Auth = require('./auth'),
    User = require('../models/user');

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.render('landingPage.html')
    });

    app.get('/login', Auth.render)  // login page
    app.get('/logout', Auth.logout) // logout route + redirect

    app.post('/login', Auth.login);         // login form submission
    app.post('/register', Auth.register)    // register form submission

    app.get('/search', (req,res) => {
        res.render('search.html')
    });
    app.get('/explore', (req,res) => {
        res.render('explore.html')
    });

    app.get('/reserve/:id', Auth.selectUser);
    app.get('/lender', Auth.grabLender);
    app.post('/lender', Auth.updateProfile);
    app.delete('/lender/:id', Auth.deleteProfile)

    app.get('/user',  Auth.selectUser);

    app.get('/users', Auth.createUserApi);

    app.post('/user', Auth.updateProfile);
    app.all('/dashboard', Auth.middlewares.session);
    app.get('/dashboard', (req, res) => {
        res.render('dashboard.html', req.session);
    })
}
