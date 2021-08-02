const HttpResponse = require('../helpers/http-response')

module.exports = class WeatherRouter {
  constructor (weatherUseCase) {
    this.weatherUseCase = weatherUseCase
  }

  route (httpRequest) {
    if (!this.weatherUseCase) {
      return HttpResponse.serverError()
    }

    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { date, city, limit } = httpRequest.body
    if (!date) {
      return HttpResponse.badRequest('date')
    }
    if (!city) {
      return HttpResponse.badRequest('city')
    }
    if (!limit) {
      return HttpResponse.badRequest('limit')
    }

    this.weatherUseCase.queryWeather('any_date', 'any_city', 'any_limit')
  }
}
