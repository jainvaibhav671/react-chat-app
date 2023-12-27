const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const AuthRouter = require("./routes/userRoutes")

require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", AuthRouter);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to DB")
    }).catch(err => {
        console.log(err.message)
    })

app.listen(process.env.PORT, () => {
    console.log(`Server Started on PORT: ${process.env.PORT}`)
})
