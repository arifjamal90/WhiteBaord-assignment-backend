exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User is already registered',
            });
        }

        let otp;
        let otpExists;
        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            otpExists = await OTP.findOne({ otp });
        } while (otpExists);

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        if (!otpBody) {
            return res.status(500).json({
                success: false,
                message: 'Failed to store OTP',
            });
        }

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};