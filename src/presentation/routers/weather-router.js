const HttpResponse = require('../helpers/http-response')

module.exports = class WeatherRouter {
  constructor (weatherUseCase) {
    this.weatherUseCase = weatherUseCase
  }

  route (httpRequest) {
    try {
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
      this.weatherUseCase.fetchWeatherData(date, city, limit)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
