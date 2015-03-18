'use strict';

describe('Basic navigation tests', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
  });

  it('should launch trulescent when startTlsc is true', function () {
    element(by.id('go-btn')).click();
    expect(element(by.css('.tlsc-main')).isDisplayed()).toBe(true);
  });

  it('should go to next step when next is clicked and the previous step on back click', function() {
    element(by.id('go-btn')).click();
    element(by.id('tlsc-next-btn')).click();
    browser.sleep(200);

    expect(element(by.css('.tlsc-tooltip .tlsc-content')).getText()).toEqual('1');
    element(by.id('tlsc-back-btn')).click();
    browser.sleep(200);

    expect(element(by.css('.tlsc-tooltip .tlsc-content')).getText()).toEqual('0');
  });

  it('should end when the end button is clicked', function () {
    element(by.id('go-btn')).click();
    expect(element(by.css('.tlsc-main')).isDisplayed()).toBe(true);
    element(by.id('tlsc-end-btn')).click();
    expect(element(by.css('.tlsc-main')).isDisplayed()).toBe(false);
  });

});
