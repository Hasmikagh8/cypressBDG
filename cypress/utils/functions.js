

import { basePage } from "../Pages/Base";
import { disappearingElements } from "../Pages/DisappearingElements";

export function reloadAndCheck(retries) {
      cy.reload();
      basePage
        .getExample()
        .get("ul")
        .get("li")
        .last()
        .then(($lastLi) => {
          if (
            $lastLi.text() !== disappearingElements.NAMES.buttons[4] &&
            retries > 0
          ) {
            retries--;
            reloadAndCheck(); // Retry reloading and checking
          } else if (retries === 0) {
            throw new Error('Max retries reached and last li is not "Gallery"');
          }
        });
        
        export function emailGenerator(len) {
          let mail = " ";
          let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
          const gmail='@gmail.com'
      
          for (let i=0; i < len; i++ ) {
              mail += charset.charAt(Math.floor(Math.random() * charset.length));
          }
          return `${mail}${gmail}`;
      }
    }export function emailGenerator(len) {
      let mail = " ";
      let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      const gmail='@gmail.com'
  
      for (let i=0; i < len; i++ ) {
          mail += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return `${mail}${gmail}`;
  }
