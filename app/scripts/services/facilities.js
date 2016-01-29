'use strict';

/**
 * @ngdoc service
 * @name resourceManagementApp.Facilities
 * @description
 * # Facilities
 * Service in the resourceManagementApp.
 */
angular.module('resourceManagementApp')
  .service('Facilities', function (Ref,$firebaseArray) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $firebaseArray(Ref.child('facilities/'));
  });
