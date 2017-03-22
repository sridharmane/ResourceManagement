'use strict';

/**
 * @ngdoc service
 * @name resourceManagementApp.User
 * @description
 * # User
 * Service in the resourceManagementApp.
 */
angular.module('resourceManagementApp')
  .service('User', function (Ref,$firebaseObject,Roles) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var user = null;
    var isManger = null;
    var User = $firebaseObject.$extend({
      isManager : function(){
        if(isManger === null && this.role !== undefined){
          isManger = Roles.isManager(this.role);
        }
        // console.log('from User',isManger);
          return isManger;
      },
      // setCurrent : function(userId){
      //     user = Ref.child('users/'+userId);
      // },
      getCurrent : function(){
        return user;
      }
    });
    // return User;
    return function(userId){
      user = new User(Ref.child('users/'+userId));
      return user;
    };
  });
