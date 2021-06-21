const approuter = require('@sap/approuter');

var ar = approuter();
ar.beforeRequestHandler.use('/user-api/currentUser', function (req, res, next) {
   if (!req.user) {
     res.statusCode = 403;
     res.end(`Missing JWT Token`);
   } else {
     res.statusCode = 200;
     res.end(`My name is ${JSON.stringify(req.user.name, null, 2)}`);
   }
});
ar.start();