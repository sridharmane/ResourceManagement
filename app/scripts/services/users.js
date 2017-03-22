'use strict';

/**
* @ngdoc service
* @name resourceManagementApp.Users
* @description
* # Users
* Service in the resourceManagementApp.
*/
angular.module('resourceManagementApp')
.service('Users', function (Ref,$firebaseObject,$firebaseArray,Auth) {
  var users = $firebaseArray(Ref.child('users'));
  var currentUser = null;
  function firstPartOfEmail(email) {
    return ucfirst(email.substr(0, email.indexOf('@'))||'');
  }

  function ucfirst (str) {
    // inspired by: http://kevin.vanzonneveld.net
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
  }

  // function userProfileChanged(){
  //
  // }
  function listenToUserProfileChanges(){
    console.log(currentUser);
    Ref.child('users').child(currentUser.$id).on('child_changed', function(childSnapshot, prevChildKey) {
      console.log('child_changed');
      console.log(childSnapshot.val(),prevChildKey);
});
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
    getCurrentProfile:function(){
      if(currentUser !== null){
        // console.log('getCurrentProfile',currentUser);
        return currentUser;
      }else{
        try{
          return this.setCurrentProfile(Auth.$getAuth().uid);
        }catch(e){
          return false;
        }
      }

    },
    setCurrentProfile:function(uid){
      console.log('setCurrentProfile',uid);
      currentUser = users.$getRecord(uid);
      listenToUserProfileChanges();
      return currentUser;
    },
    getProfile: function(uid){
      return users.$getRecord(uid);
    },
    getName: function(uid){
      return users.$getRecord(uid).name;
    },
    getAll: function(){
      return users;
    },
    getAllUserIds: function(){
      var arr = [];
      for (var i = 0; i < users.length; i++) {
        arr[i] = users[i].$id;
      }
      return arr;
    }
  };

  return Users;
});
