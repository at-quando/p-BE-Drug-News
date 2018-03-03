const app = require('../src/lib/Express');
const config = require('../src/config');


// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, onStarted);
  app.on('error', onError);
  app.on('listening', onListening);
}

function onStarted() {
  console.info(`Server started on port ${config.port} (${config.env})`);
}

function onError(e) {
  console.error(`ERROR: ${e}`);
}

function onListening() {
  console.info(`Server is listening on port ${config.port}`);
}

export default app;
