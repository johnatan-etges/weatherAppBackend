class WeatherRouter {
  route (httpRequest) {
    if (!httpRequest) {
      return {
        statusCode: 500
      }
    }
    const { date, city, limit } = httpRequest.body
    if (!date || !city || !limit) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Weather Router', () => {
  test('Should return 400 if no date is provided', () => {
    const sut = new WeatherRouter()
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
    const sut = new WeatherRouter()
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
    const sut = new WeatherRouter()
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
    const sut = new WeatherRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })
})
