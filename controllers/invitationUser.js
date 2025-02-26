const User = require('../models/User')
const bcrypt = require('bcrypt')
const Token = require('../models/Token')
const invitedUsers = require('../models/inviteUser')
const jwt = require('jsonwebtoken')
const { mailSender } = require('../Utils/mailSender')
const InvitationLink = require('../mail/invitetaionLink')


// Invite Users 
exports.inviteUser = async (req, res) => {
    
    const { email, role  } = req.body;
    try {
        const user = await User.findOne({ email });
console.log(user,"user");

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already in our team."
            });
        }

        // const generateToken = crypto.randomUUID()
        const expireToken = Date.now() + 3 * 60 * 1000;

        const invitedUser = new invitedUsers({
            email,
            role,
            
            expiresAt: new Date(expireToken)
        });

        await invitedUser.save();

        const payload = {
            email: invitedUser.email,
            id: invitedUser._id,
            role: invitedUser.role,
        }

        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "5h"
        })


        const url = `http://localhost:3000/accept-invite/${jwtToken}`

        const token = new Token({
            userId: invitedUser._id,
            token: jwtToken,
            expiresAt: new Date(expireToken),
        });

        await token.save();

        await  mailSender(email, "Invitation mail", InvitationLink(url, email));

        res.status(200).json({
            success: true,
            message: "User invited successfully!"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User not Invite Please try again.",
            error: err.message
        });
    }
};

// Invitation Accept Users 
exports.acceptInvitation = async (req, res) => {
    const { token } = req.params;
    const { email, name, password,  } = req.body.userData;
    console.log(email,"email");
    

    try {
        const user = await invitedUsers.findOne({ email });
        console.log(user , "user");
        

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found!"
            });
        }

        const checkUser = await User.findOne({ email: email })
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist, Please Sign-in."
            })
        }

        const generateToken = await Token.findOne({ token });
        if (!generateToken) {
            return res.status(401).json({
                success: false,
                message: "URL Expire."
            })
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const invitedUser = new User({
            username:name,
            email,
            password: hashedPassword,
            role: user.role,
        })

        await invitedUser.save();

        res.status(200).json({
            success: true,
            message: "User login successfully.",
            data: invitedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User not Login Please try again.",
            message: err.message
        });
    }
};


// only Invited Users 
exports.getInvitedUser = async(req,res)=>{
    try {

        const invitedUser = await invitedUsers.find();

        if(!invitedUser){
            return res.status(400).json({
                success:false,
                message:"Invited user not found",
                message:error.message
            })
        }
        
        return res.status(200).json({
            success:false,
            message:"invited user get successfully.",
            data:invitedUser
        })

    } catch (error) {
        return res.status(501).json({
            success:false,
            message:"User not get, Please try again.",
            message:error.message
        })
    }
}

// Get Users 
exports.allUsers = async (req, res) => {
    try {
        const allUser = await User.find()

        if (!allUser) {
            return res.status(401).json({
                success: false,
                message: "Users Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Users Fetch Successfully.",
            data: allUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User not fetch, Please try again.",
            message: error.message
        })
    }
}

// Update User 
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role } = req.body; 

        if (!name && !role) {
            return res.status(400).json({
                success: false,
                message: "Field is required.",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { ...(name && { name }), ...(role && { role }) },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User not update, Please try again.",
            error: error.message,
        });
    }
};

// Delete User 
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params


        const deletedUser = await User.findByIdAndDelete(id);
  
        if (!deletedUser) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully.",
            data: deletedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User not deleted. Please try again.",
            error: error.message,
        });
    }
};
