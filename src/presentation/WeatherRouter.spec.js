class WeatherRouter {
  route (httpRequest) {
    if (!httpRequest.body.date || !httpRequest.body.city) {
      return {
        statusCode: 400
      }
    }
    return 200
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
})
