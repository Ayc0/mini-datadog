const Bundler = require('parcel-bundler');
const path = require('path');
const { spawn } = require('child_process');

if (process.env.NODE_ENV === 'debug') {
  // eslint-disable-next-line
  const inspector = require('inspector');
  global.console = inspector.console;
}

const entryFiles = path.join(__dirname, '../src/index.js');

// Bundler options
const options = {
  outFile: 'index.js', // The name of the outputFile
  watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: true, // Enabled or disables caching, defaults to true
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  logLevel: 0,
  target: 'node', // Browser/node/electron, defaults to browser
  hmr: true, // Enable or disable HMR while watching
  sourceMaps: false, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
};

// Initializes a bundler using the entrypoint location and options provided
const bundler = new Bundler(entryFiles, options);

let prog;

const selfStoppedPIDs = {};

bundler.on('bundled', async bundle => {
  if (prog) {
    prog.kill();
    selfStoppedPIDs[prog.pid] = true;
    await new Promise(resolve => {
      const intervalID = setInterval(() => {
        if (prog.killed) {
          resolve(clearInterval(intervalID));
        }
      }, 50);
    });
  }
  prog = spawn('node', [bundle.name], {
    stdio: [process.stdin, process.stdout, process.stderr],
    detached: false,
  });
  prog.on('close', code => {
    if (selfStoppedPIDs[prog.pid]) {
      delete selfStoppedPIDs[prog.pid];
    } else {
      process.exit(code);
    }
  });
});

bundler.bundle();
