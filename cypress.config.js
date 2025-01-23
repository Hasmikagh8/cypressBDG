import { defineConfig } from "cypress";
import fs from "fs";
import xlsx from "node-xlsx"
import dotenv from "dotenv";
import { downloadFile } from "cypress-downloadfile/lib/addPlugin.js";



dotenv.config()
const config= defineConfig({
  e2e: {
    baseUrl: process.env.globalUrl,
    setupNodeEvents(on, config) {
      on("task", { downloadFile ,
        readdir(folderName) {
          return new Promise((resolve, reject) => {
            fs.readdir(folderName, (err, files) => {
              if (err) {
                return reject(err);
              }
              resolve(files);
            });
          });
        },
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }        
          
          }); 
        },
        deleteFolder(folderName) {
          console.log("deleting folder %s", folderName);
          return new Promise((resolve) => {
            fs.rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                console.error(err);
              }
              resolve(null);
            });
          });
        },
     });
          
    },
  },
  downloadsFolder: "cypress/fixtures/downloads",
});


export default config;