import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure `decoded` includes `role`
    if (!decoded.userId || !decoded.role) {
      return res.status(401).json({ message: "Invalid Token Data" });
    }

    req.user = decoded;
    next(); // Continue to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You do not have access" });
    }
    next();
  };
};
