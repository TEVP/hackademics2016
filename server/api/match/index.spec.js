'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var matchCtrlStub = {
  index: 'matchCtrl.index',
  show: 'matchCtrl.show',
  create: 'matchCtrl.create',
  update: 'matchCtrl.update',
  destroy: 'matchCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var matchIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './match.controller': matchCtrlStub
});

describe('Match API Router:', function() {

  it('should return an express router instance', function() {
    matchIndex.should.equal(routerStub);
  });

  describe('GET /api/matches', function() {

    it('should route to match.controller.index', function() {
      routerStub.get
        .withArgs('/', 'matchCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/matches/:id', function() {

    it('should route to match.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'matchCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/matches', function() {

    it('should route to match.controller.create', function() {
      routerStub.post
        .withArgs('/', 'matchCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/matches/:id', function() {

    it('should route to match.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'matchCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/matches/:id', function() {

    it('should route to match.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'matchCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/matches/:id', function() {

    it('should route to match.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'matchCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
