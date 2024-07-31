const db = require('../model/index');
const bcrypt = require('bcrypt');
const { use } = require('../routes/userRouter');
const jwt = require('jsonwebtoken');

const User = db.user

//1.check the email and password
const login = async (req, resp) => {
    const { email, password } = req.body;

    const user = await User.findOne({where :{email}})
    //checking if the user is present or not
    if(!user)
    {
        return resp.status(401).send({message:"Invalid email or password"});
    }

    //compare the password and the hash password
    const isPasswordvalid= await bcrypt.compare(password,user.password)
    if(!isPasswordvalid)
    {
        return resp.status(401).send({message:"Invalid email or password"});
    }
    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send the user data and token as the response
    resp.send({message:"login successfull..", user ,token});
}

module.exports = {
    login
}