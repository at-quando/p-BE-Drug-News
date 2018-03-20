var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Article schema
var ArticleSchema = new mongoose.Schema({
  content: {
    type: String
  },
  title: {
    type: String
  },
  category_id: {
    type: Number,
    ref: 'Category'
  },
  hashtag: {
    type: Array
  },
  created_at: { 
    type: Date, required: true, default: Date.now 
  }
});

var Article = module.exports = mongoose.model('Article', ArticleSchema);
