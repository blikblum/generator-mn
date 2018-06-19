import Bottle from 'bottlejs'

const bottle = new Bottle()

const container = bottle.container
const factory = bottle.factory.bind(bottle)
const service = bottle.service.bind(bottle)

export {container, service, factory}
