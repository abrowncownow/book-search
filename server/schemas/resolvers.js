const {User} = require('../models/index');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(context.user)
            if (!context.user){
                throw new AuthenticationError("Not logged in");
                }

            return await User.findById(context.user._id).populate("books");
        },

    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if (!user){throw new AuthenticationError("Email doesn't exist")};
            const confPW = await user.isCorrectPassword(password);
            if (!confPW){
                throw new AuthenticationError("Password didn't match. Try again.");
            }
            const token = signToken(user);
            console.log('logged in')
            return {token, user};
        },

        addUser: async (parent, {username, email, password}) => {
            const user= await User.create({username, email, password});
            const token = signToken(user);
            return {token, user}
        },

        saveBook: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("Need to be logged in");
            }
            const updateBook = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks: args.input}},
                {new: true}
            );
            return updateBook;
        },

        removeBook: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError("Need to be logged in");
            }
            const removeBook = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$pull: {savedBooks: {bookId: args.bookId}}},
                {new: true}
            );
            return removeBook;
        },
    },

};

module.exports = resolvers;