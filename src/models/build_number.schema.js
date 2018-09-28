const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = require('bluebird');



const AppBuildSchema = new Schema({
    bundleId: {
        type: String,
        required: true,
        index: true,
        // match:      // <- pattern should match com.[company-name].[app-name]
    },
    buildNumber: {
        type: Number,
        default: 0
    }
});

AppBuildSchema.statics = {

    get(skip = 0, limit = 20) {
        return this.find()
            .sort({createAt: -1})
            .skip(+skip)
            .limit(+limit)
            .exec();
    },

    show(id) {
        return this.findById(id)
            .exec()
            .then((build) => {
                if(build){
                    return user;
                }
                return Promise.reject("No such build exists", 404);
            })
    }
};

module.exports = mongoose.model('AppBuild', AppBuildSchema);