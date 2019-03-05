const express = require('express');
const app = express();

let deviceState = false;
const port = parseInt(process.argv[2]);

app.get('/cm', (req,res) => {
   const action = req.query.cmd;

   if (action === 'Power On') {
       deviceState = true;
   } else if (action === 'Power off') {
       deviceState = false;
   } else if (action === 'Power TOGGLE') {
       deviceState = !deviceState;
   }

   console.log(`Current state ${deviceState ? 'On' : 'Off'}`);

   res.json({
       power: deviceState
   });
});

app.listen(port, () => {
    console.log(`Fake device is available on http://127.0.0.1:${port}`);
});