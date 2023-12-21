import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
    console.log(req.headers);

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        jwt.verify(token,
            "nZoxVFd0ZqiskGuRoAmgYTRQqhmrK1Aq",
        );
    }
    catch (err) {
        console.log(err);
        return res.status(401).send('Unauthorized');
    }
    next();
};

export default jwtAuth;