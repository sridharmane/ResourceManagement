'use strict';

describe('Controller: CreatepostingCtrl', function () {

  // load the controller's module
  beforeEach(module('resourceManagementApp'));

  var CreatepostingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatepostingCtrl = $controller('CreatepostingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
