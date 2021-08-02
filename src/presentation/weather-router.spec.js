const HttpResponse = require('./helpers/http-response')

class WeatherUseCase {
  queryWeather (date, city, limit) {
    this.date = date
    this.city = city
    this.limit = limit
  }
}

class WeatherRouter {
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

const makeSut = () => {
  const weatherUseCase = new WeatherUseCase()
  const sut = new WeatherRouter(weatherUseCase)
  return {
    sut,
    weatherUseCase
  }
}

const makeSutWithError = () => {
  const weatherUseCase = new WeatherUseCase()
  const sut = new WeatherRouter()
  return {
    sut,
    weatherUseCase
  }
}

describe('Weather Router', () => {
  test('Should return 400 if no date is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no city is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        date: 'any_date',
        limit: 'any_limit'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no limit is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if an invalid httpRequest is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no WeatherUseCase is provided', () => {
    const { sut } = makeSutWithError()
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should call WeatherUseCause.queryWeather with correct parameters', () => {
    const { sut, weatherUseCase } = makeSut()
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    sut.route(httpRequest)
    expect(weatherUseCase.date).toEqual(httpRequest.body.date)
    expect(weatherUseCase.city).toEqual(httpRequest.body.city)
    expect(weatherUseCase.limit).toEqual(httpRequest.body.limit)
  })
})
