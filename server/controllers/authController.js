const User = require("../models/User");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

        let profile = null;
        if (user.role === "student") profile = await Student.findById(user.profileId);
        else if (user.role === "faculty") profile = await Faculty.findById(user.profileId);

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                profileId: user.profileId,
                profile,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { login };
