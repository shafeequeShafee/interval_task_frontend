module.exports.envEnvConfig = () => {
  const dotenv = require("dotenv");
  dotenv.config({ path: `.${process.env.NODE_ENV}` });
};
