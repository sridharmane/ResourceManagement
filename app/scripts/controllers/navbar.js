'use strict';

/**
 * @ngdoc function
 * @name resourceManagementApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the resourceManagementApp
 */
angular.module('resourceManagementApp')
  .controller('NavbarCtrl', function ($scope,$location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
