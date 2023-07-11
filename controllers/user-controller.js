const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
    //find all users
    async getAllUsers(req, res) {
        try {
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
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: 'user DNE' });
            }
            const thought = await Thought.findOneAndUpdate(
                { user: req.params.userId },
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
            const user = await User.findOneAndUpdate(
                { _id: params.id },
                { new: true },
                { runValidators: true }
            );
            if(!user){
                return res.status(404).json({message: 'no user found'});  
            }
            res.json(user);
        }
        catch(err){
            res.status(500).json(err);
        }
    },


}