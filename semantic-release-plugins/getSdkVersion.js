const fs = require('fs');

module.exports = () => {
  const dockerContent = fs.readFileSync('./Dockerfile', 'utf8');
  // Find the line with "ARG SDK_GIT_TAG=..."
  const sdkRegex = /^ARG\s+SDK_GIT_TAG=(\S+)/m;
  const match = dockerContent.match(sdkRegex);
  return match ? match[1] : 'unknown';
};