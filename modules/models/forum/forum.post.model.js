var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var _ = require('lodash');
var schemaStructure = {};

_.extend(schemaStructure, {
    title: String,
    source: String,
    description: String,
    descriptionShort: String,
    created: { type: Date, default: new Date},
    writers: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    content: {
        type: String,
        default: '',
        trim: true
    },
    blocks: [{
        title: {
            type: String
        },
        index: {
            type: Number
        },
        style: {
            type: String
        },
        content: {
            type: String
        },
        contentId: {
            type: Schema.ObjectId,
            ref: 'ContentText'
        }
    }],
    linkedEntity: {
        entityKind: {
            type: String
        },
        entity: {  
            type: Schema.ObjectId, refPath: 'entityKind'
        }
    },
    relatePosts: [{
        type: Schema.ObjectId,
        ref: 'ForumPost'
    }],
    links: [{
        url: {
            type: String
        },
        entityType: {
            type: String
        }
    }],
    categoryName: String,
    targetName: String,
    categories: [{ 
        type: Schema.ObjectId,
        ref: 'ForumPostCategory'
    }],
    thumbnail: String,
    enable: { 
      type: Boolean,
      default: true
    },
    url: String,
    urlslug: String,
    order: Number,
    published : Boolean
});
var ForumPostSchema = new Schema(schemaStructure);

mongoose.model('ForumPost', ForumPostSchema, 'ForumPosts');