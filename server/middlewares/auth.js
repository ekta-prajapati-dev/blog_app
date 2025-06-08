import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startWith("Bearer"))
      return res
        .status(401)
        .json({ message: "Authorization token missing or malformed." });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(`Token verification error: ${error}`);
  }
};

export default verifyToken;
