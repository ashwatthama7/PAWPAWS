import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Middleware to verify JWT from cookies
export const verifyToken = (req, res, next) => {
    // Get token from cookie
    console.log(" Verifying token from cookies...");
    const token = req.cookies.access_token;
    console.log(" Token from cookies:", token)
    // If token is not present
    if (!token) {
        console.warn(" No access token found in cookies.");
        return next(errorHandler(401, "Unauthorized: No token provided"));
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            console.error(" Token verification failed:", err.message);
            return next(errorHandler(403, "Forbidden: Invalid token"));
        }

        // Attach decoded user to request object
        req.user = decodedUser;
        console.log(" Token verified. User:", decodedUser);

        // Continue to the next middleware or route handler
        next();
    });
};
