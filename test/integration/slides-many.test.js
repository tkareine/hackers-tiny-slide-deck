/// <reference types="Cypress" />

context("Slides, many", () => {
  beforeEach(() => {
    cy.visit("/slides-many.html")
    cy.get("body.htsd--installed")
  })

  it("wraps content into slides", () => {
    cy.get(".htsd-slide").should((el) => {
      const tree = Array.from(el).map((e) =>
        Array.from(Cypress.$(e).children()).map((e) => [e.tagName.toLowerCase(), e.innerHTML])
      )

      expect(tree).to.deep.equal([
        [
          ["h1", "Header 1"],
          ["p", "Slide 1."],
        ],
        [["h2", "Header 2"]],
        [],
        [["p", "Slide 4."]],
        [
          ["h1", "Header 5"],
          ["p", "Slide 5."],
        ],
      ])
    })
  })

  it("keeps <script> and <style> tags in place in <body>, removes <hr>, inserts slides", () => {
    cy.get("body")
      .children()
      .should((el) => {
        const tags = Array.from(el).map((e) => [e.tagName.toLowerCase(), e.className])

        expect(tags).to.deep.equal([
          ["style", ""],
          ["script", ""],
          ["div", "htsd-slide htsd-slide--h1 htsd-slide--shown"],
          ["div", "htsd-slide htsd-slide--h2"],
          ["div", "htsd-slide"],
          ["div", "htsd-slide"],
          ["div", "htsd-slide htsd-slide--h1"],
        ])
      })
  })

  it("injects <style> tag into <head>", () => {
    cy.get("head style").should((el) => {
      expect(el.length).to.equal(1)
      expect(el[0].textContent).to.match(/^@media screen {/)
    })
  })

  it("navigates with keys", () => {
    const contain = (expectedContent) => (el) => {
      expect(el.length).to.equal(1)

      const tree = Array.from(el.children()).map((e) => [e.tagName.toLowerCase(), e.innerHTML])

      expect(tree).to.deep.equal(expectedContent)
    }

    cy.rightArrowKey()
    cy.get(".htsd-slide--shown").should(contain([["h2", "Header 2"]]))

    cy.endKey()
    cy.get(".htsd-slide--shown").should(
      contain([
        ["h1", "Header 5"],
        ["p", "Slide 5."],
      ])
    )

    cy.leftArrowKey()
    cy.get(".htsd-slide--shown").should(contain([["p", "Slide 4."]]))

    cy.homeKey()
    cy.get(".htsd-slide--shown").should(
      contain([
        ["h1", "Header 1"],
        ["p", "Slide 1."],
      ])
    )
  })
})
