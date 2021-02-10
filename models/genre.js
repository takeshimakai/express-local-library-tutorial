const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    }
  }
);

// Virtual for genre's URL
GenreSchema
  .virtual('url')
  .get(() => `/catalog/genre/${_id}`);

// Export model
module.exports = mongoose.model('Genre', GenreSchema);