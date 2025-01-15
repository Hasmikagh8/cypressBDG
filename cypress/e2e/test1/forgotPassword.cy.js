import { basePage } from "../../Pages/Base";
import { emailGenerator } from "../../utils/functions";
import { forgotPassword } from "../../Pages/forgotPassword";
import { COLORS } from "../../utils/colors";

let textName = "";
const emailName = emailGenerator(10);
describe("dropdownList", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains(forgotPassword.NAMES.contentText).click();
  });

  it("Verify link, button's properties, clicking on button when e-mail is empty", () => {
    cy.url().should("include", `${forgotPassword.NAMES.forgotPasswordLink}`);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      forgotPassword.NAMES.contentText
    );

    basePage
      .getExample()
      .get("#form_submit")
      .should("have.css", "background-color", COLORS.colorsForgotPass.blueBack)
      .get("i")
      .should("have.contain", "Retrieve password")
      .should("have.css", "font-style", "italic")
      .and("have.css", "color", COLORS.colorsForgotPass.white).click();;
    
    cy.get("h1").should("contain", "Internal Server Error");
  });

  it("Verify Inserting an unique Email, checking the value and clicking on button", () => {
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

    // clicking on button when e-mail is filled in
    basePage
      .getExample()
      .get("#form_submit")
      .get("i")
      .should("have.contain", "Retrieve password")
      .click();
    cy.get("h1").should("contain", "Internal Server Error");
  });
});
