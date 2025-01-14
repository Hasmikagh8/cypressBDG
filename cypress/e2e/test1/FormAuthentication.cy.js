import { addRemoveElements } from "../../Pages/AddRemoveElements";
import { basePage } from "../../Pages/Base";
import { LOCATORS } from "../../utils/locators";

describe("Add_Remove_Elements", () => {
  it("Verify the functionality of Add/Remove button", () => {
    cy.visit("https://the-internet.herokuapp.com");
    cy.contains(addRemoveElements.NAMES.contentText).click();
    cy.url().should("include", addRemoveElements.NAMES.linkName);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      addRemoveElements.NAMES.contentText
    );

  });
});
