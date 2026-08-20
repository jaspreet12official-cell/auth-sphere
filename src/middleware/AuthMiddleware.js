const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  req.user = {
    id: req.session.userId,
    role: req.session.role,
  };

  next();
};

export default isAuthenticated;
// Request
//    ↓
// isAuthenticated
//    ↓
// req.session.userId exists?
//    ↓
//  YES                NO
//   ↓                  ↓
// req.user          401 Error
//   ↓
// next()