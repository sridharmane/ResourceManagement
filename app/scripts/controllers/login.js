'use strict';
/**
* @ngdoc function
* @name resourceManagementApp.controller:LoginCtrl
* @description
* # LoginCtrl
* Manages authentication to any active providers.
*/
angular.module('resourceManagementApp')
.controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $timeout, Users) {

  $scope.isActive = function (viewLocation) {
    console.log(viewLocation);
    return viewLocation === $location.path();
  };

  $scope.passwordLogin = function(email, pass) {
    $scope.err = null;
    $scope.loading = 'Checking credentials';
    Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
      redirect, showError
    );
  };

  $scope.createAccount = function(email, pass, confirm) {
    $scope.err = null;
    if( !pass ) {
      $scope.err = 'Please enter a password';
    }
    else if( pass !== confirm ) {
      $scope.err = 'Passwords do not match';
    }
    else {
      $scope.loading = 'Creating new account';
      Auth.$createUser({email: email, password: pass})
      .then(function () {
        // authenticate so we have permission to write to Firebase
        return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
      })
      .then(createProfile)
      .then(redirect, showError);
    }

    function createProfile(user) {
      var def = $q.defer();
      Users.createProfile(user).then(function(user){
        def.resolve(user);
      },function(err){
        console.log(err);
        def.reject(err);
      }
    );

    return def.promise;
  }
};

// function firstPartOfEmail(email) {
//   return ucfirst(email.substr(0, email.indexOf('@'))||'');
// }

// function ucfirst (str) {
//   // inspired by: http://kevin.vanzonneveld.net
//   str += '';
//   var f = str.charAt(0).toUpperCase();
//   return f + str.substr(1);
// }



function redirect() {
  $scope.loading = null;
  $location.path('/account');
}

function showError(err) {
  $scope.loading = null;
  $scope.err = err;
}


});
