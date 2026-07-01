
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const sdkRoot = path.resolve(__dirname);

// Find npm CLI
let npmCli = null;
try {
  npmCli = require.resolve('npm/bin/npm-cli.js');
} catch (e) {
  const nodeDir = path.dirname(process.execPath);
  const possible = path.join(nodeDir, 'node_modules', 'npm', 'bin', 'npm-cli.js');
  if (fs.existsSync(possible)) npmCli = possible;
}

if (!npmCli) {
  console.error('❌ Cannot find npm CLI!');
  process.exit(1);
}

console.log('Installing ValidTrust-sdk dependencies...');
try {
  execFileSync(process.execPath, [npmCli, 'install'], {
    cwd: sdkRoot,
    stdio: 'inherit'
  });
  console.log('✅ SDK dependencies installed!');
} catch (e) {
  console.error('❌ Failed to install SDK dependencies!');
  process.exit(1);
}
