'use strict'

const OFFLINE_ERROR = require('../utils').OFFLINE_ERROR

function formatWantlist (list) {
  return Array.from(list).map((e) => e[1])
}

module.exports = function stats (self) {
  return {
    bitswap: require('./bitswap')(self).stat
  }
}
