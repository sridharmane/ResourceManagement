'use strict';

describe('Controller: ManagepostingCtrl', function () {

  // load the controller's module
  beforeEach(module('resourceManagementApp'));

  var ManagepostingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagepostingCtrl = $controller('ManagepostingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
