  import jwt from 'jsonwebtoken';

  const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Expect token as Bearer <token>

    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; // Use the decoded ID from the token
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  };

  export default authMiddleware;
