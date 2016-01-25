'use strict';

/**
 * @ngdoc directive
 * @name resourceManagementApp.directive:loader
 * @description
 * # loader
 */
angular.module('resourceManagementApp')
  .directive('loader', function () {
    return {
      templateUrl: 'views/loader.html',
      restrict: 'E'
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the loader directive');
      // }
    };
  });
