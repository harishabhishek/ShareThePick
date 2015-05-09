// Get the packages we need



var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan = require('morgan');
var fs=require('fs');
require('./config/passport')(passport);

var app = express();

var router = express.Router();
var usersRoutes=require('./routes/usersRoutes');
var commentBlocksRoutes=require('./routes/commentBlocksRoutes');
var picsRoutes=require('./routes/picsRoutes');
var eventsRoutes = require('./routes/events.js');
//var loginRouter = require('./routes/login')(app, passport);

//replace this with your Mongolab URL
mongoose.connect('mongodb://ShareThePik:ShareThePik@ds053937.mongolab.com:53937/share_thepik_server_chen');

// Create our Express application


// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//var routes = require('./routes/index');
//var users = require('./routes/users');

//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use('/', routes);

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// All our routes will start with /api
app.use('/users',usersRoutes);
app.use('/commentBlocks',commentBlocksRoutes);
app.use('/pics',picsRoutes);
app.use('/events', eventsRoutes);
//app.use('/', loginRouter);



// The multer upload picture thing
/*picsRoute.use(multer({dest: './upload/',
  rename: function (fieldname, filename){
      return filename + Date.now();
  },
  onFileUploadStart: function (file) {
      console.log(file.originalname+ 'is starting ..')
  },
  onFileUploadComplete: function(file){
      console.log(file.fieldname +'uploaded to ' + file.path);
      file_name=file.name;
      haha = " g";
      done=true;;
  }
}));

 router.get('/', function (req.res,next){
    res.render('gallery/upload',{
        user:req.user
    });
});

picsRoute.post('/',function(req,res,next){
    var event_id = req.query['event_id'];
    var pic_name = mysql.escape(file_name);
    console.log(haha);
    console.log('Pic uploaded to event - ' + event_id + '' + pic_name);

    var query = mysql.format('INSERT INTO' + db.events_pictures + '' +
    'SET event_id =' event_id + ', picture_name =' + pic_name);

    connection.query(query, function(err,rows,fields){
        if (err) throw err;
    });

});*/

app.listen(port);
console.log('Server running on port ' + port);
