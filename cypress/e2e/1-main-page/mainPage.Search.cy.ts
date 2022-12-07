import linksUrl from '../../links/linksUrl';

describe("Search", () => {
  const LinksUrl = new linksUrl();

    it("Search by Numeric Values", () => {
      cy.visit(LinksUrl.thisLinksUrl);
      cy.get('input').type('876');
      cy.get('button').contains('Search').click()
    });
  });

  describe("Search", () => {
  const LinksUrl = new linksUrl();
    it("Search by letter values", () => {
      cy.visit(LinksUrl.thisLinksUrl);
      cy.get('input').type('NORD');
      cy.get('button').contains('Search').click()
    });
  });

  describe("Search", () => {
  const LinksUrl = new linksUrl();
    it("Value not found", () => {
      cy.visit(LinksUrl.thisLinksUrl);
      cy.get('input').type('12454464523413');
      cy.get('button').contains('Search').click()
      expect(cy.get('span').contains('Nothing found'))
    });
  });

  describe("Search", () => {
  const LinksUrl = new linksUrl();
    it("Search by prefix and token number", () => {
      cy.visit(LinksUrl.thisLinksUrl);
      cy.get('input').type('NORD #1');
      cy.get('button').contains('Search').click()
      expect(cy.get('div').should('have.class','TokenCard__TokenTitle-sc-1xpk2vs-5 fpDiSu').get('span').should('have.class', 'unique-text size-l weight-regular color-primary-500 appearance-inline').contains('NORD #1'))
    });
  });