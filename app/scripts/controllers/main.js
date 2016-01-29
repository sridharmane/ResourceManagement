'use strict';

/**
* @ngdoc function
* @name resourceManagementApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the resourceManagementApp
*/
angular.module('resourceManagementApp')
.controller('MainCtrl',function ($scope,Ref,Auth,Users,$location,Facilities,Certifications,Roles,Postings) {
  // 'use strict';
  $scope.user = Auth.$getAuth();
  if($scope.user === null){//Unauthenticated user
    //redirect to login
    $location.path('/login');
  }else{
    Users.all.$loaded().then(
      function(){
        // $scope.profile = $firebaseObject(Ref.child('users/'+$scope.user.uid));
        $scope.profile = Users.getProfile($scope.user.uid);
        console.log($scope.profile);
      }
    );
    $scope.roles = Roles;
    $scope.certifications = Certifications;
    $scope.facilities = Facilities;
    $scope.postings = Postings;

  }
  $scope.posting ={
    facility:'1',
    role:1
  };

  $scope.loading=$scope.err=$scope.success=null;
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
  $scope.getFacilityName = function(facilityId){
    for (var i = 0; i < $scope.facilities.length; i++) {
      if($scope.facilities[i].id.toString() === facilityId){
        return $scope.facilities[i].name;
      }
    }
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
