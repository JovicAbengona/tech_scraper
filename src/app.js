// Declare libraries and variables
const Express = require("express");
const Routes  = require("./routes");
const PORT    = 8001;
const App     = Express();

// Start Express App
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));

// Set for Views
App.set("views", __dirname + "/views");
App.set("view engine", "ejs");

// Routes
App.use(Routes);

App.listen(PORT, () => {
    console.log(`App Running on: http://localhost:${PORT}`);
});