const fs = require('fs');

module.exports = () => {
  const dockerContent = fs.readFileSync('./Dockerfile', 'utf8');
  // Find the line beginning with "FROM"
  const fromRegex = /^FROM\s+(\S+)/m;
  const match = dockerContent.match(fromRegex);
  return match ? match[1] : 'unknown';
};