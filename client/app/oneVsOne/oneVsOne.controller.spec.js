'use strict';

describe('Component: OneVsOneComponent', function () {

  // load the controller's module
  beforeEach(module('devApp'));

  var OneVsOneComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    OneVsOneComponent = $componentController('OneVsOneComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
