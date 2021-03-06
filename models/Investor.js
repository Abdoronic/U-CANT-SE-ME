const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvestorSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  type: {  //Will be a droplist with probably 1 item
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  methodOfIdentification: { //Passport or National id
    type: String,
    enum: ["NID", "passport"],
    required: true
  },
  identificationNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  residenceAddress: {
    type: String,
    required: true
  },
  telephoneNumber: {
    type: String,
    required: false
  },
  fax: {
    type: String,
    required: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = Investor = mongoose.model("Investor", InvestorSchema);
