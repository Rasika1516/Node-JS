const Anime = require("../model/index");
const jwt = require("jsonwebtoken");
const checkUserAuthentication = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token) {
        jwt.verify(token, "your_jwt_secret", async (err, token_decode) => {
            if (!err) {
                next();
            } else {
                return res.json({
                    status: 0,
                    msg: "Authorization failed",
                });
            }
        });
    } else {
        return res.json({
            status: 0,
            msg: "Authorization failed",
        });
    }
};

module.exports = checkUserAuthentication;