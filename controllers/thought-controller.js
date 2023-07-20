const {Thought, User} = require('../models');

module.exports = {
    // gets all thoughts
    async getThoughts(req,res){
        try{
            // thoughts is assigned to the result of the find method
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },
    // gets specified thought 
    async getSingleThought(req,res){
        try{
            // thought is assigned to the result of the findOne method
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
            // thought is assigned to the result of the create method
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
            // thought is assigned to the result of the findOneAndDelete method
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if(!thought){
                res.status(404).json({message: 'No thought with that ID'});
            }
            // deletes the thought from the user's thoughts array
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
            // thought is assigned to the result of the findOneAndUpdate method
            const thought = await Thought.findOneAndUpdate(
                // finds the thought by id
                {_id: req.params.thoughtId},
                // updates the thought
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if(!thought){
                return res.status(404).json({message: 'No thought with this id'});
            }
            // returns the updated thought
            res.json(thought);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // post a reaction
    async createReaction(req,res){
        try{
            // thought is assigned to the result of the findOneAndUpdate method
           const thought = await Thought.findOneAndUpdate(
            // finds the thought by id
                {_id: req.params.thoughtId},
                // pushes the reaction to the reactions array
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
            // thought is assigned to the result of the findOneAndUpdate method
            const thought = await Thought.findOneAndUpdate(
                // finds the thought by id
                {_id: req.params.thoughtId},
                // pulls the reaction from the reactions array
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
