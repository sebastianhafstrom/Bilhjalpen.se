const jwt = require("jsonwebtoken");
require('dotenv').config()

let authorize = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase    
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
          }
      jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
          return res.status(401).send('You are not authorized');
        } else {
          next();
        }
      });
    } else {
      return res.send('Auth token is not supplied');
    }
  };
  
  module.exports = {
    authorize: authorize
  }