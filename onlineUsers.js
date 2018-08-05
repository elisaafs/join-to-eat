const connectedSockets = [];

exports.addConnectedSocket = function(socketId, userId) {
    // add a new entry {socketId: socketId, userId: userId} to array connectedSockets
};

exports.getOnlineUserIds = function() {
    // return an array of all userId that are contained somewhere in connectedSockets
    // easy solution: use connectedSockets.map
    // bonus point: avoid duplicates
};

exports.findPositionOfConnectedSocket = function(socketId) {
    // return the position of an entry of the form {socketId: socketId, ...} in connectedSockets
    // you could use connectedSocket.some; read about array.prototype.some
};

exports.removeConnectedSocket = function(socketId) {
    // first use exports.findPositionOfConnectedSocket to find the position of the entry
    // to remove; then use connectedSockets.splice to actually remove the entry
    // read about array.prototype.splice
    // in addition return the userId of that socket
};

exports.isUserOnline = function(userId) {
    // return true if connectedSockets has an entry containing this userId
    // you could use connectedSocket.some; read about array.prototype.some
};

// combine removeConnectedSocket and isUserOnline to check whether you need to
// send an "userLeft" message (if after removing she is still online, then
// do not send)

// const userId = removeConnectedSocket(socketId)
// if (!isUserOnline(userId)) { broadcast socket message "userLeft" for this userId }
