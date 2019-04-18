import { SampleposFrontendPage } from './app.po';

describe('samplepos-frontend App', function() {
  let page: SampleposFrontendPage;

  beforeEach(() => {
    page = new SampleposFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
