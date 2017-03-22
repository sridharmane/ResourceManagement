'use strict';

/**
 * @ngdoc function
 * @name resourceManagementApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the resourceManagementApp
 */
angular.module('resourceManagementApp')
// .controller('NavbarCtrl', function () {
  .controller('NavbarCtrl', function ($scope,Users) {
    $scope.isLoggedIn = false;
    $scope.isLoggedIn = function(){
      try{
        if($scope.isLoggedIn){
          console.log(true);
          return true;
        }else{
          if(Users.getCurrentProfile()){
            console.log(true,'Got new profile');
            $scope.isLoggedIn = true;
          }
        }
      }catch(e){
        console.log(false,e);
        $scope.isLoggedIn = false;
        return false;
      }
    };
  });
