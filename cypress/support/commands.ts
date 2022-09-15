import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getByAutomationId', (selector, ...args) =>
  cy.find(`[data-automation-id=${selector}]`, ...args),
);

Cypress.Commands.add('sr', () => {
  return cy.get(`#${Cypress.env('APP_ROOT_ID')} > div`).first();
});

Cypress.Commands.add('getInputByLabel', { prevSubject: false }, (label) => {
  cy.log(`Search input with label ${label}`);

  return cy.sr().contains(label).find('input');
});
