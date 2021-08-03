const WeatherRouter = require('./routers/weather-router')
const ServerError = require('./errors/server-error')

class WeatherUseCaseSpy {
  fetchWeatherData (date, city, limit) {
    this.date = date
    this.city = city
    this.limit = limit

    throw new ServerError()
  }
}

const makeSut = () => {
  const weatherUseCaseSpy = new WeatherUseCaseSpy()
  const sut = new WeatherRouter(weatherUseCaseSpy)
  return {
    sut,
    weatherUseCaseSpy
  }
}

const makeSutWithError = () => {
  const sut = new WeatherRouter()
  return sut
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
    const sut = makeSutWithError()
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

  test('Should call WeatherUseCause.fetchWeatherData with correct parameters', () => {
    const { sut, weatherUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    sut.route(httpRequest)
    expect(weatherUseCaseSpy.date).toEqual(httpRequest.body.date)
    expect(weatherUseCaseSpy.city).toEqual(httpRequest.body.city)
    expect(weatherUseCaseSpy.limit).toEqual(httpRequest.body.limit)
  })

  test('Should return 500 if WeatherUseCase throws', () => {
    const { sut } = makeSut()
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
})
