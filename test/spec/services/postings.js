'use strict';

describe('Service: Postings', function () {

  // load the service's module
  beforeEach(module('resourceManagementApp'));

  // instantiate service
  var Postings;
  beforeEach(inject(function (_Postings_) {
    Postings = _Postings_;
  }));

  it('should do something', function () {
    expect(!!Postings).toBe(true);
  });

});
