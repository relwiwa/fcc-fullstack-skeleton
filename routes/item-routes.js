const mongoose = require('mongoose');

const Item = mongoose.model('Item');

module.exports = (app) => {
  // add :amount
  app.get('/items', (req, res) => {
    Item.find()
    .select({ id: 1, headline: 1 })
    .then(response => {
      return res.json({
        items: response,
      });      
    })
    .catch(error => {
      return res.sendStatus(500).json({
        message: 'An error occurred while performing the query for items',
      });
    });
  });

  app.get('/item/:id', (req, res) => {
    // validate req.params.id
    Item.findById(req.params.id)
    .then(response => {
      return res.json({
        item: response,
      });
    })
    .catch(error => {
      return res.sendStatus(500).json({
        message: 'An error occurred while performing the query for this item',
      });
    });
  });

};
