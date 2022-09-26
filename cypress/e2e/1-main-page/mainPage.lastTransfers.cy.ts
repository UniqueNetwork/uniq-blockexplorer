import MainPage from '../../pages/MainPage';
import Viewports from '../../viewports/Viewports';

describe('Main page. Last transfers. Desktop.', () => {
  const viewports = new Viewports();

  before(() => {
    viewports.XXL();
  });

  describe('OPAL. Visit main page.', () => {
    const mainPage = new MainPage();

    beforeEach(() => {
      mainPage.visitOpalMainPage();
    });

    describe('Last transfers', () => {
      it('See last transfers with h2 header', () => {
        mainPage.lastTransfers().should('exist');
        mainPage.lastTransfers().find('h2').contains('Last transfers').should('exist');
      });

      it('See last transfers with dropdown', () => {
        mainPage.lastTransfers().find('.unique-dropdown').should('exist');
      });
    });
  });
});
