const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const noteRoute = require('./note.route');
const callRoute = require('./call.route');

const router = express.Router();
const defaultRoutes = [
    {
      path: '/auth',
      route: authRoute,
    },
    {
      path: '/users',
      route: userRoute,
    },
    {
      path: '/note',
      route: noteRoute,
    },
    {
      path: '/call',
      route: callRoute,
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;