'use strict';

describe('Placement test', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
  });


  it('should launch trulescent when startTlsc is true', function () {
    element(by.id('go-btn')).click();
    expect(element(by.css('.tlsc-main')).isDisplayed()).toBe(true);
  });

});
