angular.module('SagoMiniApp', ['ngMaterial', 'ngMessages']);

angular
    .module('SagoMiniApp')
    .component('appRoot', {
        templateUrl: '/javascripts/app/views/app.template.html',
        controller: AppController
    });

AppController.$inject = [];
function AppController() {}

angular
    .module('SagoMiniApp')
    .component('findBuild', {
        templateUrl: '/javascripts/app/views/find-build.template.html',
        controller: findBuildController,
        controllerAs: 'findCtrl'
    });

findBuildController.$inject = ['$buildService', '$mdToast'];
function findBuildController($buildService, $mdToast) {
    this.build = null;
    this.buldId = '';

    function showErrorToast(error) {
        $mdToast.show($mdToast.simple().textContent(error).hideDelay(3000));
    }

    function findBuild() {
        $buildService
            .find(this.buildId)
            .then((response) => {
                this.build = response.data;
            }, (error) => {
                showErrorToast('Bundle not found');
            });
    }

    this.findBuild = findBuild;
}

angular
    .module('SagoMiniApp')
    .component('bumpBuild', {
        templateUrl: '/javascripts/app/views/bump-build.template.html',
        controller: bumpBuildController,
        controllerAs: 'bumpCtrl'
    });
bumpBuildController.$inject = ['$buildService', '$mdToast'];
function bumpBuildController($buildService, $mdToast) {
    this.build = null;
    this.buldId = '';

    function showErrorToast(error) {
        $mdToast.show($mdToast.simple().textContent(error).hideDelay(3000));
    }

    function bumpBuild() {
        $buildService
            .bump(this.buildId)
            .then((response) => {
                this.build = response.data;
            }, (error) => {
                showErrorToast(error.data);
            });
    }

    this.bumpBuild = bumpBuild;
}

angular
    .module('SagoMiniApp')
    .component('forceBuild', {
        templateUrl: '/javascripts/app/views/force-build.template.html',
        controller: forceBuildController,
        controllerAs: 'forceCtrl'
    });
forceBuildController.$inject = ['$buildService', '$mdToast'];
function forceBuildController($buildService, $mdToast) {
    this.build = null;
    this.buldId = '';
    this.buildNumber = null;

    function showErrorToast(error) {
        $mdToast.show($mdToast.simple().textContent(error).hideDelay(3000));
    }

    function forceBuild() {
        $buildService
            .set(this.buildId, this.buildNumber)
            .then((response) => {
                this.build = response.data;
            }, (error) => {
                showErrorToast(error.data);
            });
    }

    this.forceBuild = forceBuild;
}

angular
    .module('SagoMiniApp')
    .service('$buildService', buildService);

buildService.$inject = ['$http'];
function buildService($http) {

    const API_ENDPOINT = '/api';

    const service = {
        find: findBuild,
        set: setBuild,
        bump: bumpBuild
    };

    /**
     * Find Build with given Bundle Identifier
     *
     * @param {String} bundleId
     */
    function findBuild(bundleId) {
        return $http.get(`${API_ENDPOINT}/read/${bundleId}`);
    }

    /**
     * Force build number update
     *
     * @param {String} bundleId
     * @param {Number} newBuildNumber
     */
    function setBuild(bundleId, newBuildNumber) {
        return $http.post(`${API_ENDPOINT}/set/${bundleId}/${newBuildNumber}`);
    }

    /**
     * Bump up build number
     * @param {String} bundleId
     */
    function bumpBuild(bundleId) {
        return $http.post(`${API_ENDPOINT}/bump/${bundleId}`);
    }

    return service;
}
