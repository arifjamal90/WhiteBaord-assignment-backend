const mongoose = require("mongoose");

const invitedUserSchema = new mongoose.Schema({
email:{
    type:String,
    required:true,
    trim:true,
    
},
name:{
    type:String,
},
role:{
    type:String,
    enum: ['Viewer', 'Editor', "Admin"]

},
expiresAt: {
    type: Date,
    required: true
}
})

invitedUserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('invitedUser', invitedUserSchema)