const { DateTime } = require('luxon');
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
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  const dob = this.date_of_birth ?
  DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) :
  '';
  const dod = this.date_of_death ?
  DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) :
  '';
  return `${dob} - ${dod}`;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('dob_year_month_date')
.get(function() {
  const year = this.date_of_birth.getFullYear().toString();
  let month = (this.date_of_birth.getMonth() + 1).toString();
  let date = this.date_of_birth.getDate().toString();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (date.length === 1) {
    date = '0' + date;
  }

  return `${year}-${month}-${date}`;
})

AuthorSchema
.virtual('dod_year_month_date')
.get(function() {
  const year = this.date_of_death.getFullYear().toString();
  let month = (this.date_of_death.getMonth() + 1).toString();
  let date = this.date_of_death.getDate().toString();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (date.length === 1) {
    date = '0' + date;
  }

  return `${year}-${month}-${date}`;
})

//Export model
module.exports = mongoose.model('Author', AuthorSchema);