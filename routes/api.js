const express = require('express');
const router = express.Router();
const AppBuildService = require('./../src/services/app_build.service');
const AppBuild = require('../src/models/build_number.schema');

/**
 * params: bundle_id (string)
    ○ return:
    ■ if bundle_id exists
        ● build number (int)
    ■ else
        ● 4xx
 */
router.get('/read/:bundleId', (req, res, next) => {
    AppBuildService
        .read(req.params.bundleId)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

/**
 * ○ params:
    ■ bundle_id (string)
    ■ new_build_number (int)
 * ○ biz logic
    ■ if bundle_id does not exist.
        ● create and init build_number = 0;
    ■ If new_build_number > existing_build_number
        ● existing_build_number = new_build_number
 */
router.post('/set/:bundleId/:newBuildNumber', async(req, res) => {
    AppBuildService
        .set(req.params.bundleId, req.params.newBuildNumber, req.body.params)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

/**
 * ● /api/bump [POST]
    ○ params: bundle_id (string)
    ○ biz logic
    ■ if bundle_id does not exist.
        ● create and init build_number = 0;
    ■ build_number++
    ○ return
        ■ build_number (int)
 */
router.post('/bump/:bundleId', async(req, res) => {
    AppBuildService
        .bump(req.params.bundleId)
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

module.exports = router;