import '../support/commands';

class MainPage {
  collections = () => {
    return cy.sr().find('[data-automation-id=collections]');
  };

  desktopNavigation = () => {
    return cy.sr().find('[data-automation-id=desktop-menu]');
  };

  header = () => {
    return cy.sr().find('[data-automation-id=header]');
  };

  lastBlocks = () => {
    return cy.sr().find('[data-automation-id=last-blocks]');
  };

  lastTransfers = () => {
    return cy.sr().find('[data-automation-id=last-transfers]');
  };

  searchHeader = () => {
    return cy.sr().find('[data-automation-id=search-header]');
  };

  tokenInformation = () => {
    return cy.sr().find('[data-automation-id=token-information]');
  };

  tokens = () => {
    return cy.sr().find('[data-automation-id=tokens]');
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
