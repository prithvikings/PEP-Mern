const authMiddleware = (req, res, next) => {
    console.log('Auth checked');
    const isAuthorized = true; 

    if (isAuthorized) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default authMiddleware;