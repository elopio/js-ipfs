'use strict'

const promisify = require('promisify-es6')
const Readable = require('readable-stream').Readable

function bandwidthStats (self, options) {
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

  return stats
}

module.exports = function stats (self) {
  return {
    bitswap: require('./bitswap')(self).stat,

    repo: require('./repo')(self).stat,

    bw: promisify((options, callback) => {
      if (typeof options === 'function') {
        callback = options
        options = {}
      }

      options = Object.assign({
        peer: '',
        proto: '',
        poll: false,
        interval: '1s'
      }, options)

      if (options.poll) {
        let stream = new Readable({ objectMode: true })
        let interval

        stream._read = (size) => {}

        const stop = () => clearInterval(interval)

        stream.on('end', stop)
        stream.on('close', stop)
        stream.on('error', stop)

        interval = setInterval(() => {
          stream.push(bandwidthStats(self, stats))
        }, 1000) // TODO: use interval here

        callback(null, stream)
      } else {
        callback(null, bandwidthStats(self, stats))
      }
    })
  }
}
