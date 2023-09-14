const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
});

// STATIC SIGNUP METHOD ON THE USER MODEL
userSchema.statics.signup = async function (email, password) {
   //EMAIL AND PASSWORD VALIDATION
   if (!email || !password) {
      throw Error('All fields must be filled');
   }

   if (!validator.isEmail(email)) {
      throw Error('Email is not valid');
   }

   if (!validator.isStrongPassword(password)) {
      throw Error('Password is not strong enough');
   }

   const emailExists = await this.findOne({ email });

   if (emailExists) {
      throw Error('Email entered is already in use');
   }

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);

   const user = await this.create({ email, password: hash });

   return user;
};

// STATIC LOGIN METHOD ON THE USER MODEL
userSchema.statics.login = async function (email, password) {
   if (!email || !password) {
      throw Error('All the fields must be filled');
   }

   const user = await this.findOne({ email });

   if (!user) {
      throw Error('Incorrect email');
   }

   const passwordMatch = await bcrypt.compare(password, user.password);

   if (!passwordMatch) {
      throw Error('Incorrect password');
   }

   return user;
};

module.exports = mongoose.model('User', userSchema);
