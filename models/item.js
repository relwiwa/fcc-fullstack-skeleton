const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
});

mongoose.model('Item', itemSchema);
