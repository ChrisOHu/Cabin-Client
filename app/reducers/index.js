import { combineReducers } from 'redux'
import app from './app'
import theme from './themes'
import navigations from './navigations'
import users from './users'

const rootReducer = combineReducers({
  app, theme, navigations, users
})

export default rootReducer

