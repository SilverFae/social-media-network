const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
    //find all users
    async getAllUsers(req, res) {
        try {
            // users is assigned to the result of the find method
            const users = await User.find({}).select('-__v');
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //get single user 
    async getSingleUser(req, res) {
        try {
            // user is assigned to the result of the findOne method
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'no user with this id' });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //creates a user
    async createUser(req, res) {
        try {
            // user is assigned to the result of the create method
            const user = await User.create(req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    //delete and remove thoughts associated with user
    async deleteUser(req, res) {
        try {
            // user is assigned to the result of the findOneAndDelete method
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: 'user DNE' });
            }
            // deletes the user from the thoughts array
            const thought = await Thought.findOneAndUpdate(
                // finds the thought with the user id
                { user: req.params.userId },
                // removes the user from the thoughts array
                { $pull: { user: req.params.userId } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'user deleted but no thoughts were found' });
            }

            res.json({ message: 'User successfully deleted!' });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Update user
    async updateUser(req, res) {
        try {
            // user is assigned to the result of the findOneAndUpdate method
            const user = await User.findOneAndUpdate(
                // finds the user with the id
                { _id: req.params.id },
                { new: true },
                { new:true, runValidators: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'no user found' });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    //add friend
    async addFriend(req, res) {
        try {
            // user is assigned to the result of the findOneAndUpdate method
            const user = await User.findByIdAndUpdate(
                // finds the user with the id
               req.params.userId,
            //    adds the friend to the friends array
                { $addToSet: { friends: req.params.friendsId } },
                { new: true, runValidators: true},
            )
            if (!user) {
                return res.status(404).json({ message: "no user found with this id" });
            }
            res.json({message: 'friend added', user});
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //remove friend
    async removeFriend(req, res) {
        try {
            // user is assigned to the result of the findOneAndUpdate method
            const user = await User.findByIdAndUpdate(
                // finds the user with the id
                req.params.userId,
                // removes the friend from the friends array
                { $pull: { friends: req.params.friendsId } },
                { new: true, runValidators: true }
            ).select("-__v");
            if (!user) {
                return res.status(404).json({ message: "no user found with this id" });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

}