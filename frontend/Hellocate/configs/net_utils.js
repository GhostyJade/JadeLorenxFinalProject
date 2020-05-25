const secretSettings = require('./secret.json')

const serverAddress = secretSettings.remoteUrl
const serverProtocol = 'https'

const serverURI = `${serverProtocol}://${serverAddress}`
const apiPath = 'api/v1/'

export { serverURI, apiPath }