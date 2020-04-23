//intialising firebase functions
var functions = require('firebase-functions');
var admin = require('firebase-admin');
var cors = require('cors');
var express = require('express');

var app = express();
var port = 5000;

app.use(cors({ origin: true }));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://saporiunici-6cd34.firebaseio.com"
});

exports.app = functions.https.onRequest(app);

//Sample output of database ONLY using Express
// app.listen(port, () => console.log(`Server started on port ${port}`));
// app.get('/api/employees', (req,res) => {
//     const customers = [
//         {id: 1, firstName: 'Chase', lastName: 'Stein'},
//         {id: 2, firstName: 'Karolina', lastName: 'Dean'},
//         {id: 3, firstName: 'Nico', lastName: 'Minoru'},
//     ];

//     res.json(customers);

// })
