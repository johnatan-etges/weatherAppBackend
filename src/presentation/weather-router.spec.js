const WeatherRouter = require('./routers/weather-router')
const { ServerError } = require('./errors')
const { MissingParamError } = require('../util/errors')

class WeatherUseCaseSpy {
  async fetchWeatherData (date, city, limit) {
    this.date = date
    this.city = city
    this.limit = limit
    if (!date || !city || !limit) {
      throw new ServerError()
    }
    const result = 'result'
    return result
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

const makeWeatherUseCaseWithError = () => {
  class WeatherUseCaseSpy {
    async fetchWeatherData (date, city, limit) {
      throw new ServerError()
    }
  }
  return new WeatherUseCaseSpy()
}

describe('Weather Router', () => {
  test('Should return 400 if no date is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('date'))
  })

  test('Should return 400 if no city is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        date: 'any_date',
        limit: 'any_limit'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('city'))
  })

  test('Should return 400 if no limit is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('limit'))
  })

  test('Should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if an invalid httpRequest is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no WeatherUseCase is provided', async () => {
    const sut = makeSutWithError()
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call WeatherUseCause.fetchWeatherData with correct parameters', async () => {
    const { sut, weatherUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    await sut.route(httpRequest)
    expect(weatherUseCaseSpy.date).toEqual(httpRequest.body.date)
    expect(weatherUseCaseSpy.city).toEqual(httpRequest.body.city)
    expect(weatherUseCaseSpy.limit).toEqual(httpRequest.body.limit)
  })

  test('Should return 500 if WeatherUseCase throws', async () => {
    const weatherUseCaseSpy = makeWeatherUseCaseWithError()
    const sut = new WeatherRouter(weatherUseCaseSpy)
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if WeatherUseCase returns data', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        date: 'any_date',
        city: 'any_city',
        limit: 'any_limit'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
