const secureApi = (req, res, next) => {
  if (req.headers.authorization == "123456") {
    next();
  } else {
    res.status(200).send("Permisssion Denied");
  }
};

module.exports = { secureApi };
