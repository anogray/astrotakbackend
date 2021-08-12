import jwt from 'jsonwebtoken';
import config from './config.js';



const getToken = (user) => {

  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    config.JWT_SECRET,
    // {
    //   expiresIn: '48h',
    // }
  );
};

const isAuth = (req, res, next) => {

    const token = req.headers.authorization;
      console.log({token});
    if (token) {
      const onlyToken = token;
      jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({ message: 'Invalid Token' });
        }
        // console.log("decode",decode);
        req.user = decode;
        next();
        return;
      });
    } else {
      return res.status(401).send({ message: 'Token is not supplied.' });
    }
  };
  




export { getToken, isAuth};