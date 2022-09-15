import MainPage from '../../pages/MainPage';
import Viewports from '../../viewports/Viewports';

describe('Main page. Header. Desktop.', () => {
  const viewports = new Viewports();

  before(() => {
    viewports.XXL();
  });

  describe('OPAL. Visit main page.', () => {
    const mainPage = new MainPage();

    beforeEach(() => {
      mainPage.visitOpalMainPage();
    });

    describe('Desktop navigation.', () => {
      it('See desktop header with navigation', () => {
        mainPage.header().should('exist');
        mainPage.desktopNavigation().should('exist');
        mainPage.desktopNavigation().find('a').contains('NFTs').should('exist');
        mainPage.desktopNavigation().find('a').contains('Collections').should('exist');
      });
    });
  });
});
