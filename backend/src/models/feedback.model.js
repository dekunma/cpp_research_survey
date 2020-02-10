// feedback-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const feedback = new Schema({
    important   : {type:Array},
    star4       : {type:Array},
    unimportant : {type:Array}
  }, {
    
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('feedback');
  } catch (e) {
    return mongooseClient.model('feedback', feedback);
  }
};
