/// <reference types="Cypress" />

const contain = (expectedContent) => (el) => {
  expect(el.length).to.equal(1)

  const tree = Array.from(el.children()).map((e) => [e.tagName.toLowerCase(), e.innerHTML])

  expect(tree).to.deep.equal(expectedContent)
}

const equal = (expectedContent) => (el) => {
  expect(el).to.equal(expectedContent)
}

const beShown = (el) => {
  expect(el).to.have.class("htsd-slide--shown")
}

context("slides-many, opening the page", () => {
  beforeEach(() => {
    cy.visit("/test/slides-many.html")
    cy.get("body.htsd--installed")
  })

  it("wraps content into slides", () => {
    cy.get(".htsd-slide").should((el) => {
      const tree = Array.from(el).map((e) =>
        Array.from(Cypress.$(e).children()).map((e) => [e.tagName.toLowerCase(), e.innerHTML])
      )

      expect(tree).to.deep.equal([
        [
          ["h1", "Header 1L1"],
          ["p", "Slide 1."],
        ],
        [["h2", "Header 2L2"]],
        [],
        [["p", "Slide 4."]],
        [
          ["h2", "Header 5L2"],
          ["h1", "Header 5L1"],
          ["p", "Slide 5."],
        ],
      ])
    })
  })

  it("generates id attributes for slides", () => {
    cy.get(".htsd-slide").should((el) => {
      const ids = Array.from(el).map((e) => e.id)
      expect(ids).to.deep.equal(["htsd-slide--header-1l1", "htsd-slide--header-2l2", "", "", "htsd-slide--header-5l1"])
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
    cy.location("hash").should(equal("#1"))
    cy.get(".htsd-slide:nth-of-type(1)").should(beShown)

    cy.rightArrowKey()
    cy.location("hash").should(equal("#2"))
    cy.get(".htsd-slide:nth-of-type(2)").should(beShown)

    cy.endKey()
    cy.location("hash").should(equal("#5"))
    cy.get(".htsd-slide:nth-of-type(5)").should(beShown)

    cy.leftArrowKey()
    cy.location("hash").should(equal("#4"))
    cy.get(".htsd-slide:nth-of-type(4)").should(beShown)

    cy.homeKey()
    cy.location("hash").should(equal("#1"))
    cy.get(".htsd-slide:nth-of-type(1)").should(beShown)
  })

  it("updates slide shown by changing hash", () => {
    cy.location("hash").should(equal("#1"))
    cy.get(".htsd-slide:nth-of-type(1)").should(beShown)

    cy.window().then((win) => {
      win.location.hash = "#3"
    })
    cy.location("hash").should(equal("#3"))
    cy.get(".htsd-slide:nth-of-type(3)").should(beShown)
  })

  it("preserves browser history", () => {
    cy.location("hash").should(equal("#1"))
    cy.get(".htsd-slide:nth-of-type(1)").should(beShown)

    cy.rightArrowKey()
    cy.rightArrowKey()
    cy.location("hash").should(equal("#3"))
    cy.get(".htsd-slide:nth-of-type(3)").should(beShown)

    cy.go("back")
    cy.location("hash").should(equal("#2"))
    cy.get(".htsd-slide:nth-of-type(2)").should(beShown)

    cy.window().then((win) => {
      win.location.hash = "#-1"
    })
    cy.location("hash").should(equal("#1"))
    cy.get(".htsd-slide:nth-of-type(1)").should(beShown)

    cy.go("back")
    cy.location("hash").should(equal("#2"))
    cy.get(".htsd-slide:nth-of-type(2)").should(beShown)

    cy.window().then((win) => {
      win.location.hash = "#1000"
    })
    cy.location("hash").should(equal("#5"))
    cy.get(".htsd-slide:nth-of-type(5)").should(beShown)

    cy.go("back")
    cy.location("hash").should(equal("#2"))
    cy.get(".htsd-slide:nth-of-type(2)").should(beShown)

    cy.go("forward")
    cy.location("hash").should(equal("#5"))
    cy.get(".htsd-slide:nth-of-type(5)").should(beShown)
  })
})

context("slides-many, opening with specific slide", () => {
  it("shows slide #2", () => {
    cy.visit("/test/slides-many.html#2")
    cy.location("hash").should(equal("#2"))
    cy.get(".htsd-slide:nth-of-type(2)").should(beShown)
  })
  ;["0", "-1", "", "asdf"].forEach((input) => {
    it(`shows the first slide when entering #${input}`, () => {
      cy.visit("/test/slides-many.html#" + input)
      cy.location("hash").should(equal("#1"))
      cy.get(".htsd-slide:nth-of-type(1)").should(beShown)
    })
  })

  it("shows the last slide when entering #6 (one past last slide)", () => {
    cy.visit("/test/slides-many.html#6")
    cy.location("hash").should(equal("#5"))
    cy.get(".htsd-slide:nth-of-type(5)").should(beShown)
  })
})
