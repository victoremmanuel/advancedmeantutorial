(function() {
  'use strict';

  angular
    .module('app')
    .controller('lookCtrl', lookCtrl);

    lookCtrl.$inject = ['$scope','$stateParams','looksAPI','Auth','commentAPI'];

    function lookCtrl($scope,$stateParams,looksAPI,Auth,commentAPI) {

        $scope.user = Auth.getCurrentUser();
        $scope.id = $stateParams.lookId;
        $scope.popLooks = [];

        looksAPI.findOneLook($scope.id)
            .then(function(data) {
                console.log(data);
                $scope.look = data.data;
                addView();
            })
            .catch(function (err) {
                console.log('failed to get look',err);
            })

        looksAPI.popLooks($scope.id)
            .then(function(data) {
                console.log(data);
                $scope.popLooks = data.data;
            })
            .catch(function(err) {
                console.log('failed to get pop looks',err);
            })

        commentAPI.getComments($scope.id)
            .then(function(data) {
                console.log(data);
                $scope.comments = data.data;
            })
            .catch(function(err) {
                console.log('error getting comments',err);
            })
        
        $scope.postComment = function() {
            var comment = {
                authorId: $scope.user._id,
                authorName: $scope.user.name,
                authorEmail: $scope.user.email,
                gravatar: $scope.user.gravatar,
                comment: $scope.comment.body,
                lookId: $scope.id
            }
            console.log('comment',comment);
            commentAPI.addComment(comment)
                .then(function(data) {
                    console.log(data);
                    console.log('added comment');
                    $scope.comment.body = "";
                    $scope.comments.splice(0,0,data.data);
                })
                .catch(function(err) {
                    console.log('failed to post comment',err);
                })
        }

        $scope.addVote = function(look) {
        looksAPI.upVoteLook(look)
            .then(function(data) {
            console.log(data);
            look.upVotes++;
            })
            .catch(function(err) {
            console.log('failed to add upvote',err);
            })
        }
        function addView() {
            looksAPI.addView($scope.id) 
                .then(function(res) {
                    $scope.look.views++;
                    console.log('view added to look');
                    console.log(res);
                })
                .catch(function(err) {
                    console.log('failed to add view');
                    console.log(err);
                })
        }
    }
})();