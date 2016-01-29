'use strict';

describe('Filter: dateDiff', function () {

  // load the filter's module
  beforeEach(module('resourceManagementApp'));

  // initialize a new instance of the filter before each test
  var dateDiff;
  beforeEach(inject(function ($filter) {
    dateDiff = $filter('dateDiff');
  }));

  it('should return the input prefixed with "dateDiff filter:"', function () {
    var text = 'angularjs';
    expect(dateDiff(text)).toBe('dateDiff filter: ' + text);
  });

});
