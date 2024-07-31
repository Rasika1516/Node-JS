const db = require('../model/index')
const { Sequelize } = require('sequelize');

const UserProfile = db.userProfile;

//1.add user data
const addUserProfile = async (req, resp) => {
    const { name, email, phno } = req.body;
    try{
        const userProfile = await UserProfile.create({
            name: name,
            email: email,
            phno: phno
        });
        resp.status(200).send(userProfile);
    
    }
    catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error")
    }
}

//2. get all the profile list
const getAllProfiles = async(req,resp)=>{
    try{
        const userProfile = await UserProfile.findAll({
            attributes:
            [
                "name",
                "email",
                "phno"
            ]
        })
        resp.send(userProfile);
    }catch(error)
    {
        console.log(error);
        resp.status(500).send("Internal Server Error")
    }
}

module.exports = {
    addUserProfile,
    getAllProfiles
}