'use strict';

/**
 * @ngdoc function
 * @name resourceManagementApp.controller:CreatepostingCtrl
 * @description
 * # CreatepostingCtrl
 * Controller of the resourceManagementApp
 */
angular.module('resourceManagementApp')
  .controller('CreatePostingCtrl', function ($scope,Postings,Certifications,Facilities,Roles) {

    $scope.certifications = Certifications;
    $scope.facilities = Facilities;
    $scope.postings = Postings;
    $scope.roles = Roles;

    $scope.posting ={};
    /*
    Create Posting
    */
    $scope.createPosting = function(){
      $scope.loading = 'Creating new posting ...';

      // $scope.posting.createdBy = ;
      $scope.posting.createdOn = Date.now();
      $scope.posting.date = $scope.posting.date.getTime();
      $scope.posting.startTime = $scope.posting.startTime.getTime();
      $scope.posting.endTime = $scope.posting.endTime.getTime();
      console.log($scope.posting);
      $scope.postings.$add($scope.posting).then(
        function(success){
          $scope.loading = null;
          if(success){

          }
          $scope.success = 'Posting Created !';
        },
        function(err){
          $scope.loading = null;
          $scope.err = err;
        }
      );
      // push($scope.posting);
      // Postings.$save();
    };

    $scope.someCerificationsSelected = function(object){
      if(object === undefined || object === null){
        return false;
      }
      return Object.keys(object).some(function (key) {
        return object[key];
      });
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
