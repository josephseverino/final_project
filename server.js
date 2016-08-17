require('colors');

var express    = require('express'),
    logger     = require('morgan'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    mongoose   = require('mongoose'),
    ejs        = require('ejs'),
    sessions   = require('client-sessions'),
    port       = process.env.PORT || 3000,
    Routes     = require('./routes')
    app        = express();

mongoose.connect('mongodb://localhost/gear-to-share', (err)=> {
    if(err){
        console.error('mongodb is having problems'.red, err)
    }else{
        console.info('mongodb is working!'.green)
    }
});

app.use( logger('dev'));
app.use(sessions({
    cookieName: '_mean-auth', // front-end cookie name
    secret: 'a9iysc', // the encryption password : keep this safe
    requestKey: 'session', // req.session,
    duration: 86400, // 60 * 60 * 24 (number of seconds in a day), tells the middleware when the cookie/session should expire,
    cookie: {
        ephemeral: false,   // when true, cookie expires when browser is closed
        httpOnly: true,     // when true, the cookie is not accesbile via front-end JavaScript
        secure: false       // when true, cookie will only be read when sent over HTTPS
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use( bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.set('view engine','html'); // allows us to specify the default extension for the files in the views folder
app.engine('html', ejs.renderFile); // this is the function that binds to res.render

mongoose.connect('mongodb://localhost/mean-auth', (mongooseErr) => {
    if( mongooseErr ) {
        console.error('#ERROR#'.red,'Could not initilize mongoose!', mongooseErr);
    } else {
        console.info('Mongoose initilized!'.green.bold);
    }
});

app.listen(port, (err) =>{
    if(err){
        console.error('server is not working: '.red, err)
    }else{
        console.info('server is up and running!!'.cyan, port)
    }
})
