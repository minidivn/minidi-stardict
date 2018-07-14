var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var _ = require('lodash');
var schemaStructure = {};

_.extend(schemaStructure, {
    title: String,
    description: String,
    categoryName: String,
    targetName: String,
    created: { type: Date, default: new Date },
    thumbnail: String,
    enable: { 
      type: Boolean,
      default: true
    },
    parentCategory: {
        type: Schema.ObjectId,
        ref: 'ForumPostCategory'
    },
    chidrenCategories: [{
        type: Schema.ObjectId,
        ref: 'ForumPostCategory'
    }]
});
var ForumPostCategorySchema = new Schema(schemaStructure);

mongoose.model('ForumPostCategory', ForumPostCategorySchema, 'ForumPostCategories');