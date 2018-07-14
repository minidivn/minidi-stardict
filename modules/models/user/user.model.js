var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var _ = require('lodash');
var schemaStructure = {};

_.extend(schemaStructure, {
    username: String,
    email: String,
    displayName: String,
    gender: Number,
    created: { type: Date, default: new Date },
    activated: Boolean,
    status: Boolean
});
var UserSchema = new Schema(schemaStructure);

mongoose.model('User', UserSchema, 'Users');