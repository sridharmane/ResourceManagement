'use strict';
/**
* @ngdoc function
* @name resourceManagementApp.controller:PostingsCtrl
* @description
* # PostingsCtrl
* Controller of the resourceManagementApp
*/
angular.module('resourceManagementApp')
.controller('PostingsCtrl', function ($scope,Postings,Facilities) {

  $scope.postings = Postings;
  $scope.facilities = Facilities;
  // $scope.profile = new User(currentAuth.auth.uid);
  // console.log($scope.profile.isManager());

  $scope.getFacilityName = function(facilityId){
    for (var i = 0; i < $scope.facilities.length; i++) {
      if($scope.facilities[i].id.toString() === facilityId){
        return $scope.facilities[i].name;
      }
    }
  };

  $scope.getTimeDifference = function(endTime,startTime){
    var diff = '';
    var ms = window.moment(endTime).diff(window.moment(startTime));
    var h = Math.floor(window.moment.duration(ms).asHours());
    if(h!== 0 ){
      if(h === 1){
        diff += h+' hr ';
      }else{
        diff += h+' hrs ';
      }
    }

    var m = window.moment.utc(ms).format('mm');

    if(m !== '00'){
      diff += m+' mins';
    }
    // var m = Math.floor(d.asHours()) + ;
    // var diff = '';
    //   var hrs = window.moment(endTime).diff(startTime, 'hours');
    //   var mins = window.moment(endTime).diff(window.moment(startTime),'minutes');
    // return hrs +':'+ mins;
    // return window.moment(endTime).from(window.moment(startTime),true);
    return diff;
  };

});
