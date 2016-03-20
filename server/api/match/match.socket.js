/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var MatchEvents = require('./match.events');
var Match = require.main.require('./components/match');
var debug = require('debug')('tvep');

// Model events to emit
var events = ['save', 'remove'];

var matchingSockets = [];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('match:' + event, socket);

    MatchEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }

  socket.on('startMatching', data => {
    handleStartMatchingEvent(socket);
  });
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    MatchEvents.removeListener(event, listener);
  };
}

function handleStartMatchingEvent(socket) {
  debug('%s matching user(s)', matchingSockets.length + 1, socket.decoded_token._id);
  if (matchingSockets.length < 2) {
    matchingSockets.push(socket);

    if (matchingSockets.length === 2) {
      var match = new Match(matchingSockets);
      matchingSockets = [];
    }

    socket.on('disconnect', () => {
      var index = matchingSockets.indexOf(socket);
      if (index > -1) {
        matchingSockets.splice(index, 1);
      }
    });
  }
}
