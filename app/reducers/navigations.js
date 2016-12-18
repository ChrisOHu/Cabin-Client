import {
  PUSH,
  POP,
  NAVI_TO_LAUNCH,
  NAVI_TO_HOME,
  NAVI_TO_TAB
} from '../actions/navigations'
import { REHYDRATE } from 'redux-persist/constants'
import { NavigationExperimental } from 'react-native'

const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental

const initialState = {
  app: {
    index: 0,
    routes: [
      {key: 'launch'},
      {key: 'home'}
    ]
  },
  launch: {
    index: 0,
    routes: [
      {key: 'login'}
    ]
  },
  home: {
    index: 0,
    routes: [
      {key: 'design'},
      {key: 'explore'},
      {key: 'store'},
      {key: 'wall'}
      // {key: 'homes'}
    ]
  },
  // homes: {
  //   index: 0,
  //   routes: [
  //     {key: 'homes-index'}
  //   ]
  // },
  design: {
    index: 0,
    routes: [
      {key: 'design-index'}
    ]
  },
  explore: {
    index: 0,
    routes: [
      {key: 'explore-index'}
    ]
  },
  store: {
    index: 0,
    routes: [
      {key: 'store-index'}
    ]
  },
  wall: {
    index: 0,
    routes: [
      {key: 'wall-index'}
    ]
  }
}

export default function reducer(state = initialState, action = {}) {
  const routesKey = utils.getCurrentRoutesStackKey(state)
  const routes = state[routesKey]

  switch (action.type) {
    case REHYDRATE: {
      let savedState = action.payload

      if (savedState.navigations) {
        return {
          ...state,
          app: {
            ...state.app,
            index: (savedState.users.isLoggedIn && savedState.users.user) ? 1 : 0
          }
        }
      }

      return state
    }
    case PUSH: {
      const nextRoutes = NavigationStateUtils.push(routes, action.route)
      return {
        ...state,
        [routesKey]: nextRoutes
      }
    }
    case POP: {
      const nextRoutes = NavigationStateUtils.pop(routes)
      return {
        ...state,
        [routesKey]: nextRoutes
      }
    }
    case NAVI_TO_HOME: {
      const nextAppState = NavigationStateUtils.jumpTo(state.app, 'home')
      return {
        ...state,
        app: nextAppState
      }
    }
    case NAVI_TO_LAUNCH: {
      const nextAppState = NavigationStateUtils.jumpTo(state.app, 'launch')
      return {
        ...state,
        app: nextAppState
      }
    }
    case NAVI_TO_TAB: {
      const tabKey = action.route.key
      const nextHomeState = NavigationStateUtils.jumpTo(state.home, tabKey)
      return {
        ...state,
        home: nextHomeState
      }
    }
    default:
      return state
  }
}

export const utils = {
  getCurrentRoutesStackKey(navi) {
    let routesKey = navi.app.routes[navi.app.index].key
    if (routesKey === 'home') {
      routesKey = navi.home.routes[navi.home.index].key
    }

    return routesKey
  }
}

