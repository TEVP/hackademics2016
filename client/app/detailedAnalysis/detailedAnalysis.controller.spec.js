'use strict';

describe('Component: DetailedAnalysisComponent', function () {

  // load the controller's module
  beforeEach(module('devApp'));

  var DetailedAnalysisComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DetailedAnalysisComponent = $componentController('DetailedAnalysisComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
