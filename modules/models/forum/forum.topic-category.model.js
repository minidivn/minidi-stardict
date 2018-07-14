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
        ref: 'ForumTopicCategory'
    },
    chidrenCategories: [{
        type: Schema.ObjectId,
        ref: 'ForumTopicCategory'
    }]
});
var ForumTopicCategorySchema = new Schema(schemaStructure);

mongoose.model('ForumTopicCategory', ForumTopicCategorySchema, 'ForumTopicCategories');