const { defineConfig } = require("cypress");
require("dotenv").config();

const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.globalUrl,
    setupNodeEvents(on, config) {
      on("task", { downloadFile });
    },
  },
});
