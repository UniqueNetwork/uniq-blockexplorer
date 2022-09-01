import '../support/commands';

class MainPage {
  desktopNavigation = () => {
    return cy.sr().find('[data-automation-id=desktop-menu]');
  };

  header = () => {
    return cy.sr().find('[data-automation-id=header]');
  };

  headerExists = () => {
    this.header().should('exist');
  };

  desktopNavigationExists = () => {
    this.desktopNavigation().should('exist');
    this.desktopNavigation().find('a').contains('NFTs').should('exist');
    this.desktopNavigation().find('a').contains('Collections').should('exist');
  };

  visitOpalMainPage = () => {
    cy.visit(Cypress.env('OPAL_BASE_URL'));
  };

  visitQuartsMainPage = () => {
    cy.visit(Cypress.env('QUARTS_BASE_URL'));
  };

  visitUniqueMainPage = () => {
    cy.visit(Cypress.env('UNIQUE_BASE_URL'));
  };
}

export default MainPage;
