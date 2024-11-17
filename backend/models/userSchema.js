import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
 
  },
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
    
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed with the save
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

userSchema.methods.MatchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
