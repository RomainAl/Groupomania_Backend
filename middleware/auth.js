//-----------------------------------
// Middleware d'authentification
//-----------------------------------

const jwt = require("jsonwebtoken");// permet de vérifier le Token user
const config = require("../config/auth.config.js");

module.exports = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }

      req.userId = decoded.id;
      if (!req.userId){
        return res.status(401).send({
            message: "Token is not corresponding with a user id !"
          });
      }
      
      next();
    });
};