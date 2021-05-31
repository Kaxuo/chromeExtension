const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const PORT = 5000;
const cors = require('cors');
app.use(cors());

const smartcard = require('smartcard');
const Devices = smartcard.Devices;
const devices = new Devices();

// APDU //
// const puceNumber = '80e400001c';
// const pin = "002000010824${pin}}ffffffffff"
// const selectFile = [
//   0x00, 0xa4, 0x08, 0x0c, 0x06, 0x3f, 0x00, 0xdf, 0x01, 0x40, 0x31,
// ];
// const commandsReq = [0x00, 0xb0, 0x00, 0x00, 0x64];

devices.on('device-activated', (event) => {
  const currentDevices = event.devices;
  const device = event.device;
  console.log(`Device '${device}' activated, devices: ${currentDevices}`);
  if (devices.devices) {
    device.on('card-inserted', (event) => {
      const card = event.card;
      app.get('/eID', (req, res) => {
        res.send('Card is connected');
      });
      app.post('/eID', async (req, res) => {
        const pin = req.body.pin;
        card
          .issueCommand(`002000010824${pin}}ffffffffff`)
          .then((response) => {
            console.log(response);
            console.log(` Commands:${response.toString('hex')}`);
          })
          .catch((error) => {
            console.log(error);
            res.send('Card removed');
          });

        const myPromise = new Promise((resolve) => {
          card.on('response-received', (event) => {
            resolve(event.response.data);
          });
        });
        const response = await myPromise;
        res.send(response);
      });
    });
  }
});

devices.on('device-deactivated', (event) => {
  console.log(
    `Device '${event.device}' deactivated, devices: [${event.devices}]`
  );
});

app.use('/api/majors', require('./routes/api/majors'));
app.use('/api/students', require('./routes/api/students'));
app.use('/api/classes', require('./routes/api/classes'));
app.listen(PORT, () => console.log('server started'));
