import { AsyncStorage } from 'react-native'
import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import authentication from 'feathers-authentication/client'
import rest from 'feathers-rest/client'
import configs from '~/configs'

let JWT_TOKEN = ""
let instance = null

export function getInstance() {
  if (!instance) {
    setup()
  }

  return instance
}

export function setToken(token) {
  JWT_TOKEN = token
}

function setup() {
  const headers = JWT_TOKEN ? { 'Authorization': JWT_TOKEN } : {}

  instance = feathers()
    .configure(
      rest(configs.server)
        .fetch(fetch, { headers })
    )
    .configure(hooks())
    // Use AsyncStorage to store our login toke
    .configure(authentication({
      storage: AsyncStorage
    }))
}

