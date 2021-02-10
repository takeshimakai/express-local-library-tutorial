const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxlength: 100
    },
    family_name: {
      type: String,
      required: true,
      maxlength: 100
    },
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
  }
)

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(() => `${family_name}, ${first_name}`);

// Virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(() => (date_of_death.getYear() - date_of_birth.getYear()).toString());

// Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(() => `/catalog/author/${_id}`);

// Export model
module.exports = mongoose.model('Author', AuthorSchema);