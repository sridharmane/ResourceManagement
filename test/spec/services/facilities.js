'use strict';

describe('Service: Facilities', function () {

  // load the service's module
  beforeEach(module('resourceManagementApp'));

  // instantiate service
  var Facilities;
  beforeEach(inject(function (_Facilities_) {
    Facilities = _Facilities_;
  }));

  it('should do something', function () {
    expect(!!Facilities).toBe(true);
  });

});
