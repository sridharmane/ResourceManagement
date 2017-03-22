'use strict';

/**
 * @ngdoc function
 * @name resourceManagementApp.controller:CurrentpostingsCtrl
 * @description
 * # CurrentpostingsCtrl
 * Controller of the resourceManagementApp
 */
angular.module('resourceManagementApp')
  .controller('ListPostingsCtrl', function ($scope,Postings,Facilities) {

    $scope.postings = Postings;
    $scope.facilities = Facilities;
    // console.log($scope.profile);

    // $scope.getFacilityName = function(facilityId){
    //   for (var i = 0; i < $scope.facilities.length; i++) {
    //     if($scope.facilities[i].id.toString() === facilityId){
    //       return $scope.facilities[i].name;
    //     }
    //   }
    // };
  });
