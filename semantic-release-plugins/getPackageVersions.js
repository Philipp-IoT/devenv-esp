const fs = require('fs');
const { execSync } = require('child_process');

module.exports = () => {
  const dockerContent = fs.readFileSync('./Dockerfile', 'utf8');

  // Split Dockerfile into RUN instructions (handling line continuations)
  const joined = dockerContent.replace(/\\\n/g, ' ');
  const packages = new Set();
  for (const line of joined.split('\n')) {
    const m = line.match(/apt\s+install\s+-y\s+(.+)/);
    if (m) {
      for (const token of m[1].trim().split(/\s+/)) {
        if (token && !token.startsWith('-') && !token.startsWith('#')) {
          packages.add(token);
        }
      }
    }
  }

  // Query installed versions from the built Docker image
  const pkgList = [...packages].sort();
  const imageName = process.env.DOCKER_IMAGE || 'buildenv-esp';
  try {
    const pkgArgs = pkgList.join(' ');
    const output = execSync(
      `docker run --rm --entrypoint sh ${imageName} -c "dpkg-query -W -f '\\\${Package} \\\${Version}\\n' ${pkgArgs}"`,
      { encoding: 'utf8', timeout: 30000 }
    ).trim();
    return output.split('\n').map(line => `- ${line}`).join('\n');
  } catch {
    // Fallback: list package names without versions
    return pkgList.map(p => `- ${p}`).join('\n');
  }
};