const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const MNEMONIC = 'Insert your mnemonic here'; // INSERT YOUR MNEMONIC HERE
const INFURA_CONNECTION = 'Insert your connection point here'; // insert your infura connection point here

const provider = new HDWalletProvider(
  MNEMONIC,
  INFURA_CONNECTION
);

const web3 = new Web3(provider);

const INITIAL_MESSAGE = 'Hi there!';

const deploy = async () => {

  // Get list of all accounts from mnemonic
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);

  // Use first account from mneumonic to deploy contract
  const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to ', inbox.options.address);
    provider.engine.stop();
};
deploy();
