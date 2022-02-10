const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Connect to Local
// const db = require("../config/keys").mongoLocal;

// //Connect to Cloud
const db = require("../config/keys").mongoCloud;

//Require models
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const Favourite = require("../models/Favourite");

mongoose
  .connect(db)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err.message));

let recipe = new Recipe({
  title: "Bacon Carbonara Spaghetti",
  instructions:
    "In a large pot of boiling salted water, cook spaghetti pasta until al dente. Drain well. Toss with 1 tablespoon of olive oil, and set aside. Meanwhile in a large skillet, cook chopped bacon until slightly crisp; remove and drain onto paper towels. Reserve 2 tablespoons of bacon fat; add remaining 1 tablespoon olive oil, and heat in reused large skillet. Add chopped onion, and cook over medium heat until onion is translucent. Add minced garlic, and cook 1 minute more. Add wine if desired; cook one more minute. Return cooked bacon to pan; add cooked and drained spaghetti. Toss to coat and heat through, adding more olive oil if it seems dry or is sticking together. Add beaten eggs and cook, tossing constantly with tongs or large fork until eggs are barely set. Quickly add 1/2 cup Parmesan cheese, and toss again. Add salt and pepper to taste (remember that bacon and Parmesan are very salty). Serve immediately with chopped parsley sprinkled on top, and extra Parmesan cheese at table.",
  serving_size: 8,
  image_url:
    "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-articleLarge-v2.jpg",
  ingredients: [
    { name: "spaghetti", quantity: 1, unit: "pound" },
    { name: "olive oil", quantity: 2, unit: "tablespoon" },
    { name: "bacon", quantity: 8, unit: "slices" },
    { name: "onion", quantity: 1, unit: "whole" },
    { name: "dry white wine", quantity: 0.25, unit: "cup" },
    { name: "eggs", quantity: 4, unit: "whole" },
    { name: "parmesan cheese", quantity: 0.5, unit: "cup" },
    { name: "salt", quantity: 1, unit: "pinch" },
    { name: "pepper", quantity: 1, unit: "pinch" },
    { name: "fresh parsley", quantity: 2, unit: "tablespoon" },
    { name: "parmesan cheese", quantity: 2, unit: "tablespoon" },
  ],
  user_created: true,
  user: `${process.env.user}`,
});
recipe
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

// // let user = new User({
// //   first_name: "Jeewon",
// //   last_name: "Lee",
// //   email: "example@example.com",
// //   password: "password",
// // });

// user
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

let favourite1 = new Favourite({
  favourite_title: "Thai Pasta Salad",
  favourite_image: "https://spoonacular.com/recipeImages/663126-556x370.jpg",
  favourite_recipeID: 663126,
  user: `${process.env.user}`,
});

let favourite2 = new Favourite({
  favourite_title: "Korean Beef Rice Bowl",
  favourite_image: "https://spoonacular.com/recipeImages/649030-556x370.jpg",
  favourite_recipeID: 649030,
  user: `${process.env.user}`,
});

favourite1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

favourite2
  .save()
  .then((res) => {
    console.log(res);
    mongoose.disconnect(db);
  })
  .catch((err) => console.log(err));
