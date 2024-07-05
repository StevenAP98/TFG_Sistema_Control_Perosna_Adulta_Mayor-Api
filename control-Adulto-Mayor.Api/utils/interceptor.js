const middleware = require("./middleware")
function jsonInterceptor(req, res, next) {
    const originalSend = res.json;
    res.json = function(data) {
      data = {value:middleware.encrypt(JSON.stringify(data))};
      return originalSend.call(this, data);
    };
  }
  module.exports={jsonInterceptor}