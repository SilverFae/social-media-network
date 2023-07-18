const {Thought, User} = require('../models');

module.exports = {
    // gets all thoughts
    async getThoughts(req,res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },
    // gets specified thought 
    async getSingleThought(req,res){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');
            if (!thought){
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    // creates a thought
    async createThought(req,res){
        try{
            const thought = await Thought.create(req.body);
            res.json(thought);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // deletes a thought
    async deleteThought(req,res){
        try{
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if(!thought){
                res.status(404).json({message: 'No thought with that ID'});
            }
            await User.deleteMany({_id:{$in: thought.user}});
            res.json({message:''})
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //updates thought
    async updateThought(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if(!thought){
                return res.status(404).json({message: 'No thought with this id'});
            }
            res.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // post a reaction
    async createReaction(req,res){
        try{
           const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$push: {reactions: req.body}},
                {new: true},
            )
            if(!thought){
                return res.status(404).json({message: 'No user with this id'});
            }
            res.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    async deleteReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull:{reactions:{reactionId: req.params.reactionId}}},
                {new: true},
            )
            res.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
};
