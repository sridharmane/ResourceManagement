'use strict';

/**
 * @ngdoc service
 * @name resourceManagementApp.Postings
 * @description
 * # Postings
 * Service in the resourceManagementApp.
 */
angular.module('resourceManagementApp')
  .service('Postings', function (Ref,$firebaseArray) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $firebaseArray(Ref.child('postings/'));
  });
