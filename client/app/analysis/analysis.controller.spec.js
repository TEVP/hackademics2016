'use strict';

describe('Component: AnalysisComponent', function () {

  // load the controller's module
  beforeEach(module('devApp'));

  var AnalysisComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AnalysisComponent = $componentController('AnalysisComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
