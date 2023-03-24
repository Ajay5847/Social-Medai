// const {error} = require('../utils/responseWrapper')
// const jwt = require("jsonwebtoken");

// // To verify the access Token is valid

// module.exports = async (req, res, next) => {
//   if (
//     !req.headers &&
//     !req.headers.authorization &&
//     !req.headers.authorization.startsWith("Bearer")
//   ) {
//     // return res.status(401).send("User is Unauthorized");
//     // console.log(req.headers.authorization);
//     return res.send(error(404, "User is not authorized"));
//   }

//   const accessToken = req.headers.authorization.split(" ")[1];

//   try {
//     const decode = jwt.verify(
//       accessToken,
//       process.env.ACCESS_TOKEN_PRIVATE_KEY
//     );
//     req._id = decode._id;
//     console.log(decode);
//   } catch (e) {
//     console.log(e);
//     console.log("required user");
//     // return res.status(404).send("Invalid Access Key");
//     return res.send(error(401, "Invalid Access Key"));
//   }

//   next();
// };
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { error } = require("../utils/responseWrapper");

module.exports = async (req, res, next) => {
    if (
        !req.headers ||
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
    ) {
        // return res.status(401).send("Authorization header is required")
        return res.send(error(401, 'Authorization header is required'))
    }

    const accessToken = req.headers.authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_PRIVATE_KEY
        );
        req._id = decoded._id;
        
        const user = await User.findById(req._id);
        if(!user) {
            return res.send(error(404, 'User not found'));
        }

        next();
    } catch (e) {
        console.log(e);
        // return res.status(401).send("Invalid access key");
        return res.send(error(401, 'Invalid access key'))
    }
};