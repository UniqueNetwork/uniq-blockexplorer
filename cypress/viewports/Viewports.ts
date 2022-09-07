import '../support/commands';

class Viewports {
  XSS = () => {
    cy.viewport(479, 750);
  };

  XS = () => {
    cy.viewport(480, 750);
  };

  SM = () => {
    cy.viewport(767, 750);
  };

  MD = () => {
    cy.viewport(991, 750);
  };

  LG = () => {
    cy.viewport(1199, 750);
  };

  XL = () => {
    cy.viewport(1679, 750);
  };

  XXL = () => {
    cy.viewport(1680, 750);
  };
}

export default Viewports;
