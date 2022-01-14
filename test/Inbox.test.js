const assert = require('assert');
const ganache = require('ganache-cli');

// Web3 has a capital letter because it is a constructor
const Web3 = require('web3');

// create an instance of Web3
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';
const NEW_MESSAGE = 'New message!';

beforeEach(async () => {
  // get accounts
  accounts = await web3.eth.getAccounts();

  // deploy contract with one of the getAccounts
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' });
});


describe('Inbox', () => {
  it('Contract deployed', () => {
    assert.ok(inbox.options.address);
  });
  it('Initial message set', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });
  it('Message changed', async () => {
    await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_MESSAGE);
  });
});
