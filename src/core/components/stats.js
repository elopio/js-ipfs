'use strict'

const promisify = require('promisify-es6')

module.exports = function stats (self) {
  return {
    bitswap: require('./bitswap')(self).stat,

    repo: require('./repo')(self).stat,

    bw: promisify((options, callback) => {
      if (typeof options === 'function') {
        callback = options
        options = {}
      }

      let stats

      if (options.peer) {
        // TODO: stats for a specific peer
      } else if (options.proto) {
        // TODO: stats for a specific proto
      } else {
        const stat = self._bitswap.stat()
        const snapshot = stat.snapshot
        const movingAverages = stat.movingAverages
  
        stats = {
          totalIn: snapshot.dataReceived,
          totalOut: snapshot.dataSent,
          rateIn: movingAverages.dataReceived[60000].movingAverage() / 60, // Bytes per second
          rateOut: movingAverages.dataSent[60000].movingAverage() / 60 // Bytes per second
        }
      }

      callback(null, stats)
    })
  }
}
