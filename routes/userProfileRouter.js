const express = require('express');
const router = require('express').Router();
const checkUserAuthentication = require('../middleware/authenticate');

const userProfileController = require("../controller/userProfileController");
router.post("/adduserProfile",checkUserAuthentication,userProfileController.addUserProfile);

router.get("/getAllProfiles",checkUserAuthentication,userProfileController.getAllProfiles);

module.exports= router;