module.exports = {
    // mongoURI: 'mongodb://localhost:27017/mounty', /* Use mLab connection String */
    mongoURI: "mongodb+srv://shravani:shravani@1234@mounty.tcjqn.mongodb.net/mounty?retryWrites=true&w=majority",
    mongoOpts: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    PORT: 3000
};