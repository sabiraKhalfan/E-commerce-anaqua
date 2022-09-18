
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path :'./config.env'})


var hbs = require('express-handlebars');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/userRoutes');
var adminRouter = require('./routes/adminRoutes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',
defaultLayout:'layout',
layoutsDir:__dirname+'/views/layout/',
partialsDir:__dirname+'/views/partials/',
helpers:{
  formatString(date){
    newdate = date.toUTCString()
    return newdate.slice(0 , 16)
  },
inc1: function (context){
  return context +1
}
}
}))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






app.use('/', userRouter);
app.use('/admin', adminRouter);

//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB Connection Succesful'));



//console.log(process.env)
const port = 5000;
app.listen(port,()=>{

  console.log('Server is runing on port 5000')
    
})
module.exports = app;
