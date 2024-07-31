const db = require('../model/index');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
//create main module
const User = db.user

//main work
//1.add user with fields email and password
const addUser = async (req, respp) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email: email,
            password: hashedPassword
        })
        respp.send(user);
    } catch (error) {
        console.error(error);
        respp.status(500).send("Internal Server Error");
    }

}

//2. get all the users
const getAllUsers = async (req, respp) => {
    try {
        const user = await User.findAll({
            attributes:
                [
                    "id",
                    "email"
                ]
        })
        respp.send(user);
    } catch (error) {
        console.error(error);
        respp.status(500).send("Internal Server Error");
    }
}

//3.respet password
const resetPassviaoldpass = async (req, respp) => {
    const { email, password, newpassword } = req.body;
    try {
        const user = await User.findOne({ where: { email } })
        //checking if the user is prespent or not
        if (!user) {
            return respp.status(401).send({ message: "Invalid email or password.Please enter correct Details" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return respp.status(401).send({ message: "Invalid old password" })
        }
        const newhashedPassword = await bcrypt.hash(newpassword, 10);

        // Update the user's password in the database
        user.password = newhashedPassword;
        await user.save();

        // Send a success respponse
        respp.send({ message: "Password has been respet successfully" })
    }
    catch (error) {
        // Handle any errors that may occur
        console.error('Error during password respet:', error);
        respp.status(500).send({ message: "An error occurred during password respet" });

    }
}

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'chaim.bosco58@ethereal.email',
        pass: 'Fek8Jt1HuEKfE7uxHD'
    }
});

// Generate and send OTP
const sendOTP = async (req, resp) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return resp.status(404).send({ message: 'User not found' });
        }

        // Generate OTP and set expiration time
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

        user.otp = otp;
        user.otpExpiration = otpExpiration;
        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: 'rasikanale1516@gmail.com',
            to: user.email,
            subject: 'Password respet OTP',
            text: `Your OTP for password respet is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        resp.send({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        resp.status(500).send({ message: 'Error sending OTP' });
    }
};

// Verify OTP
const verifyOTP = async (req, resp) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ where: { email, otp } });
        if (!user) {
            return resp.status(400).send({ message: 'Invalid OTP' });
        }

        if (user.otpExpiration < new Date()) {
            return resp.status(400).send({ message: 'OTP has expired' });
        }

        resp.send({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        resp.status(500).send({ message: 'Error verifying OTP' });
    }
};

// reset Password
const resetPasswordviaOTP = async (req, resp) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ where: { email, otp } });
        if (!user) {
            return resp.status(400).send({ message: 'Invalid OTP' });
        }

        if (user.otpExpiration < new Date()) {
            return resp.status(400).send({ message: 'OTP has expired' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password and clear OTP
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiration = null;
        await user.save();

        resp.send({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        resp.status(500).send({ message: 'Error resetting password' });
    }
};

module.exports = {
    addUser,
    getAllUsers,
    resetPassviaoldpass,
    sendOTP,
    verifyOTP,
    resetPasswordviaOTP
}