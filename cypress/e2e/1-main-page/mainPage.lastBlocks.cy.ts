import MainPage from '../../pages/MainPage';
import Viewports from '../../viewports/Viewports';

describe('Main page. Last blocks. Desktop.', () => {
  const viewports = new Viewports();

  before(() => {
    viewports.XXL();
  });

  describe('OPAL. Visit main page.', () => {
    const mainPage = new MainPage();

    beforeEach(() => {
      mainPage.visitOpalMainPage();
    });

    describe('Last blocks', () => {
      it('See last blocks with h2 header', () => {
        mainPage.lastBlocks().should('exist');
        mainPage.lastBlocks().find('h2').contains('Last blocks').should('exist');
      });
    });
  });
});
