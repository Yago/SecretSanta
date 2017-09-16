const Nexmo = require('nexmo');
const fs = require('fs');
const SecretSanta = require('./secret-santa.js');
const config = require('./config.json');

const nexmo = new Nexmo({
  apiKey: config.apiKey,
  apiSecret: config.apiSecret
});
const santaList = new SecretSanta(config.people).build();

fs.writeFile(`./backups/${Date.now()}.json`, JSON.stringify(santaList), function(err) {
  if (err) console.error(err)
});

const sendMessages = (directory, i = 0) => {
  console.log(`  🛰  Sending to ${directory[i].from}...`);
  
  nexmo.message.sendSms('Noel2017', directory[i].phone, `Cette année, tu devras faire plaisir à ${directory[i].to} !`, {}, () => {
    console.log(`  ✅  Message successfully sended to ${directory[i].from}`);
  
    setTimeout(() => {
      if (i + 1 < directory.length) {
        sendMessages(directory, i + 1);
      } else {
        console.log('\n🎉  All messages sended !\n');
      }
    }, 1000);
  });
};

const sendMessage = (array, name) => {
  array.forEach((person) => {
    if (person.from === name) {
      nexmo.message.sendSms('Noel2017', person.phone, `Cette année, tu devras faire plaisir à ${person.to} !`, {}, () => {
        console.log(`  ✅  Message successfully sended to ${person.from}`);
      });
    }
  });
}

console.log('\n🎅🏻  Secret Santa is starting !\n');
sendMessages(santaList);
// sendMessage(require('./backups/1505566514220.json'), 'Romain');