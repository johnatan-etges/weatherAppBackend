const { ServerError } = require('../errors')
const { MissingParamError } = require('../../util/errors/')
module.exports = class HttpResponse {
  static badRequest (param) {
    return {
      statusCode: 400,
      body: new MissingParamError(param)
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static ok (bodyData) {
    return {
      statusCode: 200,
      body: bodyData
    }
  }
}
