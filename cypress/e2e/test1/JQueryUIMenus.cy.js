import { jQueryUIMenus } from "../../Pages/JQueryUIMenus";
import { basePage } from "../../Pages/Base";
import Papa from "papaparse";

const filePath = "cypress/fixtures/downloads/";
describe("jQueryUIMenus", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains(jQueryUIMenus.NAMES.contentText).click();
  });

  it("Verify Menu link, page and Excel file", () => {
    cy.url().should(
      "include",
      `${jQueryUIMenus.NAMES.jQuerylinkName}/${jQueryUIMenus.NAMES.menuLinkName}`
    );
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      jQueryUIMenus.NAMES.contentText
    );
    cy.get(jQueryUIMenus.LOCATORS.description)
      .find("p")
      .contains(jQueryUIMenus.NAMES.menuText);
    cy.get("h3").should("contain", jQueryUIMenus.NAMES.menuTitle);
    cy.contains(jQueryUIMenus.LOCATORS.enabled).click();
    cy.contains(jQueryUIMenus.LOCATORS.downlaods).click();
    cy.contains(jQueryUIMenus.LOCATORS.files.excel).click();
    
    cy.task("readdir", filePath).then((files) => {
      cy.readFile(`${filePath}/${files[0]}`);
      cy.parseXlsx(`${filePath}/${files[0]}`).then((jsonData) => {
        cy.log(JSON.stringify(jsonData[0]).data);
        expect(JSON.stringify(jsonData[0].data)).to.contain("4");
      });
    });
  });

  it("Verify csv file", () => {
    cy.contains(jQueryUIMenus.LOCATORS.enabled).click();
    cy.contains(jQueryUIMenus.LOCATORS.downlaods).click();
    cy.contains(jQueryUIMenus.LOCATORS.files.csv).click();

    cy.fixture(`${jQueryUIMenus.NAMES.csvPath}`).then((csvData) => {
      // Use papaparse to parse the CSV data
      Papa.parse(csvData, {
        complete: (result) => {
          // assertions
          expect(result.data[0]["number of items"]).to.equal("4");
          expect(result.data[0].subtotal).to.equal("4.00");
          expect(result.data[0].tax).to.equal("0.13");
          expect(result.data[0].total).to.equal("4.52");
        },
        header: true, // Treat the first row as the header
      });
    });
  });

  it("Verify that 'Disabled' is disabled", () => {
    cy.contains(jQueryUIMenus.LOCATORS.disabled).should("be.visible");
    cy.get(jQueryUIMenus.LOCATORS.disabledID).should(
      "have.attr",
      "aria-disabled",
      "true"
    );
  });

  it("Verify that 'Back to' link, Menu page and go to Menu", () => {
    cy.contains(jQueryUIMenus.LOCATORS.enabled).click();
    cy.contains(jQueryUIMenus.LOCATORS.backToJQueryUI).click();
    cy.url().should("include", `${jQueryUIMenus.NAMES.jQuerylinkName}`);
    cy.get("h3").should("contain", jQueryUIMenus.NAMES.jqueryTitle);
    cy.get(jQueryUIMenus.LOCATORS.description)
      .find("p")
      .contains(jQueryUIMenus.NAMES.jQueryText);
    //move to Menu page again
    cy.get("li>a").click();
    cy.url().should(
      "include",
      `${jQueryUIMenus.NAMES.jQuerylinkName}/${jQueryUIMenus.NAMES.menuLinkName}`
    );
  });

  afterEach(() => cy.task("deleteFolder", filePath));
});
