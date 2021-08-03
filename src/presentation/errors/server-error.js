module.exports = class ServerError extends Error {
  constructor () {
    super('There was an invalidnternal error')
    this.name = 'ServerError'
  }
}
