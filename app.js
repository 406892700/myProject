// ���������⣬ԭ�������ⶼ��װ��connect�У��������ע��������
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

// ������Ŀʵ��
var app = express();

// ����EJSģ�������ģ���ļ�λ�ã�Ҳ����ʹ��jade������ģ������
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);//��html��׺��ģ���ܾ߱�ejs�Ĺ���
app.set('view engine', 'html');//����ģ������Ϊhtml

/*
 *---------------------------------------------
 *                  ·��ģ�����
 *---------------------------------------------
 * */
/*var routes = require('./routes/index');
var users = require('./routes/users');*/

var rootRoute = require('./rootRoute');
rootRoute(app);
/*
 *---------------------------------------------
 *                  ·��ʵ����
 *---------------------------------------------
 * */

//routes(app);

// uncomment after placing your favicon in /public
// ����iconͼ��
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// ������־���������
app.use(logger('dev'));
// �������ݽ�����
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ����cookie������
app.use(cookieParser());
// ���徲̬�ļ�Ŀ¼
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// ƥ��·����·��
/*app.use('/', routes);
app.use('/users', users);*/

/*routes(app);*/

// catch 404 and forward to error handler
// 404������
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// ����������500������ʹ����ջ����
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// ����������500������
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// ���ģ��app
module.exports = app;
