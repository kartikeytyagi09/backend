const jwt= require('jsonwebtoken');

const SECRET_KEY= "0000";

// generating jwt

function generateToken(payload){
    // token consist of payload and in how much time token will expire(not compulsary);
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

// jwt verification middleware

function verifyToken(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try{
        //decoded holds user data extracted from the token.
        const decode= jwt.verify(token, SECRET_KEY);

        //It attaches the decoded user info (like id, username) to the req object.it allows middleware/routes to access the user info without decoding the token again.

        req.user = decoded;
        next();
    }catch{
        res.status(401).json({ error: "Invalid token" });
    }
    console.log("Auth Header:", req.headers.authorization);
    console.log("Extracted Token:", token);
    console.log("Secret Key:", SECRET_KEY);

}

module.exports = { generateToken, verifyToken };
