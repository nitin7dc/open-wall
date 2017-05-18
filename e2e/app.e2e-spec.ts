import { Angular2WallPage } from './app.po';

describe('angular2-wall App', () => {
  let page: Angular2WallPage;

  beforeEach(() => {
    page = new Angular2WallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
