const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId, //reference to the associated book
      ref: 'Book',
      required: true
    },
    imprint: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
      default: 'Maintenance'
    },
    due_back: {
      type: Date,
      default: Date.now
    }
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
  .virtual('url')
  .get(() => `/catalog/bookinstance/${_id}`);

// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);