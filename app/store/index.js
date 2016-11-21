import { AsyncStorage } from 'react-native'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import {REHYDRATE} from 'redux-persist/constants'
import createMigration from 'redux-persist-migrate'
import createEncryptor from 'redux-persist-transform-encrypt'
import createActionBuffer from 'redux-action-buffer'
import rootReducer from '../reducers'
import configs from '~/configs'

import createLogger from 'redux-logger'

export default function configureStore({initialState, onRehydrated}) {

  /** 1. Configure persisted store migrations */
  const manifest = {
    1: (state) => ({...state}),
    2: (state) => {
      return {
        ...state,
        app: {
          ...state.app,
          toast: {}
        }
      }
    },
    3: (state) => {
      return {
        ...state,
        user: {
          ...state.user,
          user: state.user.user ? state.user.user.data : null
        }
      }
    },
    4: (state) => {
      return {
        app         : {...state.app},
        theme       : {...state.theme},
        navigations : {...state.navigations},
        users       : {...state.user}
      }
    }
  }
  const reducerKey = 'app' // reducerKey => state.app.version
  const migration = createMigration(manifest, reducerKey)

  const enhancer = compose(

    process.env.NODE_ENV === 'development' ? applyMiddleware(thunk, createLogger()) : applyMiddleware(thunk),

    migration,
    autoRehydrate(),
    applyMiddleware(createActionBuffer(REHYDRATE))
  )

  /** 2. Create Store */
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  /** 3. Encrypt persisted store */
  const encryptor = createEncryptor({
    secretKey: configs.reduxStoreEncryptionKey
  })

  /** 4. Persist store */
  persistStore(
    store,
    {
      storage: AsyncStorage,
      transforms: [
        encryptor
      ]
    },
    onRehydrated
  )

  return store
}

