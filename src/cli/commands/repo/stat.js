'use strict'

const print = require('../../utils').print

module.exports = {
  command: 'stat',

  describe: 'Get stats for the currently used repo',

  builder: {},

  handler (argv) {
    argv.ipfs.repo.stat((err, stats) => {
      if (err) {
        throw err
      }

      print(`repo status
  number of objects: ${stats.numObjects}
  repo size: ${stats.repoSize}
  repo path: ${stats.repoPath}
  version: ${stats.version}
  maximum storage: ${stats.storageMax}`)
    })
  }
}
