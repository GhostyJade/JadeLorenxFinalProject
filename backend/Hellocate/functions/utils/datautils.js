const TokenValidator = require('./tokenvalidator')

class DataUtils {
    constructor(dbInstance) {
        this.db = dbInstance
    }

    // Ambient Data utils:
    getAllUserAmbients(username) {

    }

    // End Ambient Data utils
}

module.exports = {
    DataUtils, TokenValidator
}