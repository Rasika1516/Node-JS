const express = require('express');
const cors= require('cors');
const app = express();

var corOptions={
    origin:"https://localhost:8081"
}

//middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//router
const userRouter = require("./routes/userRouter");
app.use("/api/user",userRouter);

//profile routes
const UserProfileRouter = require("./routes/userProfileRouter");
app.use("/api/profile",UserProfileRouter);

//testing route
app.get("/", (req, resp) => {
    resp.send("App is working.....")
})

//PORT
const PORT = process.env.PORT || 8083

//server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})