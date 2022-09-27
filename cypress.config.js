const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    specPattern: "test/integration/**/*.test.js",
    supportFile: "test/support/index.js",
  },
  downloadsFolder: "test/downloads",
  fixturesFolder: "test/fixtures",
  screenshotsFolder: "test/screenshots",
  videosFolder: "test/videos",
})
