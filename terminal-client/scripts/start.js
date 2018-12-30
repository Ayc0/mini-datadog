const Bundler = require('parcel-bundler');
const path = require('path');

if (process.env.NODE_ENV === 'debug') {
  // eslint-disable-next-line
  const inspector = require('inspector');
  global.console = inspector.console;
}

const entryFiles = path.join(__dirname, '../src/index.js');

// Bundler options
const options = {
  outFile: 'index.js', // The name of the outputFile
  watch: false, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: true, // Enabled or disables caching, defaults to true
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  logLevel: 0,
  target: 'node', // Browser/node/electron, defaults to browser
  hmr: true, // Enable or disable HMR while watching
  sourceMaps: false, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
};

// Initializes a bundler using the entrypoint location and options provided
const bundler = new Bundler(entryFiles, options);

bundler.on('bundled', bundle => {
  // eslint-disable-next-line
  require(bundle.name);
});

bundler.bundle();
