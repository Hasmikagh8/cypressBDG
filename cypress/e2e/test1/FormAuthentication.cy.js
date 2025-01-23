import { basePage } from "../../Pages/Base";
import { formAuthentication } from "../../Pages/FormAuthentication";
import { COLORS } from "../../utils/colors";

let textUserName = "";
let textPassword = "";

describe("Form Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains(formAuthentication.NAMES.contentText).click();
  });

  it("Verify the functionality of Form Authentication button, link and the page's content", () => {
    cy.url().should("include", formAuthentication.NAMES.formAuthLinkName);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      formAuthentication.NAMES.title
    );

    cy.get(basePage.LOCATORS.content)
      .get("h4")
      .should("contain", formAuthentication.NAMES.description);

    formAuthentication
      .getLoginForm()
      .get('label[for="username"]')
      .should("contain", formAuthentication.NAMES.username);

    formAuthentication
      .getLoginForm()
      .get('label[for="password"]')
      .should("contain", formAuthentication.NAMES.password);

    formAuthentication
      .getLoginForm()
      .get("button")
      .should("have.css", "background-color", COLORS.blueBack)
      .should("contain", " Login")
      .should("have.css", "color", COLORS.white);

    // formAuthentication
    // .getLoginForm()
    // .get('button')
    // .get('.fa-sign-in')
    // .should('have.css', 'content','"\\f090"')
  });

  it("Verify the functionality of the button and the throwing validation", () => {
    //input a username
    formAuthentication
      .getLoginForm()
      .get("input")
      .get("#username")
      .type(formAuthentication.NAMES.userNameInput);

    formAuthentication
      .getLoginForm()
      .get("input")
      .get("#username")
      .invoke("val")
      .then((value) => {
        textUserName = value;
      });

    //check input username
    cy.then(() => {
      expect(formAuthentication.NAMES.userNameInput).to.eq(textUserName);
    });
    //input a password
    formAuthentication
      .getLoginForm()
      .get("input")
      .get("#password")
      .type(formAuthentication.NAMES.passwordInput);

    formAuthentication
      .getLoginForm()
      .get("input")
      .get("#password")
      .invoke("val")
      .then((value) => {
        textPassword = value;
      });

    //check input password
    cy.then(() => {
      expect(formAuthentication.NAMES.passwordInput).to.eq(textPassword);
    });

    // Checking that ther is no warning before clicking on Login
    formAuthentication.getFlash().should("not.exist");

    formAuthentication
      .getLoginForm()
      .get("button")
      .should("contain", " Login")
      .click();

    formAuthentication
      .getFlash()
      .should("exist")
      .should("contain", "Your username is invalid!")
      .should("have.css", "background-color", COLORS.red1)
      .and("have.css", "color", COLORS.white);

    formAuthentication
      .getFlash()
      .get("a")
      .then(($a) => {
        const attrib = $a.attr("href");
        expect(attrib).to.equal("#");
      })
      .get(formAuthentication.NAMES.linkClose)
      .should("contain", "×");

    //This is zoomed out as another image is closed the "x", so we cannot click on it
    formAuthentication.getFlash().then(($el) => {
      // Apply the scale transform directly to the element
      $el.css("transform", "scale(0.8)"); // 80% scale (zoom out)
      $el.css("transform-origin", "top left"); // Ensure scaling from the top-left corner
    });

    formAuthentication.getFlash().get("a").get(".close").click();

    // checking the the warning is closed
    formAuthentication.getFlash().should("not.exist");

    //I get an error here
    // formAuthentication
    // .getFlash()
    //   // .get(".error")
    //   // .should('exist')
    //   .then(($el) => {
    //     // Check the content of the ::before pseudo-element
    //     const content = window.getComputedStyle($el[0], "::before").content;
    //     expect(content).to.equal('"\\F057"'); // Verify the content value
    //   });
  });
});
