const getBaseImageName = require('./getBaseImageName');
const getPackageVersions = require('./getPackageVersions');
const getSdkVersion = require('./getSdkVersion');

module.exports = {
    generateNotes: async (pluginConfig, context) => {
      const baseImage = getBaseImageName();
      const versions = getPackageVersions();
      const sdkVersion = getSdkVersion();
      // ...existing code...
      return `**Base Image:** ${baseImage}\n**Alpine Packages:**\n${versions}\n**Pico SDK Version:** ${sdkVersion}`;
    },
  };