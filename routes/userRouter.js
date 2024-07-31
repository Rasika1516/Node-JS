const express = require('express');
const router = require('express').Router();

const userController = require("../controller/userController");
router.post("/addUser",userController.addUser);
router.get("/getAllUser",userController.getAllUsers);
router.post("/resetPassword",userController.resetPassviaoldpass);
router.post('/forgot-password', userController.sendOTP);
router.post('/verify-otp', userController.verifyOTP);
router.post('/reset-password', userController.resetPasswordviaOTP);

const authController = require("../controller/authController");
router.post("/login",authController.login);


module.exports= router;