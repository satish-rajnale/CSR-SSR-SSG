//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3000/");
  cy.contains("button", "Sign In with Google").click();

  cy.get("input[name=identifier]", { timeout: 10000 }).type(email);
  cy.get("input[type=password]").type(password);

  // cy.get("input[name=username]").type(username);
  // cy.get("input[name=password]").type(password);

  // cy.contains("button", "Sign In with Google").click();
});
