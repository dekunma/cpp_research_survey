// feedback-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const feedback = new Schema({
    name        : {type:String},
    company     : {type:String},
    time        : {type:String},
    postion     : {type:String},
    altPosition : {type:String},
    Q1          : {type:String},
    Q2          : {type:String},
    Q3          : {type:String},
    Q4          : {type:String},
    Q5          : {type:String},
    Q6          : {type:String},
    Q7          : {type:String},
    Q8          : {type:String},
    star5       : {type:Array},
    star4       : {type:Array},
    star3       : {type:Array},
    star2       : {type:Array},
    star1       : {type:Array}
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
