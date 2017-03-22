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
  // return $firebaseArray(Ref.child('roles/'));
  var rolesRef = Ref.child('roles/');

  // create a new service based on $firebaseArray
  var Roles = $firebaseArray.$extend({
    isManager: function(roleId){
      var isManager = false;
      for (var i = 0; i < this.$list.length; i++) {
        console.log(roleId,this.$list[i].id,this.$list[i].isManager);
        if(roleId === this.$list[i].id && this.$list[i].isManager){
          isManager = true;
        }
      }
      console.log('from roles',isManager);
      return isManager;
    }
  });
// });
//  return function(rolesRef) {
// create an instance of ListWithTotal (the new operator is required)
return new Roles(rolesRef);
//  };

});
