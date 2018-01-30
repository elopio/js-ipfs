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

    gc: function () {},

    stat: promisify((options, callback) => {
      if (typeof options === 'function') {
        callback = options
        options = {}
      }

      // TODO: this!
      callback(null, {
        numObjects: 0,
        repoSize: 0,
        repoPath: 0,
        version: 0,
        storageMax: 0
      })
    }),

    path: () => self._repo.path
  }
}
