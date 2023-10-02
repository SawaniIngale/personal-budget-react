const express = require('express');
const app = express()
const cors = require('cors');
const port = 3000;

// app.use('/', express.static('public'));
app.use(cors());

// const budget_data = {
    
//         my_monthly_budget: [
//             {
//                 title: "Rent", 
//                 budget: 465
//             },
//             {
//                 title: "Groceries",
//                 budget: 100
//             },  
//             {
//                 title: "Dine out",
//                 budget: 50
//             },
//             {
//                 title: "Shopping",
//                 budget: 50
//             },
//             {
//                 title : "Mobile recharge",
//                 budget : 25
//             },
//             {
//                 title : "Utilities",
//                 budget : 100
//             },
//             {
//                 title : "Savings",
//                 budget : 250
//             }
//     ]
// }



app.get('/hello',(req, res) =>{
    res.send('Hello World!');
});

app.get('/budget',(req, res) => {
    const budget_data =require('./budget.json');
    res.json(budget_data);
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:'+port);
});