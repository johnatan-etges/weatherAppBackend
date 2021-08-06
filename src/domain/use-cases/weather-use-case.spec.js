const { MissingParamError } = require('../../util/errors')
class WeatherUseCase {
  async fetchWeatherData (date, city, limit) {
    if (!date) {
      throw new MissingParamError('date')
    }
    if (!city) {
      throw new MissingParamError('city')
    }
  }
}

describe('WeatherUseCase', () => {
  test('Should trhow if no date is provided', async () => {
    const sut = new WeatherUseCase()
    const city = 'any_city'
    const limit = 'any_limit'
    const promise = sut.fetchWeatherData(city, limit)
    expect(promise).rejects.toThrow(new MissingParamError('date'))
  })

  test('Should trhow if no city is provided', async () => {
    const sut = new WeatherUseCase()
    const date = 'any_date'
    const limit = 'any_limit'
    const promise = sut.fetchWeatherData(date, limit)
    expect(promise).rejects.toThrow(new MissingParamError('city'))
  })
})
