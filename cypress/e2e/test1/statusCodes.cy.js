import { statusCodes } from "../../Pages/statusCodes";
import { basePage } from "../../Pages/Base";

describe("horizontalSlider", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains(statusCodes.NAMES.contentText).click();
  });

  it("Verify link and content", () => {
    cy.url().should("include", `${statusCodes.NAMES.statusCodesLinkName}`);

    basePage.getExample().get("h3").should("contain", statusCodes.NAMES.header);
    cy.contains(statusCodes.NAMES.description);

    for (let i = 0; i < 4; i++) {
      cy.contains(statusCodes.NAMES.statusCodes[i]).click();
      cy.url().should("include", `${statusCodes.NAMES.statusCodesLinkName}/${statusCodes.NAMES.statusCodes[i]}`);
      basePage.getExample().get("h3").should("contain", statusCodes.NAMES.header);
      cy.contains(`${statusCodes.NAMES.descSTCodes1}${statusCodes.NAMES.statusCodes[i]}${statusCodes.NAMES.descSTCodes2}`);
      cy.contains(statusCodes.NAMES.goBack).click();
    }
  });
});
