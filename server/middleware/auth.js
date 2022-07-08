import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500

        let decodedData

        if (!token) {
            return res.status(401).json({message: 'Access denied!'})
        }

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }

        next()
    } catch (e) {
        res.status(401).json({message: 'Access denied!'})
    }
}

export default auth