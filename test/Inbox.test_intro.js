const assert = require('assert');
const ganache = require('ganache-cli');

// Web3 has a capital letter because it is a constructor
const Web3 = require('web3');

// create an instance of Web3
const web3 = new Web3(ganache.provider());

class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

// initialize car, to undefined value
let car;

// initialize the car object from Car class for each test
beforeEach(() => {
  car = new Car();
});

// descrbe the tests
describe('Car', () => {
  it('Can park', () => {
    assert.equal(car.park(), 'stopped');
  });
  it('Can drive', () => {
    assert.equal(car.drive(), 'vroom');
  });
});
