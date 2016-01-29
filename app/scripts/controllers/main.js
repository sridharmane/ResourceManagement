'use strict';

/**
* @ngdoc function
* @name resourceManagementApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the resourceManagementApp
*/
angular.module('resourceManagementApp')
.controller('MainCtrl',function ($scope,Ref,Auth,$firebaseObject,Facilities,Certifications,Roles,Postings) {
  // 'use strict';
  $scope.user = Auth.$getAuth();
  $scope.profile = $firebaseObject(Ref.child('users/'+$scope.user.uid));
  $scope.roles = Roles;
  $scope.certifications = Certifications;
  $scope.facilities = Facilities;
  $scope.posting ={
    createdBy:$scope.user.uid
  };

  /*
    Create Posting
  */
  $scope.createPosting = function(){
    $scope.posting.createdOn = Date.now();
    Postings.push($scope.posting);
    Postings.$save();
  };
  /*
    Datepicker
  */
  $scope.today = function() {
      $scope.posting.date = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.posting.date = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.posting.date = new Date(year, month, day);
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events =
      [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };
/*
  Timepicker
*/
$scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 5;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };


});
