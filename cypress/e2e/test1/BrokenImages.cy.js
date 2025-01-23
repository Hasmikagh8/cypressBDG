import { brokenImages } from "../../Pages/BrokenImages";
import { basePage } from "../../Pages/Base";
import { LOCATORS } from "../../utils/locators";

describe("Broken_Images", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains(brokenImages.NAMES.contentText).click();
  });

  it("Verify the functionality of Broken Images button", () => {
    cy.url().should("include", `/${brokenImages.NAMES.broken_images_link}`);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      brokenImages.NAMES.contentText
    );
  });

  it("Verify that there are 3 images and they are loaded", () => {
    basePage
      .getExample()
      .find("img")
      .should("have.length", brokenImages.NAMES.count);
    basePage
      .getExample()
      .find("img")
      .each(($img) => {
        const img = $img[0];
        cy.wrap(img).should("be.visible").and("have.property", "naturalWidth"); //.and('be.greaterThan',0);

        const naturalWidth = $img[0].naturalWidth; // Access the naturalWidth directly from the DOM element
        cy.log("Natural width:", naturalWidth); // Log or assert the value
        expect(naturalWidth).to.be.eq(0);
      });
  });
});
