'use strict';

/**
* @ngdoc function
* @name resourceManagementApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the resourceManagementApp
*/
angular.module('resourceManagementApp')
.controller('MainCtrl',function ($scope,Users,Facilities,Certifications,Roles,Postings) {
  // 'use strict';
  // if(Users.getCurrentProfile() === null){
  //   console.log('No user set, setting user with uid:',currentAuth.auth.uid,'as current');
  //   $scope.profile = Users.setCurrentProfile(currentAuth.auth.uid);
  // }else{
  //   $scope.profile = Users.getCurrentProfile();
  //   console.log('Current User:',currentAuth.auth.uid,'as current');
  // }
  // console.log('Current Auth',$scope.profile);
  $scope.getGreetingTime = function  () {
  	var g = null; //return g
    var m = window.moment();

  	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

  	var splitAfternoon = 12; //24hr time to split the afternoon
  	var splitEvening = 17; //24hr time to split the evening
  	var currentHour = parseFloat(m.format('HH'));

  	if(currentHour >= splitAfternoon && currentHour <= splitEvening) {
  		g = 'afternoon';
  	} else if(currentHour >= splitEvening) {
  		g = 'evening';
  	} else {
  		g = 'morning';
  	}

  	return g;
  };

  // $scope.profile = new User(currentAuth.auth.uid);

  $scope.roles = Roles;
  $scope.certifications = Certifications;
  $scope.facilities = Facilities;
  $scope.postings = Postings;

  $scope.posting ={
    facility:'1',
    role:1
  };

  $scope.loading=$scope.err=$scope.success=null;


});
