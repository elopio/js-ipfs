'use strict'

const promisify = require('promisify-es6')

module.exports = function repo (self) {
  return {
    init: (bits, empty, callback) => {
      // 1. check if repo already exists
    },

    version: promisify((callback) => {
      self._repo.version.get(callback)
    }),

    gc: () => {},

    stat: promisify((options, callback) => {
      self._repo.stat(options, callback)
    }),

    path: () => self._repo.path
  }
}
