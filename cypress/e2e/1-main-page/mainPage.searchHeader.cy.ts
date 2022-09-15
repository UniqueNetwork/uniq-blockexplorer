import MainPage from '../../pages/MainPage';
import Viewports from '../../viewports/Viewports';

describe('Main page. Search Header. Desktop.', () => {
  const viewports = new Viewports();

  before(() => {
    viewports.XXL();
  });

  describe('OPAL. Visit main page.', () => {
    const mainPage = new MainPage();

    beforeEach(() => {
      mainPage.visitOpalMainPage();
    });

    describe('Network name.', () => {
      it('See network name in search header', () => {
        mainPage.searchHeader().should('exist');
        mainPage.searchHeader().contains('Block Explorer Opal').should('exist');
      });

      it('See search button in search header', () => {
        mainPage.searchHeader().find('button').contains('Search').should('exist');
      });
    });
  });
});
