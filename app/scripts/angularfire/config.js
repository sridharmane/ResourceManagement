angular.module('firebase.config', [])
  .constant('FBURL', 'https://resource-management.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login')
  .constant('USER_ROLES', {
    all: '*',
    manager: 'manager',
    staff: 'staff'
  });
