const express = require('express');
const app = express();
const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
app.get('/api/employees', (req,res) => {
    const customers = [
        {id: 1, firstName: 'Chase', lastName: 'Stein'},
        {id: 2, firstName: 'Karolina', lastName: 'Dean'},
        {id: 3, firstName: 'Nico', lastName: 'Minoru'},
    ];

    res.json(customers);

})
