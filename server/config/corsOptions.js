const allowedOrigins = require('./allowedOrigins');
const corsOptions = {
  origin: (origin, callback) => {
    // !origins is used so apps like postman etc. can be used for server testing
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(newError('Not allowed by CORS'));
  },
  credentials: true,
};
module.exports = corsOptions;
