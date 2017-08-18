(function() {
    'use strict';

    angular
        .module('app')
        .controller('profileCtrl',profileCtrl);

        profileCtrl.$inject = ['$scope','Auth','adminAPI'];

    function profileCtrl($scope,Auth,adminAPI) {
        $scope.user = Auth.getCurrentUser();
        $scope.profileInfo = {};
        var id = $scope.user._id;

        adminAPI.getOneUser(id)
            .then(function(data) {
                console.log(data);
                $scope.profileInfo = data.data;
            })
            .catch(function(err) {
                console.log('failed to get user');
                console.log(err);
            })
    }
})();