'use strict';

/**
 * @ngdoc service
 * @name resourceManagementApp.Roles
 * @description
 * # Roles
 * Service in the resourceManagementApp.
 */
angular.module('resourceManagementApp')
  .service('Roles', function (Ref,$firebaseArray) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $firebaseArray(Ref.child('roles/'));
  });
