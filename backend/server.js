const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//Require Routes
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const searchRoutes = require("./routes/search");
const groceryListRoutes = require("./routes/groceryList");
const favouriteRoutes = require("./routes/favourites");
const twilioRoute = require("./routes/twilio");

//Set up .env
const dotenv = require("dotenv");

//Initialize express server
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(cookieParser("secretcode"));

// Passport configurations
const passport = require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// dotenv
dotenv.config();

// Database config to Connect to local
const db = require("./config/keys").mongoCloud;
// const db = require("./config/keys").mongoLocal;

//Use Routes
app.use("/favourites", favouriteRoutes);
app.use("/recipes", recipesRoutes);
app.use("/users", usersRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/search", searchRoutes);
app.use("/groceries", groceryListRoutes);
app.use("/twilio", twilioRoute);

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server started on port ${port}!`));
