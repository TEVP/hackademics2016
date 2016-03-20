'use strict';

describe('Component: GeneralAnalysisComponent', function () {

  // load the controller's module
  beforeEach(module('devApp'));

  var GeneralAnalysisComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    GeneralAnalysisComponent = $componentController('GeneralAnalysisComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
