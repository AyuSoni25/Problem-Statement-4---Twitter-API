import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    try {

        const token = req.headers.authorization;

        let decodedData;

        if(token)
        {
            decodedData = jwt.verify(token, 'Ayu');
            req.userId = decodedData?.id;
        }

        next();
    } catch (error) {
        if(!req.headers.authorization)
        res.json({message: "Please, This request is allowed only after authentication"});
        else
        res.status(409).json({message: error.message});
    }
}

export default auth;