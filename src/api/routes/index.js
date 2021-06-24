const { Router } = require("express");
const users = require("./users");
module.exports = function () {
	const app = Router();
	users(app);
	return app;
};