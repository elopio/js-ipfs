'use strict'

const resources = require('./../resources')

module.exports = (server) => {
  const api = server.select('API')

  api.route({
    method: '*',
    path: '/api/v0/repo/version',
    config: {
      handler: resources.repo.version
    }
  })

  // TODO: implement the missing spec https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/REPO.md
}
