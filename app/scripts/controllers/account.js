'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('resourceManagementApp')
  .controller('AccountCtrl', function ($scope, Auth, Ref, $firebaseObject, $timeout,Roles,Certifications,User) {
    //SRS,Staff

    // $scope.user = user;
    $scope.logout = function() { Auth.$unauth(); };
    $scope.messages = [];

    $scope.roles = Roles;
    $scope.certifications = Certifications;

    //Get the account profile firebase
    var profile = new User(Auth.$getAuth().uid);
    profile.$bindTo($scope, 'profile');

    // profile.$loaded().then(function(){
    //   $scope.setupProfile();
    // });
    $scope.setupProfile = function(){
      // profile.email = user.password.email;
      profile.setupDone = true;
      profile.$save();
      console.log('done setup');
      // profile.email = user.password.email;
    };

    $scope.changePassword = function(oldPass, newPass, confirm) {
      $scope.err = null;
      if( !oldPass || !newPass ) {
        error('Please enter all fields');
      }
      else if( newPass !== confirm ) {
        error('Passwords do not match');
      }
      else {
        Auth.$changePassword({email: profile.email, oldPassword: oldPass, newPassword: newPass})
          .then(function() {
            success('Password changed');
          }, error);
      }
    };

    $scope.changeEmail = function(pass, newEmail) {
      $scope.err = null;
      Auth.$changeEmail({password: pass, newEmail: newEmail, oldEmail: profile.email})
        .then(function() {
          profile.email = newEmail;
          profile.$save();
          success('Email changed');
        })
        .catch(error);
    };

    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

  });
