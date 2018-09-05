const express = require('express');
const route = express.Router();
const userRoute = require('./../controller/userController');
const Authenticate = require('./../middelware/routeProtector');

route.get('/', Authenticate, userRoute.getAllUser)

route.post('/signup', userRoute.signupUser)

route.post('/signin', userRoute.signinUser)

module.exports = route;

