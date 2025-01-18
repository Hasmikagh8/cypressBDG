import { jQueryUIMenus } from "../../Pages/JQueryUIMenus";
import { basePage } from "../../Pages/Base";


const filePath = "cypress/fixtures/downloads/";
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
    cy.task("readdir", filePath).then((files) => {      
      cy.readFile(`cypress/fixtures/downloads/${files[0]}`);
      cy.parseXlsx(`cypress/fixtures/downloads/${files[0]}`).then(
        (jsonData) => {
          cy.log(JSON.stringify(jsonData[0]).data);
          expect(JSON.stringify(jsonData[0].data)).to.contain("4");
        }
      );
    });   
                                                                
  });
  afterEach(()=>
    cy.task("deleteFolder", filePath)  
  )
});
