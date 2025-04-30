import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";
import 'dotenv/config';


export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        console.log(token, "this is line 7 of auth.middleware.js");

        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const isBlackListed = await redisClient.get(token);

        if (isBlackListed) {

            res.cookie('token', '');

            return res.status(401).send({ error: 'Unauthorized User' });
        }
         console.log(token);
        console.log(process.env.JWT_SECRET,"this is line 17 of auth.middleware.js");
        const decoded = jwt.verify(token, "hello");

        req.user = decoded;
        next();
    } catch (error) {

        console.log(error);

        res.status(401).send({ error: 'Unauthorized User' });
    }
}