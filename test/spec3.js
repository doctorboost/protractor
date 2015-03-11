// spec.js
describe('angularjs homepage', function() {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  var history = element.all(by.repeater('result in memory'));

  function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    goButton.click();
  }

  beforeEach(function() {
    browser.get('http://localhost:8888/protractor-demo.htm');
  });

  it('should have a history', function() {
    add(1, 2);
    add(3, 4);

    expect(history.count()).toEqual(2);

    add(5, 6);

    expect(history.count()).toEqual(3); 
  });

  it('should have a more complicated history', function() {
    add(1, 2);
    add(5, 4);

    expect(history.last().getText()).toContain('1 + 2');

    expect(history.first().$$('td').get(2).getText()).toContain('9');

    expect(history.first().$$('td').get(1).$$('span').get(0).getText()).toContain('5');

    history.first().$$('td').get(1).$$('span').get(0).getText().then(function (value) {
      console.log("the value is: " + value);
    }); 
  });

});