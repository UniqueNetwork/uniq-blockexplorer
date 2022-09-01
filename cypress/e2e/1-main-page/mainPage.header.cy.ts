import MainPage from '../../pages/MainPage';
import Viewports from '../../viewports/Viewports';

describe('Desktop', () => {
  const viewports = new Viewports();

  before(() => {
    viewports.XXL();
  });

  describe('OPAL', () => {
    const mainPage = new MainPage();

    beforeEach(() => {
      mainPage.visitOpalMainPage();
    });

    describe('Main page. Header. Desktop navigation.', () => {
      it('Visit main page and see desktop header with navigation', () => {
        mainPage.headerExists();
        mainPage.desktopNavigationExists();
      });
    });
  });
});
