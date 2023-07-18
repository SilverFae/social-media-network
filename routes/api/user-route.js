const router = require('express').Router();
const{
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// /api/users
router.route('/')
.get(getAllUsers)
.post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

// /api/users/:userId/friends/:friendsId
router.route('/:userId/friends/:friendsId')
.post(addFriend).
delete(removeFriend);

module.exports = router;