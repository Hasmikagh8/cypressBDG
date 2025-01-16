class FormAuthentication {
  NAMES = {
    contentText: "Form Authentication",
    formAuthLinkName: "login",
    buttonLogin: "Login",
    title: "Login Page",
    description: "This is where you can log into the secure area",
    username: "Username",
    password: "Password",
    userNameInput: "Test1$",
    passwordInput: "Password1$",
    linkClose: ".close",
  };

  getLoginForm() {
    return cy.get("form").get(".row").get("#login");
  }

  getFlash() {
    return cy.get("#flash-messages").get("#flash");
  }
}

export const formAuthentication = new FormAuthentication();
