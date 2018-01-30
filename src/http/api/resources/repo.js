'use strict'

exports = module.exports

exports.version = (request, reply) => {
  const ipfs = request.server.app.ipfs

  ipfs.repo.version((err, version) => {
    if (err) {
      return reply({
        Message: err.toString(),
        Code: 0
      }).code(500)
    }

    reply({
      Version: version
    })
  })
}
