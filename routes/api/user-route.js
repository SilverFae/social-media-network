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

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
router.route('/:userId/friends/:friendsId').post(addFriend).delete(removeFriend);

module.exports = router;