const AppBuild = require('./../models/build_number.schema');
const httpStatus = require('http-status');

const readBuild = async(bundleId) => {
    var build = await AppBuild.findOne({bundleId});

    if (!build) {
        throw {message: httpStatus["404_NAME"], code: httpStatus.NOT_FOUND}
    }
    return {buildNumber: build.buildNumber};

}
const setBuild = async(bundleId = null, newBuildNumber = 0) => {
    var existingBuild = true;

    var build = await AppBuild
        .findOne({bundleId})
        .catch(e => {
            throw e;
        });
    if (!build) {
        existingBuild = false;
        if (!validBundleId(bundleId)) {
            throw {message: 'Invalid bundle identifier', code: httpStatus.BAD_REQUEST}
        }
        build = await new AppBuild({bundleId});
    }

    if (build && existingBuild) {
        if (+ newBuildNumber > + build.buildNumber) {
            build.buildNumber = newBuildNumber;
        }
    }
    await build.save();

    return build;
}

const bumpBuild = async(bundleId = null) => {
    var existingBuild = true;
    var build = await AppBuild.findOne({bundleId});
    if (!build) {
        existingBuild = false;
        build = await setBuild(bundleId, 0);
    }
    if (existingBuild && build) {
        build.buildNumber += 1;
        await build.save();
    }

    return {buildNumber: build.buildNumber};
}

const validBundleId = (bundleId) => {
    return /^com\.[A-Za-z0-9]+.[A-Za-z0-9]+$/.test(bundleId);
}

module.exports = {
    read: readBuild,
    set: setBuild,
    bump: bumpBuild
};