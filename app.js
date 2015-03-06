var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');
var home = require('./routes/home');
var cookieParser = require('cookie-parser');

var app = express();
// all environments
app.set('port', process.env.PORT || 3010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);

app.get('/', home.signin);
app.get('/signin', home.signin);
app.post('/afterSignIn', home.afterSignIn);
app.post('/signUp', home.signUp);
app.post('/register', home.register);
app.get('/login', home.login);
app.post('/getCategory', home.getCategory);
app.post('/finalreview', home.finalreview);
app.post('/review', home.review);
app.post('/postReviews', home.postReviews);
app.post('/logout', home.logout);
app.post('/editReviews', home.editReviews);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
