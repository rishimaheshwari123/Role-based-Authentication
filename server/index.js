const express = require('express')
const dotenv = require("dotenv")
const cors = require('cors')
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload")
const connectDB = require("./config/db")
const cookie = require("cookie-parser")
var bodyParser = require('body-parser')

dotenv.config();





const app = express();
connectDB();



app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
cloudinaryConnect();

// middleware 
app.use(express.json());
app.use(cookie());
app.use(bodyParser.json())

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use("/api/v1/auth", require("./routes/authRoute"))
app.use("/api/v1/product", require("./routes/products"))
app.use("/api/v1/image", require("./routes/imageRoute"))
app.use("/api/v1/news", require("./routes/news"))
app.use("/api/v1/category", require("./routes/category"))
app.use("/api/v1/post", require("./routes/postRoute"))

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Chal rha hu"
    })
})

const PORT = process.env.PORT || 8080
// listten port 
app.listen(PORT, () => {
    console.log(`Server is running  at ${PORT}`)
})