import { basePage } from "../../Pages/Base";
import { LOCATORS } from "../../utils/locators";

describe("Main page testing", () => {
  it("Verify the functionality of Add/Remove button", () => {
    cy.visit("https://the-internet.herokuapp.com");
    cy.get('a').should('have.attr', 'href')
    .its('length').should('eq',42);

});

});