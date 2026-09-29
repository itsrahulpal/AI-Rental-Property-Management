const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ msg: "Login Token is required" });
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env, JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(4001).json({ msg: "Invalid Or expired Token" });
      }
      req.userId = decodedToken.userId;
      req.role = decodedToken.rol;
      next();
    });

    const authorization = (...allowedRoles) => {
      return async (req, res, next) => {
        try {
          if (!allowedRoles.includes(req.role)) {
            return res.status(400).json({ msg: "Access Denied" });
          }
          next();
        } catch (error) {
          console.log(error);
          return res.status(400).json({ msg: "Internal sever error" });
        }
      };
    };
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server Error" });
  }
};
module.exports = {authentication,authorization};
