const express = require('express');
const route = express.Router();

const HomeController = require('./controllers/HomeController');
const AccountController = require('./controllers/AccountController');
const UserController = require('./controllers/UserController');

const { loginRequired } = require('./middlewares/Middlewares')


// HOME ROUTE(S)
route.get('/', HomeController.openIndex);


// ACCOUNT ROUTE(S)
route.get('/account/index', AccountController.openIndex)
route.post('/account/signup', AccountController.signup);
route.post('/account/signin', AccountController.signin);

route.get('/account/logout', AccountController.logout);


// NEW-USER ROUTE(S)

route.get('/add-user/index', loginRequired, UserController.openIndex)
route.post('/add-user/register', loginRequired, UserController.register)
route.get('/add-user/index/:id', loginRequired, UserController.openEditIndex)

route.post('/add-user/edit/:id', loginRequired, UserController.edit)
route.get('/add-user/delete/:id', loginRequired, UserController.delete)



module.exports = route; 