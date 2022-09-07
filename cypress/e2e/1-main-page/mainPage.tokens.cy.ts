import MainPage from '../../pages/MainPage';
import Viewports from '../../viewports/Viewports';

describe('Main page. Tokens. Desktop.', () => {
  const viewports = new Viewports();

  before(() => {
    viewports.XXL();
  });

  describe('OPAL. Visit main page.', () => {
    const mainPage = new MainPage();

    beforeEach(() => {
      mainPage.visitOpalMainPage();
    });

    describe('Tokens', () => {
      it('See tokens with h2 header', () => {
        mainPage.tokens().should('exist');
        mainPage.tokens().find('h2').contains('Tokens').should('exist');
      });

      it('See tokens with dropdown', () => {
        mainPage.tokens().find('.unique-dropdown').should('exist');
      });
    });
  });
});
