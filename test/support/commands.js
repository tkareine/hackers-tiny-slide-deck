/// <reference types="Cypress" />

Cypress.Commands.add("leftArrowKey", () => {
  cy.get("body").type("{leftarrow}")
})

Cypress.Commands.add("rightArrowKey", () => {
  cy.get("body").type("{rightarrow}")
})

Cypress.Commands.add("homeKey", () => {
  cy.get("body").type("{home}")
})

Cypress.Commands.add("endKey", () => {
  cy.get("body").type("{end}")
})
