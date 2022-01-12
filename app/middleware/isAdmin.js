const db = require("../models");
const User = db.user;

module.exports = (req, res, next) => {
    
    User.findByPk(req.userId).then(user => {
      
        if (user.role === "admin") {
            next();
            return;
        } else {
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        }
      
    });

};