const Express = require("express");
const Router  = Express.Router();

const Technologies = require("./controllers/Technologies");

Router.use(Express.urlencoded({ extended: false }));

Router.get("/", Technologies.index);
Router.post("/get_technologies", Technologies.detect_technologies);

module.exports = Router;