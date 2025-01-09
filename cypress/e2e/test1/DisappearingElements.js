import { disappearingElements } from "../../Pages/DisappearingElements";
import { basePage } from "../../Pages/Base";
import { LOCATORS } from "../../utils/locators";

describe("Disappearing_Elements", () => {
  it("Verify the functionality of Add/Remove button", () => {
    cy.visit('/');
    cy.contains(disappearingElements.NAMES.contentText).click();
    cy.url().should("include", disappearingElements.NAMES.Disap_linkName);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      disappearingElements.NAMES.contentText
    );

    
});

  
});
