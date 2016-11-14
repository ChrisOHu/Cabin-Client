//TODO: keep **PRODUCTION SECRETS** secrets

let IS_DEV = true

let SECRETS = null

if (IS_DEV) {
  SECRETS = {
    accessKeyId: 'goQK5m49QVoPdn50',
    secretAccessKey: 'jslh1DJolaGsEn10pYEE8X2QGAXYrr',
    OSS: {

    }
  }
} else {
  // TODO: should keep **PRODUCTION SECRETS** secrets
}

export default {
  SECRETS
}
