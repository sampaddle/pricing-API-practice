var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {

  // set the product ID's to be displayed
  const product1 = 14001;
  const product2 = 14119;
  const product3 = 14120;

  // call prices 2.0 API for relevant info
  axios.get(`https://sandbox-checkout.paddle.com/api/2.0/prices/?product_ids=${product1},${product2},${product3}`)
  .then(function (response) {
    console.log(response.data.response.products);
    const products = response.data.response.products;
    console.log(products[0].product_title);
    console.log(products[0].price.gross);
    console.log(products[0].currency);
    const product1Name = products[0].product_title;
    const product1Cost = `${products[0].price.gross} ${products[0].currency}`;
    const product2Name = products[1].product_title;
    const product2Cost = `${products[1].price.gross} ${products[0].currency}`;
    const product3Name = products[2].product_title;
    const product3Cost = `${products[2].price.gross} ${products[0].currency}`;

    // render PUG file with the relevant info as variables
    res.render('index', { 
      title: 'Express', 
      product1Name: product1Name, 
      product1Cost: product1Cost, 
      product2Name: product2Name, 
      product2Cost: product2Cost, 
      product3Name: product3Name, 
      product3Cost: product3Cost 
    });

  })
  
});

module.exports = router;
