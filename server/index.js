import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import postsRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use("/posts", postsRoutes)
app.use("/user", userRoutes)

const PORT = process.env.PORT || 5000;

try {
    mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(PORT)
    console.log(`Server running on port: ${PORT}`)
} catch (e) {
    console.log(`${e.message}`)
}




