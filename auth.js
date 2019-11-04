module.exports.user = function(req, res, next) {
  console.log(req.user);
  if (!req.user) {
    let err = new Error("You are not authenticated!");
    err.status = 403;
    return next(err);
  } else {
    next();
  }
};

module.exports.admin = function(req, res, next) {
  console.log(req.user.admin);
  if (!req.user.admin) {
    let err = new Error("You are not authenticated! You are not admin");
    err.status = 403;
    return next(err);
  } else {
    next();
  }
};
