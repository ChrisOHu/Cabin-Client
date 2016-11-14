import { AsyncStorage } from 'react'
import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import authentication from 'feathers-authentication/client'
import rest from 'feathers-rest/client'
import configs from '~/configs'

let instance

export default function setup() {
  instance = feathers()
    .configure(rest(configs.server).fetch(fetch))
    .configure(hooks())
    // Use AsyncStorage to store our login toke
    .configure(authentication({
      storage: AsyncStorage
    }))
}

export function getInstance() {
  if (!instance) {
    setup()
  }

  return instance
}

