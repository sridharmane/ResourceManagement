'use strict';

/**
 * @ngdoc service
 * @name resourceManagementApp.Certifications
 * @description
 * # Certifications
 * Service in the resourceManagementApp.
 */
angular.module('resourceManagementApp')
  .service('Certifications', function (Ref, $firebaseArray) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $firebaseArray(Ref.child('certifications/'));
  });
