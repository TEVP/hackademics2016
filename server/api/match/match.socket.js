/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var MatchEvents = require('./match.events');
var Match = require.main.require('./components/match');
var debug = require('debug')('tvep');

// Model events to emit
var events = ['save', 'remove'];

var matchingUsers = [];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('match:' + event, socket);

    MatchEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }

  socket.on('startMatching', data => {
    handleStartMatchingEvent(data, socket);
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

function handleStartMatchingEvent(data, socket) {
  debug('%s matching user(s)', matchingUsers.length + 1, data);
  socket.userId = data.userId;
  if (matchingUsers.length < 2) {
    matchingUsers.push({
      socket: socket
    });

    if (matchingUsers.length === 2) {
      var match = new Match(matchingUsers);
      matchingUsers = [];
    }
  }
}
