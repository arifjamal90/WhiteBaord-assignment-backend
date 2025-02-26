const express = require('express')
const router = express.Router();

const {inviteUser,acceptInvitation,allUsers,updateUser,deleteUser} = require('../controllers/invitationUser')
router.post('/user-invite',inviteUser);
router.post('/userInvitationLink/:token',acceptInvitation);
router.get('/allUsers/',allUsers);
// router.put('/updateUser/:id',updateUser);
router.delete('/deleteUser/:id',deleteUser)

module.exports = router;
