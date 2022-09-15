import MainPage from '../../pages/MainPage';
import Viewports from '../../viewports/Viewports';

describe('Main page. Collections. Desktop.', () => {
  const viewports = new Viewports();

  before(() => {
    viewports.XXL();
  });

  describe('OPAL. Visit main page.', () => {
    const mainPage = new MainPage();

    beforeEach(() => {
      mainPage.visitOpalMainPage();
    });

    describe('Collections', () => {
      it('See collections with h2 header', () => {
        mainPage.collections().should('exist');
        mainPage.collections().find('h2').contains('Collections').should('exist');
      });

      it('See collections with dropdown', () => {
        mainPage.collections().find('.unique-dropdown').should('exist');
      });
    });
  });
});
