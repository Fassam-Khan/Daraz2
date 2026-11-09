import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true, // Automatically converts email to lowercase
            trim: true,
            match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long']
          },
          role: {
            type: String,
            enum: ['customer', 'admin', 'manager'], // Restricts value to these options
            default: 'customer'
          },
    }
)