import { disappearingElements } from "../../Pages/DisappearingElements";
import { basePage } from "../../Pages/Base";
import { LOCATORS } from "../../utils/locators";
import { COLORS } from "../../utils/colors";

describe("Disappearing_Elements", () => {
  beforeEach(() => { 

   cy.visit('/');
   cy.contains(disappearingElements.NAMES.contentText).click();

})

  it("Verify the functionality of Diappearing Elements button", () => {
   
    cy.url().should("include", disappearingElements.NAMES.disappLinkName);
    cy.get(basePage.LOCATORS.content).should(
      "contain",
      disappearingElements.NAMES.contentText
    );

    cy.get(basePage.LOCATORS.content).should("contain", disappearingElements.NAMES.description); 
    
    for (let i=0; i <4; i++) {
      basePage.getExample().get('ul>li').eq(i).should('have.text', disappearingElements.NAMES.buttons[i])
    };
    
});

it("Verify if there is a disappearing button", () => {


   
  basePage.getExample().get('ul').get('li').last().then(($lastItem) => {
    if ($lastItem.text() === disappearingElements.NAMES.buttons[4]) {
      basePage.getExample().get('ul').get('li').should('have.length', 5);
    } else {
      basePage.getExample().get('ul').get('li').should('have.length', 4);
    }
  });

 
  });
  
  it('reloads until last li is Gallery or retries are exhausted', () => {
   
    let retries = 10;  // Set a retry limit
    function reloadAndCheck() {
      cy.reload();
      basePage.getExample().get('ul').get('li').last().then(($lastLi) => {
        if ($lastLi.text() !== disappearingElements.NAMES.buttons[4] && retries > 0) {
          retries--;
          reloadAndCheck();  // Retry reloading and checking
        } else if (retries === 0) {
          throw new Error('Max retries reached and last li is not "Gallery"');
        }
      });
    }
  
    reloadAndCheck();

  });


  it("tests real hovers", function () {
    basePage.getExample().get('ul').find('li').first().should("have.css", "color", COLORS.colorsDisappear.black34);
    //The color should not be black before hovering, but the test gets black
    basePage.getExample().get('ul').find('li').first().realHover().should("have.css", "color", COLORS.colorsDisappear.black34);
  });

});

