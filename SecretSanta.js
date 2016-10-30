import Nexmo from 'nexmo';
import config from './config.json';
require('console-count');

// Set Nexmo API
const nexmo = new Nexmo({
  apiKey: config.apiKey,
  apiSecret: config.apiSecret
});

// Send method
const sendMessage = (name, to) => {
  nexmo.message.sendSms('Santa2016', to, `Cette année, tu devras faire plaisir à ${name} !`);
  console.log('sended');
};

// Return a random number except 1 (himself)
const generateFactor = (max) => {
  const output = Math.floor((Math.random() * max) + 1);
  return output === 1 ? generateFactor(max) : output;
};

const max = config.people.length - 1;
const factor = generateFactor(max);

// Based on factor, assign a name for each person.
config.people.map((person, key) => {
  const index = (key + factor) > (max + 1) ? key + factor - (max + 1) : key + factor;
  sendMessage(config.people[index - 1].name, person.phone);
});

console.log('Done !');
