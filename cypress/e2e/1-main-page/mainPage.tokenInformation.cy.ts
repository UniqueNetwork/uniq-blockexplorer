import MainPage from '../../pages/MainPage';
import Viewports from '../../viewports/Viewports';

describe('Main page. Token Information. Desktop.', () => {
  const viewports = new Viewports();

  before(() => {
    viewports.XXL();
  });

  describe('OPAL. Visit main page.', () => {
    const mainPage = new MainPage();

    beforeEach(() => {
      mainPage.visitOpalMainPage();
    });

    describe('TokenInformation', () => {
      it('See tokenInformation with navigation', () => {
        mainPage.tokenInformation().should('exist');
        mainPage.tokenInformation().contains('Token information').should('exist');
        mainPage.tokenInformation().contains('Statistics').should('exist');
      });
    });
  });
});
