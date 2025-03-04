const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://rehonoma1:JJjj33..@blue.aw6qzs9.mongodb.net/Login+signup", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit process with failure
    }
};

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensures usernames are not duplicated
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures emails are not duplicated
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User, connectDB };
