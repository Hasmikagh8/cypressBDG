import { jQueryUIMenus } from "../../Pages/JQueryUIMenus";
import { basePage } from "../../Pages/Base";
import xlsx from "node-xlsx";

describe("jQueryUIMenus", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains(jQueryUIMenus.NAMES.contentText).click();
  });

  it("Verify link and default value", () => {
    cy.url().should("include", `${jQueryUIMenus.NAMES.JQueryUIMenusLinkName}`);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      jQueryUIMenus.NAMES.contentText
    );

    cy.get("#ui-id-3")
      .find("a")
      .should("have.attr", "href", "#")
      .and("contain", "Enable");
    cy.contains("Enable").click();
    cy.contains("Downloads").click();
    cy.contains("Excel").click();

    
    const filePath = "cypress/downloads/menu.xls";


    cy.readFile(filePath, { encoding: 'binary',  timeout: 10000 })
      .should("exist")
      .then((fileContent) => {
        // Parse the Excel file using node-xlsx
        const parsedData = xlsx.parse(fileContent); // Parse the binary file content

        // The `parsedData` will be an array of sheet objects, each representing a sheet in the Excel file
        const sheetData = parsedData[0].data; // Access the first sheet's data (assuming it exists)

        // Assuming the first row contains headers, parse the data accordingly
        const jsonData = [];
        for (let i = 1; i < sheetData.length; i++) {
          const row = sheetData[i];
          jsonData.push({
            Name: row[0], // Assuming the first column is 'Name'
            Age: row[1], // Assuming the second column is 'Age'
          });
        }

        // Now you can assert the data from the Excel file
        expect(jsonData).to.have.length.greaterThan(0);
        expect(jsonData[0]).to.have.property("Name", "John Doe"); // Adjust to your data structure
        expect(jsonData[0]).to.have.property("Age", 30); // Adjust to your data structure
      });
  });
});
