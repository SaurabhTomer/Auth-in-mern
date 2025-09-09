const { UserModel } = require("../Models/user.models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists, you can login",
                success: false,
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({
                message: "User is not registered , signup ",
                success: false,
            });
        }

        const isPasswordEqual = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordEqual) {
            return res.status(403).json({
                message: " password is wrong",
                success: false,
            });
        }
        const jwtToken = jwt.sign(
            { email: existingUser.email, _id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name:existingUser.name
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports = { signup , login };
