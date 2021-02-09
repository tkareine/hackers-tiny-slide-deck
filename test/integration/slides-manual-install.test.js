/// <reference types="Cypress" />

context("slides-manual-install, opening the page", () => {
  beforeEach(() => {
    cy.visit("/test/slides-manual-install.html")
  })

  it("does not have HTSD installed", () => {
    cy.get("head style").should("not.exist")
    cy.get("body").should((el) => {
      expect(el).not.to.have.class("htsd--installed")
    })
  })

  it("shows HTSD version", () => {
    cy.window().should((win) => {
      expect(win.htsd.version).to.match(/^\d+\.\d+\.\d+/)
    })
  })

  it("installs HTSD manually", () => {
    cy.window().then((win) => {
      win.htsd.installAll()
    })
    cy.get("head style").should((el) => {
      expect(el.length).to.equal(1)
      expect(el[0].textContent).to.match(/^@media screen {/)
    })
    cy.get("body").should((el) => {
      expect(el).to.have.class("htsd--installed")
    })
  })
})
