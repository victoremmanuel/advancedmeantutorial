'use strict';

var controller = require('./comment.controller');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.get("/:id",controller.getComments);

router.post("/",controller.addComment);

module.exports = router;