const feedback = require('./feedback/feedback.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(feedback);
};
