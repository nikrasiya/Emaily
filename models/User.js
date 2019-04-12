const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// All the properties that our object will have
const userSchema = new Schema({
  googleId: String
});

// Creates a Class ( Collection in MongoDB)
mongoose.model("users", userSchema);
