import { basePage } from "../../Pages/Base";
import { emailGenerator } from "../../utils/functions";
import { forgotPassword } from "../../Pages/forgotPassword";

let textName = "";
const emailName = emailGenerator(10);
describe("dropdownList", () => {
  it("Verify link and default value", () => {
    cy.visit("/");
    cy.contains(forgotPassword.NAMES.contentText).click();
    cy.url().should("include", `${forgotPassword.NAMES.forgotPasswordLink}`);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      forgotPassword.NAMES.contentText
    );
  });

  it("Verify Inserting an unique Email, checking the value and clicking on button", () => {
    cy.visit("/");
    cy.contains(forgotPassword.NAMES.contentText).click();
    basePage.getExample().get("#email").type(emailName);
    basePage
      .getExample()
      .get("#email")
      .invoke("val")
      .then((value) => {
        textName = value;
      });

    cy.then(() => {
      expect(emailName).to.eq(textName);
    });

    basePage
      .getExample()
      .get("#form_submit")
      .get("i")
      .should("have.contain", "Retrieve password")
      .click();
    cy.get("h1").should("contain", "Internal Server Error");
  });
});
