// use commonjs here
const apiRouter = require('../../api')

function createApp () {
  const app = apiRouter.debugInterface
  app.isTestingEnv = true // this will turn off error handling (see api/index.js)

  return app
}

// module.exports = createApp
module.exports.createApp = createApp
