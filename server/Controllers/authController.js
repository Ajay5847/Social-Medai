const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      // return res.status(404).send("Email and Password are Required");
      return res.send(error(400,"Email, Password, name are Required"));
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      // return res.status(403).send("Already Registered");
      return res.send(error(409,"Already Registered"));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // res.status(201).send({ newUser });
    res.send(success(201,{ newUser }));
  } catch (e) {
    return res.send(error(500, e.result));
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(404).send("Email and Password are Required");
      return res.send(error(400,"Email and Password are Required"));
    }

    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      // return res.status(402).send("User not Registered");
      return res.send(error(404,"User is not Registered"));
    }

    const matched = await bcrypt.compare(password, oldUser.password);

    if (!matched) {
      // return res.status(401).send("Incorrect Password");
      return res.send(error(403,"Incorrect Password"));
    }

    const accessToken = generateAccessToken({ _id: oldUser._id });
    const refreshToken = generateRefreshToken({ _id: oldUser._id });
    res.cookie('jwt', refreshToken, {
      httpsOnly: true,
      secure: true
    })

    // res.status(201).send({ accessToken });
    res.send(success(200,{ accessToken }));
  } catch (e) {
    return res.send(error(500, e.result));
  }
};

// from backend we can delete the cookie but not the accessToken as it can be easily handled by frontend
const logoutController = async (req, res) => {
    try {
      res.clearCookie('jwt',{
        httpsOnly: true,
        secure: true
      })
      return res.send(success(200, 'user logged out'))
    } catch (e) {
      res.send(error(500, e.message));
    }
}

// Generate Refresh Token

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

// Generate Access Token

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

// an api which will verify the refresh token and generates an access token

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;

  if(!cookies.jwt){

   return res.send(error(401,"Refresh Token in cookie is required"));
  }

  const refreshToken = cookies.jwt; 
  
  if(!refreshToken){
    // return res.status(401).send("Refresh Token is Required")
    return res.send(error(401,"Refresh Token in cookie is Required"));
  }

  try {
    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decode._id;

    const accessToken = generateAccessToken({ _id });

    // return res.status(201).json({ accessToken });
    res.send(success(201,{ accessToken }));
  } catch (e) {
    console.log(e);
    // return res.status(404).send("Invalid Refresh Key");
    return res.send(error(401,"Invalid Refresh Key"));
  }
};

module.exports = {
  signUpController,
  loginController,
  refreshAccessTokenController,
  logoutController
};
