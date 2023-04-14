var child_process = require('child_process');
var path = require('path');

child_process.execSync('yarn', {
  cwd: path.resolve(__dirname),
});

child_process.execSync('chmod u+x ./node_modules/.bin/umi', {
  cwd: path.resolve(__dirname),
});

var start_cp = child_process.exec('yarn start', {
  cwd: path.resolve(__dirname),
});

start_cp.stdout.pipe(process.stdout);
start_cp.stderr.pipe(process.stderr);
