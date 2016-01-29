'use strict';

/**
 * @ngdoc filter
 * @name resourceManagementApp.filter:dateDiff
 * @function
 * @description
 * # dateDiff
 * Filter in the resourceManagementApp.
 */
angular.module('resourceManagementApp')
  .filter('dateDiff', function () {
     var magicNumber = (1000 * 60 * 60 * 24);
    return function (toDate,fromDate) {
      if(toDate && fromDate){
     var dayDiff = Math.floor((toDate - fromDate) / magicNumber);
     if (angular.isNumber(dayDiff)){
       return dayDiff + 1;
     }
   }
    };
  });
