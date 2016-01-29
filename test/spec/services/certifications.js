'use strict';

describe('Service: Certifications', function () {

  // load the service's module
  beforeEach(module('resourceManagementApp'));

  // instantiate service
  var Certifications;
  beforeEach(inject(function (_Certifications_) {
    Certifications = _Certifications_;
  }));

  it('should do something', function () {
    expect(!!Certifications).toBe(true);
  });

});
