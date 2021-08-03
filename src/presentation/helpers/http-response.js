const { MissingParamError, ServerError } = require('../errors')
module.exports = class HttpResponse {
  static badRequest (param) {
    return {
      statusCode: 400,
      body: new MissingParamError()
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }
}
