'use strict';

/**
* @ngdoc service
* @name resourceManagementApp.Users
* @description
* # Users
* Service in the resourceManagementApp.
*/
angular.module('resourceManagementApp')
.service('Users', function (Ref,$firebaseObject,$firebaseArray) {
  var users = $firebaseArray(Ref.child('users'));
  function firstPartOfEmail(email) {
    return ucfirst(email.substr(0, email.indexOf('@'))||'');
  }

  function ucfirst (str) {
    // inspired by: http://kevin.vanzonneveld.net
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
  }
  // AngularJS will instantiate a singleton by calling "new" on this function
  var Users = {
    createProfile:function(user){
      var ref = Ref.child('users/'+user.uid);

      var userObj = $firebaseObject(ref);
      userObj.email = user.password.email;
      userObj.name = firstPartOfEmail(user.password.email);
      // return ref.set({email: user.password.email, name: firstPartOfEmail(user.password.email)});
      return userObj.$save();
    },
    getProfile: function(uid){
      return $firebaseObject(users.child(uid));
    },
    getDisplayName: function(uid){
      return users.$getRecord(uid).displayName;
    },
    all: users
  };

  return Users;
});
