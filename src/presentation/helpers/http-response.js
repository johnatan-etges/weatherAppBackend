module.exports = class HttpResponse {
  static badRequest (param) {
    return {
      statusCode: 400,
      body: `Missing param: ${param}`
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: 'There was a problem on the server. Please try again later'
    }
  }
}
