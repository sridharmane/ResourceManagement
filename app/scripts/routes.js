'use strict';
/**
* @ngdoc overview
* @name resourceManagementApp:routes
* @description
* # routes.js
*
* Configure routes for use with Angular, and apply authentication security
* Add new routes using `yo angularfire:route` with the optional --auth-required flag.
*
* Any controller can be secured so that it will only load if user is logged in by
* using `whenAuthenticated()` in place of `when()`. This requires the user to
* be logged in to view this route, and adds the current user into the dependencies
* which can be injected into the controller. If user is not logged in, the promise is
* rejected, which is handled below by $routeChangeError
*
* Any controller can be forced to wait for authentication to resolve, without necessarily
* requiring the user to be logged in, by adding a `resolve` block similar to the one below.
* It would then inject `user` as a dependency. This could also be done in the controller,
* but abstracting it makes things cleaner (controllers don't need to worry about auth state
* or timing of displaying its UI components; it can assume it is taken care of when it runs)
*
*   resolve: {
*     user: ['Auth', function(Auth) {
*       return Auth.$getAuth();
*     }]
*   }
*
*/
angular.module('resourceManagementApp')

/**
* Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
* when called, invokes Auth.$requireAuth() service (see Auth.js).
*
* The promise either resolves to the authenticated user object and makes it available to
* dependency injection (see AccountCtrl), or rejects the promise if user is not logged in,
* forcing a redirect to the /login page
*/
// .config(['$routeProvider', 'SECURED_ROUTES', function($, SECURED_ROUTES) {
// credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
// unfortunately, a decorator cannot be use here because they are not applied until after
// the .config calls resolve, so they can't be used during route configuration, so we have
// to hack it directly onto the $routeProvider object

//   $routeProvider.whenAuthenticated = function(path, route) {
//     route.resolve = route.resolve || {};
//     route.resolve.user = ['Auth', function(Auth) {
//       return Auth.$requireAuth();
//     }];
//     $routeProvider.when(path, route);
//     SECURED_ROUTES[path] = true;
//     return $routeProvider;
//   };
// }])



// configure views; whenAuthenticated adds a resolve method to ensure users authenticate
// before trying to access that route
.config(function($stateProvider,$urlRouterProvider) {


  $stateProvider
  .state('app',{
    url: '/',
    views: {
      'content@': {
        controller: 'MainCtrl',
        templateUrl: '/views/main.html'
      }
    }
  })
  .state('app.account', {
    url: 'account',
    views: {
      'content@':{
        controller: 'AccountCtrl',
        templateUrl: '/views/account.html'
      }
    },
    resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      'currentAuth': ['Auth', function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireAuth();
      }]
    }
  })
  .state('app.login', {
    url: 'login',
    views: {
      'content@':{
        controller: 'LoginCtrl',
        templateUrl: '/views/login.html'
      }
    }
  })
  .state('app.postings', {
    // abstract: true,
    url: 'postings',
    // redirectTo:'app.postings.list',
    views: {
      'content@': {
        // controller: 'PostingsCtrl',
        templateUrl: '/views/postings.html'
      }
    },
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }]
    }
  })
  .state('app.postings.list', {
    url: 'list',
    views: {
      'postings@app.postings':{
        controller: 'ListPostingsCtrl',
        templateUrl: '/views/list-postings.html'
      }
    },
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }]
    }
  })
  .state('app.postings.manage', {
    url: '/:id',
    views: {
      'postings@app.postings':{
        controller: 'ManagepostingCtrl',
        templateUrl: '/views/manage-posting.html'
      }
    },
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }]
    }
  })
  .state('app.postings.create', {
    url: '/create',
    views: {
      'postings@app.postings':{
        controller: 'CreatePostingCtrl',
        templateUrl: '/views/create-posting.html'
      }
    },
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }]
    }
  });

  $urlRouterProvider.otherwise('/login');
})

/**
* Apply some route security. Any route's resolve method can reject the promise with
* 'AUTH_REQUIRED' to force a redirect. This method enforces that and also watches
* for changes in auth status which might require us to navigate away from a path
* that we can no longer view.
*/
.run(['$rootScope', '$state','Auth',
// function($rootScope,$state, Auth, SECURED_ROUTES) {
function($rootScope,$state,Auth) {
  // var authorized;
  // watch for login status changes and redirect if appropriate
  Auth.$onAuth(check);

  // some of our routes may reject resolve promises with the special {authRequired: true} error
  // this redirects to the login page whenever that is encountered


  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === 'AUTH_REQUIRED') {
      // if(Object.keys($rootScope.session).length === 0){

        if(toState.name === 'app.login'){
          return;
        }
        else {

          // console.log('toState',toState.name);
          // event.preventDefault();
          console.log('Unauthorized path. Login required!');
          $state.go('app.login');
          // console.log($state.current);
        }
      // }
      // else if(Object.keys(toState.permissions).length !==0){
      //
      //
      //   angular.forEach(toState.permissions, function(value,key){
      //     angular.forEach(value,function(role){
      //       if(key === 'except' && role === $rootScope.session.role)
      //       {authorized = false;}
      //       else if(key === 'allow' && role !== $rootScope.session.role)
      //       {authorized = false;}
      //     });
      //   });
      // }
      // if(!authorized){
      //   event.preventDefault();
      //   $state.go('app.postings.list');
      // }

      //   if (toState.name === 'app.login' ){
      // // doe she/he try to go to login? - let him/her go
      //   return;
      // }
    }
  });

  function check(user) {
    // if( !user && $state.href() !== '/login' ) {
    if(!user) {
      $state.go('app.login');
    }
  }


  // function authRequired(path) {
  //   return SECURED_ROUTES.hasOwnProperty(path);
  // }
}
])

// used by route security
.constant('SECURED_ROUTES', {});
