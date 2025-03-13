const fs = require('fs');

module.exports = () => {
  const dockerContent = fs.readFileSync('./Dockerfile', 'utf8');
  // Simple regex to find "pkg=version"
  const matches = dockerContent.match(/(\S+)=([\d.]+(?:-r\d+)?)/g) || [];
  return matches.map(pkg => `- ${pkg}`).join('\n');
};