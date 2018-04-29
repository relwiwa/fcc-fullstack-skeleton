const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  headline: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

mongoose.model('Item', itemSchema);
