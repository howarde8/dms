module.exports = {
  admin: (req, res, next) => {
    if (req.user && req.user.level === "ADMIN") {
      next();
    } else {
      return res.status(401).send({ error: "Admin is required" });
    }
  },
  regular: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      return res.status(401).send({ error: "Login is required" });
    }
  }
};
